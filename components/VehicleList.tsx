"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Vehicle } from "@/lib/vehicles";
import { SEGMENTS } from "@/lib/vehicles";

function matchesSegment(variant: string, model: string, seg: string) {
  const v = `${variant} ${model}`.toLowerCase();
  if (seg === "alle") return true;
  if (seg === "suv") return /x3|glc|macan|q[357]|suv/.test(v);
  if (seg === "kombi") return /touring|avant|t-?modell|kombi/.test(v);
  if (seg === "coupe") return /coup|coupé/.test(v);
  if (seg === "limousine")
    return !/touring|avant|t-?modell|kombi|coup|x3|glc|macan|q[357]/.test(v);
  return true;
}

type SortKey = "neu" | "preis-auf" | "preis-ab" | "km-auf" | "marke-az";

export default function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  const [segment, setSegment] = useState("alle");
  const [sort, setSort] = useState<SortKey>("neu");

  const list = useMemo(() => {
    const base = vehicles.filter((v) => matchesSegment(v.variant, v.model, segment));
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
  }, [vehicles, segment, sort]);

  return (
    <>
      <nav className="mt-16 px-6 md:px-10 lg:px-14 flex flex-wrap items-center justify-between gap-6">
        <ul className="flex flex-wrap gap-x-8 gap-y-3" style={{ fontSize: "1.05rem" }}>
          {SEGMENTS.map((s) => {
            const active = segment === s.key;
            return (
              <li key={s.key}>
                <button
                  onClick={() => setSegment(s.key)}
                  style={{
                    color: active ? "var(--ink)" : "var(--muted)",
                    paddingBottom: "6px",
                    borderBottom: active ? "2px solid var(--signal)" : "2px solid transparent",
                    transition: "color 200ms ease, border-color 240ms ease",
                  }}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        <label className="flex items-center gap-3" style={{ fontSize: "0.95rem" }}>
          <span style={{ color: "var(--muted)" }}>Sortieren</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            style={{
              background: "transparent",
              padding: "6px 8px",
              border: "none",
              borderBottom: "1px solid var(--ink)",
              color: "var(--ink)",
            }}
          >
            <option value="neu">Jahr (neu)</option>
            <option value="preis-auf">Preis aufsteigend</option>
            <option value="preis-ab">Preis absteigend</option>
            <option value="km-auf">Kilometer aufsteigend</option>
            <option value="marke-az">Marke A–Z</option>
          </select>
        </label>
      </nav>

      <section className="mt-16 px-3 md:px-6 lg:px-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-16">
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

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="display" style={{ fontSize: "1.3rem", letterSpacing: "-0.025em" }}>
                      {v.brand} {v.model}
                    </div>
                    <div className="mt-1" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                      {v.variant}
                    </div>
                  </div>
                  <div className="display" style={{ fontSize: "1.25rem", color: "var(--ink)" }}>
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
