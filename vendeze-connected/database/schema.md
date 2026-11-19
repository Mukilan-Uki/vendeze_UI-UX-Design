# Thoranam — Database Schema (v1)

This is the data model the full platform needs. The prototype (`index.html` /
`styles.css` / `script.js`) currently runs on a small embedded slice of this
data with no real server. To go live, this schema is what a real backend
(Node/Express + MongoDB or PostgreSQL, per the original SRS) would implement,
with `vendors.json` and `users.json` in this folder as seed/sample data for it.

Collections/tables are described below with their fields and relationships.
`FK` = foreign key / reference to another entity's `id`.

---

## users
Core account for anyone who signs in — customers, vendors, planners, admins, developers.

| field | type | notes |
|---|---|---|
| id | string | primary key |
| name | string | |
| email | string | unique; from Google OAuth or manual signup |
| phone | string | optional |
| avatarInitials | string | fallback avatar when no photo |
| role | enum | `customer` \| `vendor` \| `event_planner` \| `admin` \| `developer` |
| authProvider | enum | `google` \| `password` |
| googleId | string | null unless authProvider = google |
| createdAt | datetime | |

A `vendor` or `event_planner` role user has exactly one linked row in
`vendors` or `event_planners` via `ownerUserId`.

## categories
| field | type | notes |
|---|---|---|
| id | string | e.g. `photo`, `catering`, `venue`, `makeup`, `sound`, `decor` |
| name | string | |
| note | string | short description shown in UI |
| icon | string | icon key used by frontend |

## vendors
| field | type | notes |
|---|---|---|
| id | string | primary key |
| ownerUserId | FK → users | the vendor's login account |
| name | string | |
| categoryId | FK → categories | |
| area | string | neighbourhood in Batticaloa |
| rating | number | average of verified reviews only |
| reviewsCount | number | |
| priceFrom | number | starting price (LKR) |
| priceUnit | enum | null \| `head` (per-guest pricing) |
| blurb | string | short summary |
| status | enum | `active` \| `paused` \| `downgraded` (auto after 6 months idle) |
| unavailableDates | string[] | ISO dates the vendor has blocked off themselves |
| successRate | number | % of confirmed bookings completed without issue |
| revenueToDate | number | lifetime platform revenue, for vendor dashboard |
| createdAt | datetime | |

## portfolio_items
| field | type | notes |
|---|---|---|
| id | string | |
| vendorId | FK → vendors | |
| title | string | e.g. "Kallady Beach Wedding, June 2026" |
| mediaNote | string | placeholder for image/video asset reference |
| addedAt | datetime | |

## packages
| field | type | notes |
|---|---|---|
| id | string | |
| vendorId | FK → vendors | |
| name | string | e.g. "Full Day Coverage" |
| price | number | |
| inclusions | string[] | bullet list shown on vendor profile |
| supportsLaterPayment | boolean | e.g. photographers whose deliverables come after the event |

## cart_holds
Represents a customer's temporary hold on a vendor for a specific event —
the mechanism that keeps a vendor exclusive to one customer at a time.

| field | type | notes |
|---|---|---|
| id | string | |
| customerId | FK → users | |
| vendorId | FK → vendors | |
| eventId | FK → events | |
| heldAt | datetime | |
| expiresAt | datetime | heldAt + 24h |
| status | enum | `held` \| `confirmed` \| `released` \| `expired` |

While `status = held` or `confirmed`, no other customer can hold or book the
same vendor for an overlapping date — the backend must enforce this with a
unique constraint / transaction, not just a UI check.

## backup_assignments
The "2 backup vendors per category" safety net.

| field | type | notes |
|---|---|---|
| id | string | |
| cartHoldId | FK → cart_holds | the primary hold this backs up |
| backupVendorId | FK → vendors | suggested based on same category + specialty |
| rank | number | 1 or 2 |
| status | enum | `standby` \| `promoted` \| `declined` |
| notifiedAt | datetime | set when the primary vendor becomes unavailable and this backup gets booked elsewhere — triggers a "choose another vendor" prompt to the original customer |

## messages
Per-vendor negotiation/chat thread, available for every vendor category.

| field | type | notes |
|---|---|---|
| id | string | |
| threadId | string | one thread per (customerId, vendorId) pair |
| customerId | FK → users | |
| vendorId | FK → vendors | |
| senderRole | enum | `customer` \| `vendor` |
| body | string | |
| offerAmount | number | null unless message is a price offer |
| createdAt | datetime | |

## bookings
Created once a cart hold is confirmed at checkout.

| field | type | notes |
|---|---|---|
| id | string | |
| customerId | FK → users | |
| vendorId | FK → vendors | |
| eventId | FK → events | |
| packageId | FK → packages | |
| paymentType | enum | `advance` (20–30%) \| `full` |
| amountAgreed | number | after any negotiation |
| amountPaid | number | |
| amountDue | number | |
| dueOnEventDate | boolean | remaining balance collected day-of |
| payAfterService | boolean | for vendors (e.g. photographers) paid post-delivery |
| status | enum | `pending` \| `confirmed` \| `completed` \| `cancelled` |

## events
A customer's event — collected first, drives all availability checks.

| field | type | notes |
|---|---|---|
| id | string | |
| customerId | FK → users | |
| name | string | |
| type | string | Wedding, Engagement, Birthday, Kovil Festival, Corporate, Other |
| date | date | |
| time | time | |
| location | string | |
| plannerAssistRequested | boolean | true if customer opted for an event planner |
| plannerId | FK → event_planners | null unless assist requested |

## event_planners
| field | type | notes |
|---|---|---|
| id | string | |
| ownerUserId | FK → users | |
| name | string | |
| bio | string | |
| rating | number | |

## admin_actions (audit log)
| field | type | notes |
|---|---|---|
| id | string | |
| adminUserId | FK → users | |
| action | string | e.g. `reset_password`, `approve_vendor`, `resolve_complaint` |
| targetUserId | FK → users | nullable |
| targetVendorId | FK → vendors | nullable |
| createdAt | datetime | |

---

## Role notes

- **Developer** role is a flag on `users.role`, not a separate data model —
  it grants access to a component/CMS-style editing view, never issued to
  customers or vendors.
- **Admin** can reset passwords and edit vendor/customer records; every
  admin action should write an `admin_actions` row for accountability.
- **Event planner** is functionally a special vendor type: customers can pick
  one the same way they pick a photographer, except a planner then helps
  choose the rest of the vendor lineup rather than performing a service
  directly.
