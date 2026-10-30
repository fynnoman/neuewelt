import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SlideIn from "@/components/SlideIn";
import { SITE } from "@/lib/site";
import { LEISTUNGEN } from "@/lib/leistungen";

export default function ServicePage() {
  return (
    <main className="pt-28 lg:pt-36">
      <header className="px-5 md:px-10 lg:px-14">
        <div className="mono" style={{ color: "var(--muted)" }}>Leistungen</div>
        <h1
          className="display mt-6"
          style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)", maxWidth: "22ch", letterSpacing: "-0.03em" }}
        >
          Alles aus einer Hand.
        </h1>
      </header>

      <section className="mt-16 lg:mt-20 px-5 md:px-10 lg:px-14">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start"
          style={{ maxWidth: 1400, marginInline: "auto" }}
        >
          <div className="order-2 lg:order-1">
            <p className="lead" style={{ fontSize: "1.15rem", maxWidth: "40ch" }}>
              Fahrzeugankauf, Neuwagenbeschaffung, Aufbereitung, Folierung und
              Zulassung. Alles aus einer Hand. Festpreis wird vor Beginn
              schriftlich bestätigt.
            </p>
          </div>
          <div
            className="order-1 lg:order-2 relative overflow-hidden"
            style={{ aspectRatio: "4 / 3" }}
          >
            <Image
              src="/photos/showroom-amg.jpg"
              alt="Showroom · Neue Welt Automobile"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-24 lg:mt-28 px-5 md:px-10 lg:px-14">
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <Reveal>
            <div className="mono" style={{ color: "var(--muted)" }}>Leistungen</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.03em" }}
            >
              Alles im Überblick.
            </h2>
          </Reveal>

          <SlideIn
            direction="up"
            stagger={0.05}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {LEISTUNGEN.map((l) => (
              <Link
                key={l.id}
                id={l.id}
                href={`/leistungen/${l.id}`}
                className="liquid liquid-hover block group"
                style={{ padding: "clamp(22px, 2.6vw, 30px) clamp(22px, 2.6vw, 32px)" }}
              >
                <h3
                  className="display"
                  style={{ fontSize: "1.15rem", letterSpacing: "-0.02em", color: "var(--ink)" }}
                >
                  {l.title}
                </h3>
                <p
                  className="mt-3"
                  style={{ color: "var(--ink-soft)", fontSize: "0.96rem", lineHeight: 1.5 }}
                >
                  {l.body}
                </p>
                <div
                  className="mt-5 mono inline-flex items-center gap-2"
                  style={{ color: "var(--muted)" }}
                >
                  Mehr erfahren <span style={{ color: "var(--signal)" }}>→</span>
                </div>
              </Link>
            ))}
          </SlideIn>
        </div>
      </section>

      <section className="mt-24 lg:mt-28 px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <Reveal className="h-full">
            <article
              className="radius h-full flex flex-col"
              style={{ background: "var(--paper-sunk)", padding: 36, minHeight: 260 }}
            >
              <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>
                Hol- und Bringdienst
              </div>
              <p
                className="display mt-4"
                style={{ fontSize: "1.6rem", lineHeight: 1.15, color: "var(--on-sunk)", letterSpacing: "-0.02em" }}
              >
                In Saarlouis kostenfrei.
              </p>
              <p className="mt-4" style={{ color: "var(--on-sunk-muted)", fontSize: "0.95rem" }}>
                Abholung und Rückgabe durch unser Team. Umkreis gegen Pauschale.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <article
              className="radius h-full flex flex-col"
              style={{ background: "var(--paper-sunk)", padding: 36, minHeight: 260 }}
            >
              <div className="mono" style={{ color: "var(--on-sunk-muted)" }}>
                Direkt sprechen
              </div>
              <a
                href={SITE.contact.phoneLandlineHref}
                className="display block mt-4"
                style={{ fontSize: "1.6rem", color: "var(--on-sunk)", letterSpacing: "-0.02em" }}
              >
                {SITE.contact.phoneLandline}
              </a>
              <a
                href={SITE.contact.phoneHref}
                className="block mt-1"
                style={{ fontSize: "0.9rem", color: "var(--on-sunk-muted)" }}
              >
                {SITE.contact.phone}
              </a>
              <Link
                href="/kontakt"
                className="mt-auto inline-flex items-center gap-2 pt-6"
                style={{ color: "var(--on-sunk)", fontSize: "0.95rem" }}
              >
                Nachricht senden <span style={{ color: "var(--signal)" }}>→</span>
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
