# Story Village — first sprint

Independent Next.js / TypeScript static-export prototype. No existing repository was modified. The initial sprint used original SVG placeholders; the visual pass below replaces them with illustrated raster characters and preserves the source demo art with provenance.

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

## Illustrated visual pass (2026-11-09)

The active site now uses five new fixed-outfit raster chibi illustrations, replacing generic SVG characters and symbolic card art. The avatar selector offers all five plus backdrop colour. Independent garment, hair, flower and recolour layers are missing and are not simulated. Existing profiles are preserved. This remains an accessible story library, not a game world.

See `/visual-notes/` for the collection and reference links, [docs/visual-provenance.md](docs/visual-provenance.md) for review status, and [assets/inventory.json](assets/inventory.json) for original-file hashes. The complete existing Wedding Scroller demo pack is retained under `assets/wedding-scroller/`: 5 character atlases + 5 backgrounds in SVG and PNG (20 files), all labelled vector stand-ins. Five PNG character atlases have an optional reference gallery; they are not the active new avatars. No DR L.V.S. cultural approval is recorded. Generated botanical flowers are an approximation, not verified heilala. Original generated masters remain in `assets/`; optimized WebP assets are served to readers. No external image services are needed at runtime.

Additional local art: the complete eight-PNG `art-sources` reference collection and six illustrated opening assets were located and preserved under `assets/workspace-references/` and `assets/opening-illustrations/`. Four usable existing front-view illustrations are also selectable (nine avatars total). Full cast, costume and prop references are available in the optional visual-notes gallery; concept navigation/UI remains reference-only. No cultural approval is inferred from local filenames.

## Current modular avatar creator

Choose **Create my own look** in profile step 2. Two body frames, short curls / long waves / silver bun / no hair, shirt and tupenu / dress, independent top and lower-garment colours, distinct illustrative taʻovala / kiekie / none, viewer-left / viewer-right / no generic flower, and backdrop colour are available. Optional gender/presentation does not lock clothing. All appearance choices save with the local demo profile, appear on the profile button, and custom local-story bylines use the chosen avatar. Download a transparent 1024 × 1536 PNG from the preview.

Twelve new transparent raster source layers and their optimized derivatives are included. Garment alpha channels supply exact colour masks. Source art: `assets/avatar-layers/`; prompts: `assets/avatar-layer-prompts.json`; registration, dimensions and hashes: `lib/avatar-art.json`. These newly generated drafts replace the previously missing modular layers; cultural approval is still pending. The nine ready-made fixed-outfit characters remain an alternative. Run `node --experimental-strip-types --test tests/avatar.test.mjs` for saved-value validation, all 144 structural combinations and garment-colour isolation checks.
