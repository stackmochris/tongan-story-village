# Visual pass verification — 9 November 2026

- TypeScript check passed; production Next.js static export passed, including all four reading routes and the new visual-notes route.
- Browser checks: desktop preview; responsive widths 390, 320 and 768. Found 320px hero overflow and fixed it; final 320px document width was 305px inside the 320px viewport (scrollbar reserved). No horizontal page overflow.
- Created fictional local profile, selected plum/silver-bun avatar, saved, reloaded, reopened profile: selected avatar and display name persisted. Existing source driver selectable and visually checked at 320px; all nine options shown. No real account or message created.
- Search for blue suitcase returned both paired perspectives; opened story and verified reading/companion actions. Visual notes show cultural status, source links and original five-atlas disclosure. No broken image elements observed on visual-notes before adding the additional local references; new reference assets verified in the build inventory.
- Source preservation: 20 GitHub demo originals + 8 existing local reference PNGs + 6 existing opening PNGs; hashes in assets/inventory.json. Two new generated masters retained. Nine selectable character views; no independent garment layers asserted. The two main WebP assets total 356,260 bytes; reference sheets are optional/lazy loaded. Original masters stay outside public runtime paths.
- Frozen story data, Firebase adapters/rules and Wedding Scroller checkout unchanged. No publication, audience or database changes. Existing live version remains version 1; this pass has not been redeployed.
- Dependency install reported four high-severity advisories in the existing dependency set. Dependency inputs/lockfile were unchanged; resolving those is outside this artwork pass. No live backend was enabled.
- One intermediate export hit a Windows/OneDrive directory-permission error. A subsequent complete production build passed. No application workaround or security relaxation introduced.

Preview screenshot: preview-desktop.png. Preview server for this session: http://localhost:4174/ (local only). Local preview is not a production deployment.
