"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Vehicle } from "@/lib/vehicles";
import { SEGMENTS } from "@/lib/vehicles";

function matchesSegment(v: Vehicle, seg: string): boolean {
  if (!seg || seg === "alle") return true;
  const cat = (v.category ?? "").toLowerCase();
  const klass = (v.vehicleClass ?? "").toLowerCase();
  if (seg === "limousine") return cat.startsWith("limousine");
  if (seg === "kombi") return cat.includes("kombi");
  if (seg === "suv")
    return cat.includes("suv") || cat.includes("gelände") || cat.includes("gelaende") || cat.includes("pickup");
  if (seg === "coupe") return cat.includes("coup") || cat.includes("sportwagen");
  if (seg === "cabrio") return cat.includes("cabrio") || cat.includes("roadster");
  if (seg === "van") return cat.startsWith("van") || cat.includes("minibus");
  if (seg === "transporter")
    return klass.includes("transporter") || klass.includes("lkw") || cat.includes("kastenwagen");
  return true;
}

type SortKey = "neu" | "preis-auf" | "preis-ab" | "km-auf" | "marke-az";

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  const [segment, setSegment] = useState("alle");
  const [brand, setBrand] = useState("alle");
  const [sort, setSort] = useState<SortKey>("neu");

  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const v of vehicles) if (v.brand) set.add(v.brand);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "de"));
  }, [vehicles]);

  const list = useMemo(() => {
    const base = vehicles.filter((v) => {
      if (!matchesSegment(v, segment)) return false;
      if (brand !== "alle" && v.brand !== brand) return false;
      return true;
    });
    const sorted = [...base];
    if (sort === "preis-auf") sorted.sort((a, b) => a.price - b.price);
    if (sort === "preis-ab") sorted.sort((a, b) => b.price - a.price);
    if (sort === "km-auf") sorted.sort((a, b) => a.mileage - b.mileage);
    if (sort === "marke-az")
      sorted.sort((a, b) =>
        `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`, "de")
      );
    if (sort === "neu") sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [vehicles, segment, brand, sort]);

  const selectStyle: React.CSSProperties = {
    background: "transparent",
    padding: "6px 8px",
    border: "none",
    borderBottom: "1px solid var(--ink)",
    color: "var(--ink)",
    fontSize: "0.95rem",
    appearance: "none",
    cursor: "pointer",
    minWidth: 140,
  };

  return (
    <>
      <nav className="mt-12 md:mt-16 px-5 md:px-10 lg:px-14 flex flex-col gap-5">
        <ul className="flex flex-wrap gap-x-5 md:gap-x-8 gap-y-3" style={{ fontSize: "0.98rem" }}>
          {SEGMENTS.map((s) => {
            const active = segment === s.key;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setSegment(s.key)}
                  style={{
                    color: active ? "var(--ink)" : "var(--muted)",
                    paddingBottom: "6px",
                    borderBottom: active ? "2px solid var(--signal)" : "2px solid transparent",
                    transition: "color 200ms ease, border-color 240ms ease",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <label className="flex items-center gap-3">
            <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Marke</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} style={selectStyle}>
              <option value="alle">Alle Marken</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3">
            <span style={{ color: "var(--muted)", fontSize: "0.95rem" }}>Sortieren</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} style={selectStyle}>
              <option value="neu">Jahr (neu)</option>
              <option value="preis-auf">Preis aufsteigend</option>
              <option value="preis-ab">Preis absteigend</option>
              <option value="km-auf">Kilometer aufsteigend</option>
              <option value="marke-az">Marke A–Z</option>
            </select>
          </label>

        </div>
      </nav>

      <section className="mt-12 md:mt-16 px-5 md:px-6 lg:px-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-16">
          {list.map((v, i) => (
            <motion.li
              key={v.slug}
              id={v.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/fahrzeuge/${v.slug}`} className="group block">
                <div
                  className="relative aspect-[4/3] overflow-hidden radius"
                  style={{ background: "var(--paper-sunk)" }}
                >
                  <Image
                    src={v.image}
                    alt={`${v.brand} ${v.model} ${v.variant}`}
                    fill
                    sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 94vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <span className="liquid-chip absolute left-4 top-4">
                    {v.fuel.toUpperCase()}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="display" style={{ fontSize: "1.3rem", letterSpacing: "-0.025em" }}>
                    {v.brand} {v.model}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.95rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {v.variant}
                  </div>
                  <div
                    className="display mt-2"
                    style={{ fontSize: "1.25rem", color: "var(--ink)", letterSpacing: "-0.01em" }}
                  >
                    {v.price.toLocaleString("de-DE")} €
                  </div>
                </div>

                <div
                  className="mt-4 flex items-center gap-5 mono"
                  style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums", fontSize: "0.74rem" }}
                >
                  <span>EZ {v.year}</span>
                  <span>·</span>
                  <span>{v.mileage.toLocaleString("de-DE")} km</span>
                  <span>·</span>
                  <span>{v.power} kW</span>
                  <span>·</span>
                  <span>{v.gearbox}</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </>
  );
}
