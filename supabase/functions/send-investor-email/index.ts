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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, investmentAmount, message }: InvestorData = await req.json();

    if (!name || !email || !phone || !investmentAmount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
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

    const investmentRanges: Record<string, string> = {
      "25k-50k": "$25,000 - $50,000",
      "50k-100k": "$50,000 - $100,000",
      "100k-250k": "$100,000 - $250,000",
      "250k+": "$250,000+",
    };

    const formattedAmount = investmentRanges[investmentAmount] || investmentAmount;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #232f3e; border-bottom: 2px solid #ff9900; padding-bottom: 12px;">
          New Investor Application - SiteSphere
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 160px;">Full Name:</td><td style="padding: 8px 0; color: #232f3e;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td><td style="padding: 8px 0; color: #232f3e;">${email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #232f3e;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0; color: #232f3e;">${company || "N/A"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Investment Amount:</td><td style="padding: 8px 0; color: #232f3e;">${formattedAmount}</td></tr>
        </table>
        ${message ? `
        <h3 style="color: #232f3e; margin-top: 24px;">Additional Information</h3>
        <p style="color: #555; line-height: 1.6; background: #f7f7f7; padding: 12px; border-radius: 4px;">${message}</p>
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
