import { NextRequest, NextResponse } from "next/server";

const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID!;
const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET!;
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN!;
const ZOHO_API_DOMAIN = process.env.ZOHO_API_DOMAIN!;

// ── Allowed origin — set this to your production domain ──────────────────────
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://studentfinancechecker.co.uk",
  "https://www.studentfinancechecker.co.uk", // ← replace with your actual domain
];

// ── In-memory rate limiter (per IP) ──────────────────────────────────────────
// Allows max 5 submissions per IP per 10 minutes
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.resetAt) {
    // New window
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ── Input sanitizer — strips HTML/script tags ─────────────────────────────────
function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>"'`]/g, "") // strip dangerous chars
    .trim()
    .slice(0, 500); // max 500 chars per field
}

// ── Validators ────────────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isValidMobile(mobile: string): boolean {
  return /^[\d\s+\-()\u00A0]{7,20}$/.test(mobile);
}

function isValidName(name: string): boolean {
  return name.length >= 2 && name.length <= 100;
}

// ── Get Zoho access token ─────────────────────────────────────────────────────
async function getAccessToken(): Promise<string> {
  const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!data.access_token) {
    throw new Error("No access token: " + JSON.stringify(data));
  }

  return data.access_token;
}

// ── CORS helper ───────────────────────────────────────────────────────────────
function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// ── Handle preflight ──────────────────────────────────────────────────────────
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

// ── Main POST handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    // ── 1. CORS check ───────────────────────────────────────────────────────
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403, headers: corsHeaders },
      );
    }

    // ── 2. Rate limiting ────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: corsHeaders },
      );
    }

    // ── 3. Request size limit (50KB max) ────────────────────────────────────
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50_000) {
      return NextResponse.json(
        { error: "Request too large" },
        { status: 413, headers: corsHeaders },
      );
    }

    // ── 4. Parse and validate body ──────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400, headers: corsHeaders },
      );
    }

    const { name, email, mobile, answers } = body as Record<string, unknown>;

    // ── 5. Sanitize inputs ──────────────────────────────────────────────────
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email).toLowerCase();
    const cleanMobile = sanitize(mobile);

    // ── 6. Validate inputs ──────────────────────────────────────────────────
    if (!isValidName(cleanName)) {
      return NextResponse.json(
        { error: "Invalid name" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400, headers: corsHeaders },
      );
    }

    if (!isValidMobile(cleanMobile)) {
      return NextResponse.json(
        { error: "Invalid mobile number" },
        { status: 400, headers: corsHeaders },
      );
    }

    // ── 7. Validate answers object ──────────────────────────────────────────
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid answers" },
        { status: 400, headers: corsHeaders },
      );
    }

    const answerEntries = Object.entries(answers as Record<string, unknown>);

    // Max 10 questions, each sanitized
    if (answerEntries.length > 10) {
      return NextResponse.json(
        { error: "Too many answers" },
        { status: 400, headers: corsHeaders },
      );
    }

    // ── 8. Format description ───────────────────────────────────────────────
    const description = answerEntries
      .map(([q, a]) => `${sanitize(q)}\n→ ${sanitize(String(a))}`)
      .join("\n\n");

    // ── 9. Split name ───────────────────────────────────────────────────────
    const nameParts = cleanName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "-";

    // ── 10. Get Zoho token and upsert lead ──────────────────────────────────
    const accessToken = await getAccessToken();

    const zohoRes = await fetch(`${ZOHO_API_DOMAIN}/crm/v2/Leads/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            First_Name: firstName,
            Last_Name: lastName,
            Email: cleanEmail,
            Mobile: cleanMobile,
            Description: description,
            Lead_Source: "Eligibility checker",
          },
        ],
        duplicate_check_fields: ["Mobile", "Email"],
      }),
    });

    const zohoData = await zohoRes.json();

    if (zohoData?.data?.[0]?.status === "error") {
      return NextResponse.json(
        { error: "Zoho error", details: zohoData.data[0] },
        { status: 400, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Zoho API route error:", message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders },
    );
  }
}
