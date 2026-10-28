import type { DocumentProps } from "@react-pdf/renderer";
import { renderToBuffer } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { getVehicle } from "@/lib/vehicles";
import { VehicleExposePDF } from "@/components/VehicleExposePDF";

export const runtime = "nodejs";
export const revalidate = 900;

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
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) {
    return new Response("Fahrzeug nicht gefunden", { status: 404 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://neue-welt-automobile.de";

  const element = VehicleExposePDF({ vehicle: v, siteOrigin: origin }) as unknown as ReactElement<DocumentProps>;
  const buffer = await renderToBuffer(element);

  const filenameBase = `expose-${slugifyName(v.brand)}-${slugifyName(v.model)}-${v.mobileAdId ?? slug}`;

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      // inline: öffnet den PDF-Viewer im Browser, Download bleibt mit einem Klick erreichbar.
      "Content-Disposition": `inline; filename="${filenameBase}.pdf"`,
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}
