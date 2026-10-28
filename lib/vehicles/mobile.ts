import { XMLParser } from "fast-xml-parser";
import type { Vehicle, VehicleListOptions, VehiclesSource } from "./types";

/**
 * Mobile.de Search-API Adapter.
 *
 * Doku: https://services.mobile.de/manual/search-api.html
 * Endpoint: https://services.mobile.de/search-api/search
 * Auth: HTTP Basic (Benutzername + Passwort aus Inseratseinbindung)
 *
 * ENV-Vars (in .env.local, nicht committen):
 *   MOBILE_DE_USERNAME
 *   MOBILE_DE_PASSWORD
 *   MOBILE_DE_SELLER_ID      (optional — default 3318917 = Neue Welt Automobile)
 *   VEHICLES_SOURCE=mobile   (schaltet diesen Adapter ein)
 *
 * Caching: Fetch läuft über Next.js mit revalidate 900s (15 Minuten).
 * Preisänderungen, neue Inserate und gelöschte Inserate schlagen also
 * spätestens nach 15 Minuten auf der Site auf.
 */

const BASE = "https://services.mobile.de/search-api/search";
const DEFAULT_SELLER_ID = "3318917";
const PAGE_SIZE = 100; // Max per docs
const REVALIDATE_SECONDS = 900;

type XmlAttr = { "@_value"?: string | number };
type XmlKey = { "@_key"?: string };
type XmlLocalDesc = { "@_xml-lang"?: string; "#text"?: string } | string;

type XmlFeature = XmlKey & {
  "resource:local-description"?: XmlLocalDesc;
};

type XmlRepresentation = {
  "@_size"?: string;
  "@_url"?: string;
};

type XmlImage = {
  "ad:representation"?: XmlRepresentation | XmlRepresentation[];
};

type XmlImages = {
  "@_count"?: string;
  "@_gallery-url"?: string;
  "ad:image"?: XmlImage | XmlImage[];
};

type XmlPrice = {
  "@_currency"?: string;
  "@_type"?: string;
  "ad:consumer-price-amount"?: XmlAttr;
  "ad:vatable"?: XmlAttr;
};

type XmlSpecifics = {
  "ad:exterior-color"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:mileage"?: XmlAttr;
  "ad:first-registration"?: XmlAttr;
  "ad:construction-year"?: XmlAttr;
  "ad:fuel"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:power"?: XmlAttr;
  "ad:gearbox"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:num-seats"?: XmlAttr;
  "ad:condition"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:door-count"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
};

type XmlVehicle = {
  "ad:class"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:category"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:make"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:model"?: XmlKey & { "resource:local-description"?: XmlLocalDesc };
  "ad:model-description"?: XmlAttr;
  "ad:features"?: {
    "ad:feature"?: XmlFeature | XmlFeature[];
  };
  "ad:specifics"?: XmlSpecifics;
};

type XmlAd = {
  "@_key"?: string;
  "@_url"?: string;
  "ad:creation-date"?: XmlAttr;
  "ad:modification-date"?: XmlAttr;
  "ad:detail-page"?: { "@_url"?: string };
  "ad:vehicle"?: XmlVehicle;
  "ad:images"?: XmlImages;
  "ad:price"?: XmlPrice;
};

type XmlSearchResult = {
  "search:search-result"?: {
    "search:total"?: number | string;
    "search:page-size"?: number | string;
    "search:current-page"?: number | string;
    "search:max-pages"?: number | string;
    "search:ads"?: {
      "ad:ad"?: XmlAd | XmlAd[];
    };
  };
};

function readLocalDesc(v: XmlLocalDesc | undefined): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v;
  return v["#text"];
}

function readAttr(v: XmlAttr | undefined): string | undefined {
  if (!v) return undefined;
  const raw = v["@_value"];
  if (raw == null) return undefined;
  return String(raw);
}

function asArray<T>(v: T | T[] | undefined): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function pickBestImage(imgs: XmlImages | undefined): { main?: string; all: string[] } {
  const result: string[] = [];
  const sizeRank: Record<string, number> = {
    ICON: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
    XXXL: 7,
  };
  const images = asArray(imgs?.["ad:image"]);
  for (const img of images) {
    const reps = asArray(img?.["ad:representation"]);
    let best: { url?: string; rank: number } = { rank: -1 };
    for (const r of reps) {
      const size = r["@_size"] ?? "";
      const url = r["@_url"];
      if (!url) continue;
      const rank = sizeRank[size] ?? 0;
      if (rank > best.rank) best = { url, rank };
    }
    if (best.url) result.push(best.url);
  }
  return { main: result[0], all: result };
}

