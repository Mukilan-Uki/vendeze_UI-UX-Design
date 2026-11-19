/* ============================================================
   Vendeze API client
   Every function here is a thin fetch() wrapper matching one
   backend endpoint. Nothing in here touches the UI — it only
   talks to the Spring Boot API and returns parsed JSON (or
   throws, with the error message the backend sent).
============================================================ */

const API_BASE = window.VENDEZE_API_BASE || 'http://localhost:8080';

let authToken = null;
function setAuthToken(token) { authToken = token; }
function getAuthToken() { return authToken; }

async function apiFetch(path, options = {}) {
  if(window.VENDEZE_UI_PREVIEW) throw new TypeError("Failed to fetch: UI preview uses local sample data");
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  let body = null;
  try { body = await res.json(); } catch (_) { /* empty response body is fine */ }

  if (!res.ok) {
    const message = (body && body.error) ? body.error : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body;
}

/* ---------------- auth ---------------- */
// Dev-login only — see README for how this gets replaced by real
// Google/Apple OAuth2 once those credentials are configured.
const apiSignup = ({ name, email, password, role, businessName, category }) =>
  apiFetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role, businessName, category }),
  });

const apiEmailLogin = (email, password) =>
  apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

const apiDevLogin = (userId) =>
  apiFetch('/api/auth/dev-login', { method: 'POST', body: JSON.stringify({ userId }) });

const apiGetDemoAccounts = () => apiFetch('/api/auth/demo-accounts');
const apiGetMe = () => apiFetch('/api/auth/me');

/* ---------------- browsing (public, no auth needed) ---------------- */
const apiGetCategories = () => apiFetch('/api/categories');
const apiGetVendors = (categoryId) =>
  apiFetch(categoryId ? `/api/vendors?categoryId=${encodeURIComponent(categoryId)}` : '/api/vendors');
const apiGetVendorDetail = (id) => apiFetch(`/api/vendors/${id}`);
const apiGetVendorAvailability = (id, date) =>
  apiFetch(`/api/vendors/${id}/availability?date=${encodeURIComponent(date)}`);
const apiGetAds = () => apiFetch('/api/ads');
const apiGetPopup = () => apiFetch('/api/popup');

/* ---------------- events, holds, checkout (require login) ---------------- */
const apiCreateEvent = (event) =>
  apiFetch('/api/events', { method: 'POST', body: JSON.stringify(event) });

const apiCreateHold = (vendorId, eventId, packageId) =>
  apiFetch('/api/cart-holds', {
    method: 'POST',
    body: JSON.stringify({ vendorId, eventId, packageId }),
  });

const apiCheckout = (paymentType, customerName) =>
  apiFetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ paymentType, customerName }),
  });

const apiGetMyBookings = () => apiFetch('/api/bookings/mine');
const apiGetVendorDashboardBookings = () => apiFetch('/api/vendor-dashboard/bookings');

/* ---------------- notifications ---------------- */
const apiGetMyNotifications = () => apiFetch('/api/notifications/mine');
const apiMarkNotificationsRead = () =>
  apiFetch('/api/notifications/mark-all-read', { method: 'POST' });

/* ---------------- admin ---------------- */
const apiAdminGetUsers = () => apiFetch('/api/admin/users');
const apiAdminGetVendors = () => apiFetch('/api/admin/vendors');
const apiAdminChangeRole = (userId, role) =>
  apiFetch(`/api/admin/users/${userId}/role`, { method: 'PATCH', body: JSON.stringify({ role }) });
const apiAdminAddAd = (body) =>
  apiFetch('/api/admin/ads', { method: 'POST', body: JSON.stringify({ body }) });
const apiAdminRemoveAd = (id) => apiFetch(`/api/admin/ads/${id}`, { method: 'DELETE' });
const apiAdminUpdatePopup = (popup) =>
  apiFetch('/api/admin/popup', { method: 'PUT', body: JSON.stringify(popup) });
const apiAdminBroadcast = (audience, title, body) =>
  apiFetch('/api/admin/notifications/broadcast', {
    method: 'POST',
    body: JSON.stringify({ audience, title, body }),
  });
