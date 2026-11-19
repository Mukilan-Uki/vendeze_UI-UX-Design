-- Vendeze — MySQL 8 schema
-- Mirrors the roles and entities already used in the front-end prototype
-- (see the original /database/schema.md), now as real tables.

CREATE DATABASE IF NOT EXISTS vendeze CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vendeze;

-- ---------------------------------------------------------------------
-- USERS — one table for every role. role is an enum so the application
-- (Spring Security) can authorize by it directly.
-- ---------------------------------------------------------------------
CREATE TABLE users (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150)  NOT NULL,
  email         VARCHAR(190)  NOT NULL UNIQUE,
  avatar_initials VARCHAR(4),
  role          ENUM('CUSTOMER','VENDOR','ADMIN','DEVELOPER') NOT NULL DEFAULT 'CUSTOMER',
  auth_provider ENUM('GOOGLE','APPLE','EMAIL') NOT NULL,
  provider_id   VARCHAR(255)  NOT NULL,          -- Google "sub" / Apple "sub" / the email itself for EMAIL accounts
  password_hash VARCHAR(255)  NULL,               -- BCrypt hash; NULL for Google/Apple (no password at all)
  vendor_id     BIGINT NULL,                      -- set only when role = VENDOR
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_provider (auth_provider, provider_id)
);

-- ---------------------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------------------
CREATE TABLE categories (
  id    VARCHAR(20) PRIMARY KEY,         -- 'photo','catering','venue',...
  name  VARCHAR(80) NOT NULL,
  note  VARCHAR(255),
  icon  VARCHAR(40)
);

