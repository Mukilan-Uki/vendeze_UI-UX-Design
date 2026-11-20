# Vendeze homepage review

**Current homepage: version 20 · 20 November 2026**

The homepage now follows the [Partiful](https://partiful.com/) reference: a burgundy opening, floating blush navigation, oversized condensed headings, a celebration photo with playful overlays, colorful occasion posters, and alternating light and dark sections. Burgundy (`#8E0413`) is the primary color for the hero, navigation, buttons, headings, and closing section, with deep burgundy for the planning section. Vendeze's name, Batticaloa vendor listings, service categories, and existing application flows are retained.

Version 20 replaces the separate homepage and application navbars with one expanding component on every page. Hover a main button to reveal its detailed links and a photo card with a title and description. Phone users tap the menu and section buttons. See [current navbar verification](design-review/whole-site/navbar-verification.json) and [desktop/phone previews](design-review/whole-site/index.html). The older homepage screenshots and 93-check report below document version 19.

Open the [current homepage preview](http://127.0.0.1:8003/?preview=1#/). The `?preview=1` flag uses isolated browser sample data and sends no backend requests.

- [Desktop opening](design-review/celebration-home/desktop-opening.png)
- [Full desktop homepage](design-review/celebration-home/desktop-home.png)
- [Mobile opening](design-review/celebration-home/mobile-opening.png)
- [Full mobile homepage](design-review/celebration-home/mobile-home.png)
- [Interaction and accessibility verification](design-review/celebration-home/verification.json)

The floating navbar slides out on downward scrolling and returns on upward scrolling, using the reference 280ms easing. It stays visible near the top, while the menu is open, and during keyboard focus. Reduced-motion users keep a stable navbar. The same behavior now applies across the application, with open notification panels also keeping navigation visible.

Occasion posters open the existing event form with the appropriate type selected. Service chips filter the homepage vendors; search carries its service, text, and location into the existing results screen. Save controls, account navigation, the hold list, and existing event plans remain connected. Mobile occasion cards and vendors can be swiped horizontally. The existing icon-only Ask AI control remains a UI-only affordance. The floating navbar now follows the Partiful scroll behavior: it slides out on downward scrolling and returns on upward scrolling with a 280 ms transition. It stays visible near the top, while the menu is open, during navbar keyboard focus, and when reduced motion is enabled.

The new presentation is in `vendeze-connected/homepage-design.js` and `vendeze-connected/homepage-design.css`. The HTML loads both alongside the shared site styles, and the version 20 service worker caches the new stylesheet and celebration photos. The three new photos are stored locally; their sources are recorded in `vendeze-connected/assets/README.md`. Headings use Anton; body text uses DM Sans. No frontend build or dependency installation is needed.

The homepage composition remains in its dedicated stylesheet. The shared Partiful-inspired application system now covers all remaining screens through `app-design.css`; see the [whole-site gallery](design-review/whole-site/index.html). Verification covers the frontend with sample data in Chrome; real backend persistence, payments, and live authentication are outside this design pass.

Validation: 93 browser checks passed, including layouts at 320, 360, 390, 768, 1024, and 1440 pixels, search filters, saved-vendor persistence, occasion selection, event creation, keyboard navigation, reduced-motion behavior, and desktop/mobile navbar hiding, revealing, keyboard focus, menu pinning, and route cleanup. Three axe-core accessibility scans reported zero violations under the selected WCAG rules. The new homepage and its new images also loaded successfully with the browser offline after the service worker cached version 18. JavaScript syntax checks and `git diff --check` passed.

If the preview server needs restarting, run from the repository root:

```powershell
python -m http.server 8003 --bind 127.0.0.1 --directory vendeze-connected
```

## Earlier homepage review

The following records the previous Fresha-based homepage, before the version 16 redesign.

19 November 2026. Homepage presentation only, based on the supplied Fresha screenshot.

Open the running [homepage preview](http://127.0.0.1:8003/?preview=1#/).

The homepage now uses a white background with a pink and lavender glow, a centered bold headline, a rounded three-part search bar, black pill buttons, and horizontal vendor collections. The lower page includes event planning, four guide cards, local marketplace counts, a business section, area browsing, and a light gray footer. Vendeze's branding, event services, and Batticaloa content are retained.

This pass changes the homepage. Search results, vendor details, event forms, sign-in, and staff screens retain their existing presentation. Homepage actions connect to those existing screens.

The screenshot's app-download promotion and global booking claims have been adapted to Vendeze's event planning and available sample vendor data. Photos remain illustrative.

## Review files

- [Desktop homepage](design-review/fresha-home-desktop.png)
- [Desktop opening](design-review/fresha-home-desktop-opening.png)
- [Mobile homepage](design-review/fresha-home-mobile.png)
- [Mobile opening](design-review/fresha-home-mobile-opening.png)
- [Browser verification](design-review/homepage-verification.json)

The new presentation lives in `vendeze-connected/homepage-design.css` and `vendeze-connected/homepage-design.js`. The HTML loads these files, the homepage renderer selects them, and the service worker includes them in the updated app cache. No package installation or build step is required.

If the preview server needs restarting, run this from the project root:

```powershell
python -m http.server 8003 --bind 127.0.0.1 --directory vendeze-connected
```

`?preview=1` uses isolated browser sample data. This review does not exercise real bookings, payments, or backend persistence.
