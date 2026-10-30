import { renderToBuffer } from "@react-pdf/renderer";
import { getVehicle } from "@/lib/vehicles";
import { VehicleExposePDF } from "@/components/VehicleExposePDF";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugifyName(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const v = await getVehicle(slug);
    if (!v) {
      return new Response("Fahrzeug nicht gefunden", { status: 404 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://neue-welt-automobile.de";

    const buffer = await renderToBuffer(
      <VehicleExposePDF vehicle={v} siteOrigin={origin} />
    );

    const filenameBase = `expose-${slugifyName(v.brand)}-${slugifyName(v.model)}-${v.mobileAdId ?? slug}`;

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filenameBase}.pdf"`,
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[expose] PDF Rendering fehlgeschlagen:", err);
    return new Response(
      JSON.stringify({ error: "pdf_render_failed", message, stack }, null, 2),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
