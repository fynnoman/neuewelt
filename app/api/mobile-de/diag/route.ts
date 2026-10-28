import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_SELLER_ID = "3318917";
const BASE = "https://services.mobile.de/search-api/search";

export async function GET() {
  const user = process.env.MOBILE_DE_USERNAME;
  const pass = process.env.MOBILE_DE_PASSWORD;
  const sellerId = process.env.MOBILE_DE_SELLER_ID || DEFAULT_SELLER_ID;
  const vehiclesSource = process.env.VEHICLES_SOURCE ?? "(nicht gesetzt)";

  const envStatus = {
    MOBILE_DE_USERNAME: user ? `gesetzt (${user.length} Zeichen)` : "FEHLT",
    MOBILE_DE_PASSWORD: pass ? `gesetzt (${pass.length} Zeichen)` : "FEHLT",
    MOBILE_DE_SELLER_ID: sellerId,
    VEHICLES_SOURCE: vehiclesSource,
  };

  if (!user || !pass) {
    return NextResponse.json({
      ok: false,
      step: "env",
      message: "MOBILE_DE_USERNAME oder MOBILE_DE_PASSWORD fehlt in den Vercel-Env-Variablen",
      env: envStatus,
    });
  }

  const auth = Buffer.from(`${user}:${pass}`).toString("base64");
  const url = `${BASE}?customerNumber=${encodeURIComponent(sellerId)}&page.size=5&page.number=1`;

  let status = 0;
  let bodyPreview = "";
  let total: number | string | undefined;
  let fetchError: string | undefined;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/xml",
      },
      cache: "no-store",
    });
    status = res.status;
    const text = await res.text();
    bodyPreview = text.slice(0, 600);
    const totalMatch = text.match(/<search:total>(\d+)<\/search:total>/);
    if (totalMatch) total = Number(totalMatch[1]);
  } catch (err) {
    fetchError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    ok: status === 200 && typeof total === "number",
    step: "fetch",
    env: envStatus,
    fetch: {
      url,
      status,
      total,
      fetchError,
      bodyPreview,
    },
  });
}
