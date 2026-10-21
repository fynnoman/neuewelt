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
  price: number;
  color: string;
  image: string;
  images?: string[];
  highlights: string[];
  // Mobile.de specific — optional
  mobileAdId?: string;
  mobileAdUrl?: string;
  firstRegistration?: string; // MM/YYYY
  updatedAt?: string; // ISO
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
