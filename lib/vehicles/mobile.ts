import type { Vehicle, VehicleListOptions, VehiclesSource } from "./types";

/**
 * Mobile.de Adapter – Stub.
 *
 * Sobald die Mobile.de-Credentials vorliegen, hier den echten API-Call einbauen.
 * Dokumentation: https://services.mobile.de/
 *
 * ENV-Vars (nicht committen, in .env.local setzen):
 *   MOBILE_DE_USERNAME
 *   MOBILE_DE_PASSWORD
 *   MOBILE_DE_SELLER_ID
 *
 * Design-Idee:
 *   - list(): GET /search-api/search mit sellerId filter
 *   - get(slug): slug enthält mobileAdId am Ende → GET /search-api/ad/{id}
 *   - Responses in Vehicle-Type mappen (siehe types.ts)
 *   - Mit Next.js revalidate (10 min) cachen
 */

async function fetchFromMobileDe(_opts?: VehicleListOptions): Promise<Vehicle[]> {
  // TODO: implementieren sobald Credentials vorliegen
  // const auth = Buffer.from(`${process.env.MOBILE_DE_USERNAME}:${process.env.MOBILE_DE_PASSWORD}`).toString("base64");
  // const res = await fetch(
  //   `https://services.mobile.de/search-api/search?customerNumber=${process.env.MOBILE_DE_SELLER_ID}&page.size=100`,
  //   {
  //     headers: {
  //       Authorization: `Basic ${auth}`,
  //       Accept: "application/vnd.de.mobile.api+json",
  //     },
  //     next: { revalidate: 600 },
  //   }
  // );
  // const data = await res.json();
  // return data.ads.map(mapMobileAdToVehicle);
  throw new Error("Mobile.de Adapter noch nicht implementiert. VEHICLES_SOURCE=mock verwenden.");
}

export const mobileSource: VehiclesSource = {
  async list(opts: VehicleListOptions = {}) {
    return fetchFromMobileDe(opts);
  },
  async get(slug: string) {
    const all = await fetchFromMobileDe();
    return all.find((v) => v.slug === slug) ?? null;
  },
};
