import MediathekGallery from "@/components/MediathekGallery";
import { getMediathek } from "@/lib/mediathek";

export const metadata = {
  title: "Mediathek · Neue Welt Automobile",
  description:
    "Eindrücke aus Showroom und Fahrzeugbestand von Neue Welt Automobile in Saarlouis.",
};

export const revalidate = 3600;

export default async function MediathekPage() {
  const items = await getMediathek();

  return (
    <main className="pt-24 lg:pt-20 pb-16" style={{ paddingLeft: "clamp(10px, 2vw, 24px)", paddingRight: "clamp(10px, 2vw, 24px)" }}>
      {items.length === 0 ? (
        <div
          className="mx-auto"
          style={{
            maxWidth: 640,
            marginTop: "clamp(60px, 10vw, 120px)",
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          <div className="mono">Mediathek</div>
          <p
            className="display mt-6"
            style={{
              fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Bilder folgen in Kürze.
          </p>
        </div>
      ) : (
        <MediathekGallery items={items} />
      )}
    </main>
  );
}
