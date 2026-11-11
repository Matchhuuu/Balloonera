# Balloonera Party Needs Store — Combined Purple Prototype

This release combines the two supplied website archives:

- **Balloonera_Final_Prototype (2).zip** — original purple storefront inspiration, the 13 A/B/C portfolio photographs, and the Bobo / rose-gold 60th birthday `.glb` Blender models.
- **Balloonera_Website_Logo_Homepage_v4(1).zip** — four main occasion categories, the official purple company logo, the four featured birthday photos, design-suggestion rules, customer inquiry screens, and owner-side management.

## How to open

1. Extract the entire ZIP to one folder. Keep `assets/` and `models/` alongside `index.html`.
2. Open `index.html` in a browser to view the basic pages. For the best 3D object loading experience, run a local server, e.g. VS Code Live Server, or deploy the extracted files to a static website host.
3. All links are relative, so upload the contents of this folder together (not just `index.html`).

## What is included

- The official Balloonera logo in the header, login, footer, and homepage hero; purple is used consistently throughout the interface.
- Birthday, Anniversary, Opening and Wedding packages, with **illustrative starting prices only**.
- Seventeen real balloon-arrangement images (13 photographs from the first prototype and four from the newer one), categorized and browsable in a filterable gallery. Store and team pictures appear separately.
- 3D-style balloon editor with orbit, balloon select/move, colors, size, quantity, add/remove, undo, zoom and camera views.
- Directly visible drag-and-drop figure placements, which can be repositioned, removed, and saved with the design. Tap a figure and tap the preview on touchscreens.
- Original Bobo and rose-gold birthday `.glb` models as **optional** rotatable model previews; opening these may require an internet connection to load the `model-viewer` web component.
- Rule-based predefined color and arrangement suggestions. They are labeled as a prototype, not as a connected generative AI system.
- Customer demos for saving designs, submitting inquiries, viewing inquiry status and responding to revisions; an owner/admin demo for reviewing inquiries, editing templates and updating starting prices.

## Important prototype limitations

- **No real customer authentication**: demo logins accept any non-empty credentials. Do not use real passwords.
- Browser `localStorage` stores demo designs, inquiries and settings on that browser only. No shared or secure database is included.
- Prices shown are educational examples, not verified Balloonera selling prices. The owner manually provides the final quotation outside the system; the website does **not** calculate a final quotation or process payment.
- The main arrangement preview is a perspective **canvas simulation**, not a production-ready 3D modeling tool. The original `.glb` models are actual 3D geometry, view-only.
- 3D-style decorative figure markers are draft-layout references; they are not automatically integrated with mesh geometry or a real-world cost estimate.

## Source files

- `index.html`: page shell and navigation
- `script.js`: inherited prototype state, saved designs, inquiry and login screens
- `site-refresh.js`: four-occasion package catalog, idea suggestions and visible figure placement
- `merged-experience.js`: merged photo gallery, purple homepage, advanced balloon-editing controls and optional model viewer
- `style.css`, `site-refresh.css`, `merged-purple.css`: inherited base styles and consistent purple visual system
- `assets/`: all included photo assets, favicon and original logo
- `models/`: two original `.glb` models

