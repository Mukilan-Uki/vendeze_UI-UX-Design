# Vendeze — v2 front-end update

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
