# Vendeze complete design review - version 20

20 November 2026. Burgundy is the primary color across the customer, account, and staff screens. Every route now uses one shared expanding navbar.

Open [the screen gallery](index.html) or run `python -m http.server 8005 --bind 127.0.0.1` from the repository root and visit `http://127.0.0.1:8005/design-review/whole-site/`.

Hover Explore, Plan an event, Your plans, For businesses, or the account button. The shell expands in width and height, revealing detailed links beside a photo, title, and description. Phones use a tap menu with scrollable content. Keyboard users can open a section with Enter or ArrowDown, move between sections with arrow keys, and close with Escape. Outside clicks and route changes close the panel. Staff workspace links reflect the current role.

- [Expanded desktop navbar](navbar-desktop.png)
- [Phone navigation](navbar-mobile.png)
- [Phone feature card](navbar-mobile-feature.png)
- [141 navbar checks and nine accessibility scans](navbar-verification.json)
- [267 customer/staff journey and layout checks](verification.json)
- [42 site-wide accessibility scans, zero violations](accessibility.json)

Checks use Chrome and isolated preview data. The navbar review covers hover, width/height animation, per-button images and descriptions, keyboard focus, phone taps, responsive layouts from 320 to 1440 pixels, shared customer/login/staff navigation, role links, scroll behavior, reduced motion, and loading navigation and its photos offline. The site-wide review exercises the existing event, booking, account, and staff flows. Live backend integration and real payments are outside this frontend review.

The current gallery includes all 19 screen pairs and the expanded navigation. The separate `celebration-home` package records the previous version 19 homepage checks.
