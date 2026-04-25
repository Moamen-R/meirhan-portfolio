import { Resend } from "resend";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

type ApiRequest = {
  method?: string;
  body?: ContactRequestBody | string;
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5_000;

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function cleanField(value: unknown, maxLength = MAX_FIELD_LENGTH) {
  if (!isString(value)) return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseBody(body: ApiRequest["body"]): ContactRequestBody {
  if (!body) return {};

  if (typeof body === "string") {
    try {
      return JSON.parse(body) as ContactRequestBody;
    } catch {
      return {};
    }
  }

  return body;
}

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

  const body = parseBody(req.body);

  const name = cleanField(body.name);
  const email = cleanField(body.email);
  const subject = cleanField(body.subject) || "New portfolio contact";
  const message = cleanField(body.message, MAX_MESSAGE_LENGTH);
  const company = cleanField(body.company);

  if (company) {
    return res.status(200).json({
      ok: true,
      message: "Thanks! Your message has been received.",
    });
  }

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: "Please provide your name, email, and message.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      ok: false,
      message: "Please provide a valid email address.",
    });
  }

  const resend = new Resend(resendApiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
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
                <strong style="color:#f2eae7;">Email:</strong> ${safeEmail}
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
