# Vendeze: internship project guide

Reviewed on 16 November 2026. This guide describes the supplied source code; it is not a production specification or a claim that the backend has been tested live.

## 1. What the product does

Vendeze is an event vendor marketplace for Batticaloa, Sri Lanka. A customer plans an event and finds photographers, caterers, venues, makeup artists, sound/music providers, and decorators. Prices are displayed in Sri Lankan rupees.

The main journey is: sign in, create an event, browse vendors, select packages, hold vendors, check out, and view bookings. The newer frontend also lets vendors accept or decline booking requests.

The four implemented account roles are CUSTOMER, VENDOR, ADMIN, and DEVELOPER. Guest browsing is also available. The developer role is an application account with editing tools; it is different from being a programmer on the project.

The prototype proposes these rules:

- An event has a name, type, date, time, location, and guest count.
- The hold list has one vendor per service category; choosing another replaces the first locally.
- A vendor should be exclusive to one customer for a given date while held or booked.
- Holds are described as lasting 24 hours.
- Catering can be priced per guest.
- The frontend discounts two categories by 5%, and three or more by 10%.
- Checkout offers a 25% advance or full payment.
- The newer frontend creates pending vendor requests, then lets vendors accept or decline.

These are behaviors and messages in the sample, not yet a consistent server-enforced specification. Confirm them with the supervisor before implementing business rules.

## 2. How this compares to MERN

| Familiar MERN concept | Equivalent in this repository |
| --- | --- |
| React components and JSX | JavaScript render functions returning HTML strings |
| React state / Context | One shared `state` object and rendering functions |
| React Router | Custom hash routing, such as `#/vendor/1` |
| fetch / Axios service | `vendeze-connected/api.js` |
| Node.js + Express | Java 21 + Spring Boot 3.2.5 |
| Express route/controller | A Java controller with `@GetMapping` or `@PostMapping` |
| Business logic module | `BookingService` |
| Mongoose model | JPA entity representing a SQL table; the concepts overlap but are not identical |
| Mongoose queries | Spring Data JPA repository methods, JPQL, and some SQL |
| MongoDB | MySQL 8, database named `vendeze` |
| package.json dependencies | Maven dependencies in `backend/pom.xml` |
| npm scripts / build tools | Maven commands |
| dotenv / process.env | Environment variables referenced from `application.yml` |
| Express auth middleware | Spring Security filters and authorization rules |

There is no working React frontend in the supplied files. The `frontend/src/` subfolders are empty scaffolding. Python's HTTP server only serves the frontend files; it is not the application's API backend.

React can communicate with Spring Boot over HTTP, just as it communicates with Express. A different stack is not automatically a reason to rewrite the application. Get the team's intended architecture first.

## 3. Repository map

| Location | What to read it for |
| --- | --- |
| `README.md` | Intended setup; some statements are outdated |
| `CHANGELOG.md` | Explains newer frontend changes and why frontend/backend behavior diverges |
| `vendeze-connected/index.html` | HTML shell and script loading order |
| `vendeze-connected/styles.css` | Responsive layout, colors, typography, and component styling |
| `vendeze-connected/script.js` | Demo data, screens, auth flows, routing, pricing, checkout, persistence, and dashboards |
| `vendeze-connected/api.js` | Fetch wrappers and JWT Authorization header |
| `vendeze-connected/manifest.json` | Installable web app metadata and icons |
| `vendeze-connected/service-worker.js` | Asset caching and notification handlers |
| `backend/pom.xml` | Java version, libraries, and build configuration |
| `backend/src/main/resources/application.yml` | Database connection, ports, OAuth settings, JWT, and CORS |
| `backend/src/main/java/com/vendeze/controller/` | REST routes |
| `backend/src/main/java/com/vendeze/service/` | Booking business logic |
| `backend/src/main/java/com/vendeze/model/` | Database entities |
| `backend/src/main/java/com/vendeze/repository/` | Database access |
| `backend/src/main/java/com/vendeze/security/` | JWT authentication and OAuth callback handling |
| `backend/src/main/java/com/vendeze/config/` | Security configuration, BCrypt, and test account creation |
| `database/schema.sql` | Actual supplied MySQL table definitions |
| `database/seed-data.sql` | Demo data for MySQL |
| `frontend-integration/` | Integration notes and another API helper copy; the browser loads the helper in `vendeze-connected/` |
| `vendeze-connected/database/` | Sample JSON and an older conceptual model; not the active backend database |

