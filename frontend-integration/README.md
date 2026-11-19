# Frontend ↔ Backend integration — what changed and why

There are now **two versions** of the front end in this delivery:

- **`vendeze-unified/`** — the original, fully self-contained prototype. No
  backend needed. This is unchanged and still works exactly as it did when
  you tested it.
- **`vendeze-connected/`** — the same app, with the integration described
  below added on top. This is the one to use once the backend is running.

I kept both deliberately, rather than overwriting the working version, since
I can't run the Spring Boot backend in my own environment to verify this
integration end-to-end — only `vendeze-unified` has been fully tested live.
`vendeze-connected` has been tested against a **simulated** backend (see
"How I tested this without a live server" below), which gives real
confidence but isn't the same as testing it against the actual Java backend.

## The integration pattern: hydrate reads, mirror writes

Rather than rewriting the whole app to be backend-dependent (risky to do
without being able to test it against a live server), I used a safer
pattern:

1. **On login**, the app calls the real API for categories, vendors, ads,
   and the popup config, and swaps that data into the exact same
   `CATEGORIES` / `VENDORS` / `state.ads` / `state.popup` variables every
   screen already reads from. Every render function is unchanged — it has
   no idea whether that data came from the backend or the built-in demo set.
2. **If the backend call fails or the backend isn't running at all**, this
   fails silently and the app carries on with its original built-in demo
   data. The app never breaks because of a missing backend — it just stops
   being "live."
3. **Writes** (creating an event, holding a vendor, checking out) update
   local state immediately, exactly as before — the UI never waits on the
   network to feel responsive — and *also* fire the matching API call in
   the background to persist the same action to the real database. If that
   background call fails, it's logged to the console and nothing else
   changes; the local UI already reflects the action either way.

This means: **with the backend running, you're genuinely using the real
database** — new bookings create real rows, the vendor exclusivity rule is
enforced server-side, notifications are real. **Without the backend
running, you still have a fully working demo**, identical to what you
already tested.

## What's wired up

| Action | Backend call | Fallback if backend is down |
|---|---|---|
| Login (any demo account) | `POST /api/auth/dev-login` | Logs in locally with the built-in demo user |
| Load Home | `GET /api/categories`, `/api/vendors`, `/api/ads`, `/api/popup` | Uses built-in data |
| Create event | `POST /api/events` | Event is kept locally only |
| Hold a vendor | `POST /api/cart-holds` | Hold is kept locally only |
| Checkout | `POST /api/checkout` | Booking + notifications are created locally only |

## What's NOT wired up yet

Said plainly rather than left for you to discover:

- **Notifications aren't fetched from the backend** — the bell still reads
  from the prototype's local `state.notifications`, even when connected.
  The backend's `/api/notifications/mine` endpoint exists and works; the
  front end just doesn't call it yet.
- **My Bookings** screen still reads local state, not `/api/bookings/mine`.
- **Vendor dashboard** (blocked dates, packages, portfolio, outside income)
  is entirely local still — none of those "add" forms call the backend.
- **Admin screens** (role changes, ads management, broadcasts) are local
  only — the backend endpoints exist (`AdminController`, `MarketingController`)
  but nothing in the front end calls them yet.
- **Chat/messages** — no backend endpoint was built for this at all (noted
  in the main README).

I prioritized the core "browse → create event → hold → pay" flow, since
that's the heart of what "the backend handling the process" means. The
remaining screens follow the same pattern (call the matching function in
`api.js`, assign the result into the same local variable the screen already
renders) — happy to continue with any of them specifically.

## How I tested this without a live server

I can't run Maven or MySQL in my own environment, so I used Playwright to
intercept every `http://localhost:8080/**` request and respond with the
exact JSON shape the real backend returns (matching the DTOs in the Java
controllers), then ran the full create-event → hold → checkout flow against
that simulated backend. This confirmed:

- Login correctly fetches and swaps in backend-sourced categories/vendors/ads
- A vendor that existed *only* in the simulated backend response (not in
  the built-in demo data) rendered correctly on Home — proving the data
  swap genuinely works, not just that nothing crashed
- The full write flow fires all three expected API calls in the right
  order with the right data
- With the backend blocked entirely (simulating "not running"), the app
  falls back to fully working offline, identical to the original prototype

What this *doesn't* prove: that the real Spring Boot backend actually
returns data in exactly this shape, since I never ran it. The first time
you connect this to the real running backend, check the browser console —
if a shape mismatch exists, it'll show up there as a clear error rather
than a silent failure, because of the try/catch fallback pattern described
above.

## Running it

1. Start the backend (see the main `README.md`).
2. Serve `vendeze-connected/` the same way you served the original —
   `python3 -m http.server 8000` from inside that folder.
3. Open `http://localhost:8000`. If `window.VENDEZE_API_BASE` needs to
   point somewhere other than `http://localhost:8080`, set it in
   `index.html` before `api.js` loads.
