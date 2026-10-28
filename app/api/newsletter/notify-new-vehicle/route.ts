import { NextResponse } from "next/server";
import {
  resend,
  NEWSLETTER_FROM,
  RESEND_AUDIENCE_ID,
  NEWSLETTER_NOTIFY_TOKEN,
} from "@/lib/email/resend";
import { newVehicleEmail, type VehicleEmailData } from "@/lib/email/templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NotifyBody = {
  token?: string;
  vehicle?: Partial<VehicleEmailData>;
};

function sanitizeVehicle(v: Partial<VehicleEmailData>): VehicleEmailData | null {
  if (!v || typeof v !== "object") return null;
  if (!v.slug || !v.brand || !v.model) return null;
  return {
    slug: String(v.slug),
    brand: String(v.brand),
    model: String(v.model),
    variant: v.variant ? String(v.variant) : undefined,
    year: typeof v.year === "number" ? v.year : v.year ? Number(v.year) : undefined,
    mileage:
      typeof v.mileage === "number" ? v.mileage : v.mileage ? Number(v.mileage) : undefined,
    power:
      typeof v.power === "number" ? v.power : v.power ? Number(v.power) : undefined,
    fuel: v.fuel ? String(v.fuel) : undefined,
    price:
      typeof v.price === "number" ? v.price : v.price ? Number(v.price) : undefined,
    image: v.image ? String(v.image) : undefined,
  };
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "server_not_configured" },
      { status: 500 }
    );
  }
  if (!NEWSLETTER_NOTIFY_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "notify_token_not_set" },
      { status: 500 }
    );
  }
  if (!RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { ok: false, error: "audience_not_set" },
      { status: 500 }
    );
  }

  let body: NotifyBody;
  try {
    body = (await req.json()) as NotifyBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const providedToken =
    body?.token ||
    req.headers.get("x-notify-token") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    "";

  if (providedToken !== NEWSLETTER_NOTIFY_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const vehicle = sanitizeVehicle(body.vehicle ?? {});
  if (!vehicle) {
    return NextResponse.json(
      { ok: false, error: "invalid_vehicle" },
      { status: 400 }
    );
  }

  // Kontakte aus Resend-Audience holen
  let contacts: Array<{ email: string; unsubscribed?: boolean }> = [];
  try {
    const list = await resend.contacts.list({ audienceId: RESEND_AUDIENCE_ID });
    const data = (list as { data?: { data?: Array<{ email: string; unsubscribed?: boolean }> } })
      .data?.data;
    contacts = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("[notify] contacts.list error:", err);
    return NextResponse.json(
      { ok: false, error: "list_failed" },
      { status: 502 }
    );
  }

  const recipients = contacts
    .filter((c) => !c.unsubscribed && typeof c.email === "string")
    .map((c) => c.email);

  if (recipients.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, note: "no_recipients" });
  }

  const { subject, html, text } = newVehicleEmail({ vehicle });

  // Resend-Batch-Send: max 100 per batch
  const BATCH = 100;
  let sent = 0;
  const errors: string[] = [];
  for (let i = 0; i < recipients.length; i += BATCH) {
    const slice = recipients.slice(i, i + BATCH);
    try {
      const payload = slice.map((to) => ({
        from: NEWSLETTER_FROM,
        to: [to],
        subject,
        html,
        text,
      }));
      const result = await resend.batch.send(payload);
      const resultError = (result as { error?: unknown }).error;
      if (resultError) {
        errors.push(String(resultError));
      } else {
        sent += slice.length;
      }
    } catch (err) {
      console.error("[notify] batch.send threw:", err);
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json({
    ok: errors.length === 0,
    sent,
    totalRecipients: recipients.length,
    errors: errors.length ? errors : undefined,
    vehicle: { slug: vehicle.slug, brand: vehicle.brand, model: vehicle.model },
  });
}
