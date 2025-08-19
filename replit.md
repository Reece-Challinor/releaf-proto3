# RELEAF (Replit)

**Tagline:** Less red tape. More wild places.  
**What this is:** A small, clean prototype that shows how a hunter can pick a state, choose a license, "run automation," see a digital license card, and click through to a **Stripe Checkout (test mode)**. It's built for quick investor demos and user tests. Not production.

## What you can demo in 60 seconds

1. Pick **Texas / Colorado / Arkansas** and a license preset
2. Toggle **Autofill Profile** (mock data)
3. Hit **Run Automation** → watch a 7-step timeline animate
4. A **digital license card** appears (mock ID + QR)
5. Click **Proceed to Checkout** → lands on **Stripe test** page

Use `?demo=1` in the URL to autoplay the whole flow for recordings.

## Recent Changes (Version 1.5 - January 2025)

### Brand System Implementation
- Implemented unified retro-modern outdoor theme with vintage landscape aesthetics
- Created custom brand components: AppShell, HeroWave, StepperDots, ChoiceButton, SSOButtons, FormStack
- Applied consistent forest/outdoor color palette throughout application
- Added proper navigation between all screens with back buttons

### API Integration  
- Added health check endpoint at `/api/health`
- Created state regulations endpoint at `/api/regulations/:state`
- Implemented permits listing endpoint at `/api/permits`
- Added automation status endpoint at `/api/automation/status`

### Navigation Flow
- Home → Login / Permits / Calendar screens
- Permits → Calendar → Checkout (coming soon)
- All pages have proper back navigation to previous screens

### Technical Fixes Applied (January 19, 2025)
- Fixed server TypeScript configuration to match folder structure
- Resolved ChakraProvider incorrect prop passing issue
- Fixed menubar component displayName typo
- Optimized toast hook to prevent unnecessary re-subscriptions
- Added database connection safety checks for missing DATABASE_URL
- Removed unused imports in server/routes.ts
- Created client tsconfig.json for proper path alias resolution

## User Preferences

Preferred communication style: Simple, everyday language.
Code organization: Minimal files, consolidated components where possible.

## Tech at a glance

* **Frontend:** React + TypeScript (Vite). UI = **Chakra UI + Tailwind** (mobile-first)
* **Icons & Motion:** lucide-react icons, Framer Motion micro-interactions
* **Backend:** Node/Express (TypeScript)
* **DB:** Postgres (Replit SQL)
* **Payments:** Stripe Checkout (test mode)
* **State of things:** This is a **demo**—no real state integrations, no real PII

## Quick start (on Replit)

1. **Fork / open** the project in Replit
2. **Add Secrets** (left sidebar → "Secrets"):
   * `DATABASE_URL` = your Replit Postgres URL
   * `STRIPE_SECRET_KEY` = `sk_test_...`
   * `STRIPE_PUBLISHABLE_KEY` = `pk_test_...`
3. **Install** (Replit usually runs `npm i` automatically)
4. **Run dev**: `npm run dev` - This starts **web (Vite)** and **API (Express)** together
5. Open the web URL. You should see **RELEAF** with the demo controls

**Health checks**
* API: visit `/api/health` → should return `{ ok: true, db: true }`
* Click **Run Automation** → the log should fill and a wallet card should appear

## Brand + design system (locked in)

* **Palette**
  * `forest #2F3E2A`, `olive #4E5F34`, `moss #6E7F4F`
  * `sage #B7C3A3`, `sand #EDE9DB`, `bone #F7F5EE`
* **Type**
  * Headings: **Lora** (serif, display)
  * Body/UI: **Inter Variable** (system fallback ok)
* **Components (shared look)**
  * Rounded-2xl **cards** with soft shadows
  * **Pill** chips (olive border)
  * **Choice buttons** (big, tappable, selected ring)
  * **Stepper dots** (3–6 steps)
  * **Inputs** with olive focus ring, roomy spacing
* **Motion**
  * Small fade/slide on card mount; tiny scale on selection
* **Vibe**
  * Retro-modern outdoors (WPA/Orvis feel), clean and quiet
  * Conversational, step-by-step screens (chat-like pacing)

> All of this is set in `src/ui/theme` + Tailwind tokens and reused components. Every new screen should use these pieces.

## API (demo only)

### `GET /api/health`
* Returns `{ ok: true, db: boolean }`

### `POST /api/automation`
* **Body**
  ```json
  { "state": "TX", "license": "TX-HUNT-RES", "autofill": true, "profile": { /* optional */ } }
  ```
* **Response**
  ```json
  { "ok": true, "jobId": "job_xxx", "attemptId": 123, "steps": [ { "k":"open", "label":"Opening..." }, ... ] }
  ```

### `POST /api/automation/:attemptId/complete`
* Marks the attempt as `completed`

### `POST /api/checkout` *(Stripe test mode)*
* **Body**
  ```json
  { "state": "TX", "license": "TX-HUNT-RES" }
  ```
* **Response**
  ```json
  { "ok": true, "id": "cs_test_...", "url": "https://checkout.stripe.com/..." }
  ```
* The client redirects you to the hosted Checkout page

## Database

**Table: `license_attempts`**
```sql
create table if not exists license_attempts (
  id serial primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  state_code text not null,
  license_id text not null,
  status text not null default 'started' -- started|completed|failed
);
```
Created automatically on server boot. Used to record demo attempts.

## Stripe test details

* Use **Stripe test keys** only
* Test card: `4242 4242 4242 4242` (any future date, any CVC, any ZIP)
* Success: you'll hit `/checkout/success` with a `session_id`
* This prototype **does not** fulfill or issue real licenses

## Demo tips

* Add `?demo=1` to autoplay the core flow (great for screen recordings)
* We emit lightweight analytics to `window.dataLayer` for Maze tagging:
  * `state_selected`, `license_selected`, `automation_started`, `automation_completed`, `checkout_click`

## Roadmap (prototype → MVP)

* **Prototype now:** click-through + Stripe test
* **MVP:** agent-of-record posture, proper remittance, human-in-the-loop for brittle steps, state-by-state playbooks on Cloud Run (GCP)
* **Later:** wallet pass, guide/outfitter accounts, notifications, zone maps

## Troubleshooting

* **CORS**: if API calls fail locally, confirm Vite proxy `/api → http://localhost:3001`
* **DB false in `/api/health`**: check `DATABASE_URL` secret
* **Stripe errors**: set both `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
* **Ports**: Vite uses 5173 by default; API 3001. Replit handles routing for the web preview

## Safety + compliance notes

* This is a **demo**. No real licensing is performed here
* Do **not** load real PII. Use mock data only
* Production will run as/with authorized **state agents** and follow pricing and remittance rules

**Questions or edits?** Keep language simple, ship small changes, and stay close to the brand tokens and shared components above.