-- ---------------------------------------------------------------------
-- VENDORS
-- ---------------------------------------------------------------------
CREATE TABLE vendors (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  owner_user_id   BIGINT NULL REFERENCES users(id),
  name            VARCHAR(150) NOT NULL,
  category_id     VARCHAR(20) NOT NULL REFERENCES categories(id),
  area            VARCHAR(100),
  rating          DECIMAL(2,1) DEFAULT 0,
  reviews_count   INT DEFAULT 0,
  price_from      DECIMAL(10,2) NOT NULL,
  price_unit      VARCHAR(20) NULL,       -- NULL or 'head'
  blurb           VARCHAR(500),
  status          ENUM('ACTIVE','PAUSED','DOWNGRADED') DEFAULT 'ACTIVE',
  success_rate    DECIMAL(5,2) DEFAULT 96.0,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vendor_blocked_dates (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  vendor_id   BIGINT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  UNIQUE KEY uq_vendor_date (vendor_id, blocked_date)
);

CREATE TABLE packages (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  vendor_id     BIGINT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name          VARCHAR(150) NOT NULL,
  price         DECIMAL(10,2) NOT NULL,
  inclusions    TEXT,                      -- comma-separated for simplicity
  supports_later_payment BOOLEAN DEFAULT FALSE
);

CREATE TABLE portfolio_items (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  vendor_id   BIGINT NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  title       VARCHAR(200) NOT NULL,
  added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- EVENTS (a customer's event, created before browsing vendors)
-- ---------------------------------------------------------------------
CREATE TABLE events (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id   BIGINT NOT NULL REFERENCES users(id),
  name          VARCHAR(150) NOT NULL,
  type          VARCHAR(50),
  event_date    DATE NOT NULL,
  event_time    TIME NOT NULL,
  location      VARCHAR(255),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- CART HOLDS — keeps a vendor exclusive to one customer while held
-- ---------------------------------------------------------------------
CREATE TABLE cart_holds (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id   BIGINT NOT NULL REFERENCES users(id),
  vendor_id     BIGINT NOT NULL REFERENCES vendors(id),
  event_id      BIGINT REFERENCES events(id),
  package_id    BIGINT NULL REFERENCES packages(id),
  held_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at    TIMESTAMP NOT NULL,
  status        ENUM('HELD','CONFIRMED','RELEASED','EXPIRED') DEFAULT 'HELD'
  -- NOTE on the exclusivity rule ("only one customer can hold a vendor for
  -- a given date at a time"): this can't be expressed as a MySQL unique
  -- constraint, because the conflict is between two DIFFERENT customers'
  -- events (two different event_id values) over the same vendor+date —
  -- a unique constraint on (vendor_id, event_id, status) would only catch
  -- the same event trying to hold the same vendor twice, which was never
  -- the actual risk. MySQL also has no partial/filtered unique index
  -- (unlike Postgres), so there's no clean constraint-only fix here.
  -- Enforced instead in BookingService with SELECT ... FOR UPDATE inside
  -- a transaction — see that class for the real guarantee.
);

-- ---------------------------------------------------------------------
-- BOOKINGS — created at checkout
-- ---------------------------------------------------------------------
CREATE TABLE bookings (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id     BIGINT NOT NULL REFERENCES users(id),
  vendor_id       BIGINT NOT NULL REFERENCES vendors(id),
  event_id        BIGINT REFERENCES events(id),
  package_id      BIGINT NULL REFERENCES packages(id),
  amount          DECIMAL(10,2) NOT NULL,
  payment_type    ENUM('ADVANCE','FULL') NOT NULL,
  amount_paid     DECIMAL(10,2) NOT NULL,
  amount_due      DECIMAL(10,2) NOT NULL DEFAULT 0,
  status          ENUM('PENDING','CONFIRMED','COMPLETED','CANCELLED') DEFAULT 'CONFIRMED',
  source          ENUM('APP','OUTSIDE') DEFAULT 'APP',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- MESSAGES — per customer/vendor negotiation thread
-- ---------------------------------------------------------------------
CREATE TABLE messages (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_id   BIGINT NOT NULL REFERENCES users(id),
  vendor_id     BIGINT NOT NULL REFERENCES vendors(id),
  sender_role   ENUM('CUSTOMER','VENDOR') NOT NULL,
  body          TEXT NOT NULL,
  offer_amount  DECIMAL(10,2) NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- NOTIFICATIONS — one shared table, filtered by audience + optional
-- vendor_id, same model the prototype used in-memory
-- ---------------------------------------------------------------------
CREATE TABLE notifications (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  audience    ENUM('CUSTOMER','VENDOR','ADMIN','DEVELOPER') NOT NULL,
  vendor_id   BIGINT NULL REFERENCES vendors(id),  -- targets one vendor only, if set
  customer_id BIGINT NULL REFERENCES users(id),     -- targets one customer only, if set
  icon        VARCHAR(40),
  title       VARCHAR(200) NOT NULL,
  body        VARCHAR(500) NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- ADS + POPUP — admin-managed, customer-facing
-- ---------------------------------------------------------------------
CREATE TABLE ads (
  id      BIGINT AUTO_INCREMENT PRIMARY KEY,
  label   VARCHAR(20) DEFAULT 'AD',
  body    VARCHAR(255) NOT NULL,
  active  BOOLEAN DEFAULT TRUE
);

CREATE TABLE site_popup (
  id      INT PRIMARY KEY DEFAULT 1,
  enabled BOOLEAN DEFAULT TRUE,
  title   VARCHAR(150),
  body    VARCHAR(500),
  cta     VARCHAR(50),
  CONSTRAINT single_row CHECK (id = 1)
);

-- ---------------------------------------------------------------------
-- ADMIN AUDIT LOG
-- ---------------------------------------------------------------------
CREATE TABLE admin_actions (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  admin_user_id   BIGINT NOT NULL REFERENCES users(id),
  action          VARCHAR(100) NOT NULL,
  target_user_id  BIGINT NULL REFERENCES users(id),
  target_vendor_id BIGINT NULL REFERENCES vendors(id),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Seed: categories (matches the existing front-end exactly)
-- ---------------------------------------------------------------------
INSERT INTO categories (id, name, note, icon) VALUES
 ('photo',    'Photography',    'Weddings, engagements, kovil functions', 'camera'),
 ('catering', 'Catering',       'Full menus, live counters, sweets', 'plate'),
 ('venue',    'Venue',          'Halls, lawns and convention centres', 'building'),
 ('makeup',   'Makeup Artist',  'Bridal & event makeup, saree draping, mehendi', 'gem'),
 ('sound',    'Sound & Music',  'DJ, live band, nadaswaram, PA systems', 'music'),
 ('decor',    'Decoration',     'Stage, floral, thoranam & entrance work', 'sparkle');

INSERT INTO site_popup (id, enabled, title, body, cta) VALUES
 (1, TRUE, 'Welcome to Vendeze',
  'Bundle 3+ services for your event and save up to 10% — plus every vendor is verified and rated by real customers.',
  'Start planning');
