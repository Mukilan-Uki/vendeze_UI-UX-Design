# Vendeze — UI/UX review candidate

**Review build 15 · 19 November 2026 · Awaiting tech lead design review**

The customer and staff frontend is ready for a design review. This candidate retains the approved layout, burgundy and blush palette, soft homepage fade, and icon-only Ask AI treatment. It adds a branded loading sequence, a distinctive 404 page, and fixes found during the interaction and accessibility review.

## Open the review

Open `UI_UX_REVIEW.html` through a local HTTP server for the review hub, screenshots, and links to the application.

On Windows, double-click `START_UI_REVIEW.cmd`. Alternatively, from the extracted review folder:

```powershell
python -m http.server 8005 --bind 127.0.0.1
```

Then open [the review hub](http://127.0.0.1:8005/UI_UX_REVIEW.html).

- [Customer review build](http://127.0.0.1:8005/vendeze-connected/?preview=1&v=15#/)
- [404 page](http://127.0.0.1:8005/vendeze-connected/?preview=1&v=15#/review-missing-page)
- [Sign-in and demo accounts](http://127.0.0.1:8005/vendeze-connected/?preview=1&v=15#/login)

No frontend installation or build step is required. Keep `?preview=1` in the application URL to use isolated sample data. On macOS/Linux, the equivalent server command is `python3 -m http.server 8005 --bind 127.0.0.1`.

## Changes to assess

| Area | Review behavior |
| --- | --- |
| Loading | The logo appears first, then the Vendeze wordmark slides out beside it. The sequence now stays visible for about three seconds, with time to read the complete name. The introduction completes when the initial screen is ready, supports Skip intro and reduced motion, and does not replay during in-app navigation. |
| Loading recovery | An application script failure reveals a reload action rather than leaving an endless loading screen. A timeout also releases the introduction. |
| 404 | “A detour isn’t the end of the story.” A winding path and the Vendeze mark form a branded 404 composition. Home and vendor-search actions provide clear recovery. Missing vendors and categories reuse this screen. |
| Keyboard flow | Page headings or the search input receive focus after navigation. Authentication tabs and event/package/payment choices support arrow keys. The welcome dialog keeps keyboard focus inside and restores focus on close. |
| Validation | Invalid fields are associated with their error messages. Correcting a field clears its invalid marker. |
| Cards and navigation | Vendor photos, names, and Explore are real links; saved-vendor controls remain independent. Notification expanded state stays accurate after dismissal. Phone save controls have larger touch areas. |
| Semantics | One primary page heading, consistent section levels, unique region labels, a labelled notification audience selector, and keyboard-accessible scrolling regions. |
| Ask AI | A sparkle icon beside Search. “Ask AI” appears on hover or keyboard focus. It remains UI-only, with no popup, page, or AI request. |

## Verification evidence

**276 checks passed:** 228 customer/staff journey and responsive checks, 36 additional keyboard/recovery checks, and 12 loading-sequence checks.

**42 axe-core scans reported zero violations** for the selected WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, and best-practice rules. Automated scans supplement manual review; they are not an accessibility certification. Image overlays, content quality, and the feel of motion still require human judgment.

The main layout matrix covers 360, 390, 768, 1024, and 1440 pixels. Additional 320-pixel checks cover sign-in, event details, search, and the 404 page. Tests used Chrome on Windows. Safari, Firefox, and physical phone testing remain recommended for release review.

| Evidence | File |
| --- | --- |
| Customer/staff journey and layouts | `design-review/final-ui-review/verification.json` |
| Automated accessibility scans | `design-review/final-ui-review/accessibility.json` |
| Keyboard and recovery checks | `design-review/final-ui-review/interaction-verification.json` |
| Loading behavior | `design-review/final-ui-review/intro-verification.json` |
| Desktop/mobile screen gallery | `design-review/final-ui-review/README.md` |

For build 15, the 12 loading checks were rerun against the longer sequence. The broader journey and accessibility evidence is retained from the preceding review; this revision only adjusts introduction timing and asset versions.

The preview checks recorded no browser runtime errors, failed local asset responses, or backend API requests. JavaScript syntax checks passed for the changed scripts.

## Suggested reviewer walkthrough

1. Open the customer build. Watch the logo/name reveal once, then refresh and try Skip intro. Check the sequence with a reduced-motion preference if available.
2. Browse the homepage and hover/focus the sparkle icon. Check the palette, spacing, imagery, and distinction between primary and secondary actions.
3. Search for photography in Kallady, save a vendor, open Saved, and refresh to check the shortlist.
4. Create a sample event. Try an empty form first, then complete it and explore services, a category, a vendor, and packages.
5. Add a package to the hold list, remove and undo it, then run the sample checkout. Check validation and advance/full payment selection.
6. Open bookings, notifications, and the account page. Check keyboard focus and small-screen readability.
7. Visit a missing route and use both recovery actions. Confirm that the 404 feels distinct while remaining easy to understand.
8. Use the sign-in page’s demo-account picker to inspect vendor, admin, marketing, and developer screens. Staff changes remain local sample activity in preview mode.

## Review boundary

This is a **frontend UI/UX candidate**, not a production-release sign-off. The review does not verify database persistence, real availability, payment processing, delivery of vendor messages/notifications, or authentication against a deployed backend. Ask AI remains intentionally UI-only. Photos and vendor listings are illustrative sample content. Approved real content and legal/support destinations should be confirmed before release.

No email or external message has been sent to the tech lead. The supplied archive is ready to share through the team’s normal review channel.

## Decision

- [ ] UI/UX approved for implementation/integration
- [ ] Approved with minor design changes
- [ ] Revision required before approval

Reviewer:

Date:

Required changes / comments:

## Source notes

The frontend remains plain HTML, CSS, and JavaScript. `site-design.css` contains the consolidated styles and palette. `brand-loader.js` manages only the initial loading introduction. `script.js`, `homepage-design.js`, and `ui-design.js` retain the application screens and interactions. The service-worker cache and asset versions were updated together. No backend, Java, SQL, or runtime dependency was added for this review.
