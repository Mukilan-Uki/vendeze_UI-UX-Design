# Vendeze — Backend + Database Setup

This is the real database and API behind the Vendeze prototype. It replaces the
in-memory JavaScript arrays with a MySQL database and a Spring Boot REST API.

**Important — read this first:** I wrote this backend carefully, but I could
not compile or run it in the sandbox I work in (no internet access, no Maven
installed, no way to start MySQL). Everything below is unverified beyond
careful manual review. The first time you run `mvn spring-boot:run`, expect
to fix a small compile error or two — Java is unforgiving about small things
in a way I can't catch without actually building it.

---

## 1. Install prerequisites

- **Java 21** — `java -version` to check. Get it from [Adoptium](https://adoptium.net) if not installed.
- **Maven** — `mvn -version` to check. Get it from [maven.apache.org](https://maven.apache.org/download.cgi).
- **MySQL 8** — [dev.mysql.com/downloads](https://dev.mysql.com/downloads/mysql/), or use a GUI like MySQL Workbench / phpMyAdmin / TablePlus to run the SQL files.

## 2. Create the database

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p vendeze < database/seed-data.sql
```

This creates the `vendeze` database, every table, and seeds it with the exact
same 16 vendors, 6 categories, and 7 demo accounts (3 customers, 2 vendors,
1 admin, 1 developer) the front-end prototype already shows — generated
programmatically from the prototype's own data, so nothing drifts between
the two.

## 3. Configure the backend

The backend reads its config from environment variables (see
`backend/src/main/resources/application.yml` for the full list). At minimum,
set these before starting it:

```bash
export DB_USER=root
export DB_PASSWORD=your_mysql_password
export JWT_SECRET=$(openssl rand -base64 32)   # any random 32+ byte string works
export FRONTEND_URL=http://localhost:8000       # wherever you're serving the front end
export CORS_ORIGINS=http://localhost:8000
```

`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` and `APPLE_CLIENT_ID` /
`APPLE_CLIENT_SECRET` are **not required yet** — see "About real Google/Apple
login" below. Leave them unset for now; the app has a dev-login mode that
works without them.

## 4. Run it

```bash
cd backend
mvn spring-boot:run
```

First run will take a while (Maven downloads every dependency). Once it's
up, the API is at `http://localhost:8080`. Quick check:

```bash
curl http://localhost:8080/api/categories
```

You should get back the 6 categories as JSON.

## 5. Connect the front end

See `frontend-integration/README.md` for exactly what changed in the
prototype's `script.js` and why.

---

## Login options — four ways in

The login screen now has a **Sign in / Sign up** tab, plus the original
demo-account picker, guest mode, and Google/Apple buttons — all four work
without any extra setup:

1. **Email + password** — real accounts, stored in the database with a
   BCrypt-hashed password. Sign up picks **Customer** or **Vendor** (vendor
   signup also asks for a business name + category, and automatically
   creates a starter vendor profile you can edit from the dashboard
   afterward). Two ready-made test accounts exist from the moment the
   backend first starts — see below.
2. **Demo account picker** ("Continue with Google") — the original 7 seeded
   accounts (3 customers, 2 vendors, admin, developer), instant login, no
   password.
3. **"Continue with Apple"** — simulates the same demo picker, since a real
   Apple flow needs a paid developer account (see below). Kept as a
   separate button rather than silently merged into Google's, so the UI
   still shows the four login paths honestly.
4. **Guest** — browse without an account, same as before.

### Ready-made test accounts

The first time the backend starts, `DataSeeder` creates two accounts using
the real password encoder (not a hand-typed hash — see "Why I didn't hand-write
password hashes" below):

| Email | Password | Role |
|---|---|---|
| `customer.test@vendeze.lk` | `Test1234!` | Customer |
| `vendor.test@vendeze.lk` | `Test1234!` | Vendor (owns "Test Vendor Studio") |

Safe to restart the backend repeatedly — it checks for these emails first
and won't create duplicates.

### Why I didn't hand-write password hashes in the seed SQL

I don't have bcrypt available in the environment I work in (no internet
access to install it), and I won't fabricate a hash string I can't verify
is correct — a wrong hash would mean the test account silently can never
log in, which is worse than not having one. Instead, `DataSeeder` runs
inside the real Spring Boot app at startup and calls the actual
`PasswordEncoder` bean to hash the password, so it's guaranteed correct.

## About real Google/Apple login

Right now, `DEV_LOGIN_ENABLED=true` (the default) turns on a `/api/auth/dev-login`
endpoint that logs in as any seeded demo user with no password check at all —
this is what lets the front end's existing "Quick demo login" buttons work
against the real database today, without you needing Google/Apple developer
accounts set up first.

**Before this ever runs anywhere other than your own machine, set
`DEV_LOGIN_ENABLED=false`.** It is an intentional, clearly-labeled backdoor
for local development only.

To wire up real login:

- **Google** — create a project at [console.cloud.google.com](https://console.cloud.google.com),
  configure the OAuth consent screen, create a Web OAuth Client ID, add
  `http://localhost:8080/login/oauth2/code/google` as an authorized redirect
  URI. Set `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` from what it gives you.
- **Apple** — needs a paid Apple Developer Program membership ($99/year).
  Register a Services ID, enable "Sign in with Apple," add
  `http://localhost:8080/login/oauth2/code/apple` as a return URL, and
  generate a signing key. Apple's client "secret" isn't a fixed string —
  it's a JWT you sign yourself that expires every 6 months and has to be
  regenerated; `AppleClientSecretGenerator` isn't built yet (noted as a
  follow-up below).

## What's built vs. what's still a follow-up

**Built and real:**
- Database schema + seed data (MySQL)
- User accounts with roles (customer/vendor/admin/developer), matching what the prototype already models
- Google + Apple OAuth2 login plumbing (Spring Security), plus a dev-login mode so you can test everything before real credentials exist
- Email + password signup and login (BCrypt-hashed), with role selection (customer/vendor) and automatic vendor-profile creation on vendor signup
- Two ready-to-use email test accounts, seeded automatically at first startup
- JWT-based stateless auth for the API
- Categories, vendors, packages, portfolio — real reads from the database
- Event creation
- Cart holds with the real exclusivity rule (one customer at a time per vendor per date), enforced with a database row lock, not just a UI check
- Checkout → real bookings with advance/full payment split
- The notification system — audience-filtered, backed by real rows, triggered automatically when a booking happens
- Admin: list users/vendors, change a user's role
- Marketing: ads, the welcome popup, broadcast notifications — admin-managed, customer-read

**Explicitly not built yet (said plainly, not silently skipped):**
- The Apple client-secret JWT generator/rotation mentioned above
- The chat/negotiation message thread (table exists in the schema, no controller yet)
- Vendor's blocked-dates / portfolio / package *editing* endpoints (reading works; the vendor dashboard's "add" forms aren't wired to write to the database yet)
- "Reset password" for admin — Vendeze has no passwords at all (OAuth-only), so I didn't build a fake version of this; flagged in `AdminController` rather than guessed at
- Rate limiting, request logging, automated tests — worth adding before any real deployment
