import Link from "next/link";
import { getVehicles } from "@/lib/vehicles";
import { SITE } from "@/lib/site";
import VehicleList from "@/components/VehicleList";

export const revalidate = 900;

export default async function FahrzeugePage() {
  const vehicles = await getVehicles();

  return (
    <main className="pt-28 lg:pt-36">
      <header className="px-5 md:px-10 lg:px-14">
        <div className="mono" style={{ color: "var(--muted)" }}>
          Fahrzeuge
        </div>
        <h1
          className="display mt-6"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            maxWidth: "22ch",
            letterSpacing: "-0.035em",
          }}
        >
          Aktueller Bestand.
        </h1>
        <p className="lead mt-6 measure">
          Alle Fahrzeuge technisch durchgesehen. Historie und Ausstattung
          dokumentiert. Probefahrt jederzeit möglich.
        </p>
      </header>

      <VehicleList vehicles={vehicles} />

      <section
        className="mt-32 px-5 md:px-10"
        style={{ background: "var(--paper-sunk)", padding: "80px 48px" }}
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-8">
          <div>
            <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>Suchauftrag</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", letterSpacing: "-0.03em", color: "var(--on-sunk)" }}
            >
              Nichts dabei?
            </h2>
            <p className="lead mt-4 measure" style={{ fontSize: "1.05rem", color: "var(--on-sunk-muted)" }}>
              Marke, Budget, Mindestanforderungen angeben. Wir melden uns,
              sobald ein passender Wagen in den Bestand kommt.
            </p>
          </div>
          <Link href={SITE.contact.emailHref} className="btn" style={{ background: "var(--paper)", color: "var(--ink)" }}>
            Suchauftrag starten
            <span style={{ color: "var(--signal)" }}>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
