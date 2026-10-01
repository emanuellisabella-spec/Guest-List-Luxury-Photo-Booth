// Vercel serverless function: POST /api/subscribe
//
// Adds a website sign-up (checklist / timeline download) to the Zoho Campaigns
// email list, tagged with Source and Language, as the Guest List leads guide
// describes. Only people who submit the form (opt-in) are added.
//
// SETUP (once, in Zoho Campaigns + Vercel):
//   1. Zoho Campaigns > Contacts > Manage Fields: add two text fields, "Source" and "Language".
//   2. Zoho Campaigns > Sign-up Forms > create a form on your list that includes
//      Email, Source and Language, then copy its "Embed" HTML code.
//   3. From that HTML, copy into Vercel > Project > Settings > Environment Variables:
//        ZOHO_FORM_ACTION   the <form action="..."> URL
//        ZOHO_FORM_FIELDS   JSON of every hidden <input> as {"name":"value", ...}
//                           (leave out the email, Source and Language inputs)
//        ZOHO_EMAIL_FIELD   name of the email input     (default: CONTACT_EMAIL)
//        ZOHO_SOURCE_FIELD  name of the Source input    (optional)
//        ZOHO_LANGUAGE_FIELD name of the Language input (optional)
//   4. Redeploy. Until these are set the endpoint returns 503 and the form shows an error.
//
// The values are posted server-side, so the form details stay out of the browser.

type Req = { method?: string; body?: unknown };
type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (name: string, value: string) => void };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as Record<string, unknown> | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source = typeof body?.source === 'string' ? body.source.slice(0, 80) : '';
  const language = body?.language === 'es' ? 'Spanish' : 'English';

  // Bots fill the hidden field; pretend it worked.
  if (typeof body?.website === 'string' && body.website) return res.status(200).json({ ok: true });
  if (!EMAIL_RE.test(email) || email.length > 254) return res.status(400).json({ ok: false, error: 'invalid_email' });

  const action = process.env.ZOHO_FORM_ACTION;
  if (!action) return res.status(503).json({ ok: false, error: 'not_configured' });

  const params = new URLSearchParams();
  const hidden = safeParse(process.env.ZOHO_FORM_FIELDS || '{}') as Record<string, unknown> | null;
  for (const [key, value] of Object.entries(hidden || {})) params.set(key, String(value));
  params.set(process.env.ZOHO_EMAIL_FIELD || 'CONTACT_EMAIL', email);
  if (process.env.ZOHO_SOURCE_FIELD) params.set(process.env.ZOHO_SOURCE_FIELD, source);
  if (process.env.ZOHO_LANGUAGE_FIELD) params.set(process.env.ZOHO_LANGUAGE_FIELD, language);

  try {
    const response = await fetch(action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'manual',
    });
    // Zoho answers a form post with 200 or a redirect to its thank-you page.
    const ok = response.ok || (response.status >= 300 && response.status < 400);
    return res.status(ok ? 200 : 502).json({ ok });
  } catch {
    return res.status(502).json({ ok: false });
  }
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
