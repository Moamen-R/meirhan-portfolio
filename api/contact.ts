import { Resend } from "resend";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Define Zod schema for input validation
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200).trim(),
  email: z.string().email("Please provide a valid email address").max(200).trim(),
  subject: z.string().max(200).trim().optional().default("New portfolio contact"),
  message: z.string().min(1, "Message is required").max(5000).trim(),
  company: z.string().max(200).trim().optional(),
});

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseBody(body: unknown) {
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body || {};
}

// Create a new ratelimiter that allows 3 requests per 15 minutes
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(3, "15 m"),
        analytics: false,
      })
    : null;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).json(null);
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed. Please use POST.",
    });
  }

  // Rate Limiting
  if (ratelimit) {
    const ipHeader = req.headers?.["x-forwarded-for"] || req.headers?.["x-real-ip"] || "127.0.0.1";
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader;
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        ok: false,
        message: "Too many requests. Please try again later.",
      });
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Meirhan Lotfy Portfolio <onboarding@resend.dev>";

  if (!resendApiKey || !toEmail) {
    return res.status(500).json({
      ok: false,
      message:
        "Contact form is not configured. Please set RESEND_API_KEY and RESEND_TO_EMAIL.",
    });
  }

  const rawBody = parseBody(req.body);
  const validationResult = ContactSchema.safeParse(rawBody);

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0]?.message || "Invalid input data";
    return res.status(400).json({
      ok: false,
      message: firstError,
    });
  }

  const { name, email, subject, message, company } = validationResult.data;

  // Honeypot check for spam bots
  if (company) {
    return res.status(200).json({
      ok: true,
      message: "Thanks! Your message has been received.",
    });
  }

  const resend = new Resend(resendApiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "New portfolio contact");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${safeSubject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${safeSubject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:32px;background:#3a4642;color:#f2eae7;font-family:Inter,Arial,sans-serif;">
          <div style="max-width:640px;margin:0 auto;border:1px solid rgba(232,179,188,0.25);border-radius:28px;background:#574949;padding:32px;">
            <p style="margin:0 0 12px;color:#e8b3bc;font-size:12px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;">
              New Portfolio Message
            </p>

            <h1 style="margin:0 0 24px;color:#f2eae7;font-family:Georgia,serif;font-size:32px;line-height:1.15;">
              ${safeSubject}
            </h1>

            <div style="margin-bottom:24px;padding:18px;border-radius:20px;background:rgba(242,234,231,0.07);">
              <p style="margin:0 0 8px;color:#edd3d3;">
                <strong style="color:#f2eae7;">Name:</strong> ${safeName}
              </p>
              <p style="margin:0;color:#edd3d3;">
                <strong style="color:#f2eae7;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#e8b3bc;text-decoration:underline;">${safeEmail}</a>
              </p>
            </div>

            <div style="padding:22px;border-radius:22px;background:rgba(219,104,130,0.12);border:1px solid rgba(219,104,130,0.24);">
              <p style="margin:0;color:#f2eae7;font-size:16px;line-height:1.75;">
                ${safeMessage}
              </p>
            </div>

            <p style="margin:24px 0 0;color:#e8b3bc;font-size:13px;line-height:1.6;">
              Sent from Meirhan Lotfy's QA Tester portfolio contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      return res.status(500).json({
        ok: false,
        message: "Message could not be sent. Please try again later.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Thanks! Your message has been sent.",
    });
  } catch {
    return res.status(500).json({
      ok: false,
      message: "Something went wrong while sending your message.",
    });
  }
}
