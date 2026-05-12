# Akanksha Nutrition

Personalized diet consultation website for Akanksha, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and React Hook Form.

## 1. Install dependencies

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Open the app in your browser at `http://localhost:3000`.

## 3. Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables listed below in the Vercel project settings.
4. Deploy.

## 4. Environment variables

Set these values in `.env.local` for local development and in Vercel for production:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=919006344687
NEXT_PUBLIC_FORMSPREE_STEP1_ENDPOINT=your_formspree_step_1_endpoint
NEXT_PUBLIC_FORMSPREE_STEP2_ENDPOINT=your_formspree_step_2_endpoint
NEXT_PUBLIC_TALLY_FORM_URL=your_tally_form_url_optional
```

Notes:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` is used to generate WhatsApp links.
- `NEXT_PUBLIC_FORMSPREE_STEP1_ENDPOINT` and `NEXT_PUBLIC_FORMSPREE_STEP2_ENDPOINT` are optional. If empty, the site still works visually and the form shows a helpful note.
- `NEXT_PUBLIC_TALLY_FORM_URL` is optional. If provided, an embedded Tally section appears below the custom form.
- No secret keys are used or exposed in the app.

## 5. How to check submissions

### Formspree

1. Open your Formspree dashboard.
2. Select the endpoint connected to Step 1 or Step 2.
3. Review incoming submissions there.

### Tally

1. Open your Tally dashboard.
2. Find the embedded form.
3. Review collected responses in the Tally response list.

## 6. How to change content later

Update the text, plan names, client count, or WhatsApp number in:

- `app/page.tsx`
- `components/hero.tsx`
- `components/plans-section.tsx`
- `components/trust-cards.tsx`
- `components/experience-section.tsx`
- `lib/consultation.ts`

Recommended edits:

- Change the client count text in `components/trust-cards.tsx` and `components/experience-section.tsx`.
- Change the WhatsApp number in `.env.local` or Vercel env settings.
- Change section copy directly in the relevant component files.
- Update plan labels in `components/plans-section.tsx` and `lib/consultation.ts` if needed.

## Project structure

- `app/` - App Router entrypoints and global styles
- `components/` - Reusable UI and section components
- `lib/` - Form and WhatsApp helpers

## Deployment notes

- The project is Vercel-ready.
- No database or custom backend is required.
- Form submissions go to Formspree when endpoints are configured.
- The consultation flow remains usable even if the optional endpoints are blank.
