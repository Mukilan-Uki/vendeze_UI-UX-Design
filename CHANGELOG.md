# Vendeze — v2 front-end update

## Shared expanding navbar version 20 - 20 November 2026

- Replaced separate homepage and application navigation with one shared component on all customer, sign-in, and staff screens.
- Added hover panels that expand the navbar in width and height, with detailed links on the left and an image, title, and description on the right.
- Added responsive phone menus, touch and keyboard controls, Escape focus restoration, outside-click dismissal, role-aware workspace links, and route cleanup. Retained burgundy styling and the scroll animation.
- Updated application caching to version 20 and refreshed the desktop/phone gallery. Site-wide validation passed 267 checks and 42 accessibility scans; 141 expanded-navbar checks and nine accessibility scans also passed. Results are in `design-review/whole-site/navbar-verification.json`.

## Complete site design version 19 - 20 November 2026

- Extended the Partiful-inspired burgundy design to every customer, account, and staff screen, with shared page banners, typography, forms, cards, summaries, navigation, and footers.
- Added colorful service and dashboard cards and a new sign-in composition; preserved the event, booking, vendor, and staff flows.
- Applied the scroll navbar behavior across inner pages, kept open notifications visible, and positioned notification panels within phone and desktop viewports.
- Updated app caching to version 19. Site-wide checks passed 267 assertions and 42 accessibility scans; the homepage/navigation regression review passed 93 checks and three scans.
- Added the desktop/phone gallery at `design-review/whole-site/` and refreshed the review hub and handoff.

## Homepage version 18 ? 20 November 2026

- Added Partiful-style navbar motion: slide away on downward scrolling and return on upward scrolling with 280ms easing.
- Keep the navbar visible near the top, while its menu is open, during keyboard focus, and when reduced motion is enabled. Clean up scroll listeners on route changes.
- Updated app caching to version 18.

## Homepage version 18 ? 20 November 2026

- Added the Partiful-style floating navbar slide: hides while scrolling down and reveals while scrolling up, with a 280 ms transition and small-movement tolerance.
- Kept navigation visible at the top, during keyboard use and open menus, and for reduced-motion users. Scroll listeners are removed on route changes.
- Updated the app cache to version 18; 93 browser checks and three accessibility scans passed.

## Homepage version 17 ? 20 November 2026

- Made Vendeze burgundy (`#8E0413`) the primary homepage color across the hero, navigation, headings, buttons, and closing section, with blush surfaces and deep burgundy for the planning section.
- Retained the Partiful-inspired layout and colorful occasion accents; updated app caching to version 17.

## Homepage version 16 · 20 November 2026

- Rebuilt the customer homepage around the Partiful reference: a black hero, floating navigation, oversized headings, colorful occasion posters, a dark planning section, and lime/lilac accents.
- Connected occasion posters to the existing event form, added service filtering to the homepage vendor collection, and retained search, saved vendors, account access, and event plans.
- Added responsive phone layouts, keyboard navigation, reduced-motion support, local celebration imagery, and version 16 app caching.
- See [the homepage review](HOMEPAGE_REVIEW.md) for the local preview, screenshots, and browser verification.

## New brand
- New party-popper logo throughout: header (mark + wordmark), sign-in screen, welcome popup, booking confirmation.
- Transparent white and dark logo files in `vendeze-connected/icons/` (`logo-full-*`, `logo-mark-*`, `logo-word-*`).
- New favicon, Apple touch icon and PWA icons, with proper "maskable" versions so Android doesn't crop the logo.
- Header and sign-in screen now near-black to match the logo; plum stays as the action colour.

## Bugs fixed
- **Catering was priced wrong:** per-head prices were added to the cart as if they were the whole bill (Rs 1,200 instead of Rs 1,200 × guests). The event now has a guest count, and totals, discounts, checkout and bookings all use it.
- **Security:** chat messages, event names, ad text, notifications and admin input were inserted as raw HTML (anyone could inject script). Everything user-typed is now escaped.
- Notification bell button had no icon.
- Search bar and Filter button were only decoration and did nothing.
- The browser Back button left the app, and refreshing the page lost the event, the hold list and bookings.
- Service worker cached API responses and app files forever, so users kept seeing stale data and old versions after a deploy.
- Event date could be set in the past; there was no validation on the guest count; checkout was possible with no event.
- "My bookings" showed every customer's bookings to a guest.
- Desktop: the sticky "Hold this vendor" bar shrank to a small box.
- Cart button text was dark-on-purple (unreadable), and so was the avatar.
- Developer "Ad banner" edit changed a value nothing used.
- Admin "Suspend" button did nothing.
- A customer could open `#/admin` by typing the URL.

