# Vendeze UI/UX handoff

**Review version 20 | 20 November 2026 | Shared expanding navigation**

The Partiful-inspired design now covers the customer, account, and staff screens. Burgundy (`#8E0413`) is the primary color throughout. Open the [interactive screen gallery](http://127.0.0.1:8005/design-review/whole-site/) or [the website](http://127.0.0.1:8005/vendeze-connected/?preview=1#/).

## Design and scope

The shared system combines floating rounded navigation, Anton display headings, DM Sans body text, burgundy banners, colorful service cards, white forms, blush selections, and deep burgundy booking summaries. Customer, account, and staff pages share the navigation, typography, controls, surfaces, and footer.

The work covers all 19 screens: home, event form, services, category, vendor, search, saved vendors, hold list, checkout, confirmation, bookings, profile, sign-in, sign-up, recovery, vendor dashboard, admin, marketing, and developer workspace.

Every route, including sign-in and staff pages, now renders one shared navbar. Explore, Plan an event, Your plans, For businesses, and account controls open detailed panels. The shell expands in width and height with a 340 ms transition. Desktop panels show links on the left and a photograph, title, and short description on the right; phones stack the feature card below scrollable links. Hover, click, touch, arrow keys, and Escape are supported. Menus close on navigation and outside clicks, and Escape restores keyboard focus. Business and account links reflect the signed-in role.

The navbar slides away on downward scrolling and returns on upward scrolling with a 280 ms transition. It stays visible near the top, during keyboard focus, and while a menu or notification panel is open. Reduced-motion users receive stable navigation. Notification placement accounts for the floating navbar on desktop and phones.

Existing event, vendor, booking, account, and staff actions remain connected. Keyboard focus, validation, role guards, and isolated preview storage remain intact. The existing Ask AI icon remains a UI-only control.

## Verification

- **267 customer/staff journey and responsive checks passed**, covering 320, 360, 390, 768, 1024, and 1440 pixels.
- **42 axe-core scans reported zero violations** under the selected WCAG and best-practice rules.
- **141 expanded-navbar checks and nine accessibility scans passed**, including touch navigation and an offline reload; see [the navbar verification report](design-review/whole-site/navbar-verification.json). The earlier version 19 homepage review is retained as historical evidence.
- No browser runtime errors, failed local assets, or backend requests occurred in the isolated preview reviews.
- Changed JavaScript files passed syntax checks, and `git diff --check` passed.

The journey review exercises event creation, package selection, messaging, saving, holding and undo, checkout validation, preview booking, account controls, vendor acceptance, marketing controls, notifications, and staff routing. Testing used Chrome and sample data; real authentication, payment collection, backend persistence, and physical-device browser behavior were not exercised.

## Review artifacts

- [Desktop/phone gallery](design-review/whole-site/index.html)
- [Expanded navbar, desktop](design-review/whole-site/navbar-desktop.png)
- [Expanded navbar, phone](design-review/whole-site/navbar-mobile.png)
- [Navbar verification and accessibility](design-review/whole-site/navbar-verification.json)
- [Site-wide verification](design-review/whole-site/verification.json)
- [Site-wide accessibility report](design-review/whole-site/accessibility.json)
- [Homepage and navbar verification](design-review/celebration-home/verification.json)
- [Design review notes](design-review/whole-site/README.md)

## Implementation

`vendeze-connected/app-design.css` contains the application design system. `homepage-design.css` keeps the homepage composition. `ui-design.js` applies shared page banners and footers while preserving screen controls. `script.js` retains the application flows and renders the updated sign-in screen. `navigation.js` and `navigation.css` own the shared navbar and its content. The version 20 service worker includes both files and the navigation photographs.

No framework, runtime dependency, backend, or schema change was introduced. Images remain illustrative, with sources in `vendeze-connected/assets/README.md`.

## Running

From the repository root:

```powershell
python -m http.server 8005 --bind 127.0.0.1
```

Open `http://127.0.0.1:8005/UI_UX_REVIEW.html`. Keep `?preview=1` in application review links to use isolated browser sample data. Older review packages and screenshots remain historical artifacts.