function mapFuel(code: string | undefined): Vehicle["fuel"] {
  switch ((code ?? "").toUpperCase()) {
    case "PETROL":
      return "Benzin";
    case "DIESEL":
      return "Diesel";
    case "ELECTRIC":
    case "ELECTRICITY":
      return "Elektro";
    case "HYBRID":
    case "HYBRID_DIESEL":
    case "HYBRID_PETROL":
    case "PLUGIN_HYBRID":
      return "Hybrid";
    default:
      return "Benzin";
  }
}

function mapGearbox(code: string | undefined): Vehicle["gearbox"] {
  if ((code ?? "").toUpperCase().startsWith("AUTOMATIC")) return "Automatik";
  return "Schaltgetriebe";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function firstRegToYear(fr: string | undefined): number {
  if (!fr) return new Date().getFullYear();
  const m = /^(\d{4})/.exec(fr);
  return m ? Number(m[1]) : new Date().getFullYear();
}

function formatRegistration(fr: string | undefined): string | undefined {
  if (!fr) return undefined;
  const m = /^(\d{4})-(\d{2})/.exec(fr);
  if (!m) return undefined;
  return `${m[2]}/${m[1]}`;
}

function mapAdToVehicle(ad: XmlAd): Vehicle | null {
  const id = ad["@_key"];
  if (!id) return null;

  const vehicle = ad["ad:vehicle"];
  if (!vehicle) return null;

  const brand = String(readLocalDesc(vehicle["ad:make"]?.["resource:local-description"]) ?? "Fahrzeug");
  const modelKey = vehicle["ad:model"]?.["@_key"];
  const modelDescLocal = readLocalDesc(vehicle["ad:model"]?.["resource:local-description"]);
  const modelDescRaw = vehicle["ad:model-description"]?.["@_value"];
  const modelDesc = modelDescRaw != null ? String(modelDescRaw) : undefined;
  const model = String(modelDescLocal ?? modelKey ?? modelDesc ?? "");

  const spec = vehicle["ad:specifics"];
  const fuel = mapFuel(spec?.["ad:fuel"]?.["@_key"]);
  const gearbox = mapGearbox(spec?.["ad:gearbox"]?.["@_key"]);
  const power = Number(readAttr(spec?.["ad:power"]) ?? 0) || 0;
  const mileage = Number(readAttr(spec?.["ad:mileage"]) ?? 0) || 0;
  const firstReg = readAttr(spec?.["ad:first-registration"]);
  const year = firstRegToYear(firstReg) || Number(readAttr(spec?.["ad:construction-year"]) ?? 0);
  const color =
    String(readLocalDesc(spec?.["ad:exterior-color"]?.["resource:local-description"]) ?? "—");

  const priceStr = readAttr(ad["ad:price"]?.["ad:consumer-price-amount"]);
  const price = priceStr ? Math.round(Number(priceStr)) : 0;

  const { main, all } = pickBestImage(ad["ad:images"]);

  const featureNodes = asArray(vehicle["ad:features"]?.["ad:feature"]);
  const highlights = featureNodes
    .map((f) => readLocalDesc(f["resource:local-description"]))
    .filter((s): s is string => Boolean(s))
    .slice(0, 10);

  const variant = String(modelDesc ?? "");

  const slug = `${slugify(brand)}-${slugify(model || "fahrzeug")}-${id}`;

  const detailUrl = ad["ad:detail-page"]?.["@_url"];
  const modificationDate = readAttr(ad["ad:modification-date"]);

  return {
    slug,
    brand,
    model,
    variant,
    year,
    mileage,
    fuel,
    power,
    gearbox,
    price,
    color,
    image: main ?? "",
    images: all,
    highlights,
    mobileAdId: id,
    mobileAdUrl: detailUrl,
    firstRegistration: formatRegistration(firstReg),
    updatedAt: modificationDate,
  };
}

function buildAuthHeader(): string | null {
  const user = process.env.MOBILE_DE_USERNAME;
  const pass = process.env.MOBILE_DE_PASSWORD;
  if (!user || !pass) return null;
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return `Basic ${token}`;
}

async function fetchPage(sellerId: string, page: number): Promise<XmlSearchResult | null> {
  const auth = buildAuthHeader();
  if (!auth) return null;

  const url = `${BASE}?seller.id=${encodeURIComponent(sellerId)}&page.size=${PAGE_SIZE}&page.number=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: auth,
      Accept: "application/xml, text/xml, */*",
      "User-Agent": "NeueWeltAutomobile-Website/1.0 (+https://neuewelt.vercel.app)",
    },
    // 15-Minuten-Cache. Preis- und Bestandsänderungen schlagen also nach spätestens 15 min auf.
    next: { revalidate: REVALIDATE_SECONDS, tags: ["mobile-de"] },
  });

  if (!res.ok) {
    console.error(`[mobile.de] HTTP ${res.status} auf page ${page}`);
    return null;
  }

  const xml = await res.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    parseAttributeValue: false,
    parseTagValue: false,
    trimValues: true,
    processEntities: true,
  });

  try {
    return parser.parse(xml) as XmlSearchResult;
  } catch (err) {
    console.error("[mobile.de] XML parse error:", err);
    return null;
  }
}

async function fetchAllAds(sellerId: string): Promise<Vehicle[]> {
  const first = await fetchPage(sellerId, 1);
  const root = first?.["search:search-result"];
  if (!root) return [];

  const maxPages = Number(root["search:max-pages"] ?? 1) || 1;

  const firstAds = asArray(root["search:ads"]?.["ad:ad"]);
  const allPages: XmlAd[][] = [firstAds];

  if (maxPages > 1) {
    const pagePromises = [];
    for (let p = 2; p <= maxPages; p++) {
      pagePromises.push(fetchPage(sellerId, p));
    }
    const rest = await Promise.all(pagePromises);
    for (const r of rest) {
      const ads = asArray(r?.["search:search-result"]?.["search:ads"]?.["ad:ad"]);
      if (ads.length) allPages.push(ads);
    }
  }

  const vehicles: Vehicle[] = [];
  for (const page of allPages) {
    for (const ad of page) {
      const mapped = mapAdToVehicle(ad);
      if (mapped) vehicles.push(mapped);
    }
  }
  return vehicles;
}

function sortVehicles(list: Vehicle[], sort?: VehicleListOptions["sort"]): Vehicle[] {
  const out = [...list];
  if (sort === "preis-auf") out.sort((a, b) => a.price - b.price);
  else if (sort === "preis-ab") out.sort((a, b) => b.price - a.price);
  else if (sort === "km-auf") out.sort((a, b) => a.mileage - b.mileage);
  else out.sort((a, b) => b.year - a.year);
  return out;
}

function matchesSegment(v: Vehicle, seg: string): boolean {
  if (!seg || seg === "alle") return true;
  const s = `${v.variant} ${v.model}`.toLowerCase();
  if (seg === "suv") return /x[13-7]\b|glc|macan|q[357]|suv|touareg|tiguan|xc40|xc60|xc90|q5|q7/.test(s);
  if (seg === "kombi") return /touring|avant|t-?modell|kombi|variant|estate|st\b/.test(s);
  if (seg === "coupe") return /coup|coupé/.test(s);
  if (seg === "limousine") return !/touring|avant|t-?modell|kombi|coup|x[13-7]|glc|macan|q[357]|suv|tiguan|touareg|xc\d/.test(s);
  return true;
}

export const mobileSource: VehiclesSource = {
  async list(opts: VehicleListOptions = {}) {
    const sellerId = process.env.MOBILE_DE_SELLER_ID || DEFAULT_SELLER_ID;
    const all = await fetchAllAds(sellerId);
    let filtered = all;
    if (opts.segment) filtered = filtered.filter((v) => matchesSegment(v, opts.segment!));
    const sorted = sortVehicles(filtered, opts.sort);
    if (opts.limit) return sorted.slice(0, opts.limit);
    return sorted;
  },

  async get(slug: string) {
    const sellerId = process.env.MOBILE_DE_SELLER_ID || DEFAULT_SELLER_ID;
    const all = await fetchAllAds(sellerId);
    // 1) Direkter Slug-Treffer
    const direct = all.find((v) => v.slug === slug);
    if (direct) return direct;
    // 2) Fallback: Slug könnte die mobile.de-ID am Ende enthalten
    const trailingId = slug.match(/(\d{10,})$/)?.[1];
    if (trailingId) {
      const byId = all.find((v) => v.mobileAdId === trailingId);
      if (byId) return byId;
    }
    return null;
  },
};
