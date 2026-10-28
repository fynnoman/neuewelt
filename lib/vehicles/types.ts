export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  fuel: "Benzin" | "Diesel" | "Hybrid" | "Elektro";
  power: number; // kW
  gearbox: "Automatik" | "Schaltgetriebe";
  price: number; // Konsumentenpreis (bei vatable=true inkl. MwSt., sonst Verkaufspreis gesamt)
  color: string;
  image: string;
  images?: string[];
  highlights: string[];
  description?: string; // Fließtext-Beschreibung aus mobile.de
  // MwSt.
  vatable?: boolean; // true = MwSt. ausweisbar
  vatRate?: number; // z. B. 0.19
  // Mobile.de specific — optional
  mobileAdId?: string;
  mobileAdUrl?: string;
  firstRegistration?: string; // MM/YYYY
  createdAt?: string; // ISO, Zeitpunkt der mobile.de-Einstellung
  updatedAt?: string; // ISO, letzte Änderung
};

export type Segment = {
  key: string;
  label: string;
};

export type VehicleListOptions = {
  segment?: string;
  sort?: "neu" | "preis-auf" | "preis-ab" | "km-auf";
  limit?: number;
};

export interface VehiclesSource {
  list(opts?: VehicleListOptions): Promise<Vehicle[]>;
  get(slug: string): Promise<Vehicle | null>;
}

export const SEGMENTS: Segment[] = [
  { key: "alle", label: "Alle" },
  { key: "limousine", label: "Limousine" },
  { key: "suv", label: "SUV" },
  { key: "kombi", label: "Kombi" },
  { key: "coupe", label: "Coupé" },
];
