import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_SELLER_ID = "3318917";
const BASE = "https://services.mobile.de/search-api/search";

type Attempt = {
  label: string;
  url: string;
  status: number;
  bodyPreview: string;
  responseHeaders?: Record<string, string>;
  fetchError?: string;
  total?: number;
};

async function attempt(
  label: string,
  url: string,
  headers: Record<string, string>
): Promise<Attempt> {
  try {
    const res = await fetch(url, { headers, cache: "no-store" });
    const text = await res.text();
    const totalMatch = text.match(/<search:total>(\d+)<\/search:total>/);
    const responseHeaders: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      responseHeaders[k] = v;
    });
    return {
      label,
      url,
      status: res.status,
      bodyPreview: text.slice(0, 600),
      responseHeaders,
      total: totalMatch ? Number(totalMatch[1]) : undefined,
    };
  } catch (err) {
    return {
      label,
      url,
      status: 0,
      bodyPreview: "",
      fetchError: err instanceof Error ? err.message : String(err),
    };
  }
}

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
    return NextResponse.json({ ok: false, step: "env", env: envStatus });
  }

  const auth = Buffer.from(`${user}:${pass}`).toString("base64");

  const urlCustomer = `${BASE}?customerNumber=${encodeURIComponent(sellerId)}&page.size=5&page.number=1`;
  const urlSeller = `${BASE}?seller.id=${encodeURIComponent(sellerId)}&page.size=5&page.number=1`;
  const urlPlain = `${BASE}?page.size=5&page.number=1`;

  const commonHeaders = {
    Authorization: `Basic ${auth}`,
    "User-Agent": "NeueWeltAutomobile-Website/1.0 (+https://neuewelt.vercel.app)",
    Accept: "application/xml, text/xml, */*",
  };

  const attempts: Attempt[] = [];
  attempts.push(await attempt("customerNumber + UA", urlCustomer, commonHeaders));
  if (attempts[0].status !== 200) {
    attempts.push(await attempt("seller.id + UA", urlSeller, commonHeaders));
  }
  if (attempts[attempts.length - 1].status !== 200) {
    attempts.push(await attempt("ohne seller filter + UA", urlPlain, commonHeaders));
  }

  const okAttempt = attempts.find((a) => a.status === 200);

  return NextResponse.json({
    ok: Boolean(okAttempt),
    env: envStatus,
    attempts,
  });
}
