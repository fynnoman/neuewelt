import { SITE } from "@/lib/site";

export default function ImpressumPage() {
  return (
    <main className="pt-32 pb-24 px-5 md:px-10 lg:px-14">
      <div className="mx-auto measure-wide" style={{ maxWidth: 720 }}>
        <div className="small-caps">Impressum</div>
        <h1 className="display mt-6" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
          Angaben gemäß § 5 TMG
        </h1>

        <section className="mt-14" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
          <h2 className="display" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Anbieter
          </h2>
          <p className="mt-3">
            {SITE.name}
            <br />
            [Rechtsform · Firmenname]
            <br />
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Kontakt
          </h2>
          <p className="mt-3">
            Festnetz: {SITE.contact.phoneLandline}
            <br />
            Mobil: {SITE.contact.phone}
            <br />
            E-Mail: {SITE.contact.email}
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Vertretungsberechtigt
          </h2>
          <p className="mt-3">[Vor- und Nachname Geschäftsführer]</p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Registereintrag
          </h2>
          <p className="mt-3">
            [Registergericht]
            <br />
            Registernummer: [HRB-Nummer]
          </p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Umsatzsteuer-ID
          </h2>
          <p className="mt-3">[USt-IdNr.]</p>

          <h2 className="display mt-10" style={{ fontSize: "1.2rem", color: "var(--ink)" }}>
            Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)
          </h2>
          <p className="mt-3">[Vor- und Nachname]</p>

          <p className="mt-10" style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            Platzhalter-Inhalt. Vor dem Launch rechtlich korrekt und vollständig ausfüllen.
          </p>
        </section>
      </div>
    </main>
  );
}
