import type { Vehicle, VehicleListOptions, VehiclesSource } from "./types";

// Mock-Bestand für Development und Vorschau.
// Wird von der Mobile.de-Integration ersetzt, sobald die API steht.
const DATA: Vehicle[] = [
  {
    slug: "bmw-520d-touring",
    brand: "BMW",
    model: "520d",
    variant: "Touring · M Sport",
    year: 2021,
    mileage: 68_400,
    fuel: "Diesel",
    power: 140,
    gearbox: "Automatik",
    price: 32_900,
    color: "Mineralweiß",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=70",
    highlights: ["Head-up Display", "Panoramadach", "Standheizung", "Lederausstattung"],
  },
  {
    slug: "audi-a6-avant",
    brand: "Audi",
    model: "A6",
    variant: "Avant · 45 TFSI quattro",
    year: 2022,
    mileage: 41_200,
    fuel: "Benzin",
    power: 180,
    gearbox: "Automatik",
    price: 44_500,
    color: "Daytonagrau",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=70",
    highlights: ["Virtual Cockpit", "Matrix LED", "Luftfederung", "Bang & Olufsen"],
  },
  {
    slug: "mercedes-glc-coupe",
    brand: "Mercedes-Benz",
    model: "GLC 300e",
    variant: "Coupé · AMG Line",
    year: 2023,
    mileage: 22_700,
    fuel: "Hybrid",
    power: 235,
    gearbox: "Automatik",
    price: 56_900,
    color: "Obsidianschwarz",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=70",
    highlights: ["Burmester Sound", "360° Kamera", "Head-up Display", "AMG Fahrwerk"],
  },
  {
    slug: "porsche-macan",
    brand: "Porsche",
    model: "Macan",
    variant: "S · Approved",
    year: 2020,
    mileage: 59_800,
    fuel: "Benzin",
    power: 260,
    gearbox: "Automatik",
    price: 61_500,
    color: "Vulkangrau Metallic",
    image:
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&w=1600&q=70",
    highlights: ["Sport Chrono", "Luftfederung", "PASM", "21-Zoll-Räder"],
  },
  {
    slug: "vw-golf-r",
    brand: "Volkswagen",
    model: "Golf R",
    variant: "4Motion · DSG",
    year: 2022,
    mileage: 36_100,
    fuel: "Benzin",
    power: 235,
    gearbox: "Automatik",
    price: 48_200,
    color: "Lapizblau Metallic",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=70",
    highlights: ["Performance Paket", "Akrapovič", "19-Zoll Estoril", "Harman Kardon"],
  },
  {
    slug: "tesla-model-3",
    brand: "Tesla",
    model: "Model 3",
    variant: "Long Range · AWD",
    year: 2022,
    mileage: 44_900,
    fuel: "Elektro",
    power: 324,
    gearbox: "Automatik",
    price: 34_900,
    color: "Perlweiß Multicoat",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=70",
    highlights: ["Enhanced Autopilot", "Premium Interieur", "19-Zoll Sport", "Standheizung"],
  },
  {
    slug: "bmw-x3-xdrive",
    brand: "BMW",
    model: "X3",
    variant: "xDrive30d · xLine",
    year: 2021,
    mileage: 71_200,
    fuel: "Diesel",
    power: 210,
    gearbox: "Automatik",
    price: 41_900,
    color: "Carbonschwarz",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=70",
    highlights: ["AHK schwenkbar", "Driving Assistant Plus", "Komfortsitze", "Harman Kardon"],
  },
  {
    slug: "mercedes-e-klasse",
    brand: "Mercedes-Benz",
    model: "E 220d",
    variant: "T-Modell · Avantgarde",
    year: 2020,
    mileage: 89_600,
    fuel: "Diesel",
    power: 143,
    gearbox: "Automatik",
    price: 29_800,
    color: "Selenitgrau",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=70",
    highlights: ["MBUX", "Multibeam LED", "Komfortsitze", "AHK"],
  },
];

function matchesSegment(v: Vehicle, seg: string) {
  if (seg === "alle") return true;
  const str = `${v.model} ${v.variant}`.toLowerCase();
  if (seg === "suv") return /x3|glc|macan|q[357]|suv/.test(str);
  if (seg === "kombi") return /touring|avant|t-?modell|kombi/.test(str);
  if (seg === "coupe") return /coup|coupé/.test(str);
  if (seg === "limousine")
    return !/touring|avant|t-?modell|kombi|coup|x3|glc|macan|q[357]/.test(str);
  return true;
}

export const mockSource: VehiclesSource = {
  async list(opts: VehicleListOptions = {}) {
    let out = DATA.slice();
    if (opts.segment) out = out.filter((v) => matchesSegment(v, opts.segment!));
    const sort = opts.sort ?? "neu";
    out.sort((a, b) => {
      if (sort === "preis-auf") return a.price - b.price;
      if (sort === "preis-ab") return b.price - a.price;
      if (sort === "km-auf") return a.mileage - b.mileage;
      return b.year - a.year;
    });
    if (opts.limit) out = out.slice(0, opts.limit);
    return out;
  },
  async get(slug: string) {
    return DATA.find((v) => v.slug === slug) ?? null;
  },
};
