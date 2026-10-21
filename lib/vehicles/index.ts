import { mockSource } from "./mock";
import { mobileSource } from "./mobile";
import type { Vehicle, VehicleListOptions, VehiclesSource } from "./types";

export type { Vehicle, VehicleListOptions };
export { SEGMENTS } from "./types";

const source: VehiclesSource =
  process.env.VEHICLES_SOURCE === "mobile" ? mobileSource : mockSource;

export function getVehicles(opts?: VehicleListOptions): Promise<Vehicle[]> {
  return source.list(opts);
}

export function getVehicle(slug: string): Promise<Vehicle | null> {
  return source.get(slug);
}
