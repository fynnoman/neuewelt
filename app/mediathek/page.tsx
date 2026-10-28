import Image from "next/image";
import Link from "next/link";
import SlideIn from "@/components/SlideIn";
import { MEDIATHEK } from "@/lib/mediathek";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Mediathek · Neue Welt Automobile",
  description:
    "Eindrücke aus Showroom und Fahrzeugbestand. Fotografien von Neue Welt Automobile in Saarlouis.",
};

export default function MediathekPage() {
  const items = MEDIATHEK;

  return (
    <main className="pt-28 lg:pt-20 px-5 md:px-10 lg:px-14 pb-20">
      <header>
        <SlideIn direction="up">
          <div className="mono" style={{ color: "var(--muted)" }}>Mediathek</div>
        </SlideIn>
        <SlideIn direction="up" delay={0.1}>
          <h1
            className="display mt-6"
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              maxWidth: "22ch",
              letterSpacing: "-0.03em",
            }}
          >
            Eindrücke aus unserem Haus.
          </h1>
        </SlideIn>
        <SlideIn direction="up" delay={0.2}>
          <p className="lead mt-6" style={{ maxWidth: "50ch" }}>
            Fahrzeuge und Showroom. Alles in Saarlouis.
          </p>
        </SlideIn>
      </header>

      {items.length === 0 ? (
        <SlideIn direction="up" delay={0.3}>
          <div
            className="liquid mt-16"
            style={{ padding: "clamp(32px, 5vw, 64px)", textAlign: "center" }}
          >
            <div className="mono" style={{ color: "var(--muted)" }}>
              Noch keine Bilder
            </div>
            <p
              className="display mt-5"
              style={{
                fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                letterSpacing: "-0.02em",
                maxWidth: "28ch",
                marginInline: "auto",
              }}
            >
              Hier erscheinen in Kürze unsere aktuellen Fotografien.
            </p>
            <p className="mt-6" style={{ color: "var(--muted)", maxWidth: "40ch", marginInline: "auto" }}>
              Bis dahin erreichen Sie uns direkt — persönlich, telefonisch oder per WhatsApp.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href="/kontakt"
                className="btn"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                Kontakt aufnehmen <span style={{ color: "var(--signal)" }}>→</span>
              </Link>
              <a
                href={SITE.contact.whatsappHref}
                target="_blank"
                rel="noopener"
                className="btn"
                style={{ background: "var(--paper)", color: "var(--ink)", border: "1px solid var(--fog-200)" }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </SlideIn>
      ) : (
        <section
          className="mt-16"
          style={{
            columnCount: 1,
            columnGap: "16px",
          }}
        >
          <style>{`
            @media (min-width: 640px) { section.mediathek-grid { column-count: 2 !important; } }
            @media (min-width: 1024px) { section.mediathek-grid { column-count: 3 !important; } }
          `}</style>
          <div className="mediathek-grid" style={{ columnCount: "inherit", columnGap: "inherit" }}>
            {items.map((item, i) => (
              <SlideIn key={item.src} direction="up" delay={Math.min(0.4 + i * 0.03, 0.6)}>
                <figure
                  className="liquid liquid-hover mb-4"
                  style={{
                    breakInside: "avoid",
                    padding: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "calc(var(--radius) - 4px)",
                      aspectRatio: `${item.width} / ${item.height}`,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {item.caption && (
                    <figcaption
                      style={{
                        padding: "10px 10px 8px",
                        fontSize: "0.82rem",
                        color: "var(--muted)",
                      }}
                    >
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              </SlideIn>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
