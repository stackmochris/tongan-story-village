# Story Village — first sprint

Independent Next.js / TypeScript static-export prototype. No existing repository was modified. Original SVG avatars borrow only the general cute chibi direction of stackmochris/tongan-wedding-scroller; no source assets were copied.

## Run

Node 20.9+; `npm ci`, `npm run dev`. `npm run check` checks TypeScript; `npm run build` exports the public site into `out/`.

## Demo behavior

The public site is explicitly fictional and local-only. Search, theme filters, query-linked seed reading pages, profile onboarding, avatar editing, generation-and-interest matching, local story creation, optional demo invitations and separately attributed companion stories work without credentials. Profile, stories and invitation state persist in browser localStorage. Report flow is an acknowledged simulation, not an operational inbox. Clear data from Our purpose. No real account is created, no email is sent, and no visitor content is uploaded. Demo seed people are fictional adults. Fonts load from Google Fonts with local fallbacks.

## Firebase handoff

Copy `.env.example` into `.env.local` and supply your own Firebase web config. `lib/firebase.ts` provides email/password Auth and Firestore private profile/draft adapters; these are intentionally not connected to the public demo UI. Enable Email/Password Auth and authorized domains in your own Firebase project. Review and emulator-test `firestore.rules` before deploying with Firebase CLI. No Firebase project or rules have been changed by this sprint.

Rules default deny. Profiles are owner-private, drafts owner-scoped, published stories read-only to clients, invitations server-write only, reports create-only to signed-in reporters and readable by moderator claims. Trusted server work remains for verified adult eligibility, private matching projections, invitation acceptance/decline, moderation queue, publication consent, withdrawal, data export/deletion, abuse limits and appeal handling. Do not enable public submissions before these exist. Self-declaration is a prototype gate, not age verification.

## Cultural and editorial review

All seeds explicitly fictional. No Tongan translations or cultural facts asserted. Eiki / tama si’i role labels and avatar attire remain provisional pending DR L.V.S. review. Initial live collaboration pilot must be 18+. Authors retain their own writing; companion attribution does not transfer ownership or reuse rights. Obtain permission before publishing real stories or identifying third parties.

## Sprint boundary

No game world, public comments, real messaging, payments or commissions. Live Firebase flows and moderation are a follow-up sprint. Deploy `out/` with any static host, or deploy Next.js normally after removing `output: 'export'` if a server backend is added.