The older schema document is headed "Thoranam" and mentions Node/MongoDB/PostgreSQL, planners, and other planned features. The implemented backend uses Spring Boot/MySQL. Ask which requirements document is current.

## 4. How a request should travel

```text
Browser screen
  -> api.js sends HTTP/JSON and, when authenticated, a JWT
  -> Spring Security validates access
  -> Controller accepts the request
  -> Service applies business rules where needed
  -> Repository reads/writes MySQL
  -> JSON response returns to the browser
  -> Browser renders the result
```

For holds, follow `addToCart` -> `apiCreateHold` -> `BookingController.hold` -> `BookingService.createHold` -> `CartHoldRepository`.

Not every controller uses a service: some directly call repositories. The diagram describes the booking path rather than an architecture enforced everywhere.

The current sample also updates local browser state. Some API failures only produce console warnings; the local action remains visible. This is why a success message is not proof of a database write.

## 5. The three places data lives

1. Embedded JavaScript arrays: built-in sample users, vendors, categories, and generated detail data.
2. Browser localStorage: accounts created offline, bookings, event, cart, notifications, dashboard edits, and other state. The main storage key is `vendeze-state-v2`.
3. MySQL: persistent server data, available only when the backend and database are running and a particular feature actually calls the API.

localStorage is browser/profile/origin specific. Two tabs using the same origin in the same browser profile can share data; a storage event is used here for demo alerts. Chrome and Edge do not share this store. `localhost:8001` and `127.0.0.1:8001` also use different origins. See [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Connecting MySQL does not automatically migrate offline accounts or bookings. Although a code comment suggests offline accounts move to the backend later, no migration implementation was found.

## 6. Current feature status

"Backend present" below means code exists, not that a live test has passed.

| Feature | What the supplied source does |
| --- | --- |
| Email signup/login | Backend routes exist; frontend also supports separate local accounts when offline |
| Demo account login | Can call passwordless dev-login, with local fallback |
| Google/Apple buttons | Open the demo picker; complete real OAuth integration is unfinished |
| Category/vendor list | Reads API data when hydration succeeds, otherwise uses demo data |
| Vendor packages/portfolio | Backend detail API exists, but the screen uses locally generated/editable data |
| Availability | API exists, but the screen uses a deterministic demo calculation plus local blocked dates |
| Create event | Attempts a backend write when signed in with a token; otherwise remains local |
| Edit event | Local changes; no corresponding backend update route found |
| Add vendor hold | Local update plus a background API attempt when a server event ID exists |
| Remove/replace hold | Changes local cart; no matching server release route found |
| Checkout | Attempts backend checkout, then creates local bookings even after an API failure |
| My Bookings | Reads local bookings; `apiGetMyBookings` exists but is not called by the screen |
| Vendor booking dashboard | Reads local bookings; backend list route exists but is not wired to it |
| Vendor accept/decline | Local mutation and notifications; no corresponding server route found |
| Notifications | Local feed; backend feed/read routes exist but are not wired to the UI |
| Vendor editing/outside income | Local forms; required write routes are missing |
| Admin role changes/suspension/reset | Local behavior; password reset button only changes its label |
| Marketing | Add-ad and broadcast attempt backend writes; other controls remain local |
| Chat | Simulated replies; table/model exist but no message controller found |
| Payment | Records simulated paid/due amounts; no payment gateway integration found |
| Phone notifications | Browser/service-worker handlers exist; no server push subscription/sending implementation found |
| Backups | Local vendor suggestions and messages; no full persisted reassignment workflow found |

## 7. Database concepts and relationships

The important distinction is between an account (`users`) and a business listing (`vendors`). A vendor account links to its business listing. A customer has events. An event has holds and bookings with different vendors.

Conceptually:

```text
User -> Events -> Cart holds -> Bookings
                    |              |
                    +-> Vendor <---+
                          |
                          +-> Category
                          +-> Packages
                          +-> Portfolio items
                          +-> Blocked dates
```

Other tables cover messages, notifications, ads, the popup, and an admin audit log. A table's existence does not prove its workflow is implemented.

Learn these SQL terms:

- Table / row / column: roughly collection / document / field, but SQL schemas define columns and types explicitly.
- Primary key: the row's unique identifier, usually `id` here.
- Foreign key: an enforced link to an existing row in another table.
- JOIN: combines related rows, for example a booking with its vendor and event names.
- UNIQUE constraint: prevents duplicates, such as duplicate emails.
- Transaction: groups related changes so they commit together or roll back together.
- Index: helps queries locate rows; it also matters for locking and performance.
- DECIMAL / BigDecimal: representations used here for money.

The schema currently writes relationships as inline `REFERENCES`. MySQL 8 ignores inline references, so those statements do not enforce the intended foreign keys. Explicit `FOREIGN KEY (...) REFERENCES ...` constraints need to be reviewed. See the [MySQL CREATE TABLE documentation](https://dev.mysql.com/doc/refman/8.0/en/create-table.html).

After importing into a local development database, useful read-only exercises are:

```sql
USE vendeze;
SHOW TABLES;
SELECT id, name, email, role FROM users;
SELECT id, name, category_id, price_from FROM vendors;

SELECT b.id, u.name AS customer, v.name AS vendor,
       e.name AS event_name, e.event_date, b.amount, b.status
FROM bookings b
JOIN users u ON u.id = b.customer_id
JOIN vendors v ON v.id = b.vendor_id
LEFT JOIN events e ON e.id = b.event_id;
```

## 8. Important gaps to discuss

These are source-review findings. Runtime behavior still needs verification; concurrency behavior specifically needs database-backed tests.

### Build and setup

- `OAuth2LoginSuccessHandler` reassigns `name`, then captures it in a lambda. This appears to violate Java's effectively-final rule and should be checked at the first Maven compile.
- OAuth credential placeholders have no defaults, although the README says credentials can remain unset. OAuth is configured unconditionally. Development startup needs a deliberate configuration solution.
- Backend CORS/frontend defaults use port 5173, while the currently running frontend uses 8001. Set the actual origin, including whether it uses `localhost` or `127.0.0.1`.
- Hibernate uses `ddl-auto: validate`; it expects the schema to exist and will not create it for you.
- The README references a missing `vendeze-unified/` directory, and its integration status predates newer frontend changes.

### Data correctness and business rules

- My Bookings does not load server bookings. Cross-browser persistence requires both successful writes and API-backed reads.
- API booking rows do not contain every field used by the local UI, such as event name, package name, shared reference, and vendor response status. Design a response DTO or an explicit mapping; do not blindly assign raw rows to the existing array.
- The frontend prices packages, per-head catering, and bundle discounts. The backend checkout uses only each vendor's `priceFrom`; it does not reproduce those calculations. For example, Rs. 1,200 per head for 200 guests is Rs. 240,000 before discount in the UI, while the current backend uses Rs. 1,200 for that vendor.
- Frontend holds send a null package ID, so selected packages are not carried through properly.
- Local checkout creates pending vendor requests; backend checkout immediately confirms bookings.
- Event edits, cart removal, and replacement are not synchronized to the server. Old server holds can remain and affect later checkout.
- Holds store an expiry timestamp, but the active-hold queries do not exclude expired timestamps and no expiration job was found.
- The lock query targets existing hold rows. Do not assume this proves the empty-slot case is safe; verify simultaneous first holds against MySQL and its actual indexes/isolation level.

### Authorization and account handling

- The hold service loads an event by ID without verifying it belongs to the signed-in customer. Ownership and role checks need attention on mutations.
- The dev-login endpoint intentionally bypasses passwords and defaults to enabled. It must be disabled before public deployment.
- The local password hash is a demo mechanism, not an equivalent to backend BCrypt authentication.
- The admin API returns `User` entities directly. `passwordHash` has a generated getter and no exclusion annotation, so a safe response DTO is needed to avoid exposing password hashes.
- Vendor signup saves the user before validating required business fields. Returning a 400 response does not by itself roll back a transaction; invalid requests can leave an incomplete account.
- Broadcast notifications use one shared read flag; a per-user read-state design will be needed if broadcasts must be read independently.

These are a proposed backlog, not a requirement for an intern to fix everything immediately.

## 9. What to do for the internship

The supervisor's message asks for familiarization with a sample so further development can be discussed. It does not assign a rewrite or a complete production launch.

### First deliverable: understand and report

1. Explore customer, vendor, admin, and developer views using sample data.
2. Record each feature as local demo, API partly connected, or server workflow missing.
3. Trace one action from the screen through the API to its database table.
4. List setup blockers, observed bugs, and questions with reproduction steps.
5. Give a short progress update and agree on one development milestone.

Ask which repository/branch is authoritative, whether this is a reference prototype or the codebase to extend, whether Java/MySQL is the intended stack, where the latest requirements/designs are, and which feature is your responsibility. Also clarify booking acceptance, pricing/discount rules, and whether payment is simulated for the current milestone.

### Proposed first implementation milestone

Subject to the team's task assignment: make one authenticated customer booking persist in MySQL and appear for the same account in another browser after login and refresh.

Work in this order:

1. Get Maven/MySQL ready and build the existing backend.
2. Fix confirmed compile/startup blockers and document local configuration.
3. Test categories and email login directly through HTTP.
4. Agree on price and booking status rules before using checkout as authoritative.
5. Persist an event and hold, verify the rows, and handle server failures visibly.
6. Define the booking response fields and load them into My Bookings.
7. Test Chrome-to-Edge persistence and ensure another customer cannot see the booking.
8. Verify refresh/relogin and failure handling. Test duplicate booking attempts with a database-backed concurrency test before claiming exclusivity works.

Cross-browser retrieval after refresh is one milestone. Instant updates require a separate polling, WebSocket/SSE, or push implementation. Across devices, each device's `localhost` refers to itself; both clients must reach the same API server.

Existing offline data will not automatically appear in MySQL. Use a new controlled test booking after the connected flow is implemented.

## 10. Learning plan for a MERN student

Learn enough to complete each small task, then deepen your knowledge as needed. You do not need to finish a complete Java course before reading this project.

| Order | Learn | Practice using this project |
| --- | --- | --- |
| 1 | Browser DevTools, fetch, HTTP, JSON, storage | Inspect a request, payload, status, response, and localStorage |
| 2 | SQL/MySQL basics, JOINs, keys, constraints | Import local data and run the read-only queries above |
| 3 | Java classes, types, constructors, methods, enums, records, exceptions, List/Optional, lambdas | Explain `Event`, `Booking`, and `BookingController` |
| 4 | Spring Boot routing, dependency injection, validation | Trace a controller constructor and request mapping |
| 5 | JPA/Hibernate entities and repositories | Follow `findByCustomerIdOrderByCreatedAtDesc` to the booking table |
| 6 | JWT, BCrypt, role checks, ownership, and CORS | Explain how a token identifies the customer and how requests are authorized |
| 7 | Transactions, locks, test design, and migrations | Verify booking consistency and make schema changes repeatable |
| 8 | WebSockets/SSE, Web Push, OAuth, payments | Learn when assigned those workflows, after persistence is reliable |

Official learning material:

- [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MySQL tutorial](https://dev.mysql.com/doc/refman/8.0/en/tutorial.html)
- [Java learning portal](https://dev.java/learn/)
- [Spring: Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Spring: Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [Maven installation](https://maven.apache.org/install)

Use tutorials to learn concepts; preserve the project's declared versions until the team agrees to upgrade them.

## 11. Working habits and reporting

- Use the team's repository, task branch, and review process. Make small, focused commits.
- For each task, write the expected behavior before coding and a short verification checklist.
- Use the Network panel and database rows as evidence, not only UI messages.
- Separate observed failures from suspected causes. Report an error's exact text and reproduction steps.
- Keep local configuration and credentials out of commits.
- Report progress as: completed, verified, blocked, and next step. State when a result only applies to demo mode.

Suggested supervisor update:

> I reviewed the sample's customer, vendor, and admin flows. The current implementation uses vanilla JavaScript with a Spring Boot/MySQL backend. Several features still use browser storage, including My Bookings, so they do not yet persist across browsers. I have mapped the integration gaps and am learning the SQL/Spring concepts needed to work on them. Can we confirm whether we are extending this codebase and which feature I should implement first?

## 12. Verification performed for this guide

- Reviewed the frontend scripts, backend controllers/services/entities/repositories/security/configuration, SQL schema, integration notes, and changelog.
- JavaScript syntax checks passed for `vendeze-connected/script.js`, `vendeze-connected/api.js`, `vendeze-connected/service-worker.js`, and `frontend-integration/api.js`.
- No automated test source files were found in the supplied backend tree.
- Java 21 was available. Maven/MySQL were not found on PATH, and no MySQL/MariaDB Windows service was found during the environment check.
- The backend was not compiled or started, the SQL was not imported, and database integration/concurrency was not tested in this review.
- No application source code was changed; this guide is the only added file.