## Upgrades
- **Search & filters:** live search across vendors, areas and services; filter by category, area, budget; sort by rating, most booked or price; "only free on my date".
- **Event plan card** on Home: countdown, guest count, progress bar, and one-tap chips showing which of the 6 services are sorted.
- **Saved vendors** page (hearts now go somewhere).
- **Toasts** with Undo (remove from hold list) and quick links (View hold list / View saved).
- Holding a vendor no longer throws you to the cart; you stay on the page. One vendor per service type (holding a second photographer swaps it).
- Vendor page: share button, save button, per-head estimate for your guest count, "similar vendors", vendor typing indicator.
- Hold list: "add one more service to save 5% / 10%" nudge, + Hold another vendor.
- Checkout: contact name + Sri Lankan mobile validation, booking reference number.
- Confirmation: **Add to calendar** (.ics download), link to My bookings.
- My bookings grouped by booking with paid / due totals and days-to-go.
- Every screen has its own URL (`#/vendor/7`, `#/search`, …): Back button, refresh and shared links all work, and a shared link opened while signed out opens after sign-in.
- Everything is saved in the browser (session, event, hold list, saved vendors, bookings, vendor edits); "Reset demo data" in Developer tools.
- Profile page menu for customers; guest prompt to sign in.
- Sign-in: Enter key submits, show/hide password, email check, loading state, friendly "server offline" message, 4s timeout on the backend.
- Accessibility: keyboard-usable vendor cards, Escape closes popups, focus moves to each new page heading, ARIA labels on icon buttons, skip link, visible focus rings, larger tap targets, no iOS zoom on inputs, reduced-motion support.

## Not changed
- Backend (`backend/`) and database are untouched. The front end sends `guests` with a new event; Spring ignores the unknown field until you add it to the `Event` entity.

## v2.1 — sign-up
- Removed the test notes from the sign-in screen (demo-password hint, Google/Apple disclaimer, admin/developer note) and the "Featured vendor slot" placeholder ad.
- Sign-up rebuilt: "Plan an event" / "Offer my services" choice, mobile number, live password checklist with strength bar, terms checkbox, clear error for every field, duplicate-email check, Enter submits.
- Sign-up and sign-in work even when the server is down: the account is stored on the device (password hashed with SHA-256) and the person is signed straight in. Server calls time out after 3.5 s instead of hanging.
- New vendors who sign up get a listing straight away, marked "New on Vendeze" instead of a fake rating.
- Fixed: light strip under the sign-in screen; "Already have an account? / Create an account" links between the two tabs.

## v2.2 — vendor job requests
- A customer's checkout now sends each vendor a **job request** instead of auto-confirming. Vendors see a "New job requests" section at the top of their dashboard: event, customer name and mobile, date, time, guests, venue, package, amount and what's been paid, with a 24-hour reply timer.
- **Accept job** confirms it and notifies the customer. **Decline** needs a second tap, and tells the customer a backup vendor will be offered.
- **Live alerts:** a new request rings the bell, shows a "New job request · View" toast and plays a short chime. Tapping the notification jumps straight to the request.
- Customer's My bookings shows each vendor as Awaiting vendor / Accepted / Declined.
- Fixed: two open tabs could refresh each other endlessly; saves now only happen when something actually changed.
- Backend note: the live alert currently works between tabs on one device. In production, send it from the server (WebSocket or push) at the marked spot in script.js ("LIVE ALERTS").

## v2.3 — phone notifications
- New job requests also appear in the phone's **notification bar** (when the app isn't open on screen), with the Vendeze icon. Tapping it opens the app directly on that job: `#/dashboard?job=<id>`.
- Vendor dashboard shows a "Get new jobs on your phone — Turn on" card until alerts are allowed.
- service-worker.js: handles `push` (server-sent Web Push, payload `{ title, body, url, tag }`) and `notificationclick` (focuses the open app or opens it on the right screen). Cache bumped to v4.
- To send alerts to a vendor's phone when the app is fully closed, the backend needs Web Push (VAPID keys + the browser's push subscription saved per vendor). Phone alerts need the site on HTTPS.

## v2.4 — customer acceptance alerts
- When a vendor accepts or declines, the customer gets a notification-bar alert too. Tapping it opens My bookings at that booking (`#/bookings?b=<id>`), scrolled into view and highlighted, and marks the alert as read.
- Fixed: signing in again added a second "Welcome to Vendeze" notification. It now appears only after sign-up.
