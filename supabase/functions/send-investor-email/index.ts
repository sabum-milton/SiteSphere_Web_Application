import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InvestorData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  investmentAmount: string;
  message?: string;
}

const INVESTMENT_RANGES: Record<string, string> = {
  "25k-50k": "$25,000 - $50,000",
  "50k-100k": "$50,000 - $100,000",
  "100k-250k": "$100,000 - $250,000",
  "250k+": "$250,000+",
};

const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  message: 2000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600;
const GLOBAL_RATE_LIMIT_MAX = 60;
const GLOBAL_RATE_LIMIT_WINDOW_SECONDS = 3600;

/*
  Only the RIGHTMOST x-forwarded-for entry is appended by the platform proxy;
  everything to its left is whatever the caller sent, so keying the rate limit
  on the leftmost entry lets a caller pick a fresh bucket per request.
*/
function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  const hops = forwarded
    .split(",")
    .map((hop) => hop.trim())
    .filter(Boolean);
  const trusted = hops.length > 0 ? hops[hops.length - 1] : "";
  return trusted || req.headers.get("cf-connecting-ip") || "unknown";
}

async function hashKey(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const raw = body as Partial<InvestorData>;
    const name = cleanField(raw.name, FIELD_LIMITS.name);
    const email = cleanField(raw.email, FIELD_LIMITS.email).toLowerCase();
    const phone = cleanField(raw.phone, FIELD_LIMITS.phone);
    const company = cleanField(raw.company, FIELD_LIMITS.company);
    const message = cleanField(raw.message, FIELD_LIMITS.message);
    const investmentAmount = cleanField(raw.investmentAmount, 20);

    if (!name || !email || !phone || !investmentAmount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!Object.prototype.hasOwnProperty.call(INVESTMENT_RANGES, investmentAmount)) {
      return new Response(
        JSON.stringify({ error: "Please select a valid investment range" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const tooManyRequests = () =>
      new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    const rateKey = await hashKey(`investor-form:${clientIp(req)}`);
    const { data: allowed, error: rateError } = await supabase.rpc("consume_rate_limit", {
      p_key: rateKey,
      p_limit: RATE_LIMIT_MAX,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
    });

    if (rateError) {
      console.error("Rate limit check failed:", rateError.message);
    } else if (allowed === false) {
      return tooManyRequests();
    }

    // Bounds total submissions even if per-caller keying is defeated.
    const { data: globalAllowed, error: globalRateError } = await supabase.rpc("consume_rate_limit", {
      p_key: "investor-form:global",
      p_limit: GLOBAL_RATE_LIMIT_MAX,
      p_window_seconds: GLOBAL_RATE_LIMIT_WINDOW_SECONDS,
    });

    if (globalRateError) {
      console.error("Global rate limit check failed:", globalRateError.message);
    } else if (globalAllowed === false) {
      return tooManyRequests();
    }

    const { error: dbError } = await supabase
      .from("investor_applications")
      .insert({
        name,
        email,
        phone,
        company: company || null,
        investment_amount: investmentAmount,
        message: message || null,
      });

    if (dbError) {
      console.error("Database insert error:", dbError.message);
    }

    const formattedAmount = INVESTMENT_RANGES[investmentAmount];

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      company: company ? escapeHtml(company) : "N/A",
      amount: escapeHtml(formattedAmount),
      message: message ? escapeHtml(message) : "",
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #232f3e; border-bottom: 2px solid #ff9900; padding-bottom: 12px;">
          New Investor Application - SiteSphere
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 160px;">Full Name:</td><td style="padding: 8px 0; color: #232f3e;">${safe.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #232f3e;">${safe.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #232f3e;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0; color: #232f3e;">${safe.company}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Investment Amount:</td><td style="padding: 8px 0; color: #232f3e;">${safe.amount}</td></tr>
        </table>
        ${safe.message ? `
        <h3 style="color: #232f3e; margin-top: 24px;">Additional Information</h3>
        <p style="color: #555; line-height: 1.6; background: #f7f7f7; padding: 12px; border-radius: 4px; white-space: pre-wrap;">${safe.message}</p>
        ` : ""}
        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 24px;" />
        <p style="color: #999; font-size: 12px; margin-top: 16px;">
          This application was submitted from the SiteSphere website investor form.
        </p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "SiteSphere <onboarding@resend.dev>",
        to: "sabummilton14@gmail.com",
        subject: "New Investor Application - SiteSphere",
        html: emailHtml,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email notification" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Application submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
