-- Vendeze — seed data
-- Mirrors the exact vendors/categories/users the front-end prototype
-- already shows, generated programmatically from script.js so there's no
-- transcription drift between the two. Run this AFTER schema.sql.

USE vendeze;

-- Users (demo accounts matching the prototype's login picker)
INSERT INTO users (id, name, email, avatar_initials, role, auth_provider, provider_id, vendor_id, created_at) VALUES
(1, 'Kavya Selvam', 'kavya.selvam@gmail.com', 'KS', 'CUSTOMER', 'GOOGLE', 'seed-u1', NULL, '2026-02-11'),
(2, 'Aravind Kumaran', 'aravind.k@gmail.com', 'AK', 'CUSTOMER', 'GOOGLE', 'seed-u2', NULL, '2026-05-03'),
(3, 'Nila Rajendran', 'nila.raj@gmail.com', 'NR', 'CUSTOMER', 'GOOGLE', 'seed-u3', NULL, '2026-06-22'),
(4, 'Dinesh Kallady', 'dinesh@kalladylens.lk', 'DK', 'VENDOR', 'GOOGLE', 'seed-u4', 1, '2025-11-04'),
(5, 'Selvi Arayampathy', 'selvi@thoranamworks.lk', 'SA', 'VENDOR', 'GOOGLE', 'seed-u5', 4, '2025-09-18'),
(6, 'Platform Admin', 'admin@vendeze.lk', 'PA', 'ADMIN', 'GOOGLE', 'seed-u6', NULL, '2025-06-01'),
(7, 'Vendeze Dev Team', 'dev@vendeze.lk', 'TD', 'DEVELOPER', 'GOOGLE', 'seed-u7', NULL, '2025-06-01');

-- Vendors
INSERT INTO vendors (id, owner_user_id, name, category_id, area, rating, reviews_count, price_from, price_unit, blurb, status, success_rate) VALUES
(1, NULL, 'Kallady Lens Co.', 'photo', 'Kallady', 4.8, 62, 35000.00, NULL, 'Candid + traditional coverage, same-week edited previews.', 'ACTIVE', 96.0),
(2, NULL, 'Puliyanthivu Frames', 'photo', 'Puliyanthivu', 4.6, 41, 28000.00, NULL, 'Two-photographer teams for full-day kovil weddings.', 'ACTIVE', 96.0),
(3, NULL, 'Manmunai Studio 7', 'photo', 'Manmunai', 4.4, 19, 22000.00, NULL, 'Budget-friendly packages with drone add-on.', 'ACTIVE', 96.0),
(4, NULL, 'Arayampathy Thoranam Works', 'decor', 'Arayampathy', 4.9, 88, 45000.00, NULL, 'Entrance festoons, mandap, and stage design specialists.', 'ACTIVE', 96.0),
(5, NULL, 'Kattankudy Floral House', 'decor', 'Kattankudy', 4.7, 54, 30000.00, NULL, 'Fresh-flower stage backdrops, jasmine garland work.', 'ACTIVE', 96.0),
(6, NULL, 'Lagoon Light & Decor', 'decor', 'Kallady', 4.3, 27, 26000.00, NULL, 'Fairy-light canopies and modern minimal setups.', 'ACTIVE', 96.0),
(7, NULL, 'Amma''s Kitchen Catering', 'catering', 'Kattankudy', 4.9, 103, 1200.00, 'head', 'Traditional Batticaloa wedding menu, live biryani counter.', 'ACTIVE', 96.0),
(8, NULL, 'Manmunai Banquet Caterers', 'catering', 'Manmunai', 4.5, 46, 950.00, 'head', 'Buffet and plated service for 100-800 guests.', 'ACTIVE', 96.0),
(9, NULL, 'East Coast Sweets & Catering', 'catering', 'Puliyanthivu', 4.2, 22, 800.00, 'head', 'Known for sweet counters and Eid/kovil festival catering.', 'ACTIVE', 96.0),
(10, NULL, 'Nadaswaram Brothers', 'sound', 'Arayampathy', 4.8, 37, 18000.00, NULL, 'Traditional nadaswaram + thavil for temple processions.', 'ACTIVE', 96.0),
(11, NULL, 'Batti Beats DJ', 'sound', 'Kallady', 4.4, 58, 25000.00, NULL, 'Full PA, dance floor lighting, MC on request.', 'ACTIVE', 96.0),
(12, NULL, 'Kalyani Bridal Studio', 'makeup', 'Puliyanthivu', 4.9, 71, 15000.00, NULL, 'Bridal makeup, saree draping, trial session included.', 'ACTIVE', 96.0),
(13, NULL, 'Manmunai Mehendi Art', 'makeup', 'Manmunai', 4.6, 33, 6000.00, NULL, 'Intricate bridal mehendi, guest hand-painting stalls.', 'ACTIVE', 96.0),
(14, NULL, 'Kallady Lagoon Convention Hall', 'venue', 'Kallady', 4.7, 96, 80000.00, NULL, 'Air-conditioned hall for up to 500 guests, lagoon-view terrace for photos.', 'ACTIVE', 96.0),
(15, NULL, 'Puliyanthivu Grand Hall', 'venue', 'Puliyanthivu', 4.5, 64, 65000.00, NULL, 'Central town hall with in-house stage and parking for 100 vehicles.', 'ACTIVE', 96.0),
(16, NULL, 'Manmunai Garden Venue', 'venue', 'Manmunai', 4.3, 29, 50000.00, NULL, 'Open-air lawn venue, ideal for evening receptions with fairy-light setup.', 'ACTIVE', 96.0);

-- Packages
INSERT INTO packages (id, vendor_id, name, price, inclusions, supports_later_payment) VALUES
(1, 1, 'Half Day Coverage', 24500.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(2, 1, 'Full Day Coverage', 35000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(3, 1, 'Full Day + Drone + Album', 49000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(4, 2, 'Half Day Coverage', 19600.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(5, 2, 'Full Day Coverage', 28000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(6, 2, 'Full Day + Drone + Album', 39200.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(7, 3, 'Half Day Coverage', 15400.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(8, 3, 'Full Day Coverage', 22000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(9, 3, 'Full Day + Drone + Album', 30800.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', TRUE),
(10, 4, 'Standard Stage Setup', 36000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(11, 4, 'Premium Stage + Entrance', 54000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(12, 5, 'Standard Stage Setup', 24000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(13, 5, 'Premium Stage + Entrance', 36000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(14, 6, 'Standard Stage Setup', 20800.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(15, 6, 'Premium Stage + Entrance', 31200.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(16, 7, 'Standard Menu', 1200.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(17, 7, 'Premium Menu + Live Counter', 1600.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(18, 8, 'Standard Menu', 1000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(19, 8, 'Premium Menu + Live Counter', 1300.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(20, 9, 'Standard Menu', 800.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(21, 9, 'Premium Menu + Live Counter', 1100.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(22, 10, 'PA + DJ, 4 hours', 18000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(23, 10, 'Full Sound + Lighting, Full Day', 27000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(24, 11, 'PA + DJ, 4 hours', 25000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(25, 11, 'Full Sound + Lighting, Full Day', 37500.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(26, 12, 'Bridal Makeup Only', 15000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(27, 12, 'Bridal + Family Package', 24000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(28, 13, 'Bridal Makeup Only', 6000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(29, 13, 'Bridal + Family Package', 9600.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(30, 14, 'Hall Only', 80000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(31, 14, 'Hall + Catering Space + Parking', 100000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(32, 15, 'Hall Only', 65000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(33, 15, 'Hall + Catering Space + Parking', 81200.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(34, 16, 'Hall Only', 50000.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE),
(35, 16, 'Hall + Catering Space + Parking', 62500.00, 'Edited digital gallery,2 photographers,Online preview within 7 days', FALSE);

-- Portfolio items
INSERT INTO portfolio_items (id, vendor_id, title) VALUES
(1, 1, 'Kallady Beach Wedding'),
(2, 1, 'Puliyanthivu Engagement Shoot'),
(3, 2, 'Kallady Beach Wedding'),
(4, 2, 'Puliyanthivu Engagement Shoot'),
(5, 3, 'Kallady Beach Wedding'),
(6, 3, 'Puliyanthivu Engagement Shoot'),
(7, 4, 'Lagoon-view Reception Stage'),
(8, 4, 'Traditional Entrance Thoranam'),
(9, 5, 'Lagoon-view Reception Stage'),
(10, 5, 'Traditional Entrance Thoranam'),
(11, 6, 'Lagoon-view Reception Stage'),
(12, 6, 'Traditional Entrance Thoranam'),
(13, 7, '300-guest Wedding Buffet'),
(14, 7, 'Kovil Festival Sweet Counter'),
(15, 8, '300-guest Wedding Buffet'),
(16, 8, 'Kovil Festival Sweet Counter'),
(17, 9, '300-guest Wedding Buffet'),
(18, 9, 'Kovil Festival Sweet Counter'),
(19, 10, 'Temple Procession Set'),
(20, 10, 'Reception Night DJ Set'),
(21, 11, 'Temple Procession Set'),
(22, 11, 'Reception Night DJ Set'),
(23, 12, 'Bridal Look - Kalyani Wedding'),
(24, 12, 'Engagement Day Makeup'),
(25, 13, 'Bridal Look - Kalyani Wedding'),
(26, 13, 'Engagement Day Makeup'),
(27, 14, 'Evening Reception Setup'),
(28, 14, 'Daytime Wedding Layout'),
(29, 15, 'Evening Reception Setup'),
(30, 15, 'Daytime Wedding Layout'),
(31, 16, 'Evening Reception Setup'),
(32, 16, 'Daytime Wedding Layout');
