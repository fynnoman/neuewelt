import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LEISTUNGEN, getLeistung } from "@/lib/leistungen";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return LEISTUNGEN.map((l) => ({ slug: l.id }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getLeistung(slug);
  if (!l) return {};
  return {
    title: `${l.title} · ${SITE.name}`,
    description: l.body,
  };
}

export default async function LeistungPage({ params }: Props) {
  const { slug } = await params;
  const l = getLeistung(slug);
  if (!l) return notFound();

  return (
    <main className="pt-28 lg:pt-36 px-5 md:px-10 lg:px-14 pb-24">
      <div className="mx-auto" style={{ maxWidth: 760 }}>
        <Link href="/service" className="small-caps rule-arrow inline-block">
          Zurück zu allen Leistungen
        </Link>

        <div className="mono mt-12" style={{ color: "var(--muted)" }}>
          Leistung
        </div>
        <h1
          className="display mt-5"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", letterSpacing: "-0.03em", maxWidth: "22ch" }}
        >
          {l.title}.
        </h1>

        <p className="lead mt-8" style={{ fontSize: "1.15rem", maxWidth: "48ch" }}>
          {l.body}
        </p>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link href="/kontakt" className="btn">
            Direkt anfragen
            <span>→</span>
          </Link>
          <a
            href={SITE.contact.phoneLandlineHref}
            className="btn-ghost rule-arrow"
          >
            {SITE.contact.phoneLandline}
          </a>
        </div>
      </div>
    </main>
  );
}
