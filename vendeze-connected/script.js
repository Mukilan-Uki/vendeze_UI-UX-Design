/* ============================================================
   ICONS — minimal inline SVG set (stroke-based, lucide-like)
============================================================ */
const ICONS = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 2v4"/><path d="M16 2v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mapPin: '<path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 12 7.5 12.4a.7.7 0 0 0 1 0C13 22 20 15.4 20 10c0-4.4-3.6-8-8-8Z"/><circle cx="12" cy="10" r="3"/>',
  star: '<polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/>',
  check: '<polyline points="4,12 9,17 20,6"/>',
  x: '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>',
  chevronLeft: '<polyline points="15,4 7,12 15,20"/>',
  arrowRight: '<line x1="4" y1="12" x2="20" y2="12"/><polyline points="13,5 20,12 13,19"/>',
  phone: '<path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.6 21 3 12.4 3 2c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"/>',
  shoppingBag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7 10.3 4.5h3.4L15 7"/>',
  plate: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  sparkle: '<path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10 Z"/>',
  music: '<circle cx="7" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="10" y1="18" x2="10" y2="5"/><line x1="21" y1="16" x2="21" y2="3"/><line x1="10" y1="5" x2="21" y2="3"/>',
  gem: '<polygon points="12,2 19,9 12,22 5,9"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="1"/><rect x="8" y="6" width="3" height="3"/><rect x="13" y="6" width="3" height="3"/><rect x="8" y="11" width="3" height="3"/><rect x="13" y="11" width="3" height="3"/><rect x="9" y="17" width="6" height="5"/>',
  google: '<path d="M21.35 11.1H12v3.9h5.35c-.5 2.4-2.6 4.1-5.35 4.1-3.25 0-5.9-2.65-5.9-6s2.65-6 5.9-6c1.5 0 2.85.55 3.9 1.45l2.9-2.9C17.15 3.75 14.75 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c6 0 9.4-4.2 9.4-9.1 0-.65-.05-1.15-.05-1z" fill="currentColor" stroke="none"/>',
  message: '<path d="M4 4h16v12H8l-4 4Z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"/><path d="M10 19a2 2 0 0 0 4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  filter: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4Z"/>',
  heart: '<path d="M20.8 8.6c0-2.6-2.1-4.6-4.6-4.6-1.7 0-3.2.9-4 2.3-.8-1.4-2.3-2.3-4-2.3-2.6 0-4.6 2.1-4.6 4.6 0 5.1 8.6 10.8 8.6 10.8s8.6-5.7 8.6-10.8Z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/>',
  shield: '<path d="M12 2 4 5v6c0 5.2 3.4 9.3 8 11 4.6-1.7 8-5.8 8-11V5Z"/><polyline points="9,12 11,14 15,10"/>',
  headset: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2" y="13" width="4" height="6" rx="1.5"/><rect x="18" y="13" width="4" height="6" rx="1.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18 14.3c2.2.7 3.5 2.8 3.5 5.7"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>',
  sliders: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="#fff"/><circle cx="15" cy="12" r="2" fill="#fff"/><circle cx="7" cy="18" r="2" fill="#fff"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 3h10"/>',
};
function icon(name, {size=16, color='currentColor', filled=false} = {}){
  if(name === 'arrowRight') return '';
  const body = ICONS[name] || '';
  const fill = filled ? color : 'none';
  const stroke = filled ? 'none' : color;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}

/* ============================================================
   TOKENS / DATA
============================================================ */
// Read the shared CSS palette so generated icons match the current site theme.
const COLOR = (() => {
  const palette = getComputedStyle(document.documentElement);
  const value = (name, fallback) => palette.getPropertyValue(name).trim() || fallback;
  const ink = value('--brand-ink', '#8e0413');
  return {
    ink, lagoon:ink, gold:ink, greenDeep:ink, star:ink,
    coral:value('--coral', '#b02b3b'),
    green:value('--green', '#267348'),
    line:value('--brand-line', '#8e04132e'),
  };
})();
const STATUS = {
  available: { label:"Available", color: COLOR.green, dots:5 },
  hold: { label:"Tentative", color: COLOR.star, dots:3 },
  booked: { label:"Not available", color: COLOR.coral, dots:1 },
  unknown: { label:"Set your date", color:COLOR.ink, dots:0 },
};
const EVENT_TYPES = ["Wedding","Engagement","Birthday","Kovil Festival","Corporate","Other"];
let CATEGORIES = [
  { id:"photo", name:"Photography", icon:"camera", note:"Weddings, engagements, kovil functions", bg:"var(--brand-surface)", fg:"var(--brand-ink)" },
  { id:"catering", name:"Catering", icon:"plate", note:"Full menus, live counters, sweets", bg:"var(--brand-surface)", fg:"var(--brand-ink)" },
  { id:"venue", name:"Venue", icon:"building", note:"Halls, lawns and convention centres", bg:"var(--brand-surface)", fg:"var(--brand-ink)" },
  { id:"makeup", name:"Makeup Artist", icon:"gem", note:"Bridal & event makeup, saree draping, mehendi", bg:"var(--brand-surface)", fg:"var(--brand-ink)" },
  { id:"sound", name:"Sound & Music", icon:"music", note:"DJ, live band, nadaswaram, PA systems", bg:"var(--brand-surface)", fg:"var(--brand-ink)" },
  { id:"decor", name:"Decoration", icon:"sparkle", note:"Stage, floral, thoranam & entrance work", bg:"var(--brand-surface)", fg:"var(--brand-ink)" },
];
let VENDORS = [
  { id:1, name:"Kallady Lens Co.", category:"photo", area:"Kallady", rating:4.8, reviews:62, priceFrom:35000, blurb:"Candid + traditional coverage, same-week edited previews." },
  { id:2, name:"Puliyanthivu Frames", category:"photo", area:"Puliyanthivu", rating:4.6, reviews:41, priceFrom:28000, blurb:"Two-photographer teams for full-day kovil weddings." },
  { id:3, name:"Manmunai Studio 7", category:"photo", area:"Manmunai", rating:4.4, reviews:19, priceFrom:22000, blurb:"Budget-friendly packages with drone add-on." },
  { id:4, name:"Arayampathy Thoranam Works", category:"decor", area:"Arayampathy", rating:4.9, reviews:88, priceFrom:45000, blurb:"Entrance festoons, mandap, and stage design specialists." },
  { id:5, name:"Kattankudy Floral House", category:"decor", area:"Kattankudy", rating:4.7, reviews:54, priceFrom:30000, blurb:"Fresh-flower stage backdrops, jasmine garland work." },
  { id:6, name:"Lagoon Light & Decor", category:"decor", area:"Kallady", rating:4.3, reviews:27, priceFrom:26000, blurb:"Fairy-light canopies and modern minimal setups." },
  { id:7, name:"Amma's Kitchen Catering", category:"catering", area:"Kattankudy", rating:4.9, reviews:103, priceFrom:1200, priceUnit:"head", blurb:"Traditional Batticaloa wedding menu, live biryani counter." },
  { id:8, name:"Manmunai Banquet Caterers", category:"catering", area:"Manmunai", rating:4.5, reviews:46, priceFrom:950, priceUnit:"head", blurb:"Buffet and plated service for 100–800 guests." },
  { id:9, name:"East Coast Sweets & Catering", category:"catering", area:"Puliyanthivu", rating:4.2, reviews:22, priceFrom:800, priceUnit:"head", blurb:"Known for sweet counters and Eid/kovil festival catering." },
  { id:10, name:"Nadaswaram Brothers", category:"sound", area:"Arayampathy", rating:4.8, reviews:37, priceFrom:18000, blurb:"Traditional nadaswaram + thavil for temple processions." },
  { id:11, name:"Batti Beats DJ", category:"sound", area:"Kallady", rating:4.4, reviews:58, priceFrom:25000, blurb:"Full PA, dance floor lighting, MC on request." },
  { id:12, name:"Kalyani Bridal Studio", category:"makeup", area:"Puliyanthivu", rating:4.9, reviews:71, priceFrom:15000, blurb:"Bridal makeup, saree draping, trial session included." },
  { id:13, name:"Manmunai Mehendi Art", category:"makeup", area:"Manmunai", rating:4.6, reviews:33, priceFrom:6000, blurb:"Intricate bridal mehendi, guest hand-painting stalls." },
  { id:14, name:"Kallady Lagoon Convention Hall", category:"venue", area:"Kallady", rating:4.7, reviews:96, priceFrom:80000, blurb:"Air-conditioned hall for up to 500 guests, lagoon-view terrace for photos." },
  { id:15, name:"Puliyanthivu Grand Hall", category:"venue", area:"Puliyanthivu", rating:4.5, reviews:64, priceFrom:65000, blurb:"Central town hall with in-house stage and parking for 100 vehicles." },
  { id:16, name:"Manmunai Garden Venue", category:"venue", area:"Manmunai", rating:4.3, reviews:29, priceFrom:50000, blurb:"Open-air lawn venue, ideal for evening receptions with fairy-light setup." },
];

/* ============================================================
   MOCK "DATABASE" — sample users. In production this is a real
   users table; here it's what a Google sign-in would return plus
   a couple of demo accounts to switch between.
============================================================ */
const USERS = [
  { id:"u1", name:"Kavya Selvam", email:"kavya.selvam@gmail.com", initials:"KS", role:"customer", memberSince:"2026-02-11" },
  { id:"u2", name:"Aravind Kumaran", email:"aravind.k@gmail.com", initials:"AK", role:"customer", memberSince:"2026-05-03" },
  { id:"u3", name:"Nila Rajendran", email:"nila.raj@gmail.com", initials:"NR", role:"customer", memberSince:"2026-06-22" },
  { id:"v1", name:"Dinesh Kallady", email:"dinesh@kalladylens.lk", initials:"DK", role:"vendor", vendorId:1, memberSince:"2025-11-04" },
  { id:"v2", name:"Selvi Arayampathy", email:"selvi@thoranamworks.lk", initials:"SA", role:"vendor", vendorId:4, memberSince:"2025-09-18" },
  { id:"a1", name:"Platform Admin", email:"admin@vendeze.lk", initials:"PA", role:"admin", memberSince:"2025-06-01" },
  { id:"d1", name:"Vendeze Dev Team", email:"dev@vendeze.lk", initials:"TD", role:"developer", memberSince:"2025-06-01" },
];

const money = (n) => "Rs. " + Math.round(Number(n)||0).toLocaleString("en-LK");

/* Escape anything that came from a user or the API before it goes into
   innerHTML — chat messages, ad text, event names, notifications, etc. */
function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function clearFieldValidation(field){
  if(!field) return;
  field.removeAttribute('aria-invalid');
  const messageId = field.dataset.validationMessage;
  if(messageId){
    const remaining = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(id => id && id !== messageId);
    if(remaining.length) field.setAttribute('aria-describedby', remaining.join(' '));
    else field.removeAttribute('aria-describedby');
    delete field.dataset.validationMessage;
  }
}
function markFieldInvalid(fieldId, messageId){
  const field = document.getElementById(fieldId);
  if(!field) return;
  field.setAttribute('aria-invalid', 'true');
  field.dataset.validationMessage = messageId;
  const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
  describedBy.add(messageId);
  field.setAttribute('aria-describedby', [...describedBy].join(' '));
  (field.matches('input,select,textarea,button') ? field : field.querySelector('button'))?.focus();
}
const todayISO = () => { const d=new Date(); d.setMinutes(d.getMinutes()-d.getTimezoneOffset()); return d.toISOString().slice(0,10); };
function daysUntil(dateStr){
  if(!dateStr) return null;
  const ms = new Date(dateStr+"T00:00:00") - new Date(todayISO()+"T00:00:00");
  return Math.round(ms/86400000);
}
function relTime(ts){
  if(!ts) return '';
  const s = Math.max(0, (Date.now()-ts)/1000);
  if(s<60) return 'Just now';
  if(s<3600) return Math.floor(s/60)+'m ago';
  if(s<86400) return Math.floor(s/3600)+'h ago';
  return Math.floor(s/86400)+'d ago';
}

/* Catering is priced per head — a cart line must be multiplied by the
   event's guest count, not treated as a flat fee. */
const DEFAULT_GUESTS = 200;
function guestCount(){ return (state.event && Number(state.event.guests)) || DEFAULT_GUESTS; }
function lineTotal(c){ return c.priceUnit === 'head' ? c.price * guestCount() : c.price; }
function cartTotals(){
  const cats = new Set(state.cart.map(c=>c.category));
  const rate = cats.size>=3 ? 0.1 : cats.size===2 ? 0.05 : 0;
  const subtotal = state.cart.reduce((s,c)=>s+lineTotal(c),0);
  const discount = Math.round(subtotal*rate);
  return { cats, rate, subtotal, discount, total: subtotal - discount };
}
function customerKey(){ return state.user ? state.user.id : 'guest'; }
function priceLine(v, price){
  return v.priceUnit ? `${money(price)}<small> / head</small>` : money(price);
}

/* mock packages/portfolio/messages — generated from a vendor's category
   so every vendor has believable detail without hand-writing all 16 */
const PACKAGE_TEMPLATES = {
  photo: [["Half Day Coverage",0.7],["Full Day Coverage",1.0],["Full Day + Drone + Album",1.4]],
  decor: [["Standard Stage Setup",0.8],["Premium Stage + Entrance",1.2]],
  catering: [["Standard Menu",1.0],["Premium Menu + Live Counter",1.35]],
  sound: [["PA + DJ, 4 hours",1.0],["Full Sound + Lighting, Full Day",1.5]],
  makeup: [["Bridal Makeup Only",1.0],["Bridal + Family Package",1.6]],
  venue: [["Hall Only",1.0],["Hall + Catering Space + Parking",1.25]],
};
const INCLUSIONS_TEMPLATES = {
  photo: ["Edited digital gallery","2 photographers","Online preview within 7 days"],
  decor: ["Stage backdrop","Entrance thoranam","Setup & teardown crew"],
  catering: ["Live counters","Service staff","Crockery included"],
  sound: ["PA system","Wireless mics","Basic stage lighting"],
  makeup: ["Trial session","HD makeup","Saree draping"],
  venue: ["AC hall access","Basic seating","Parking"],
};
const PORTFOLIO_TEMPLATES = {
  photo: ["Kallady Beach Wedding","Puliyanthivu Engagement Shoot","Arayampathy Kovil Ceremony"],
  decor: ["Lagoon-view Reception Stage","Traditional Entrance Thoranam"],
  catering: ["300-guest Wedding Buffet","Kovil Festival Sweet Counter"],
  sound: ["Temple Procession Set","Reception Night DJ Set"],
  makeup: ["Bridal Look — Kalyani Wedding","Engagement Day Makeup"],
  venue: ["Evening Reception Setup","Daytime Wedding Layout"],
};
function getPackages(v){
  return PACKAGE_TEMPLATES[v.category].map(([name,mult],i) => ({
    id: `${v.id}-pkg-${i}`,
    name,
    price: Math.round(v.priceFrom*mult/100)*100,
    inclusions: INCLUSIONS_TEMPLATES[v.category],
    supportsLaterPayment: v.category === 'photo',
  }));
}
function getPortfolio(v){
  return PORTFOLIO_TEMPLATES[v.category].map((title,i) => ({ id:`${v.id}-pf-${i}`, title }));
}
function getBackups(v){
  return VENDORS.filter(x => x.category===v.category && x.id!==v.id && !x.suspended)
    .sort((a,b)=>b.rating-a.rating).slice(0,2);
}
function getThread(vendorId){
  if(!state.messages[vendorId]){
    state.messages[vendorId] = [
      { from:'vendor', text:"Hi! Thanks for checking us out — happy to answer questions or work out a package that fits your budget." }
    ];
  }
  return state.messages[vendorId];
}

/* per-vendor editable data (portfolio, packages, blocked dates, outside
   income) — a vendor account edits this directly; customers only ever
   read it. Lazily seeded from the templates above on first access. */
function getVendorData(vendorId){
  if(!state.vendorData[vendorId]){
    const v = VENDORS.find(x=>x.id===vendorId);
    if(!v) return { portfolio:[], packages:[], blockedDates:[], outsideIncome:[] };
    const seedBlocked = ["2026-12-12","2026-12-19","2027-01-09"][hashSeed(String(vendorId))%3];
    state.vendorData[vendorId] = {
      portfolio: getPortfolio(v),
      packages: getPackages(v),
      blockedDates: [seedBlocked],
      outsideIncome: [],
    };
  }
  return state.vendorData[vendorId];
}

function hashSeed(str){ let h=0; for(let i=0;i<str.length;i++) h=(h*31+str.charCodeAt(i))>>>0; return h; }
function availabilityFor(vendorId, dateStr){
  if(!dateStr) return "unknown";
  if(state.vendorData[vendorId] && state.vendorData[vendorId].blockedDates.includes(dateStr)) return "booked";
  const r = hashSeed(vendorId+"|"+dateStr) % 10;
  if(r<6) return "available";
  if(r<8) return "hold";
  return "booked";
}
function fmtDate(dateStr, opts){
  if(!dateStr) return "—";
  return new Date(dateStr+"T00:00:00").toLocaleDateString("en-LK", opts || {day:"numeric",month:"short",year:"numeric"});
}

/* ============================================================
   STATE
============================================================ */
let state = {
  view: { name: "login" },
  user: null,
  localAccounts: [], // accounts created on this device while the server is offline
  localVendors: [],
  guest: false, // true after "Continue as guest" — lets a guest refresh without being sent back to login
  search: { q:'', category:'', area:'', sort:'rating', freeOnly:false, maxPrice:'' },
  event: null,
  cart: [], // { id, name, price, category, priceUnit, packageName }
  messages: {}, // vendorId -> [{from:'vendor'|'me', text}]
  checkout: null, // { paymentType, amountNow, amountLater }
  lastOrder: null, // snapshot of the cart at the moment of checkout, for the confirm screen
  backendConnected: false, // true once hydrateFromBackend() succeeds at least once
  bookings: [], // { id, vendorId, customerName, eventName, date, amount, source }
  vendorData: {}, // vendorId -> { portfolio, packages, blockedDates, outsideIncome }
  wishlist: new Set(),
  appConfig: {
    heroTitle: "Every vendor for your day, <em>at the right price.</em>",
    adBannerText: "",
  },
  // ads + popup are admin-managed and customer-facing, read from this one
  // shared store by the Home screen
  ads: [
    { id:'ad2', label:'AD', text:'Kallady Lens Co. — 10% off bookings above Rs. 50,000 this month' },
  ],
  popupSeen: false,
  popup: {
    enabled: true,
    title: 'Welcome to Vendeze',
    text: 'Bundle 3+ services for your event and save up to 10% — plus every vendor is verified and rated by real customers.',
    cta: 'Start planning',
  },
  sentNotifications: [], // admin's log of broadcasts it has sent
  // one shared notification feed for the whole platform — each entry is
  // tagged with who it's for, so a booking a customer makes shows up for
  // that vendor, and an admin broadcast shows up for its audience, all
  // from this single store. getMyNotifications() filters it per viewer.
  notifications: [
    { id:'n2', icon:'message', title:"Message from Amma's Kitchen Catering", text:'"We can do a tasting session before you confirm the package."', time:'5h ago', read:false, audience:'customer' },
    { id:'n3', icon:'sparkle', title:'Bundle discount', text:'Hold 3+ service categories together and save up to 10%.', time:'1d ago', read:true, audience:'customer' },
    { id:'nm1', icon:'bell', title:'New message', text:'A customer sent you a message about pricing — check your inbox below.', time:'1d ago', read:true, audience:'vendor' },
    { id:'pn1', icon:'sparkle', title:'New vendor signup', text:'"Lagoon Light & Decor" submitted a listing and is awaiting approval.', time:'3h ago', read:false, audience:'admin' },
    { id:'pn2', icon:'check', title:'Booking volume up', text:'Bookings are trending up this month.', time:'1d ago', read:false, audience:'admin' },
  ],
};

/* ============================================================
   SMALL RENDER HELPERS
============================================================ */
function kolamDots(filled, total, color){
  let out = '<div class="kolam-dots">';
  for(let i=0;i<total;i++){
    out += `<span style="background:${i<filled?color:'var(--line)'}"></span>`;
  }
  out += '</div>';
  return out;
}
/* Shared illustrative photography for vendor details and sample portfolios. */
function categoryHeroBanner(categoryId, size, variant = 0){
  return `<div class="hero-illustration">${designPhoto(categoryId, variant, size >= 56)}</div>`;
}

function statusBadge(statusKey){
  const s = STATUS[statusKey];
  return `<div class="status-badge">${kolamDots(s.dots,5,s.color)}<span class="status-label mono" style="color:${s.color}">${window.VENDEZE_UI_PREVIEW ? 'Sample · ' : ''}${s.label}</span></div>`;
}
function kolamDivider(){
  let out = '<div class="divider">';
  for(let i=0;i<24;i++){
    const wave = Math.abs((i%8)-3.5);
    out += `<span style="opacity:${(0.5+(4-wave)*0.1).toFixed(2)}"></span>`;
  }
  out += '</div>';
  return out;
}
function vendorCard(v){ return renderEditorialVendorCard(v); }

/* Existing authentication screens. */

function renderLogin(){
  return `
  <div class="login-wrap">
    <div class="login-brand">
      <img class="login-logo" src="icons/logo-word-white.png" alt="Vendeze" width="200" height="27" />
      <p class="login-tagline mono">PLAN · BOOK · CELEBRATE</p>
      <p class="login-sub">Good people.<br>Great celebrations.<br><em>Your story starts here.</em></p>
      <div class="login-photo-poster"><img src="assets/party.jpg" alt="Friends celebrating together beneath warm party lights"><span>THESE ARE<br>THE DAYS.</span><span class="login-photo-sticker" aria-hidden="true">GOOD<br>THINGS<br>AHEAD.</span></div>
    </div>
    <div class="login-card">
      <button class="login-back" data-action="guest-login">Explore as a guest</button>
      <h1 class="auth-heading">Hello, possibility.</h1>
      <p class="auth-intro">Your next great celebration starts with your people.</p>

      <div class="auth-tabs" role="tablist" aria-label="Account access">
        <button class="auth-tab active" id="tabSignIn" type="button" role="tab" aria-selected="true" aria-controls="signInPanel">Sign in</button>
        <button class="auth-tab" id="tabSignUp" type="button" role="tab" aria-selected="false" aria-controls="signUpPanel" tabindex="-1">Sign up</button>
      </div>

      <!-- ===================== SIGN IN ===================== -->
      <div id="signInPanel" role="tabpanel" aria-labelledby="tabSignIn">
        <form id="signInForm" novalidate>
        <div class="field">
          <label for="si-email">Email</label>
          <input id="si-email" type="email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="field">
          <label for="si-password">Password</label>
          <div class="pw-wrap"><input id="si-password" type="password" placeholder="••••••••" autocomplete="current-password" /><button type="button" class="pw-toggle" data-pw="si-password">Show</button></div>
        </div>
        <p class="error-text" id="signInError" role="alert" style="display:none;"></p>
        <button type="submit" class="btn-gold btn-gold-block" id="signInBtn">Sign in</button>
        </form>

        <div class="login-divider"><span>or</span></div>

        <button class="btn-google" data-action="show-google-accounts">
          ${icon('google',{size:18})} Choose a demo account
        </button>
        <div id="googleAccounts" class="google-accounts" style="display:none;">
          <p class="google-accounts-label">Sample accounts for exploring the UI</p>
          ${USERS.map(u => `
            <button class="google-account-row" data-action="google-login" data-id="${u.id}">
              <span class="avatar-circle">${esc(u.initials)}</span>
              <span>
                <span class="ga-name">${u.name} <span class="ga-role">${u.role}</span></span>
                <span class="ga-email">${u.email}</span>
              </span>
            </button>`).join('')}
        </div>

        <button class="btn-outline-block" data-action="apple-login" style="margin-top:10px;">
          ${icon('shield',{size:16,color:COLOR.ink})} More demo sign-in options
        </button>

        <div class="login-divider"><span>or</span></div>
        <button class="btn-outline-block" data-action="guest-login">Continue as guest</button>

        <p class="login-switch">New to Vendeze? <button type="button" class="link-btn" data-switch="signup">Create an account</button></p>
      </div>

      <!-- ===================== SIGN UP ===================== -->
      <div id="signUpPanel" role="tabpanel" aria-labelledby="tabSignUp" style="display:none;">
        <form id="signUpForm" novalidate>
        <div class="field">
          <label id="roleLabel">I want to</label>
          <div class="role-pick" id="signupRoleChips" role="radiogroup" aria-labelledby="roleLabel">
            <button type="button" role="radio" aria-checked="true" class="role-card active" data-role="CUSTOMER">
              ${icon('calendar',{size:18})}<span><strong>Plan an event</strong><small>Find &amp; book vendors</small></span>
            </button>
            <button type="button" role="radio" aria-checked="false" class="role-card" data-role="VENDOR">
              ${icon('shoppingBag',{size:18})}<span><strong>Offer my services</strong><small>Get bookings as a vendor</small></span>
            </button>
          </div>
        </div>
        <div class="field">
          <label for="su-name">Full name</label>
          <input id="su-name" type="text" maxlength="60" placeholder="e.g. Kavya Selvam" autocomplete="name" />
        </div>
        <div class="field">
          <label for="su-email">Email</label>
          <input id="su-email" type="email" placeholder="you@example.com" autocomplete="email" />
        </div>
        <div class="field">
          <label for="su-phone">Mobile number</label>
          <input id="su-phone" type="tel" inputmode="tel" placeholder="07X XXX XXXX" autocomplete="tel" />
        </div>
        <div class="field">
          <label for="su-password">Password</label>
          <div class="pw-wrap"><input id="su-password" type="password" placeholder="At least 8 characters" autocomplete="new-password" /><button type="button" class="pw-toggle" data-pw="su-password">Show</button></div>
          <div class="pw-meter" aria-hidden="true"><span id="pwBar"></span></div>
          <ul class="pw-rules" id="pwRules">
            <li data-rule="len">At least 8 characters</li>
            <li data-rule="num">Includes a number</li>
            <li data-rule="case">Upper and lower case letters</li>
          </ul>
        </div>

        <div id="vendorExtraFields" style="display:none;">
          <div class="field">
            <label for="su-business">Business name</label>
            <input id="su-business" type="text" maxlength="60" placeholder="e.g. Kallady Lens Co." />
          </div>
          <div class="field">
            <label for="su-category">Service you offer</label>
            <select id="su-category" class="role-select" style="width:100%;padding:12px 14px;">
              ${CATEGORIES.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}
            </select>
          </div>
        </div>

        <label class="terms-row"><input type="checkbox" id="su-terms" /> <span>I agree to the Vendeze terms and privacy policy</span></label>

        <p class="error-text" id="signUpError" role="alert" style="display:none;"></p>
        <button type="submit" class="btn-gold btn-gold-block" id="signUpBtn">Create account</button>
        </form>
        <p class="login-switch">Already have an account? <button type="button" class="link-btn" data-switch="signin">Sign in</button></p>
      </div>
    </div>
  </div>`;
}

function setupLoginScreen(){
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const signInPanel = document.getElementById('signInPanel');
  const signUpPanel = document.getElementById('signUpPanel');

  const showTab = (which, focusField = true) => {
    const up = which === 'signup';
    tabSignUp.classList.toggle('active', up); tabSignIn.classList.toggle('active', !up);
    tabSignUp.setAttribute('aria-selected', String(up)); tabSignIn.setAttribute('aria-selected', String(!up));
    tabSignUp.tabIndex = up ? 0 : -1; tabSignIn.tabIndex = up ? -1 : 0;
    signUpPanel.style.display = up ? '' : 'none'; signInPanel.style.display = up ? 'none' : '';
    if(focusField) (up ? document.getElementById('su-name') : null)?.focus({ preventScroll:true });
  };
  tabSignIn.addEventListener('click', () => showTab('signin'));
  tabSignUp.addEventListener('click', () => showTab('signup'));
  document.querySelector('.auth-tabs').addEventListener('keydown', event => {
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const up = event.key === 'End' || (event.key !== 'Home' && document.activeElement === tabSignIn);
    showTab(up ? 'signup' : 'signin', false);
    (up ? tabSignUp : tabSignIn).focus();
  });
  document.querySelectorAll('[data-switch]').forEach(b => b.addEventListener('click', () => { showTab(b.dataset.switch); window.scrollTo({ top:0, behavior:'smooth' }); }));

  document.querySelectorAll('.pw-toggle').forEach(btn => btn.addEventListener('click', () => {
    const inp = document.getElementById(btn.dataset.pw);
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.textContent = show ? 'Hide' : 'Show';
  }));

  document.getElementById('signInForm').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const email = document.getElementById('si-email').value.trim();
    const password = document.getElementById('si-password').value;
    const err = document.getElementById('signInError');
    const btn = document.getElementById('signInBtn');
    err.style.display = 'none';
    if(!email || !password){ err.textContent = 'Enter your email and password.'; err.style.display = 'block'; markFieldInvalid(!email ? 'si-email' : 'si-password', 'signInError'); return; }
    if(!/^\S+@\S+\.\S+$/.test(email)){ err.textContent = 'That email address doesn’t look right.'; err.style.display = 'block'; markFieldInvalid('si-email', 'signInError'); return; }
    btn.disabled = true; btn.textContent = 'Signing in…';
    const fail = (msg) => { err.textContent = msg; err.style.display = 'block'; btn.disabled = false; btn.textContent = 'Sign in'; };
    try {
      if(typeof apiEmailLogin !== 'function') throw new Error('Failed to fetch');
      const result = await withTimeout(apiEmailLogin(email, password), 3500);
      await completeApiLogin(result);
    } catch(e){
      if(!isOffline(e)) return fail(e.message || 'Could not sign in.');
      // server unreachable: check accounts created on this device
      const acct = state.localAccounts.find(a => a.email === email.toLowerCase());
      if(!acct || acct.passHash !== await hashPassword(email, password)) return fail('Email or password is incorrect.');
      startLocalSession(acct, `Welcome back, ${acct.name.split(' ')[0]}`);
    }
  });

  document.querySelectorAll('#signupRoleChips .role-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#signupRoleChips .role-card').forEach(c=>{ c.classList.remove('active'); c.setAttribute('aria-checked','false'); });
      card.classList.add('active'); card.setAttribute('aria-checked','true');
      document.getElementById('vendorExtraFields').style.display = card.dataset.role === 'VENDOR' ? '' : 'none';
    });
  });

  // live password checklist + strength bar
  const pw = document.getElementById('su-password');
  const rules = { len: v => v.length >= 8, num: v => /\d/.test(v), case: v => /[a-z]/.test(v) && /[A-Z]/.test(v) };
  pw.addEventListener('input', () => {
    const v = pw.value; let met = 0;
    Object.entries(rules).forEach(([k,fn]) => { const ok = fn(v); if(ok) met++; document.querySelector(`#pwRules [data-rule="${k}"]`).classList.toggle('ok', ok); });
    const bar = document.getElementById('pwBar');
    bar.style.width = (v ? Math.max(12, met/3*100) : 0) + '%';
    bar.dataset.level = met <= 1 ? 'weak' : met === 2 ? 'ok' : 'strong';
  });
  document.getElementById('signUpForm').addEventListener('input', () => { document.getElementById('signUpError').style.display = 'none'; });

  document.getElementById('signUpForm').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const name = document.getElementById('su-name').value.trim();
    const email = document.getElementById('su-email').value.trim().toLowerCase();
    const phoneRaw = document.getElementById('su-phone').value;
    const password = pw.value;
    const role = document.querySelector('#signupRoleChips .role-card.active')?.dataset.role || 'CUSTOMER';
    const businessName = document.getElementById('su-business').value.trim();
    const category = document.getElementById('su-category').value;
    const err = document.getElementById('signUpError');
    const btn = document.getElementById('signUpBtn');
    const fail = (msg, id) => { err.textContent = msg; err.style.display = 'block'; if(id) markFieldInvalid(id, 'signUpError'); btn.disabled = false; btn.textContent = 'Create account'; };
    err.style.display = 'none';

    if(name.length < 2) return fail('Enter your full name.', 'su-name');
    if(!/^\S+@\S+\.\S+$/.test(email)) return fail('Enter a valid email address, e.g. you@example.com.', 'su-email');
    const phone = normalisePhone(phoneRaw);
    if(!phone) return fail('Enter a valid Sri Lankan mobile number, e.g. 077 123 4567.', 'su-phone');
    if(!Object.values(rules).every(fn => fn(password))) return fail('Your password needs 8+ characters, a number, and upper and lower case letters.', 'su-password');
    if(role === 'VENDOR' && !businessName) return fail('Enter your business name.', 'su-business');
    if(!document.getElementById('su-terms').checked) return fail('Please agree to the terms to continue.');
    if(state.localAccounts.some(a => a.email === email) || USERS.some(u => u.email.toLowerCase() === email))
      return fail('An account with this email already exists. Sign in instead.', 'su-email');

    btn.disabled = true; btn.textContent = 'Creating account…';
    try {
      if(typeof apiSignup !== 'function') throw new Error('Failed to fetch');
      const result = await withTimeout(apiSignup({ name, email, password, role, businessName, category, phone }), 3500);
      state.contact = { name, phone };
      await completeApiLogin(result);
      return;
    } catch(e){
      if(!isOffline(e)) return fail(e.message || 'Could not create your account.');
    }
    // Server unreachable: create the account on this device so the person can
    // carry on. It moves to the backend once that's connected.
    const acct = {
      id: 'local-' + Date.now(), name, email, phone,
      passHash: await hashPassword(email, password),
      role: role.toLowerCase(),
      initials: name.split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase(),
      memberSince: todayISO(), vendorId: null,
    };
    if(acct.role === 'vendor'){
      const v = { id: Date.now() % 1e9, name: businessName, category, area: 'Batticaloa', rating: 5.0, reviews: 0,
        priceFrom: 25000, priceUnit: category === 'catering' ? 'head' : null, blurb: `New on Vendeze — ${CATEGORIES.find(c=>c.id===category)?.name || 'event'} services in Batticaloa.`, isNew: true };
      if(v.priceUnit) v.priceFrom = 1000;
      state.localVendors.push(v); VENDORS.push(v);
      acct.vendorId = v.id;
    }
    state.localAccounts.push(acct);
    state.contact = { name, phone };
    await new Promise(r => setTimeout(r, 600)); // let the button state register
    startLocalSession(acct, `Welcome to Vendeze, ${name.split(' ')[0]}!`, true);
  });
}

function withTimeout(promise, ms){
  return Promise.race([promise, new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')), ms))]);
}
function isOffline(e){ return /Failed to fetch|NetworkError|Load failed|timeout/i.test((e && e.message) || ''); }
async function hashPassword(email, password){
  const data = new TextEncoder().encode(email.toLowerCase() + '|' + password);
  if(window.crypto && crypto.subtle){
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  let h = 0; for(const b of data){ h = (h*31 + b) | 0; } return 'x' + h;
}
function startLocalSession(acct, welcome, isNew){
  const { passHash, phone, ...user } = acct;
  state.user = user;
  state.guest = false;
  state.popupSeen = !isNew ? state.popupSeen : false;
  if(isNew) pushNotification('sparkle', 'Welcome to Vendeze', user.role === 'vendor'
    ? 'Add packages and your previous work so customers can book you.'
    : 'Create your event to see which vendors are free on your date.', user.role, user.role === 'vendor' ? user.vendorId : undefined);
  navigate(afterLoginView());
  showToast(welcome);
}

/**
 * Shared by email sign-in and signup: takes the { token, user } shape every
 * backend login path returns, stores the token, builds a matching local
 * USERS-style entry so the rest of the app (which reads from the local
 * `state.user` object) works unchanged, then hydrates and navigates in —
 * exactly the same finishing steps loginAs() already does for demo accounts.
 */
async function completeApiLogin(result){
  setAuthToken(result.token);
  state.authToken = result.token;
  state.guest = false;
  state.user = {
    id: 'api-' + result.user.id,
    name: result.user.name,
    email: result.user.email,
    initials: result.user.avatarInitials || result.user.name.slice(0,2).toUpperCase(),
    role: result.user.role.toLowerCase(),
    vendorId: result.user.vendorId || null,
    memberSince: new Date().toISOString().slice(0,10),
  };
  await hydrateFromBackend();
  navigate({ name: 'home' });
}

function renderProfile(){
  const u = state.user;
  const roleLabel = u ? u.role.charAt(0).toUpperCase()+u.role.slice(1) : 'Customer (guest)';
  return `
  <div class="section" style="padding-top:24px;max-width:520px;">
    <button class="back-btn" data-action="go-home">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Home</button>
    <h1 class="page-title account-title">Your account</h1>
    <p class="page-sub">${u && u.role !== 'customer' ? 'Your profile and workspace, in one place.' : 'Your profile, your plans, and your next celebration.'}</p>
    <div class="profile-card">
      <span class="avatar-circle lg">${u ? esc(u.initials) : 'G'}</span>
      <div>
        <div class="profile-name">${u ? esc(u.name) : 'Guest'}</div>
        <div class="profile-email">${u ? `<a href="mailto:${esc(u.email)}">${esc(u.email)}</a>` : 'Browsing without an account'}</div>
      </div>
    </div>
    ${!u ? `<div class="info-note" style="margin-bottom:16px;">${icon('user',{size:14,color:'var(--text2)'})}<p style="margin:0;">Sign in to keep your bookings and saved vendors across devices. <button class="link-btn" data-action="logout">Sign in or create an account</button></p></div>` : ''}
    <div class="profile-detail-card">
      <div class="confirm-row"><span class="l">Role</span><span class="r">${roleLabel}</span></div>
      <div class="confirm-row"><span class="l">Member since</span><span class="r">${u ? fmtDate(u.memberSince) : '—'}</span></div>
      ${!u || u.role==='customer' ? `
      <div class="confirm-row"><span class="l">Active event</span><span class="r">${state.event ? esc(state.event.name) : 'None yet'}</span></div>
      <div class="confirm-row"><span class="l">Vendors on hold</span><span class="r">${state.cart.length}</span></div>
      <div class="confirm-row"><span class="l">Saved vendors</span><span class="r">${state.wishlist.size}</span></div>` : ''}
      ${u && u.role==='vendor' ? `<div class="confirm-row"><span class="l">Vendor account</span><span class="r">${esc(VENDORS.find(v=>v.id===u.vendorId)?.name || '—')}</span></div>` : ''}
    </div>
    ${!u || u.role==='customer' ? `
    <div class="menu-list">
      <button class="menu-row" data-action="create-event">${icon('calendar',{size:16})}<span>${state.event ? 'Edit my event' : 'Create my event'}</span>${icon('arrowRight',{size:14,color:'var(--muted2)'})}</button>
      <button class="menu-row" data-action="my-bookings">${icon('bookmark',{size:16})}<span>My bookings</span>${icon('arrowRight',{size:14,color:'var(--muted2)'})}</button>
      <button class="menu-row" data-action="saved">${icon('heart',{size:16})}<span>Saved vendors</span>${icon('arrowRight',{size:14,color:'var(--muted2)'})}</button>
      <a class="menu-row" href="mailto:support@vendeze.lk">${icon('headset',{size:16})}<span>Help &amp; support</span>${icon('arrowRight',{size:14,color:'var(--muted2)'})}</a>
    </div>` : ''}
    ${u && u.role==='vendor' ? `<button class="btn-outline-block" data-action="vendor-dashboard" style="margin-bottom:10px;">${icon('camera',{size:15,color:COLOR.ink})} Go to dashboard</button>` : ''}
    ${u && u.role==='admin' ? `<button class="btn-outline-block" data-action="admin" style="margin-bottom:10px;">${icon('building',{size:15,color:COLOR.ink})} Go to admin panel</button>` : ''}
    ${u && u.role==='developer' ? `<button class="btn-outline-block" data-action="developer" style="margin-bottom:10px;">${icon('sparkle',{size:15,color:COLOR.ink})} Go to developer tools</button>` : ''}
    <button class="btn-outline-block" data-action="logout">${icon('logout',{size:15,color:COLOR.ink})} ${u ? 'Sign out' : 'Leave guest mode'}</button>
  </div>`;
}

/* ---------------- VENDOR DASHBOARD ---------------- */


/* ---------------- ADMIN ---------------- */


/* ---------------- DEVELOPER ---------------- */


function renderHome(){ return renderMarketplaceHome(); }

function renderEventPlanCard(){
  const e = state.event;
  if(!e){
    return `
    <div class="promo-wrap">
      <button class="promo-card" data-action="create-event">
        <div class="promo-text">
          <p class="promo-eyebrow mono">Plan · Book · Celebrate</p>
          <h1 class="promo-title">${state.appConfig.heroTitle}</h1>
          <span class="promo-cta">Create your event ${icon('arrowRight',{size:13,color:'#fff'})}</span>
        </div>
        <img class="promo-mark" src="icons/logo-mark-white.png" alt="" aria-hidden="true" />
      </button>
    </div>`;
  }
  const d = daysUntil(e.date);
  const when = d == null ? '' : d > 1 ? `${d} days to go` : d === 1 ? 'Tomorrow!' : d === 0 ? 'Today!' : 'Event date has passed';
  const held = new Set(state.cart.map(c=>c.category));
  const booked = new Set(state.bookings.filter(b=>b.customerKey===customerKey()).map(b=>VENDORS.find(v=>v.id===b.vendorId)?.category));
  const done = CATEGORIES.filter(c=>held.has(c.id)||booked.has(c.id)).length;
  const pct = Math.round(done/CATEGORIES.length*100);
  return `
  <div class="promo-wrap">
    <div class="plan-card">
      <div class="plan-top">
        <div style="min-width:0;">
          <p class="promo-eyebrow mono">${esc(e.type || 'Your event')}${when ? ' · '+when : ''}</p>
          <h2 class="plan-title">${esc(e.name)}</h2>
          <p class="plan-meta">${icon('calendar',{size:12,color:'rgba(255,255,255,.8)'})} ${fmtDate(e.date)} &nbsp; ${icon('users',{size:12,color:'rgba(255,255,255,.8)'})} ${guestCount()} guests</p>
        </div>
        <button class="plan-edit" data-action="create-event" aria-label="Edit event">Edit</button>
      </div>
      <div class="plan-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Planning progress"><span style="width:${pct}%"></span></div>
      <p class="plan-count">${done} of ${CATEGORIES.length} services sorted</p>
      <div class="plan-chips">
        ${CATEGORIES.map(c => {
          const ok = held.has(c.id)||booked.has(c.id);
          return `<button class="plan-chip${ok?' ok':''}" data-action="category" data-id="${esc(c.id)}">${icon(ok?'check':c.icon,{size:12,color:ok?'#1C1B29':'#fff'})} ${esc(c.name)}</button>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

/* ---------------- SEARCH + FILTERS ---------------- */
// per-head vendors compare on their estimated total for the event's guests
const effPrice = v => v.priceUnit ? v.priceFrom*guestCount() : v.priceFrom;
function searchResults(){
  const s = state.search;
  const q = s.q.trim().toLowerCase();
  const date = state.event?.date;
  let list = VENDORS.filter(v => {
    if(v.suspended) return false;
    const cat = CATEGORIES.find(c=>c.id===v.category);
    if(q){
      const hay = `${v.name} ${v.area} ${v.blurb} ${cat?cat.name:''} ${cat?cat.note:''}`.toLowerCase();
      if(!q.split(/\s+/).every(w=>hay.includes(w))) return false;
    }
    if(s.category && v.category !== s.category) return false;
    if(s.area && v.area !== s.area) return false;
    // per-head vendors are compared on their estimated total for the guest count
    if(s.maxPrice && effPrice(v) > Number(s.maxPrice)) return false;
    if(s.freeOnly && date && availabilityFor(v.id, date) !== 'available') return false;
    return true;
  });
  const sorters = {
    rating: (a,b)=>b.rating-a.rating || b.reviews-a.reviews,
    priceLow: (a,b)=>effPrice(a)-effPrice(b),
    priceHigh: (a,b)=>effPrice(b)-effPrice(a),
    reviews: (a,b)=>b.reviews-a.reviews,
  };
  return list.sort(sorters[s.sort] || sorters.rating);
}
function renderSearch(){
  const s = state.search;
  const areas = [...new Set(VENDORS.map(v=>v.area))].sort();
  return `
  <div class="section" style="padding-top:32px;">
    <div class="search-page-header"><p class="eyebrow">GOOD PEOPLE. GREAT CELEBRATIONS.</p><h1 class="page-title">Find your kind of people.</h1><p class="page-sub">Explore the local talent behind your next great occasion.</p></div>
    <form class="search-wrap" id="searchForm" role="search" style="padding:0;margin:0 0 14px;">
      <label class="search-bar">
        ${icon('search',{size:16,color:'var(--muted2)'})}
        <input id="searchInput" type="search" value="${esc(s.q)}" placeholder="Search vendors, areas, services…" aria-label="Search vendors" autocomplete="off" />
      </label>
    </form>
    <div class="filter-row" role="group" aria-label="Category">
      <button class="fchip${!s.category?' active':''}" data-filter="category" data-val="">All</button>
      ${CATEGORIES.map(c=>`<button class="fchip${s.category===c.id?' active':''}" data-filter="category" data-val="${esc(c.id)}">${esc(c.name)}</button>`).join('')}
    </div>
    <div class="filter-grid">
      <label class="fselect"><span>Area</span>
        <select id="fArea"><option value="">Anywhere</option>${areas.map(a=>`<option ${s.area===a?'selected':''}>${esc(a)}</option>`).join('')}</select>
      </label>
      <label class="fselect"><span>Budget</span>
        <select id="fPrice">
          <option value="">Any price</option>
          ${[20000,30000,50000,80000].map(p=>`<option value="${p}" ${String(s.maxPrice)===String(p)?'selected':''}>Up to ${money(p)}</option>`).join('')}
        </select>
      </label>
      <label class="fselect"><span>Sort by</span>
        <select id="fSort">
          <option value="rating" ${s.sort==='rating'?'selected':''}>Top rated</option>
          <option value="reviews" ${s.sort==='reviews'?'selected':''}>Most booked</option>
          <option value="priceLow" ${s.sort==='priceLow'?'selected':''}>Price: low to high</option>
          <option value="priceHigh" ${s.sort==='priceHigh'?'selected':''}>Price: high to low</option>
        </select>
      </label>
    </div>
    ${state.event
      ? `<label class="toggle-row"><input type="checkbox" id="fFree" ${s.freeOnly?'checked':''}/> <span>Only show vendors free on <strong>${fmtDate(state.event.date,{day:'numeric',month:'short'})}</strong></span></label>`
      : `<button class="event-nudge" data-action="create-event" style="margin-bottom:6px;">${icon('calendar',{size:13,color:COLOR.greenDeep})} Add your event date to filter by availability</button>`}
    <div id="searchResults">${renderSearchResults()}</div>
  </div>`;
}
function renderSearchResults(){
  const list = searchResults();
  const s = state.search;
  const active = s.q || s.category || s.area || s.maxPrice || s.freeOnly;
  return `
    <div class="results-head">
      <p class="results-count" aria-live="polite">${list.length} vendor${list.length===1?'':'s'}${s.q?` for “${esc(s.q)}”`:''}</p>
      ${active ? `<button class="rail-link" id="clearFilters">Clear all</button>` : ''}
    </div>
    ${list.length ? `<div class="vendor-grid">${list.map(vendorCard).join('')}</div>` : `
    <div class="cart-empty" style="padding:40px 0;">
      ${icon('search',{size:26,color:'var(--muted2)'})}
      <p>No vendors match that. Try a different word or clear the filters.</p>
    </div>`}`;
}
function setupSearchScreen(){
  const input = document.getElementById('searchInput');
  const rerender = () => {
    document.getElementById('searchResults').innerHTML = renderSearchResults();
    const clear = document.getElementById('clearFilters');
    if(clear) clear.addEventListener('click', () => {
      state.search = { q:'', category:'', area:'', sort:'rating', freeOnly:false, maxPrice:'' };
      navigate({ name:'search' });
    });
    saveState();
  };
  let t;
  input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(()=>{ state.search.q = input.value; rerender(); }, 120); });
  document.getElementById('searchForm').addEventListener('submit', e => { e.preventDefault(); state.search.q = input.value; rerender(); input.blur(); });
  document.querySelectorAll('[data-filter="category"]').forEach(b => b.addEventListener('click', () => {
    state.search.category = b.dataset.val;
    document.querySelectorAll('[data-filter="category"]').forEach(x=>x.classList.toggle('active', x===b));
    rerender();
  }));
  document.getElementById('fArea').addEventListener('change', e => { state.search.area = e.target.value; rerender(); });
  document.getElementById('fPrice').addEventListener('change', e => { state.search.maxPrice = e.target.value; rerender(); });
  document.getElementById('fSort').addEventListener('change', e => { state.search.sort = e.target.value; rerender(); });
  const free = document.getElementById('fFree');
  if(free) free.addEventListener('change', e => { state.search.freeOnly = e.target.checked; rerender(); });
  rerender();
  if(state.view.focus) input.focus();
}
function setupHomeScreen(){ setupMarketplaceHome(); }

/* ---------------- SAVED (wishlist) ---------------- */

function renderSaved(){
  const list = VENDORS.filter(v=>state.wishlist.has(v.id));
  return `
  <div class="section" style="padding-top:24px;">
    <h1 class="page-title">Saved vendors</h1>
    <p class="page-sub">Your shortlist — tap the heart on any vendor to add it here.</p>
    ${list.length ? `<div class="vendor-grid">${list.map(vendorCard).join('')}</div>` : `
    <div class="cart-empty" style="padding:48px 0;">
      ${icon('heart',{size:26,color:'var(--muted2)'})}
      <p>Nothing saved yet.</p>
      <button class="btn-gold" data-action="search">Browse vendors</button>
    </div>`}
  </div>`;
}

function renderCreateEvent(){
  return `<div class="event-layout">${renderEventForm()}<aside class="event-side"><img src="assets/dining.jpg" alt="A celebration table full of thoughtful details"><h2>A little idea.<br>A wonderful occasion.</h2><p>Start with the details you know. Your people, your place, your kind of celebration.</p>${window.VENDEZE_UI_PREVIEW ? '<p class="sample-caption">Design preview · Event details stay in this browser.</p>' : ''}</aside></div>`;
}

function renderEventForm(){
  const ev = state.event || { name:"", type:state.view.suggestedType || "", date:"", time:"", location:"", guests:"" };
  return `
  <div class="form-wrap">
    ${state.event ? `<button class="back-btn" data-action="go-home">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Home</button>` : ''}
    <h1 class="form-title serif">${state.event ? 'Your event' : 'Tell us about your event'}</h1>
    <p class="form-sub">A few details to make the search feel more like you. You can come back and edit them later.</p>

    <form id="eventForm" novalidate>
    <div class="field">
      <label for="f-name">Event name</label>
      <input id="f-name" type="text" maxlength="80" placeholder="e.g. Kavya & Aravind's Wedding" value="${esc(ev.name)}" />
    </div>

    <div class="field">
      <label id="typeLabel">Event type</label>
      <div class="chip-grid" id="typeChips" role="radiogroup" aria-labelledby="typeLabel">
        ${EVENT_TYPES.map(t => `<button type="button" role="radio" aria-checked="${ev.type===t}" class="chip${ev.type===t?' active':''}" data-type="${esc(t)}">${esc(t)}</button>`).join('')}
      </div>
    </div>

    <div class="row2">
      <div class="field">
        <label for="f-date">Date</label>
        <div class="with-icon">${icon('calendar',{size:15,color:'var(--muted2)'})}<input id="f-date" type="date" min="${todayISO()}" value="${esc(ev.date)}" /></div>
      </div>
      <div class="field">
        <label for="f-time">Time</label>
        <div class="with-icon">${icon('clock',{size:15,color:'var(--muted2)'})}<input id="f-time" type="time" value="${esc(ev.time)}" /></div>
      </div>
    </div>

    <div class="field">
      <label for="f-guests">Expected guests</label>
      <div class="with-icon">${icon('users',{size:15,color:'var(--muted2)'})}<input id="f-guests" type="number" inputmode="numeric" min="10" max="5000" step="10" placeholder="e.g. 250" value="${esc(ev.guests)}" /></div>
      <p class="hint">Catering is priced per head, so this sets your catering estimate.</p>
    </div>

    <div class="field">
      <label for="f-location">Location</label>
      <div class="with-icon">${icon('mapPin',{size:15,color:'var(--muted2)'})}<input id="f-location" type="text" maxlength="120" placeholder="Venue name or address, e.g. Kallady Community Hall" value="${esc(ev.location)}" /></div>
    </div>

    <p class="error-text" id="formError" role="alert" style="display:none;"></p>

    <button type="submit" class="btn-gold btn-gold-block" id="continueBtn">
      ${state.event ? 'Save changes' : 'Save and find vendors'} ${icon('arrowRight',{size:15,color:'#fff'})}
    </button>
    </form>
  </div>`;
}

function renderServices(){
  return `
  <div class="section" style="padding-top:24px;">
    <h1 class="page-title">Select services</h1>
    <p class="page-sub">Pick a category to see vendors${state.event ? ' free on '+fmtDate(state.event.date,{day:'numeric',month:'short'}) : ''}.</p>
    <div class="cat-grid services">
      ${CATEGORIES.map(c => {
        const held = state.cart.some(x=>x.category===c.id);
        return `
        <button class="cat-card bordered${held?' held':''}" data-action="category" data-id="${esc(c.id)}">
          <div class="service-category-image">${designPhoto(c.id)}</div>
          <div>
            <div class="cat-name">${esc(c.name)}</div>
            <div class="cat-note">${held ? 'On your hold list' : esc(c.note)}</div>
          </div>
        </button>`;}).join('')}
    </div>
  </div>`;
}

function renderCategory(id){
  const cat = CATEGORIES.find(c=>c.id===id);
  if(!cat) return renderNotFound();
  const vendors = VENDORS.filter(v=>v.category===id && !v.suspended).sort((a,b)=>b.rating-a.rating);
  const availableCount = vendors.filter(v=>availabilityFor(v.id, state.event?.date)==='available').length;
  const subtitle = state.event
    ? `Sorted by rating · ${availableCount} of ${vendors.length} vendors free on ${fmtDate(state.event.date,{day:'numeric',month:'short'})}`
    : `Sorted by rating · ${vendors.length} vendors in Batticaloa`;
  return `
  <div class="section" style="padding-top:24px;">
    <button class="back-btn" data-action="go-home">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} All categories</button>
    <div class="category-heading"><div><p class="eyebrow" style="margin-top:20px;">THE PEOPLE WHO MAKE IT HAPPEN</p><h1 class="page-title">${esc(cat.name)}</h1><p class="page-sub">${subtitle}</p></div><img src="assets/${DESIGN_PHOTOS[id][0]}.jpg" alt="Illustrative ${esc(cat.name)} inspiration"></div>
    ${!state.event ? `
    <button class="event-nudge" data-action="create-event-cat" data-id="${esc(id)}">
      ${icon('calendar',{size:13,color:COLOR.greenDeep})} Add your event date to see who's actually free
    </button>` : ''}
    <div class="vendor-grid" style="margin-top:16px;">${vendors.map(vendorCard).join('')}</div>
  </div>`;
}

function renderVendor(id){
  const v = VENDORS.find(x=>x.id===id);
  if(!v) return renderNotFound();
  const status = availabilityFor(v.id, state.event?.date);
  const inCart = state.cart.some(c=>c.id===v.id);
  const saved = state.wishlist.has(v.id);
  const cat = CATEGORIES.find(c=>c.id===v.category) || { name:'Vendors' };
  const vd = getVendorData(v.id);
  const packages = vd.packages.length ? vd.packages : [{ id:'base', name:'Standard', price:v.priceFrom, inclusions:[] }];
  const portfolio = vd.portfolio;
  const thread = getThread(v.id);
  const similar = getBackups(v);
  const firstWord = esc(v.name.split(' ')[0]);

  return `
  <div class="section" style="padding-top:20px;">
    <div class="detail-nav">
      <button class="back-btn" data-action="category" data-id="${esc(v.category)}">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} ${esc(cat.name)}</button>
      <div class="detail-tools">
        <button class="icon-btn" data-action="share-vendor" data-id="${v.id}" aria-label="Share this vendor">${icon('share',{size:16})}</button>
        <button class="icon-btn${saved?' on':''}" data-action="wishlist" data-id="${v.id}" aria-pressed="${saved}" aria-label="${saved?'Remove from':'Save to'} saved vendors">${icon('heart',{size:16,filled:saved,color:saved?COLOR.coral:'currentColor'})}</button>
      </div>
    </div>
    <div class="detail-hero">${categoryHeroBanner(v.category, 56, v.id)}</div>
    <div class="detail-top">
      <h1 class="detail-title serif">${esc(v.name)}</h1>
      ${statusBadge(status)}
    </div>
    <div class="detail-meta">
      <span>${icon('mapPin',{size:13,color:'var(--muted)'})} ${esc(v.area)}, Batticaloa</span>
      <span>${v.reviews ? `${icon('star',{size:13,color:COLOR.star,filled:true})} ${v.rating} · ${v.reviews} verified bookings` : 'New on Vendeze'}</span>
    </div>
    <p class="detail-blurb">${esc(v.blurb)}</p>
    ${!state.event ? `<button class="event-nudge" data-action="create-event" style="margin:-8px 0 8px;">${icon('calendar',{size:13,color:COLOR.greenDeep})} Add your event date to check availability</button>` : ''}

    ${portfolio.length ? `
    <h2 class="subhead serif">Previous work</h2>
    <div class="portfolio-grid">
      ${portfolio.map((p, i) => `<div class="portfolio-card"><div class="portfolio-img">${categoryHeroBanner(v.category, 22, i + v.id)}</div><div class="portfolio-title">${esc(p.title)}</div></div>`).join('')}
    </div>` : ''}

    <h2 class="subhead serif">Packages</h2>
    <div class="package-list" id="packageList" role="radiogroup" aria-label="Packages">
      ${packages.map((p,i) => `
        <button class="package-card${i===0?' active':''}" role="radio" aria-checked="${i===0}" data-price="${p.price}" data-name="${esc(p.name)}">
          <div class="package-top">
            <span class="package-name">${esc(p.name)}</span>
            <span class="package-price mono">${priceLine(v, p.price)}</span>
          </div>
          ${p.inclusions && p.inclusions.length ? `<ul class="package-inclusions">${p.inclusions.map(inc=>`<li>${esc(inc)}</li>`).join('')}</ul>` : ''}
          ${p.supportsLaterPayment ? `<span class="package-tag">Final payment after delivery</span>` : ''}
        </button>`).join('')}
    </div>
    ${v.priceUnit ? `<p class="mini-hint" id="headEstimate">${headEstimate(packages[0].price)}</p>` : ''}

    <div class="info-note">${icon('clock',{size:13,color:'var(--text2)'})}<p>${window.VENDEZE_UI_PREVIEW ? 'Try a package and add it to your sample hold list. This preview does not reserve a vendor.' : 'Holding a vendor reserves your date for 24 hours while our call agents confirm directly with them. No payment needed to hold.'}</p></div>

    <h2 class="subhead serif">Message ${firstWord}</h2>
    <p class="mini-hint">Ask questions or negotiate the price directly.</p>
    <div class="chat-box">
      <div class="chat-log" id="chatLog" role="log" tabindex="0" aria-label="Vendor conversation" aria-live="polite">
        ${thread.map(m => `<div class="chat-bubble ${m.from==='me'?'me':'vendor'}">${esc(m.text)}</div>`).join('')}
      </div>
      <form class="chat-input-row" id="chatForm">
        <input id="chatInput" type="text" maxlength="500" placeholder="Type a message or an offer…" aria-label="Message ${esc(v.name)}" />
        <button type="submit" id="chatSendBtn" class="btn-gold chat-send" aria-label="Send message">Send</button>
      </form>
      <button id="chatOfferBtn" class="chat-offer-btn">${icon('sparkle',{size:12,color:COLOR.greenDeep})} Offer 10% less than asking</button>
    </div>

    ${similar.length ? `
    <h2 class="subhead serif">Similar ${esc(cat.name.toLowerCase())} vendors</h2>
    <div class="vendor-grid" style="margin-bottom:24px;">${similar.map(v => renderEditorialVendorCard(v, 3)).join('')}</div>` : ''}
  </div>
  <div class="book-bar">
    <div style="min-width:0;">
      <div class="book-bar-label mono">${v.priceUnit ? 'Per head' : 'Total'}</div>
      <div class="book-bar-price mono" id="bookBarPrice">${priceLine(v, packages[0].price)}</div>
    </div>
    ${status==='booked'
      ? `<div class="btn-outline-disabled">Not available on your date</div>`
      : inCart
        ? `<button class="btn-gold btn-done" data-action="cart">On hold list · View ${icon('arrowRight',{size:15,color:'#fff'})}</button>`
        : `<button class="btn-gold" id="holdBtn">Hold this vendor ${icon('arrowRight',{size:15,color:'#fff'})}</button>`
    }
  </div>`;
}
function headEstimate(price){
  return `≈ <strong class="mono">${money(price*guestCount())}</strong> for ${guestCount()} guests${state.event ? '' : ' (default — set your guest count in your event)'}`;
}

function setupVendorScreen(vendorId){
  const v = VENDORS.find(x=>x.id===vendorId);
  if(!v) return;

  document.querySelectorAll('#packageList .package-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#packageList .package-card').forEach(c=>{ c.classList.remove('active'); c.setAttribute('aria-checked','false'); });
      card.classList.add('active'); card.setAttribute('aria-checked','true');
      const price = Number(card.dataset.price);
      const bookBarPrice = document.getElementById('bookBarPrice');
      if(bookBarPrice) bookBarPrice.innerHTML = priceLine(v, price);
      const est = document.getElementById('headEstimate');
      if(est) est.innerHTML = headEstimate(price);
    });
  });

  const holdBtn = document.getElementById('holdBtn');
  if(holdBtn){
    holdBtn.addEventListener('click', () => {
      const active = document.querySelector('#packageList .package-card.active');
      const price = active ? Number(active.dataset.price) : v.priceFrom;
      const pkgName = active ? active.dataset.name : null;
      addToCart(v.id, price, pkgName);
    });
  }

  const chatLog = document.getElementById('chatLog');
  const chatInput = document.getElementById('chatInput');
  chatLog.scrollTop = chatLog.scrollHeight;
  function pushMessage(from, text){
    getThread(v.id).push({ from, text });
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${from}`;
    bubble.textContent = text;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    saveState();
  }
  function vendorAutoReply(){
    const replies = [
      "Thanks for reaching out — that date looks workable, let me check our calendar.",
      "We can work with that budget if you go with the standard package.",
      "Sure, happy to hold this price for you if you confirm within 24 hours.",
    ];
    const typing = document.createElement('div');
    typing.className = 'chat-bubble vendor typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    setTimeout(() => { chatLog.appendChild(typing); chatLog.scrollTop = chatLog.scrollHeight; }, 250);
    setTimeout(() => { typing.remove(); pushMessage('vendor', replies[Math.floor(Math.random()*replies.length)]); }, 1300);
  }
  document.getElementById('chatForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if(!text) return;
    pushMessage('me', text);
    chatInput.value = '';
    vendorAutoReply();
  });
  document.getElementById('chatOfferBtn').addEventListener('click', () => {
    const active = document.querySelector('#packageList .package-card.active');
    const price = active ? Number(active.dataset.price) : v.priceFrom;
    const offer = Math.round(price*0.9/100)*100;
    pushMessage('me', `Would you consider ${money(offer)}${v.priceUnit?' per head':''} for this package?`);
    vendorAutoReply();
  });
}

async function shareVendor(id){
  const v = VENDORS.find(x=>x.id===id);
  if(!v) return;
  const url = location.href.split('#')[0] + '#/vendor/' + id;
  const data = { title: v.name + ' on Vendeze', text: `${v.name} — ${v.blurb}`, url };
  try {
    if(navigator.share){ await navigator.share(data); return; }
    await navigator.clipboard.writeText(url);
    showToast('Link copied');
  } catch(e){
    if(e && e.name === 'AbortError') return;
    showToast('Couldn’t share — copy the address bar link instead');
  }
}

function renderCart(){
  const cart = state.cart;
  const event = state.event;
  if(cart.length===0){
    return `
    <div class="cart-empty">
      ${icon('shoppingBag',{size:28,color:'var(--muted2)'})}
      <h1 class="page-title" style="font-size:20px;">Your hold list is empty</h1>
      <p>Hold vendors for 24 hours while we confirm them — no payment needed.</p>
      <button class="btn-gold" data-action="services">Browse vendors</button>
    </div>`;
  }
  const t = cartTotals();
  const nextTier = t.cats.size===1 ? 'Add 1 more service type to save 5%.' : t.cats.size===2 ? 'Add 1 more service type to save 10%.' : '';

  return `
  <div class="cart-wrap">
    <h1 class="page-title">Your hold list</h1>
    <p class="page-sub">${window.VENDEZE_UI_PREVIEW ? 'Your sample selection, all in one place. No vendors have been reserved.' : 'These vendors are held for 24 hours while we confirm with them directly.'}</p>
    ${event ? `
    <div class="event-recap">
      <span class="name">${esc(event.name)}</span>
      <span>${icon('calendar',{size:12,color:'var(--text2)'})} ${fmtDate(event.date)}</span>
      <span>${icon('clock',{size:12,color:'var(--text2)'})} ${esc(event.time)}</span>
      <span>${icon('users',{size:12,color:'var(--text2)'})} ${guestCount()} guests</span>
      <span>${icon('mapPin',{size:12,color:'var(--text2)'})} ${esc(event.location)}</span>
    </div>` : `
    <div class="warn-note">${icon('calendar',{size:14,color:COLOR.gold})}<div><strong>Add your event details before checkout.</strong> Vendors need your date to confirm the hold.<br/><button class="link-btn" data-action="create-event">Add event details</button></div></div>`}
    ${cart.map(c => {
      const v = VENDORS.find(x=>x.id===c.id);
      const backups = v ? getBackups(v).map(b=>esc(b.name)).join(', ') : '';
      return `
      <div class="cart-item">
        <div style="min-width:0;">
          <button class="cart-item-name link-plain" data-action="vendor" data-id="${c.id}">${esc(c.name)}</button>
          <div class="cart-item-cat">${esc(CATEGORIES.find(cat=>cat.id===c.category)?.name || '')}${c.packageName?' · '+esc(c.packageName):''}</div>
          ${c.priceUnit==='head' ? `<div class="cart-item-cat mono">${money(c.price)} × ${guestCount()} guests</div>` : ''}
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price mono">${money(lineTotal(c))}</span>
          <button class="remove-btn" data-action="remove-cart" data-id="${c.id}" aria-label="Remove ${esc(c.name)}">${icon('x',{size:16,color:'var(--muted2)'})}</button>
        </div>
      </div>
      <div class="backup-note">
        ${icon('check',{size:11,color:COLOR.greenDeep})} ${window.VENDEZE_UI_PREVIEW ? 'Added to your sample selection.' : 'Locked to you while held.'}
        ${backups ? `<div class="backup-list">${window.VENDEZE_UI_PREVIEW ? 'Similar vendors to explore' : 'Backups on standby'}: ${backups}</div>` : ''}
      </div>`;}).join('')}
    ${t.rate>0 ? `
    <div class="bundle-note">${icon('sparkle',{size:13,color:COLOR.greenDeep})} Bundle discount applied — ${t.cats.size} service types together saves ${(t.rate*100).toFixed(0)}%. ${nextTier}</div>`
    : `<div class="bundle-note muted">${icon('sparkle',{size:13,color:COLOR.greenDeep})} ${nextTier} <button class="link-btn" data-action="services">Add a service</button></div>`}
    <div class="summary-card">
      <div class="sum-row muted"><span>Subtotal</span><span class="mono">${money(t.subtotal)}</span></div>
      ${t.discount>0 ? `<div class="sum-row discount"><span>Bundle discount</span><span class="mono">− ${money(t.discount)}</span></div>` : ''}
      <div class="sum-row bold sum-total"><span>Estimated total</span><span class="mono">${money(t.total)}</span></div>
    </div>
    ${event
      ? `<button class="btn-gold btn-gold-block" data-action="checkout">Proceed to checkout ${icon('arrowRight',{size:15,color:'#fff'})}</button>`
      : `<button class="btn-gold btn-gold-block" data-action="create-event">Add event details to continue ${icon('arrowRight',{size:15,color:'#fff'})}</button>`}
    <button class="btn-text-block" data-action="services">+ Hold another vendor</button>
  </div>`;
}

function checkoutAmounts(){
  const t = cartTotals();
  const advance = Math.round(t.total*0.25/100)*100;
  return { ...t, advance };
}

function renderCheckout(){
  if(!state.cart.length) return renderCart();
  if(!state.event) return renderCart();
  const a = checkoutAmounts();
  const u = state.user;
  return `
  <div class="cart-wrap">
    <button class="back-btn" data-action="cart">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Hold list</button>
    <h1 class="page-title" style="margin-top:16px;">Checkout</h1>
    <p class="page-sub">${window.VENDEZE_UI_PREVIEW ? 'Explore the booking flow with sample details. No payment is collected.' : "Confirm your contact details and choose how you'd like to pay."}</p>

    <form id="checkoutForm" novalidate>
    <h2 class="subhead" style="margin-top:0;">Contact</h2>
    <div class="field">
      <label for="co-name">Full name</label>
      <input id="co-name" type="text" autocomplete="name" value="${esc(u ? u.name : (state.contact?.name || ''))}" placeholder="Your name" />
    </div>
    <div class="field">
      <label for="co-phone">Mobile number</label>
      <div class="with-icon">${icon('phone',{size:15,color:'var(--muted2)'})}<input id="co-phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(state.contact?.phone || '')}" placeholder="07X XXX XXXX" /></div>
      <p class="hint">Our call agent will use this to confirm each vendor.</p>
    </div>

    <h2 class="subhead">Payment</h2>
    <div class="pay-options" id="payOptions" role="radiogroup" aria-label="Payment option">
      <button type="button" role="radio" aria-checked="true" class="pay-card active" data-type="advance">
        <div class="pay-top"><span>Pay advance</span><span class="mono">${money(a.advance)}</span></div>
        <p>Pay 25% now to lock the booking, settle the rest on your event date.</p>
      </button>
      <button type="button" role="radio" aria-checked="false" class="pay-card" data-type="full">
        <div class="pay-top"><span>Pay in full</span><span class="mono">${money(a.total)}</span></div>
        <p>Pay the entire amount now — nothing due on the day.</p>
      </button>
    </div>

    <div class="summary-card">
      ${state.cart.map(c=>`<div class="sum-row muted"><span>${esc(c.name)}</span><span class="mono">${money(lineTotal(c))}</span></div>`).join('')}
      ${a.discount>0 ? `<div class="sum-row discount"><span>Bundle discount</span><span class="mono">− ${money(a.discount)}</span></div>` : ''}
      <div class="sum-row muted sum-total"><span>Event total</span><span class="mono">${money(a.total)}</span></div>
      <div class="sum-row bold" id="dueNowRow"><span>Due now</span><span class="mono">${money(a.advance)}</span></div>
      <div class="sum-row muted" id="dueLaterRow"><span>Due on event date</span><span class="mono">${money(a.total-a.advance)}</span></div>
    </div>

    <p class="error-text" id="checkoutError" role="alert" style="display:none;"></p>
    <button type="submit" class="btn-gold btn-gold-block" id="payBtn">${window.VENDEZE_UI_PREVIEW ? 'Preview booking' : 'Confirm booking'} ${icon('arrowRight',{size:15,color:'#fff'})}</button>
    <p class="login-note" style="text-align:center;">${icon('shield',{size:12,color:'var(--muted2)'})} Payments are only taken once each vendor is confirmed by phone.</p>
    </form>
  </div>`;
}

function normalisePhone(raw){
  const d = String(raw||'').replace(/[\s\-()]/g,'');
  if(/^0\d{9}$/.test(d)) return d;
  if(/^\+94\d{9}$/.test(d)) return '0'+d.slice(3);
  if(/^94\d{9}$/.test(d)) return '0'+d.slice(2);
  return null;
}

function setupCheckoutScreen(){
  const form = document.getElementById('checkoutForm');
  if(!form) return;
  const cart = state.cart;
  const a = checkoutAmounts();
  const { total, advance } = a;

  document.querySelectorAll('#payOptions .pay-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#payOptions .pay-card').forEach(c=>{ c.classList.remove('active'); c.setAttribute('aria-checked','false'); });
      card.classList.add('active'); card.setAttribute('aria-checked','true');
      const isAdvance = card.dataset.type === 'advance';
      document.getElementById('dueNowRow').innerHTML = `<span>Due now</span><span class="mono">${money(isAdvance?advance:total)}</span>`;
      document.getElementById('dueLaterRow').style.display = isAdvance ? 'flex' : 'none';
    });
  });
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const err = document.getElementById('checkoutError');
    const name = document.getElementById('co-name').value.trim();
    const phone = normalisePhone(document.getElementById('co-phone').value);
    err.style.display = 'none';
    if(!name){ err.textContent = 'Enter your name.'; err.style.display='block'; markFieldInvalid('co-name', 'checkoutError'); return; }
    if(!phone){ err.textContent = 'Enter a valid Sri Lankan mobile number, e.g. 077 123 4567.'; err.style.display='block'; markFieldInvalid('co-phone', 'checkoutError'); return; }
    state.contact = { name, phone };

    const payBtn = document.getElementById('payBtn');
    payBtn.disabled = true; payBtn.textContent = 'Confirming…';

    const active = document.querySelector('#payOptions .pay-card.active');
    const isAdvance = active ? active.dataset.type === 'advance' : true;
    state.checkout = {
      paymentType: isAdvance ? 'advance' : 'full',
      amountNow: isAdvance ? advance : total,
      amountLater: isAdvance ? total - advance : 0,
      total,
      ref: 'VZ-' + Date.now().toString(36).toUpperCase().slice(-6),
      phone,
    };
    const customerName = name;

    // Mirror the checkout to the backend — it independently creates the
    // real Booking rows and notifications (BookingService.checkout). Never
    // blocks the local flow on failure.
    if(typeof apiCheckout === 'function' && state.user && state.authToken){
      try {
        await apiCheckout(isAdvance ? 'ADVANCE' : 'FULL', customerName);
        state.backendCheckoutConfirmed = true;
      } catch(e){
        console.warn('Vendeze: checkout did not reach the backend — confirmed locally only.', e.message);
        state.backendCheckoutConfirmed = false;
      }
    }

    const eventName = state.event ? state.event.name : 'Event';
    const ratio = state.checkout.amountNow / total;
    const discountRatio = total / (a.subtotal || 1);
    cart.forEach(c => {
      const amount = Math.round(lineTotal(c) * discountRatio);
      const itemPaid = Math.round(amount * ratio / 100) * 100;
      const itemDue = amount - itemPaid;
      state.bookings.push({
        id: `bk-${Date.now()}-${c.id}`,
        vendorId: c.id,
        customerKey: customerKey(),
        customerName,
        eventName,
        date: state.event ? state.event.date : '',
        amount,
        packageName: c.packageName,
        source: 'app',
        paymentType: state.checkout.paymentType,
        amountPaid: itemPaid,
        amountDue: itemDue,
        ref: state.checkout.ref,
        vendorStatus: 'pending',            // vendor must accept or decline
        guests: guestCount(), time: state.event ? state.event.time : '', location: state.event ? state.event.location : '',
        phone, createdAt: Date.now(),
      });
      const bk = state.bookings[state.bookings.length-1];
      pushNotification('bell', 'New job request', `${customerName} wants to book you for "${eventName}" on ${fmtDate(bk.date,{day:'numeric',month:'short'})} — ${money(amount)}. Tap to accept or decline.`, 'vendor', c.id, { link:'job', bookingId: bk.id });
    });
    const vendorNames = cart.map(c=>c.name).join(', ');
    pushNotification('check', window.VENDEZE_UI_PREVIEW ? 'Sample booking created' : 'Booking sent to vendors', window.VENDEZE_UI_PREVIEW ? `Your preview includes ${vendorNames}. No vendor has been contacted.` : `${vendorNames} have your request (ref ${state.checkout.ref}). We'll tell you as each one accepts.`, 'customer');
    pushNotification('wallet', window.VENDEZE_UI_PREVIEW ? 'Sample payment option' : isAdvance ? 'Advance payment received' : 'Payment complete',
      window.VENDEZE_UI_PREVIEW ? 'Your payment selection was saved in this preview. No payment was taken.' : isAdvance ? `${money(state.checkout.amountNow)} paid now. ${money(state.checkout.amountLater)} due on your event date.`
                : `${money(state.checkout.amountNow)} paid in full — nothing due on the day.`, 'customer');
    state.lastOrder = cart.map(c => ({ ...c, lineTotal: lineTotal(c) }));
    state.cart = [];
    navigate({ name:'confirm' });
  });
}

function renderConfirm(){
  const event = state.event;
  const order = state.lastOrder || [];
  const co = state.checkout;
  if(!co) return renderNotFound();
  return `
  <div class="confirm-wrap">
    <div class="confirm-burst"><img src="icons/logo-mark-dark.png" alt="" width="64" height="83" /></div>
    <h1 class="confirm-title serif">${window.VENDEZE_UI_PREVIEW ? 'Your preview is ready.' : "You're booked!"}</h1>
    <p class="confirm-sub">${window.VENDEZE_UI_PREVIEW ? 'Your sample booking is saved in this browser. No vendor was contacted and no payment was taken.' : `A call agent will confirm final availability with each vendor and call <strong>${esc(co.phone || 'you')}</strong> within 24 hours.`}</p>
    <div class="confirm-card">
      <div class="k mono">Booking ref · ${esc(co.ref || '—')}</div>
      <div class="confirm-row"><span class="l">Method</span><span class="r">${co.paymentType === 'advance' ? 'Advance (25%)' : 'Full payment'}</span></div>
      <div class="confirm-row"><span class="l">${window.VENDEZE_UI_PREVIEW ? 'Sample amount' : 'Paid now'}</span><span class="r mono">${money(co.amountNow)}</span></div>
      ${co.amountLater>0 ? `<div class="confirm-row"><span class="l">Due on event date</span><span class="r mono">${money(co.amountLater)}</span></div>` : ''}
    </div>
    ${event ? `
    <div class="confirm-card">
      <div class="k mono">Event details</div>
      <div class="confirm-row"><span class="l">Event</span><span class="r">${esc(event.name)} · ${esc(event.type)}</span></div>
      <div class="confirm-row"><span class="l">Date & time</span><span class="r">${fmtDate(event.date)}, ${esc(event.time)}</span></div>
      <div class="confirm-row"><span class="l">Location</span><span class="r">${esc(event.location)}</span></div>
      <div class="confirm-divider">
        ${order.map(c=>`<div class="confirm-row"><span class="l" style="color:var(--text2)">${esc(c.name)}</span><span class="r mono">${money(c.lineTotal ?? c.price)}</span></div>`).join('')}
      </div>
    </div>
    <button class="btn-outline-block" data-action="add-calendar" style="margin-bottom:10px;">${icon('calendar',{size:15})} Add to calendar</button>` : ''}
    <button class="btn-outline-block" data-action="my-bookings" style="margin-bottom:10px;">${icon('bookmark',{size:15})} View my bookings</button>
    <button class="btn-gold btn-gold-block" data-action="reset">Back to home</button>
  </div>`;
}

/* Downloads a standard .ics file so the event lands in any calendar app. */
function downloadEventICS(){
  const e = state.event; if(!e) return;
  const pad = n => String(n).padStart(2,'0');
  const [y,m,d] = e.date.split('-').map(Number);
  const [hh,mm] = (e.time||'09:00').split(':').map(Number);
  const start = `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
  const endH = Math.min(23, hh+4);
  const end = `${y}${pad(m)}${pad(d)}T${pad(endH)}${pad(mm)}00`;
  const icsEsc = s => String(s||'').replace(/[\\,;]/g, x=>'\\'+x).replace(/\n/g,'\\n');
  const vendors = (state.lastOrder||[]).map(c=>c.name).join(', ');
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Vendeze//EN','BEGIN:VEVENT',
    `UID:${Date.now()}@vendeze.lk`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').slice(0,15)}Z`,
    `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:${icsEsc(e.name)}`, `LOCATION:${icsEsc(e.location)}`,
    `DESCRIPTION:${icsEsc('Booked on Vendeze' + (vendors ? ': ' + vendors : ''))}`, 'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type:'text/calendar' }));
  a.download = (e.name.replace(/[^\w]+/g,'-').replace(/^-|-$/g,'') || 'event') + '.ics';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}

/* ============================================================
   SUMMARY BAR
============================================================ */
function renderSummaryBar(){
  const slot = document.getElementById('summaryBarSlot');
  const showOn = ["services","category","vendor","cart","checkout","search"];
  if(!state.event || !showOn.includes(state.view.name)){
    slot.innerHTML = '';
    slot.removeAttribute('role');
    slot.removeAttribute('aria-label');
    return;
  }
  slot.setAttribute('role', 'region');
  slot.setAttribute('aria-label', 'Current event');
  const e = state.event;
  slot.innerHTML = `
  <div class="summary-bar">
    <div class="summary-inner">
      <div class="summary-facts">
        <span class="name">${esc(e.name || 'Untitled event')}</span>
        <span>${icon('calendar',{size:12,color:'var(--text2)'})} ${fmtDate(e.date)}</span>
        <span>${icon('users',{size:12,color:'var(--text2)'})} ${guestCount()}</span>
        <span>${icon('clock',{size:12,color:'var(--text2)'})} ${esc(e.time || '—')}</span>
        <span>${icon('mapPin',{size:12,color:'var(--text2)'})} ${esc(e.location || '—')}</span>
      </div>
      <button class="summary-edit" data-action="create-event">Edit</button>
    </div>
  </div>`;
}

function customerNavItems(){
  const v = state.view.name;
  return [
    { label:'Discover', icon:'home', action:'go-home', isActive: v==='home' },
    { label:'Vendors', icon:'search', action:'search', isActive: v==='search' || v==='services' || v==='category' },
    { label:'Saved', icon:'heart', action:'saved', isActive: v==='saved', badge: state.wishlist.size, quiet:true },
    { label:'Hold list', icon:'shoppingBag', action:'cart', isActive: v==='cart'||v==='checkout', badge: state.cart.length },
    { label:'Bookings', icon:'bookmark', action:'my-bookings', isActive: v==='myBookings' },
  ];
}

function renderBottomNav(){
  const slot = document.getElementById('bottomNavSlot');
  const role = state.user ? state.user.role : 'customer';
  const isDesktop = window.innerWidth >= 1024;
  if(role !== 'customer' || state.view.name === 'login'){
    slot.innerHTML = '';
    document.body.style.paddingBottom = '0';
    setToastOffset(24);
    return;
  }
  if(state.view.name === 'vendor' && VENDORS.some(x=>x.id===state.view.id)){
    slot.innerHTML = '';
    document.body.style.paddingBottom = '90px';
    setToastOffset(96);
    return;
  }
  if(isDesktop){
    slot.innerHTML = '';
    document.body.style.paddingBottom = '0';
    setToastOffset(28);
    return;
  }
  const v = state.view.name;
  const showMini = state.cart.length > 0 && ['home','services','category','search','saved'].includes(v);
  slot.innerHTML = `
  ${showMini ? `
  <button class="mini-cart-bar" data-action="cart">
    <span class="mini-cart-count">${state.cart.length}</span>
    <span>View hold list</span>
    <span class="mini-cart-total mono">${money(cartTotals().total)}</span>
    ${icon('arrowRight',{size:14,color:'#fff'})}
  </button>` : ''}
  <nav class="bottom-nav" aria-label="Main">
    ${customerNavItems().map(i => `
      <button class="bn-item${i.isActive?' active':''}" data-action="${i.action}" ${i.isActive?'aria-current="page"':''}>
        <span class="bn-icon-wrap">
          ${icon(i.icon,{size:19,color: i.isActive ? COLOR.gold : 'var(--muted2)', filled: i.isActive && i.icon==='heart'})}
          ${i.badge ? `<span class="bn-badge${i.quiet?' quiet':''}">${i.badge}</span>` : ''}
        </span>
        <span class="bn-label">${i.label}</span>
      </button>`).join('')}
  </nav>`;
  document.body.style.paddingBottom = showMini ? '132px' : '76px';
  setToastOffset(showMini ? 144 : 88);
}
function setToastOffset(px){ document.documentElement.style.setProperty('--toast-offset', px + 'px'); }

function renderMyBookings(){
  const mine = state.bookings.filter(b => b.customerKey === customerKey());
  const groups = {};
  mine.forEach(b => { (groups[b.ref || b.id] = groups[b.ref || b.id] || []).push(b); });
  const refs = Object.keys(groups).reverse();
  return `
  <div class="section" style="padding-top:24px;">
    <h1 class="page-title">Your bookings</h1>
    <p class="page-sub">Your event bookings and vendor responses, in one place.</p>
    ${refs.length ? refs.map(ref => {
      const list = groups[ref];
      const paid = list.reduce((s,b)=>s+(b.amountPaid||0),0);
      const due = list.reduce((s,b)=>s+(b.amountDue||0),0);
      const d = daysUntil(list[0].date);
      return `
      <div class="booking-group">
        <div class="booking-head">
          <div style="min-width:0;">
            <div class="dash-row-title">${esc(list[0].eventName)}</div>
            <div class="dash-row-sub">${list[0].date ? fmtDate(list[0].date) : 'Date TBD'}${d!=null && d>=0 ? ` · ${d===0?'today':d+' days to go'}` : ''} · <span class="mono">${esc(ref)}</span></div>
          </div>
          ${list.every(b=>!b.vendorStatus || b.vendorStatus==='accepted') ? '<span class="status-pill confirmed">all confirmed</span>' : '<span class="status-pill pending">in progress</span>'}
        </div>
        <div class="dash-list" style="margin:10px 0 0;">
          ${list.map(b => {
            const v = VENDORS.find(x=>x.id===b.vendorId);
            return `
            <div class="dash-row${state.focusBooking===b.id?' focus':''}" id="bk-${esc(b.id)}">
              <div>
                <div class="dash-row-title">${esc(v ? v.name : 'Vendor')}</div>
                <div class="dash-row-sub">${esc(b.packageName || (v ? CATEGORIES.find(c=>c.id===v.category)?.name : '') || '')}</div>
              </div>
              <div class="dash-row-right"><span class="mono">${money(b.amount)}</span><span class="status-pill ${b.vendorStatus||'confirmed'}">${b.vendorStatus==='pending'?'awaiting vendor':b.vendorStatus||'confirmed'}</span></div>
            </div>`;}).join('')}
        </div>
        <div class="booking-foot"><span>Paid <strong class="mono">${money(paid)}</strong></span>${due>0?`<span>Due on the day <strong class="mono">${money(due)}</strong></span>`:'<span>Fully paid</span>'}</div>
      </div>`;}).join('') : `
    <div class="cart-empty" style="padding:48px 0;">
      ${icon('bookmark',{size:26,color:'var(--muted2)'})}
      <p>No bookings yet — vendors you check out with will show up here.</p>
      <button class="btn-gold" data-action="services">Browse vendors</button>
    </div>`}
  </div>`;
}

function renderNotFound(){
  return `
  <section class="not-found-page" aria-labelledby="notFoundTitle">
    <div class="not-found-copy">
      <p class="not-found-label">404 · A little off the map</p>
      <h1 id="notFoundTitle">A detour isn’t the end of the story.</h1>
      <p class="not-found-description">We couldn’t find this page. There’s still something wonderful to plan, and good people to discover.</p>
      <div class="not-found-actions"><button class="marketplace-button" data-action="go-home">Back to home</button><button class="marketplace-button light" data-action="search">Explore vendors</button></div>
      <p class="not-found-thought">A different path can still lead to a beautiful day.</p>
    </div>
    <div class="not-found-art" aria-hidden="true">
      <svg class="not-found-path" viewBox="0 0 500 420" fill="none"><path class="not-found-path-soft" d="M32 300C100 360 100 60 240 75s228 150 175 220S160 360 180 230 350 45 465 95"/><path class="not-found-path-dashed" d="M32 300C100 360 100 60 240 75s228 150 175 220S160 360 180 230"/><circle cx="32" cy="300" r="7"/><circle cx="465" cy="95" r="7"/><path d="M450 82v-17m-8 8h16"/></svg>
      <div class="not-found-number"><span>4</span><span class="not-found-zero"><img src="icons/logo-mark-dark.png" alt="" width="57" height="74"></span><span>4</span></div>
      <span class="not-found-art-note">Every path holds a possibility.</span>
    </div>
  </section>`;
}

/* ============================================================
   MAIN RENDER / ROUTER
============================================================ */
const STAFF_VIEWS = { vendorDashboard:'vendor', admin:'admin', marketing:'admin', developer:'developer' };
function render(){
  setupMarketplaceNav.cleanup?.();
  setupSharedNavigation.cleanup?.();
  const app = document.getElementById('app');
  const header = document.getElementById('mainHeader');
  const previousView = render.previousView;
  const changedView = previousView !== JSON.stringify(state.view);
  render.previousView = JSON.stringify(state.view);
  document.body.classList.toggle('is-login', state.view.name === 'login');
  document.body.dataset.view = state.view.name;
  document.body.classList.remove('is-marketplace-home');
  if(state.view.name === 'login'){
    header.style.display = '';
    app.innerHTML = renderLogin();
    setupLoginScreen();
    closeNotifications();
    updateCartBadge();
    updateProfileChip();
    updateHeaderNav();
    updateNotifBadge();
    setupMarketplaceNav();
    applyCelebrationAppDesign();
    renderSummaryBar();
    document.getElementById('bottomNavSlot').innerHTML = '';
    document.getElementById('popupSlot').innerHTML = '';
    document.body.style.paddingBottom = '0';
    document.title = 'Sign In — Vendeze';
    window.scrollTo(0,0);
    saveState();
    focusPageHeading(changedView);
    return;
  }
  header.style.display = '';
  // role guard — a customer deep-linking to #/admin just lands on home
  const needRole = STAFF_VIEWS[state.view.name];
  const role = state.user ? state.user.role : 'customer';
  if(needRole && role !== needRole && !(state.view.name==='marketing' && role==='admin')){
    state.view = { name:'home' };
    history.replaceState(null, '', '#/');
  }
  document.body.classList.toggle('is-marketplace-home', state.view.name === 'home' && role === 'customer');
  document.body.dataset.view = state.view.name;
  switch(state.view.name){
    case 'createEvent': app.innerHTML = renderCreateEvent(); setupCreateEventScreen(); break;
    case 'services': app.innerHTML = renderServices(); break;
    case 'category': app.innerHTML = renderCategory(state.view.id); break;
    case 'vendor': app.innerHTML = renderVendor(state.view.id); setupVendorScreen(state.view.id); break;
    case 'search': app.innerHTML = renderSearch(); setupSearchScreen(); break;
    case 'saved': app.innerHTML = renderSaved(); break;
    case 'cart': app.innerHTML = renderCart(); break;
    case 'checkout': app.innerHTML = renderCheckout(); setupCheckoutScreen(); break;
    case 'confirm': app.innerHTML = renderConfirm(); break;
    case 'profile': app.innerHTML = renderProfile(); break;
    case 'myBookings': app.innerHTML = renderMyBookings();
      if(state.focusBooking){ const r = document.getElementById('bk-'+state.focusBooking); state.focusBooking = null; if(r) setTimeout(()=>r.scrollIntoView({ behavior:'smooth', block:'center' }), 80); }
      break;
    case 'vendorDashboard': app.innerHTML = renderVendorDashboard(); setupVendorDashboard(); break;
    case 'admin': app.innerHTML = renderAdmin(); setupAdminScreen(); break;
    case 'developer': app.innerHTML = renderDeveloper(); setupDeveloperScreen(); break;
    case 'marketing': app.innerHTML = renderMarketing(); setupMarketingScreen(); break;
    case 'notFound': app.innerHTML = renderNotFound(); break;
    default:
      if(role === 'vendor'){ app.innerHTML = renderVendorDashboard(); setupVendorDashboard(); }
      else if(role === 'developer'){ app.innerHTML = renderDeveloper(); setupDeveloperScreen(); }
      else if(role === 'admin'){ app.innerHTML = renderAdmin(); setupAdminScreen(); }
      else { app.innerHTML = renderHome(); setupHomeScreen(); }
  }
  const notifIcon = document.getElementById('notifIcon');
  if(notifIcon) notifIcon.innerHTML = icon('bell',{size:17,color:'#fff'});
  document.getElementById('notifPanel').style.display = 'none';
  document.getElementById('notifBtn').setAttribute('aria-expanded', 'false');
  renderSummaryBar();
  renderBottomNav();
  updateCartBadge();
  updateProfileChip();
  updateHeaderNav();
  applyCelebrationAppDesign();
  setupMarketplaceNav();
  updateNotifBadge();
  if(!window.VENDEZE_UI_PREVIEW) renderPopupIfNeeded();
  updatePageTitle();
  saveState();
  if(!state.view.keepScroll) window.scrollTo(0,0);
  focusPageHeading(changedView);
}

function focusPageHeading(changedView){
  if(!changedView || state.view.keepScroll || state.view.focus || document.documentElement.classList.contains('is-booting')) return;
  const heading = document.querySelector('#app h1');
  if(heading){ heading.tabIndex = -1; heading.focus({ preventScroll:true }); }
}

function updatePageTitle(){
  if(document.querySelector('.not-found-page')){ document.title = 'Page Not Found — Vendeze'; return; }
  const titles = {
    home: 'Vendeze — Plan · Book · Celebrate',
    createEvent: 'Your Event — Vendeze',
    services: 'Select Services — Vendeze',
    search: 'Search Vendors — Vendeze',
    saved: 'Saved Vendors — Vendeze',
    cart: 'Your Hold List — Vendeze',
    checkout: 'Checkout — Vendeze',
    confirm: 'Booking Confirmed — Vendeze',
    myBookings: 'Your Bookings — Vendeze',
    profile: 'Profile — Vendeze',
    vendorDashboard: 'Vendor Dashboard — Vendeze',
    admin: 'Admin — Vendeze',
    developer: 'Developer Tools — Vendeze',
    marketing: 'Ads & Notifications — Vendeze',
    notFound: 'Not Found — Vendeze',
  };
  let key = state.view.name;
  if(key === 'home' && state.user){
    if(state.user.role === 'vendor') key = 'vendorDashboard';
    else if(state.user.role === 'admin') key = 'admin';
    else if(state.user.role === 'developer') key = 'developer';
  }
  if(key === 'vendor'){ const v = VENDORS.find(x=>x.id===state.view.id); if(v){ document.title = v.name + ' — Vendeze'; return; } }
  if(key === 'category'){ const c = CATEGORIES.find(x=>x.id===state.view.id); if(c){ document.title = c.name + ' in Batticaloa — Vendeze'; return; } }
  document.title = titles[key] || 'Vendeze — Plan · Book · Celebrate';
}

function updateCartBadge(){
  const isCustomer = !state.user || state.user.role === 'customer';
  const btn = document.getElementById('cartBtn');
  btn.style.display = isCustomer ? '' : 'none';
  if(!isCustomer) return;
  document.getElementById('cartCount').textContent = state.cart.length;
  document.getElementById('cartIcon').innerHTML = icon('shoppingBag',{size:16,color:'#fff'});
  btn.classList.toggle('has-items', state.cart.length>0);
  btn.setAttribute('aria-label', `Hold list, ${state.cart.length} vendor${state.cart.length===1?'':'s'}`);
}

function updateProfileChip(){
  const chip = document.getElementById('profileChip');
  if(!chip) return;
  chip.innerHTML = `<span class="avatar-circle sm">${state.user ? esc(state.user.initials) : 'G'}</span>`;
  chip.setAttribute('aria-label', state.user ? `${state.user.initials} — ${state.user.name}, profile` : 'G — Guest profile');
}

function updateHeaderNav(){
  renderSharedNavigation();
}

// one shared notification store, filtered per viewer — a booking a customer
// makes shows up for the right vendor, an admin broadcast for its audience
function getMyNotifications(){
  const role = state.user ? state.user.role : 'customer';
  return state.notifications.filter(n => {
    if(n.audience !== role) return false;
    if(n.vendorId != null){
      if(!state.user || state.user.vendorId !== n.vendorId) return false;
    }
    return true;
  });
}
function renderNotifPanel(){
  const panel = document.getElementById('notifPanel');
  if(!panel) return;
  const mine = getMyNotifications();
  if(!mine.length){
    panel.innerHTML = `<div class="notif-panel-head"><span class="notif-panel-title">Notifications</span></div><div class="notif-empty">You're all caught up.</div>`;
    return;
  }
  const unread = mine.some(n=>!n.read);
  panel.innerHTML = `
    <div class="notif-panel-head">
      <span class="notif-panel-title">Notifications</span>
      ${unread ? `<button class="notif-panel-clear" data-action="clear-notifications">Mark all read</button>` : ''}
    </div>
    ${mine.map(n => `
      <div class="notif-item${n.read?'':' unread'}${n.link?' clickable':''}" ${n.link?`role="button" tabindex="0" data-action="open-notif" data-id="${esc(n.id)}"`:''}>
        <div class="notif-icon">${icon(ICONS[n.icon]?n.icon:'bell',{size:14,color:COLOR.greenDeep})}</div>
        <div style="min-width:0;">
          <div class="notif-body-title">${esc(n.title)}</div>
          <div class="notif-body-text">${esc(n.text)}</div>
          <div class="notif-body-time">${n.ts ? relTime(n.ts) : esc(n.time)}${n.link==='job' ? ' · <span class="notif-cta">View request</span>' : ''}</div>
        </div>
      </div>`).join('')}`;
}
function updateNotifBadge(){
  const badge = document.getElementById('notifBadge');
  if(!badge) return;
  const unread = getMyNotifications().filter(n=>!n.read).length;
  badge.textContent = unread > 9 ? '9+' : unread;
  badge.style.display = unread>0 ? 'flex' : 'none';
  document.getElementById('notifBtn')?.setAttribute('aria-label', `Notifications${unread?`, ${unread} unread`:''}`);
}
function toggleNotifPanel(){
  const panel = document.getElementById('notifPanel');
  const btn = document.getElementById('notifBtn');
  if(!panel || !btn) return;
  const showing = panel.style.display === 'block';
  btn.setAttribute('aria-expanded', String(!showing));
  if(showing){
    panel.style.display = 'none';
    return;
  }
  renderNotifPanel();
  panel.style.display = 'block';
  const btnRect = btn.getBoundingClientRect();
  const panelWidth = Math.min(340, window.innerWidth - 24);
  let left = btnRect.right - panelWidth;
  left = Math.max(12, Math.min(left, window.innerWidth - panelWidth - 12));
  panel.style.width = panelWidth + 'px';
  // The animated, blurred navbar is the fixed panel's containing block.
  const anchor = document.body.classList.contains('has-shared-nav')
    ? document.querySelector('.header-inner').getBoundingClientRect()
    : { left:0, top:0 };
  panel.style.left = (left - anchor.left) + 'px';
  panel.style.top = (btnRect.bottom + 10 - anchor.top) + 'px';
}
function closeNotifications(restoreFocus = false){
  const panel = document.getElementById('notifPanel');
  if(panel) panel.style.display = 'none';
  const button = document.getElementById('notifBtn');
  button?.setAttribute('aria-expanded', 'false');
  if(restoreFocus) button?.focus();
}
function clearNotifications(){
  getMyNotifications().forEach(n=>n.read=true);
  updateNotifBadge();
  renderNotifPanel();
  saveState();
}
// audience: 'customer' | 'vendor' | 'admin' | 'developer'; vendorId optional
function pushNotification(icon_, title, text, audience, vendorId, extra){
  state.notifications.unshift({ id:'n'+Date.now()+Math.random(), icon:icon_, title, text, ts:Date.now(), time:'Just now', read:false, audience: audience||'customer', vendorId: vendorId!=null?vendorId:null, ...(extra||{}) });
  if(state.notifications.length > 60) state.notifications.length = 60;
  updateNotifBadge();
}

function renderPopupIfNeeded(){
  const slot = document.getElementById('popupSlot');
  if(!slot) return;
  const role = state.user ? state.user.role : 'customer';
  if(state.popupSeen || state.view.name !== 'home' || role !== 'customer' || !state.popup.enabled){
    slot.innerHTML = '';
    return;
  }
  const p = state.popup;
  renderPopupIfNeeded.previousFocus = document.activeElement;
  slot.innerHTML = `
  <div class="popup-overlay" data-popup-overlay>
    <div class="popup-card" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
      <button class="popup-close" data-action="dismiss-popup" aria-label="Close">${icon('x',{size:14,color:'var(--muted)'})}</button>
      <img class="popup-logo" src="icons/logo-mark-dark.png" alt="" width="44" height="57" />
      <div class="popup-title" id="popupTitle">${esc(p.title)}</div>
      <p class="popup-text">${esc(p.text)}</p>
      <button class="btn-gold btn-gold-block" data-action="dismiss-popup" data-then="create-event">${esc(p.cta)}</button>
    </div>
  </div>`;
  setTimeout(()=>slot.querySelector('.popup-close')?.focus(), 50);
}
function dismissPopup(){
  state.popupSeen = true;
  try { sessionStorage.setItem('vz-popup-seen','1'); } catch(_){}
  const slot = document.getElementById('popupSlot');
  if(slot) slot.innerHTML = '';
  const previous = renderPopupIfNeeded.previousFocus;
  if(previous?.isConnected) previous.focus({ preventScroll:true });
}

/* ---------------- TOASTS ---------------- */
function showToast(msg, actionLabel, actionName){
  let host = document.getElementById('toastHost');
  if(!host){ host = document.createElement('div'); host.id='toastHost'; host.className='toast-host'; host.setAttribute('role','status'); host.setAttribute('aria-live','polite'); document.body.appendChild(host); }
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${esc(msg)}</span>${actionLabel ? `<button class="toast-action" data-action="${esc(actionName)}">${esc(actionLabel)}</button>` : ''}`;
  host.innerHTML = '';
  host.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('in'));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>{ t.classList.remove('in'); setTimeout(()=>t.remove(), 250); }, 2800);
}

function jobRequestCard(b){
  const hours = Math.max(0, 24 - Math.floor((Date.now() - (b.createdAt||Date.now()))/3600000));
  return `
  <div class="job-card${state.focusJob===b.id?' focus':''}" id="job-${esc(b.id)}">
    <div class="job-top">
      <span class="job-new mono">NEW REQUEST</span>
      <span class="job-timer">${icon('clock',{size:12,color:'var(--gold-deep)'})} Reply within ${hours}h</span>
    </div>
    <div class="job-title">${esc(b.eventName)}</div>
    <div class="job-customer">${icon('user',{size:13,color:'var(--muted)'})} ${esc(b.customerName)}${b.phone ? ` · <span class="mono">${esc(b.phone)}</span>` : ''}</div>
    <div class="job-facts">
      <div><span>Date</span><strong>${b.date ? fmtDate(b.date,{weekday:'short',day:'numeric',month:'short',year:'numeric'}) : 'TBD'}</strong></div>
      <div><span>Time</span><strong>${esc(b.time||'—')}</strong></div>
      <div><span>Guests</span><strong>${b.guests||'—'}</strong></div>
      <div><span>Venue</span><strong>${esc(b.location||'—')}</strong></div>
    </div>
    <div class="job-money">
      <div><span>${esc(b.packageName || 'Package')}</span><strong class="mono">${money(b.amount)}</strong></div>
      <div class="sub">${b.paymentType==='advance' ? `${money(b.amountPaid)} advance paid · ${money(b.amountDue)} on the day` : 'Paid in full'}</div>
    </div>
    <div class="job-actions">
      <button class="btn-outline-block job-decline" data-action="job-decline" data-id="${esc(b.id)}">Decline</button>
      <button class="btn-gold job-accept" data-action="job-accept" data-id="${esc(b.id)}">${icon('check',{size:15,color:'#fff'})} Accept job</button>
    </div>
  </div>`;
}

function respondToJob(id, accept, btn){
  const b = state.bookings.find(x=>x.id===id);
  if(!b || b.vendorStatus !== 'pending') return;
  const v = VENDORS.find(x=>x.id===b.vendorId);
  if(!accept && btn && !btn.dataset.armed){
    // two-step decline so a stray tap can't turn a customer away
    btn.dataset.armed = '1'; btn.textContent = 'Tap again to decline'; btn.classList.add('armed');
    setTimeout(()=>{ if(btn.isConnected){ delete btn.dataset.armed; btn.textContent = 'Decline'; btn.classList.remove('armed'); } }, 4000);
    return;
  }
  b.vendorStatus = accept ? 'accepted' : 'declined';
  b.respondedAt = Date.now();
  state.focusJob = null;
  if(accept){
    pushNotification('check', `${v ? v.name : 'Your vendor'} accepted your booking`, `They're confirmed for "${b.eventName}" on ${fmtDate(b.date,{day:'numeric',month:'short'})}.`, 'customer', null, { link:'bookings', bookingId: b.id });
    showToast(`Job accepted — ${b.customerName.split(' ')[0]} has been notified`);
  } else {
    pushNotification('x', `${v ? v.name : 'A vendor'} can't make your date`, `We'll offer you a backup vendor for "${b.eventName}" — no extra charge.`, 'customer', null, { link:'bookings', bookingId: b.id });
    showToast('Request declined — the customer will be offered a backup');
  }
  navigate({ name:'vendorDashboard', keepScroll:true });
}

function renderVendorDashboard(){
  const u = state.user;
  const v = VENDORS.find(x=>x.id === (u && u.vendorId)) || VENDORS[0];
  const vd = getVendorData(v.id);

  const requests = state.bookings.filter(b=>b.vendorId===v.id && b.vendorStatus==='pending');
  const appBookings = state.bookings.filter(b=>b.vendorId===v.id && b.vendorStatus!=='pending' && b.vendorStatus!=='declined').map(b => ({
    name: b.eventName, customer: b.customerName, date: b.date, amount: b.amount, status: b.vendorStatus==='accepted' ? 'accepted' : 'confirmed', source: 'App',
    paymentType: b.paymentType, amountPaid: b.amountPaid, amountDue: b.amountDue,
  }));
  const outsideBookings = vd.outsideIncome.map(o => ({
    name: o.name, date: o.date, amount: o.amount, status: 'confirmed', source: 'Outside',
  }));
  const allBookings = [...appBookings, ...outsideBookings].sort((a,b)=> (a.date||'').localeCompare(b.date||''));
  const totalRevenue = allBookings.reduce((s,b)=>s+Number(b.amount||0),0);

  return `
  <div class="section" style="padding-top:24px;">
    <button class="back-btn" data-action="profile">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Back</button>
    <p class="role-tag mono">Vendor interface</p>
    <h1 class="page-title" style="margin:8px 0 20px;">${esc(v.name)}</h1>

    ${('Notification' in window) && Notification.permission !== 'granted' ? `
    <div class="alert-optin">
      ${icon('bell',{size:18,color:COLOR.greenDeep})}
      <div><strong>Get new jobs on your phone</strong><span>We’ll alert you in your notification bar the moment a customer books you.</span></div>
      <button class="mini-btn add" data-action="enable-alerts">Turn on</button>
    </div>` : ''}
    <div id="jobRequests">
      <h2 class="subhead serif" style="margin-top:0;">New job requests ${requests.length ? `<span class="count-dot">${requests.length}</span>` : ''}</h2>
      ${requests.length ? requests.map(jobRequestCard).join('') : `<p class="mini-hint">No new requests. You'll get an alert here the moment a customer books you.</p>`}
    </div>

    <div class="stat-grid">
      <div class="stat-card"><div class="stat-label">Confirmed jobs</div><div class="stat-value mono">${allBookings.length}</div></div>
      <div class="stat-card"><div class="stat-label">Rating</div><div class="stat-value mono">${v.reviews ? v.rating+' ★' : 'New'}</div></div>
      <div class="stat-card"><div class="stat-label">Revenue to date</div><div class="stat-value mono">${money(totalRevenue)}</div></div>
      <div class="stat-card"><div class="stat-label">Blocked dates</div><div class="stat-value mono">${vd.blockedDates.length}</div></div>
    </div>

    <h2 class="subhead serif">Event management — your bookings</h2>
    <p class="mini-hint">Bookings made through the app fill in here automatically. Add anything you booked outside the platform to keep one combined record.</p>
    <div class="dash-list" id="bookingsList">
      ${allBookings.length ? allBookings.map(b => `
        <div class="dash-row">
          <div>
            <div class="dash-row-title">${esc(b.name)}</div>
            <div class="dash-row-sub">${b.customer ? esc(b.customer)+' · ' : ''}${fmtDate(b.date)} · ${b.source} booking${b.paymentType ? ' · ' + (b.paymentType==='advance' ? `${money(b.amountPaid)} paid, ${money(b.amountDue)} due` : 'paid in full') : ''}</div>
          </div>
          <div class="dash-row-right">
            <span class="mono">${money(b.amount)}</span>
            <span class="status-pill ${b.status}">${b.status}</span>
          </div>
        </div>`).join('') : `<p class="mini-hint">No bookings yet.</p>`}
    </div>
    <div class="inline-form">
      <input id="oiName" type="text" maxlength="80" placeholder="Event name" aria-label="Event name" />
      <input id="oiDate" type="date" aria-label="Event date" />
      <input id="oiAmount" type="number" min="1" placeholder="Amount (LKR)" aria-label="Amount in rupees" />
      <button class="mini-btn add" id="addOutsideBtn">+ Add outside booking</button>
    </div>
    <p class="error-text" id="oiError" style="display:none;">Add an event name and an amount before saving.</p>

    <h2 class="subhead serif">Block dates</h2>
    <p class="mini-hint">Blocked for your own personal work — customers will see you as unavailable on these dates.</p>
    <div class="chip-row" id="blockedDatesRow">
      ${vd.blockedDates.map(d=>`<span class="date-chip mono">${fmtDate(d,{day:'numeric',month:'short',year:'numeric'})}<button class="chip-x" data-remove-date="${d}" aria-label="Unblock ${fmtDate(d)}">${icon('x',{size:10,color:'var(--coral)'})}</button></span>`).join('')}
    </div>
    <div class="inline-form">
      <input id="newBlockDate" type="date" min="${todayISO()}" aria-label="Date to block" />
      <button class="mini-btn add" id="addBlockDateBtn">+ Block this date</button>
    </div>
    <p class="error-text" id="blockDateError" style="display:none;"></p>

    <h2 class="subhead serif">Previous projects</h2>
    <div class="portfolio-grid" id="portfolioGrid">
      ${vd.portfolio.map((p, i) => `<div class="portfolio-card"><div class="portfolio-img">${categoryHeroBanner(v.category, 22, i + v.id)}</div><div class="portfolio-title">${esc(p.title)}</div></div>`).join('')}
    </div>
    <div class="inline-form">
      <input id="newProjectTitle" type="text" maxlength="80" aria-label="Project title" placeholder="Project title, e.g. Kattankudy Wedding, Aug 2026" />
      <button class="mini-btn add" id="addProjectBtn">+ Add project</button>
    </div>
    <p class="error-text" id="projectError" style="display:none;">Give the project a title before adding it.</p>

    <h2 class="subhead serif">Packages</h2>
    <div class="dash-list" id="packagesDashList">
      ${vd.packages.map(p => `<div class="dash-row"><div><div class="dash-row-title">${esc(p.name)}</div><div class="dash-row-sub">${esc(p.inclusions.slice(0,2).join(', '))}</div></div><span class="mono">${money(p.price)}${v.priceUnit?' / head':''}</span></div>`).join('')}
    </div>
    <div class="inline-form">
      <input id="newPkgName" type="text" maxlength="60" placeholder="Package name" aria-label="Package name" />
      <input id="newPkgPrice" type="number" min="1" placeholder="Price (LKR)" aria-label="Package price in rupees" />
      <button class="mini-btn add" id="addPkgBtn">+ Add package</button>
    </div>
    <p class="error-text" id="pkgError" style="display:none;">Add a package name and a price before saving.</p>

    <h2 class="subhead serif">Messages</h2>
    <div class="dash-list">
      ${(() => {
        const t = (state.messages[v.id] || []).filter(m=>m.from==='me');
        const live = t.length ? `<div class="dash-row"><div><div class="dash-row-title">Customer enquiry</div><div class="dash-row-sub">"${esc(t[t.length-1].text.slice(0,70))}"</div></div><span class="status-pill pending">new</span></div>` : '';
        return live + `
      <div class="dash-row"><div><div class="dash-row-title">Kavya Selvam</div><div class="dash-row-sub">"Would you consider a small discount for..."</div></div><span class="status-pill pending">new</span></div>
      <div class="dash-row"><div><div class="dash-row-title">Aravind Kumaran</div><div class="dash-row-sub">"Can we do a trial shoot before the event?"</div></div><span class="status-pill confirmed">replied</span></div>`;
      })()}
    </div>
  </div>`;
}

function setupVendorDashboard(){
  if(state.focusJob){
    const card = document.getElementById('job-' + state.focusJob);
    if(card) setTimeout(()=>card.scrollIntoView({ behavior:'smooth', block:'center' }), 80);
  }
  const u = state.user;
  const v = VENDORS.find(x=>x.id === (u && u.vendorId)) || VENDORS[0];
  const vd = getVendorData(v.id);

  document.getElementById('addOutsideBtn').addEventListener('click', () => {
    const name = document.getElementById('oiName').value.trim();
    const date = document.getElementById('oiDate').value;
    const amount = Number(document.getElementById('oiAmount').value);
    const err = document.getElementById('oiError');
    if(!name || !(amount > 0)){ err.style.display = 'block'; return; }
    vd.outsideIncome.push({ name, date, amount });
    showToast('Outside booking added');
    navigate({ name:'vendorDashboard', keepScroll:true });
  });

  document.getElementById('addBlockDateBtn').addEventListener('click', () => {
    const date = document.getElementById('newBlockDate').value;
    const err = document.getElementById('blockDateError');
    if(!date){ err.textContent = 'Pick a date to block.'; err.style.display = 'block'; return; }
    if(vd.blockedDates.includes(date)){ err.textContent = 'That date is already blocked.'; err.style.display = 'block'; return; }
    vd.blockedDates.push(date);
    vd.blockedDates.sort();
    showToast('Date blocked — customers will see you as unavailable');
    navigate({ name:'vendorDashboard', keepScroll:true });
  });
  document.querySelectorAll('[data-remove-date]').forEach(btn => {
    btn.addEventListener('click', () => {
      vd.blockedDates = vd.blockedDates.filter(d=>d!==btn.dataset.removeDate);
      navigate({ name:'vendorDashboard', keepScroll:true });
    });
  });

  document.getElementById('addProjectBtn').addEventListener('click', () => {
    const title = document.getElementById('newProjectTitle').value.trim();
    const err = document.getElementById('projectError');
    if(!title){ err.style.display = 'block'; return; }
    vd.portfolio.push({ id:`${v.id}-pf-${Date.now()}`, title });
    showToast('Project added to your portfolio');
    navigate({ name:'vendorDashboard', keepScroll:true });
  });

  document.getElementById('addPkgBtn').addEventListener('click', () => {
    const name = document.getElementById('newPkgName').value.trim();
    const price = Number(document.getElementById('newPkgPrice').value);
    const err = document.getElementById('pkgError');
    if(!name || !(price > 0)){ err.style.display = 'block'; return; }
    vd.packages.push({ id:`${v.id}-pkg-${Date.now()}`, name, price, inclusions:["Custom package"], supportsLaterPayment:false });
    showToast('Package added');
    navigate({ name:'vendorDashboard', keepScroll:true });
  });
}


function renderAdmin(){
  return `
  <div class="section" style="padding-top:24px;">
    <button class="back-btn" data-action="profile">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Back</button>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:8px 0 4px;">
      <p class="role-tag mono">Admin interface</p>
      <button class="mini-btn" data-action="marketing">${icon('sparkle',{size:11,color:COLOR.greenDeep})} Ads, popup & notifications</button>
    </div>
    <h1 class="page-title" style="margin:8px 0 20px;">Manage users &amp; vendors</h1>

    <div class="stat-grid">
      <div class="stat-card"><div class="stat-label">Active vendors</div><div class="stat-value mono">${VENDORS.length}</div></div>
      <div class="stat-card"><div class="stat-label">Registered users</div><div class="stat-value mono">${USERS.length}</div></div>
      <div class="stat-card"><div class="stat-label">Open complaints</div><div class="stat-value mono">2</div></div>
      <div class="stat-card"><div class="stat-label">Bookings made</div><div class="stat-value mono">${state.bookings.length}</div></div>
    </div>

    <h2 class="subhead serif">Users — assign roles, reset passwords</h2>
    <div class="dash-list" id="userAdminList">
      ${USERS.map(u => `
        <div class="dash-row">
          <div>
            <div class="dash-row-title">${esc(u.name)}</div>
            <div class="dash-row-sub"><a href="mailto:${esc(u.email)}">${esc(u.email)}</a></div>
          </div>
          <div class="dash-row-right">
            <select class="role-select" data-user-id="${u.id}" aria-label="Role for ${esc(u.name)}">
              ${["customer","vendor","admin","developer"].map(r=>`<option value="${r}" ${u.role===r?'selected':''}>${r}</option>`).join('')}
            </select>
            <button class="mini-btn" data-reset-user="${u.id}">Reset password</button>
          </div>
        </div>`).join('')}
    </div>

    <h2 class="subhead serif">Vendors</h2>
    <div class="dash-list">
      ${VENDORS.map(v => `
        <div class="dash-row">
          <div>
            <div class="dash-row-title">${esc(v.name)}</div>
            <div class="dash-row-sub">${esc(CATEGORIES.find(c=>c.id===v.category)?.name || '')} · ${esc(v.area)}</div>
          </div>
          <div class="dash-row-right">
            <span class="status-pill ${v.suspended?'pending':'confirmed'}">${v.suspended?'suspended':'active'}</span>
            <button class="mini-btn" data-suspend="${v.id}">${v.suspended?'Reinstate':'Suspend'}</button>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

function setupAdminScreen(){
  document.querySelectorAll('.role-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const u = USERS.find(x=>x.id===sel.dataset.userId);
      if(u){ u.role = sel.value; showToast(`${u.name} is now ${sel.value}`); }
    });
  });
  document.querySelectorAll('[data-reset-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Reset link sent ✓';
      btn.disabled = true;
    });
  });
  document.querySelectorAll('[data-suspend]').forEach(btn => btn.addEventListener('click', () => {
    const v = VENDORS.find(x=>x.id===Number(btn.dataset.suspend));
    if(!v) return;
    v.suspended = !v.suspended;
    showToast(v.suspended ? `${v.name} suspended — hidden from customers` : `${v.name} reinstated`);
    navigate({ name:'admin', keepScroll:true });
  }));
}

function renderDeveloper(){
  return `
  <div class="section" style="padding-top:24px;max-width:560px;">
    <button class="back-btn" data-action="profile">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Back</button>
    <p class="role-tag mono">Developer interface</p>
    <h1 class="page-title" style="margin:8px 0 12px;">Component editor</h1>
    <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">Restricted access — wire content blocks to live data without a full redeploy. Not available to vendor or customer accounts.</p>
    <div class="dash-list">
      <div class="dash-row"><div><div class="dash-row-title">Hero banner text</div><div class="dash-row-sub">home.hero.title</div></div><button class="mini-btn" id="editHeroBtn">Edit</button></div>
      <div class="dash-row"><div><div class="dash-row-title">Ad banner slot</div><div class="dash-row-sub">home.adBanner</div></div><button class="mini-btn" id="editAdBtn">Edit</button></div>
      <div class="dash-row"><div><div class="dash-row-title">Reset demo data</div><div class="dash-row-sub">Clears everything saved in this browser</div></div><button class="mini-btn" id="resetDemoBtn">Reset</button></div>
    </div>
  </div>`;
}

function setupDeveloperScreen(){
  document.getElementById('editHeroBtn').addEventListener('click', () => {
    const next = prompt('Edit hero title (HTML <em> allowed):', state.appConfig.heroTitle);
    if(next){ state.appConfig.heroTitle = next; saveState(); showToast('Hero title updated'); }
  });
  document.getElementById('editAdBtn').addEventListener('click', () => {
    const current = state.ads[0] ? state.ads[0].text : '';
    const next = prompt('Edit the first ad banner text:', current);
    if(next){
      if(state.ads[0]) state.ads[0].text = next; else state.ads.push({ id:'ad'+Date.now(), label:'AD', text:next });
      saveState(); showToast('Ad banner updated');
    }
  });
  document.getElementById('resetDemoBtn').addEventListener('click', () => {
    if(!confirm('Reset all demo data saved in this browser?')) return;
    try { localStorage.removeItem(STORE_KEY); sessionStorage.clear(); } catch(_){}
    location.hash = ''; location.reload();
  });
}

function renderMarketing(){
  const p = state.popup;
  return `
  <div class="section" style="padding-top:24px;max-width:640px;">
    <button class="back-btn" data-action="admin">${icon('chevronLeft',{size:15,color:COLOR.greenDeep})} Back</button>
    <p class="role-tag mono">Admin interface</p>
    <h1 class="page-title" style="margin:8px 0 4px;">Ads, popup &amp; notifications</h1>
    <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">Controls what customers see on the Vendeze home screen.</p>

    <h2 class="subhead serif">Ad banners</h2>
    <p class="mini-hint">Shown as dashed banner cards on the customer app's Home screen.</p>
    <div class="dash-list" id="adsList">
      ${state.ads.map(a => `
        <div class="dash-row">
          <div><div class="dash-row-title">${esc(a.text)}</div><div class="dash-row-sub">Label: ${esc(a.label)}</div></div>
          <button class="mini-btn" data-remove-ad="${a.id}">Remove</button>
        </div>`).join('') || '<p class="mini-hint">No ads running.</p>'}
    </div>
    <div class="inline-form">
      <input id="newAdText" type="text" maxlength="140" aria-label="Ad text" placeholder="Ad text, e.g. vendor promo or discount" />
      <button class="mini-btn add" id="addAdBtn">+ Add ad banner</button>
    </div>
    <p class="error-text" id="adError" style="display:none;">Write the ad text before adding it.</p>

    <h2 class="subhead serif">Welcome popup</h2>
    <p class="mini-hint">Shown once per session to customers landing on Home.</p>
    <div class="profile-detail-card" style="margin-bottom:12px;">
      <div class="confirm-row"><span class="l">Status</span><span class="r">${p.enabled ? 'Enabled' : 'Disabled'}</span></div>
      <div class="confirm-row"><span class="l">Title</span><span class="r">${esc(p.title)}</span></div>
      <div class="confirm-row"><span class="l">Button</span><span class="r">${esc(p.cta)}</span></div>
    </div>
    <div class="inline-form">
      <input id="popupTitle" type="text" placeholder="Popup title" aria-label="Popup title" value="${esc(p.title)}" />
      <button class="mini-btn" id="togglePopupBtn">${p.enabled ? 'Disable popup' : 'Enable popup'}</button>
      <button class="mini-btn add" id="savePopupBtn">Save title</button>
    </div>

    <h2 class="subhead serif">Send a notification</h2>
    <p class="mini-hint">Delivered to the audience's notification bell.</p>
    <div class="inline-form">
      <input id="notifTitle" type="text" maxlength="120" placeholder="Notification title" aria-label="Notification title" />
      <select id="notifAudience" class="role-select" aria-label="Notification audience" style="flex:0 0 120px;">
        <option value="Customers">Customers</option>
        <option value="Vendors">Vendors</option>
      </select>
      <button class="mini-btn add" id="sendNotifBtn">Send</button>
    </div>
    <p class="error-text" id="notifError" style="display:none;">Write a title before sending.</p>
    <div class="dash-list">
      ${state.sentNotifications.map(n => `
        <div class="dash-row">
          <div><div class="dash-row-title">${esc(n.title)}</div><div class="dash-row-sub">To ${esc(n.audience)} · ${n.ts ? relTime(n.ts) : esc(n.time)}</div></div>
        </div>`).join('') || '<p class="mini-hint">Nothing sent yet.</p>'}
    </div>
  </div>`;
}

function setupMarketingScreen(){
  document.getElementById('addAdBtn').addEventListener('click', () => {
    const text = document.getElementById('newAdText').value.trim();
    if(!text){ document.getElementById('adError').style.display = 'block'; return; }
    state.ads.push({ id:'ad'+Date.now(), label:'AD', text });
    if(typeof apiAdminAddAd === 'function' && state.authToken) apiAdminAddAd(text).catch(()=>{});
    showToast('Ad banner added');
    navigate({ name:'marketing', keepScroll:true });
  });
  document.querySelectorAll('[data-remove-ad]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.ads = state.ads.filter(a=>a.id!==btn.dataset.removeAd);
      navigate({ name:'marketing' });
    });
  });
  document.getElementById('togglePopupBtn').addEventListener('click', () => {
    state.popup.enabled = !state.popup.enabled;
    navigate({ name:'marketing' });
  });
  document.getElementById('savePopupBtn').addEventListener('click', () => {
    const title = document.getElementById('popupTitle').value.trim();
    if(title){ state.popup.title = title; showToast('Popup title saved'); }
    navigate({ name:'marketing', keepScroll:true });
  });
  document.getElementById('sendNotifBtn').addEventListener('click', () => {
    const title = document.getElementById('notifTitle').value.trim();
    const audienceLabel = document.getElementById('notifAudience').value; // 'Customers' | 'Vendors'
    if(!title){ document.getElementById('notifError').style.display = 'block'; return; }
    state.sentNotifications.unshift({ id:'sn'+Date.now(), audience:audienceLabel, title, text:title, ts:Date.now(), time:'Just now' });
    if(typeof apiAdminBroadcast === 'function' && state.authToken) apiAdminBroadcast(audienceLabel === 'Vendors' ? 'VENDOR' : 'CUSTOMER', title, title).catch(()=>{});
    // this is the live cross-app moment: push straight into the shared
    // notification feed so that audience sees it in their bell right away
    const audienceRole = audienceLabel === 'Vendors' ? 'vendor' : 'customer';
    pushNotification('bell', title, title, audienceRole);
    showToast(`Sent to ${audienceLabel.toLowerCase()}`);
    navigate({ name:'marketing', keepScroll:true });
  });
}


/* ============================================================
   ROUTING — every screen has its own #/hash, so the browser Back
   button, refresh and shared links all work.
============================================================ */
function viewToHash(v){
  switch(v.name){
    case 'login': return '#/login';
    case 'home': return '#/';
    case 'createEvent': return v.nextCategory ? `#/event?next=${encodeURIComponent(v.nextCategory)}` : '#/event';
    case 'category': return `#/category/${encodeURIComponent(v.id)}`;
    case 'vendor': return `#/vendor/${v.id}`;
    case 'myBookings': return '#/bookings';
    case 'vendorDashboard': return '#/dashboard';
    default: return '#/' + v.name;
  }
}
function hashToView(hash){
  const [path, query] = (hash || '').replace(/^#\/?/, '').split('?');
  const params = new URLSearchParams(query || '');
  const [a, b] = path.split('/');
  switch(a){
    case '': return { name:'home' };
    case 'login': return { name:'login' };
    case 'event': return { name:'createEvent', nextCategory: params.get('next') || undefined };
    case 'category': return { name:'category', id: decodeURIComponent(b||'') };
    case 'vendor': return { name:'vendor', id: Number(b) };
    case 'bookings': {
      const bk = params.get('b');
      if(bk){ state.focusBooking = bk; state.notifications.filter(x=>x.bookingId===bk && x.audience==='customer').forEach(x=>x.read = true); }
      return { name:'myBookings' };
    }
    case 'dashboard': {
      const job = params.get('job');
      if(job){ state.focusJob = job; const n = state.notifications.find(x=>x.bookingId===job); if(n) n.read = true; }
      return { name:'vendorDashboard' };
    }
    case 'services': case 'search': case 'saved': case 'cart': case 'checkout': case 'confirm':
    case 'profile': case 'admin': case 'developer': case 'marketing':
      return { name:a };
    default: return { name:'notFound' };
  }
}
function isSignedIn(){ return !!state.user || state.guest; }

function navigate(view){
  const h = viewToHash(view);
  if(location.hash !== h){
    state.view = view;          // keep extras like keepScroll/focus for this render
    state._skipHash = h;
    location.hash = h;          // hashchange → render
  } else {
    state.view = view;
    render();
  }
}
window.addEventListener('hashchange', () => {
  if(state._skipHash === location.hash){ state._skipHash = null; render(); return; }
  const v = hashToView(location.hash);
  if(!isSignedIn() && v.name !== 'login'){ state.pendingView = v; state.view = { name:'login' }; render(); return; }
  if(state.user && v.name === 'login'){ state.view = { name:'home' }; render(); return; }
  state.view = v;
  render();
});
function afterLoginView(){
  const v = state.pendingView; state.pendingView = null;
  return v && v.name !== 'login' ? v : { name:'home' };
}

/* ============================================================
   PERSISTENCE — keeps the session, event, hold list, saved vendors,
   bookings and vendor edits across a refresh. Demo data only; the
   real source of truth is the backend when it's connected.
============================================================ */
const STORE_KEY = window.VENDEZE_UI_PREVIEW ? 'vendeze-ui-preview-v1' : 'vendeze-state-v2';
function saveState(){
  try {
    const keep = {
      localAccounts: state.localAccounts, localVendors: state.localVendors,
      user: state.user, guest: state.guest, authToken: state.authToken || null,
      event: state.event, cart: state.cart, wishlist: [...state.wishlist],
      bookings: state.bookings, vendorData: state.vendorData, messages: state.messages,
      notifications: state.notifications, ads: state.ads, popup: state.popup,
      sentNotifications: state.sentNotifications, appConfig: state.appConfig,
      contact: state.contact || null, checkout: state.checkout, lastOrder: state.lastOrder,
      search: state.search,
      suspended: VENDORS.filter(v=>v.suspended).map(v=>v.id),
      userRoles: USERS.map(u=>[u.id,u.role]),
    };
    const json = JSON.stringify(keep);
    if(json === saveState.last) return;      // nothing changed — don't wake other tabs
    saveState.last = json;
    localStorage.setItem(STORE_KEY, json);
  } catch(_){ /* private mode / storage full — app still works in memory */ }
}
function loadState(){
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return;
    const d = JSON.parse(raw);
    ['user','guest','authToken','event','cart','bookings','vendorData','messages','notifications','ads','popup','sentNotifications','appConfig','contact','checkout','lastOrder']
      .forEach(k => { if(d[k] !== undefined && d[k] !== null) state[k] = d[k]; });
    if(d.search) state.search = { ...state.search, ...d.search };
    state.localAccounts = d.localAccounts || [];
    state.localVendors = d.localVendors || [];
    state.localVendors.forEach(v => { if(!VENDORS.some(x=>x.id===v.id)) VENDORS.push(v); });
    state.wishlist = new Set(d.wishlist || []);
    (d.suspended || []).forEach(id => { const v = VENDORS.find(x=>x.id===id); if(v) v.suspended = true; });
    (d.userRoles || []).forEach(([id,role]) => { const u = USERS.find(x=>x.id===id); if(u) u.role = role; });
    if(state.authToken && typeof setAuthToken === 'function') setAuthToken(state.authToken);
  } catch(_){}
  try { state.popupSeen = sessionStorage.getItem('vz-popup-seen') === '1'; } catch(_){}
}

/* create-event screen: chip selection + validation on submit,
   read directly from the DOM (no per-keystroke re-render) */
function setupCreateEventScreen(){
  document.querySelectorAll('#typeChips .chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      document.querySelectorAll('#typeChips .chip').forEach(c=>{ c.classList.remove('active'); c.setAttribute('aria-checked','false'); });
      chip.classList.add('active'); chip.setAttribute('aria-checked','true');
    });
  });
  document.getElementById('eventForm').addEventListener('input', ()=>{ document.getElementById('formError').style.display='none'; });
  document.getElementById('eventForm').addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const name = document.getElementById('f-name').value.trim();
    const type = document.querySelector('#typeChips .chip.active')?.dataset.type || '';
    const date = document.getElementById('f-date').value;
    const time = document.getElementById('f-time').value;
    const guests = Number(document.getElementById('f-guests').value);
    const location = document.getElementById('f-location').value.trim();
    const err = document.getElementById('formError');
    const fail = (msg, id) => { err.textContent = msg; err.style.display = 'block'; if(id) markFieldInvalid(id, 'formError'); };
    if(!name) return fail('Give your event a name.', 'f-name');
    if(!type) return fail('Pick an event type.', 'typeChips');
    if(!date) return fail('Choose the event date.', 'f-date');
    if(date < todayISO()) return fail('That date has already passed — pick an upcoming date.', 'f-date');
    if(!time) return fail('Add a start time.', 'f-time');
    if(!guests || guests < 10 || guests > 5000) return fail('Enter a guest count between 10 and 5,000.', 'f-guests');
    if(!location) return fail('Add the venue name or address.', 'f-location');
    err.style.display = 'none';
    const prevBackendId = state.event && state.event.backendId;
    const isEdit = !!state.event;
    state.event = { name, type, date, time, location, guests };
    if(prevBackendId) state.event.backendId = prevBackendId;
    showToast(isEdit ? 'Event updated' : 'Event saved — here’s who you can book');

    // Create the real row in the database so a later "hold this vendor"
    // can link to a real event id. If the backend isn't running, this
    // just fails quietly and the app continues in local-only mode —
    // see addToCart()/checkout for the matching fallback there.
    if(typeof apiCreateEvent === 'function' && state.user && state.authToken && !prevBackendId){
      try {
        const created = await apiCreateEvent({ name, type, date, time, location, guests });
        state.event.backendId = created.id;
      } catch(e){
        console.warn('Vendeze: could not save event to backend.', e.message);
      }
    }

    const nextCategory = state.view.nextCategory;
    navigate(nextCategory ? { name:'category', id: nextCategory } : isEdit ? { name:'home' } : { name:'services' });
  });
}

/* One path for every "hold" — from the vendor page or the quick-add
   button on a card — so the backend hold is always mirrored. */
function addToCart(vendorId, price, packageName, opts = {}){
  const v = VENDORS.find(x=>x.id===vendorId);
  if(!v) return;
  if(state.cart.some(c=>c.id===vendorId)){
    if(!opts.stay) navigate({ name:'cart' });
    return;
  }
  // one vendor per service type — holding a second photographer replaces the first
  const clash = state.cart.find(c=>c.category===v.category);
  if(clash) state.cart = state.cart.filter(c=>c!==clash);
  state.cart.push({ id:v.id, name:v.name, price: price!=null ? price : v.priceFrom, category:v.category, priceUnit:v.priceUnit, packageName: packageName||null });

  // Mirror the hold to the backend — that's what enforces "only one
  // customer can hold this vendor for this date" server-side.
  if(typeof apiCreateHold === 'function' && state.user && state.authToken && state.event && state.event.backendId){
    apiCreateHold(vendorId, state.event.backendId, null).catch(e=>{
      console.warn('Vendeze: could not save hold to backend (vendor may already be taken there).', e.message);
    });
  }
  const msg = clash ? `Swapped ${clash.name} for ${v.name}` : `${v.name} added to your hold list`;
  showToast(msg, 'View', 'cart');
  navigate({ ...state.view, keepScroll:true });
}
function removeFromCart(vendorId){
  const item = state.cart.find(c=>c.id===vendorId);
  state.cart = state.cart.filter(c=>c.id!==vendorId);
  state._lastRemoved = item || null;
  if(item) showToast(`Removed ${item.name}`, 'Undo', 'undo-remove');
  navigate({ ...state.view, keepScroll:true });
}
function undoRemove(){
  const item = state._lastRemoved;
  if(item && !state.cart.some(c=>c.id===item.id)){ state.cart.push(item); state._lastRemoved = null; navigate({ ...state.view, keepScroll:true }); }
}
function toggleWishlist(vendorId){
  const v = VENDORS.find(x=>x.id===vendorId);
  if(state.wishlist.has(vendorId)){ state.wishlist.delete(vendorId); showToast('Removed from saved'); }
  else { state.wishlist.add(vendorId); showToast(`Saved ${v ? v.name : 'vendor'}`, 'View saved', 'saved'); }
  navigate({ ...state.view, keepScroll:true });
}
function quickAddToCart(vendorId){
  if(state.cart.some(c=>c.id===vendorId)){ navigate({ name:'cart' }); return; }
  addToCart(vendorId, null, null, { stay:true });
}
function resetAll(){
  state.checkout = null;
  state.lastOrder = null;
  navigate({ name:'home' });
}

// Front-end demo ids → seeded backend ids (same order, see seed-data.sql)
const FRONTEND_TO_BACKEND_USER_ID = { u1:1, u2:2, u3:3, v1:4, v2:5, a1:6, d1:7 };

/**
 * Pulls categories/vendors/ads/popup from the backend into the same
 * CATEGORIES/VENDORS arrays the renderers read. Falls back silently to the
 * built-in demo data when the backend isn't running. Times out after 4s so a
 * dead API never leaves the login button hanging.
 */
async function hydrateFromBackend(){
  if(window.VENDEZE_UI_PREVIEW){ state.backendConnected = false; return; }
  if(typeof apiGetCategories !== 'function'){ state.backendConnected = false; return; }
  try {
    const timeout = new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')), 4000));
    const [cats, vendors, ads, popup] = await Promise.race([
      Promise.all([apiGetCategories(), apiGetVendors(), apiGetAds(), apiGetPopup()]), timeout
    ]);
    if(Array.isArray(cats) && cats.length){
      CATEGORIES = cats.map(c => {
        const existing = CATEGORIES.find(x => x.id === c.id);
        return { id:c.id, name:c.name, note:c.note, icon:c.icon,
          bg: existing ? existing.bg : 'var(--brand-surface)', fg: existing ? existing.fg : 'var(--brand-ink)' };
      });
    }
    if(Array.isArray(vendors) && vendors.length){
      VENDORS = vendors.map(v => ({
        id:v.id, name:v.name, category:v.categoryId, area:v.area,
        rating:v.rating, reviews:v.reviewsCount, priceFrom:v.priceFrom,
        priceUnit: v.priceUnit ? String(v.priceUnit).toLowerCase() : null, blurb:v.blurb,
      })).concat(state.localVendors);
    }
    if(Array.isArray(ads) && ads.length){
      state.ads = ads.map(a => ({ id:a.id, label:a.label, text:a.body }));
    }
    if(popup){
      state.popup = { enabled:popup.enabled, title:popup.title, text:popup.body, cta:popup.cta };
    }
    state.backendConnected = true;
  } catch(e){
    console.warn('Vendeze: backend not reachable, continuing on built-in demo data.', e.message);
    state.backendConnected = false;
  }
}

async function loginAs(userId){
  state.user = USERS.find(u=>u.id===userId) || null;
  state.guest = false;
  const backendId = FRONTEND_TO_BACKEND_USER_ID[userId];
  if(backendId && typeof apiDevLogin === 'function'){
    try {
      const result = await apiDevLogin(backendId);
      setAuthToken(result.token);
      state.authToken = result.token;
    } catch(e){
      console.warn('Vendeze: dev-login failed, continuing in offline demo mode.', e.message);
    }
  }
  await hydrateFromBackend();
  navigate(afterLoginView());
}
async function loginAsGuest(){
  state.user = null;
  state.guest = true;
  await hydrateFromBackend(); // public data only
  navigate(afterLoginView());
}
function logout(){
  const wasUser = !!state.user;
  state.user = null;
  state.guest = false;
  state.authToken = null;
  state.cart = [];
  state.event = null;
  state.checkout = null;
  state.lastOrder = null;
  state.contact = null;
  state.wishlist = new Set();
  if(typeof setAuthToken === 'function') setAuthToken(null);
  navigate({ name:'login' });
  if(wasUser) showToast('Signed out');
}

/* ============================================================
   GLOBAL CLICK DELEGATION
============================================================ */
document.addEventListener('click', (e)=>{
  const el = e.target.closest('[data-action]');
  if(!el) return;
  const action = el.dataset.action;
  switch(action){
    case 'show-google-accounts':
    case 'apple-login': {
      // No real Google/Apple OAuth without registered credentials (see
      // README) — both open the same demo account picker for local testing.
      const box = document.getElementById('googleAccounts');
      box.style.display = 'flex';
      box.querySelector('button')?.focus();
      break;
    }
    case 'google-login': loginAs(el.dataset.id); break;
    case 'guest-login': loginAsGuest(); break;
    case 'profile': navigate({ name:'profile' }); break;
    case 'logout': logout(); break;
    case 'toggle-notifications': e.stopPropagation(); toggleNotifPanel(); break;
    case 'clear-notifications': e.stopPropagation(); clearNotifications(); break;
    case 'dismiss-popup': dismissPopup(); if(el.dataset.then === 'create-event' && !state.event) navigate({ name:'createEvent' }); break;
    case 'go-home': navigate({ name:'home' }); break;
    case 'create-event': navigate({ name:'createEvent' }); break;
    case 'create-event-cat': navigate({ name:'createEvent', nextCategory: el.dataset.id }); break;
    case 'services': navigate({ name:'services' }); break;
    case 'search': navigate({ name:'search', focus: !el.classList.contains('bn-item') }); break;
    case 'saved': navigate({ name:'saved' }); break;
    case 'category': navigate({ name:'category', id: el.dataset.id }); break;
    case 'vendor': navigate({ name:'vendor', id: Number(el.dataset.id) }); break;
    case 'share-vendor': shareVendor(Number(el.dataset.id)); break;
    case 'cart': navigate({ name:'cart' }); break;
    case 'checkout': navigate({ name:'checkout' }); break;
    case 'remove-cart': e.stopPropagation(); removeFromCart(Number(el.dataset.id)); break;
    case 'undo-remove': undoRemove(); break;
    case 'wishlist': e.stopPropagation(); toggleWishlist(Number(el.dataset.id)); break;
    case 'quick-add': e.stopPropagation(); quickAddToCart(Number(el.dataset.id)); break;
    case 'my-bookings': navigate({ name:'myBookings' }); break;
    case 'add-calendar': downloadEventICS(); break;
    case 'reset': resetAll(); break;
    case 'vendor-dashboard': navigate({ name:'vendorDashboard' }); break;
    case 'admin': navigate({ name:'admin' }); break;
    case 'developer': navigate({ name:'developer' }); break;
    case 'marketing': navigate({ name:'marketing' }); break;
    case 'admin-noop': break;
    case 'open-notif': {
      e.stopPropagation();
      const n = state.notifications.find(x=>x.id===el.dataset.id);
      if(!n) break;
      n.read = true;
      document.getElementById('notifPanel').style.display = 'none';
      if(n.link === 'job'){ state.focusJob = n.bookingId; navigate({ name:'vendorDashboard' }); }
      else if(n.link === 'bookings'){ state.focusBooking = n.bookingId || null; navigate({ name:'myBookings' }); }
      updateNotifBadge();
      break;
    }
    case 'open-latest-notif': {
      const n = getMyNotifications().find(x=>x.link);
      if(n){ n.read = true; if(n.link==='job'){ state.focusJob = n.bookingId; navigate({ name:'vendorDashboard' }); } else navigate({ name:'myBookings' }); updateNotifBadge(); }
      break;
    }
    case 'enable-alerts': enablePhoneAlerts(); break;
    case 'job-accept': respondToJob(el.dataset.id, true); break;
    case 'job-decline': respondToJob(el.dataset.id, false, el); break;
  }
});

// keyboard: Enter/Space activates non-button [data-action] elements (vendor
// cards), Escape closes the popup and notification panel
document.addEventListener('keydown', (e) => {
  if(e.key === 'Tab'){
    const modal = document.querySelector('.popup-card[aria-modal="true"]');
    if(modal){
      const focusable = [...modal.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last?.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first?.focus(); }
    }
  }
  const radio = e.target.closest('button[role="radio"]');
  if(radio && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key)){
    const group = radio.closest('[role="radiogroup"]');
    const options = [...(group?.querySelectorAll('button[role="radio"]') || [])].filter(button => !button.disabled);
    if(options.length){
      e.preventDefault();
      const direction = ['ArrowLeft','ArrowUp'].includes(e.key) ? -1 : 1;
      const index = e.key === 'Home' ? 0 : e.key === 'End' ? options.length - 1 : (options.indexOf(radio) + direction + options.length) % options.length;
      options[index].click(); options[index].focus();
    }
  }
  if((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-action]:not(button):not(a):not(input)')){
    e.preventDefault(); e.target.click();
  }
  if(e.key === 'Escape'){
    const panel = document.getElementById('notifPanel');
    if(panel && panel.style.display === 'block') closeNotifications(true);
    if(document.querySelector('.popup-overlay')) dismissPopup();
  }
});

document.addEventListener('submit', event => {
  event.target.querySelectorAll('[aria-invalid="true"]').forEach(clearFieldValidation);
}, true);
document.addEventListener('input', event => clearFieldValidation(event.target));
document.addEventListener('change', event => clearFieldValidation(event.target));
document.addEventListener('click', event => {
  const radio = event.target.closest('button[role="radio"]');
  if(radio) clearFieldValidation(radio.closest('[role="radiogroup"]'));
});

document.addEventListener('click', (e) => {
  if(e.target.matches('[data-popup-overlay]')) dismissPopup();
  const panel = document.getElementById('notifPanel');
  const wrap = document.querySelector('.notif-wrap');
  if(panel && panel.style.display === 'block' && wrap && !wrap.contains(e.target)){
    closeNotifications();
  }
});

let resizeTimer, lastDesktop = window.innerWidth >= 1024;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const d = window.innerWidth >= 1024;
    if(d !== lastDesktop && state.view.name !== 'login'){ lastDesktop = d; renderSummaryBar(); renderBottomNav(); }
  }, 150);
});

// header shadow once the page scrolls
window.addEventListener('scroll', () => {
  document.getElementById('mainHeader')?.classList.toggle('scrolled', window.scrollY > 4);
}, { passive:true });

/* ---------------- LIVE ALERTS ----------------
   When another tab on this device changes the shared data (a customer
   books, a vendor accepts), merge it in without touching this tab's own
   session, then ring the bell for anything new. With the backend this is
   where a push/WebSocket message would land. */
const SHARED_KEYS = ['bookings','notifications','vendorData','messages','ads','popup','sentNotifications','localAccounts','localVendors'];
window.addEventListener('storage', (e) => {
  if(e.key !== STORE_KEY || !e.newValue || !isSignedIn()) return;
  let d; try { d = JSON.parse(e.newValue); } catch(_){ return; }
  // ignore saves that changed nothing shared (stops two tabs re-rendering each other forever)
  const sig = o => JSON.stringify(SHARED_KEYS.map(k => o[k] === undefined ? null : o[k]));
  if(sig(d) === sig(state)) return;
  const before = new Set(getMyNotifications().map(n=>n.id));
  SHARED_KEYS.forEach(k => { if(d[k] !== undefined && d[k] !== null) state[k] = d[k]; });
  (state.localVendors||[]).forEach(v => { if(!VENDORS.some(x=>x.id===v.id)) VENDORS.push(v); });
  const fresh = getMyNotifications().filter(n=>!before.has(n.id) && !n.read);
  if(state.view.name !== 'login'){ state.view = { ...state.view, keepScroll:true }; render(); }
  if(fresh.length){
    const n = fresh[0];
    showToast(n.title, n.link ? 'View' : null, n.link ? 'open-latest-notif' : null);
    const bell = document.getElementById('notifBtn');
    if(bell){ bell.classList.remove('ring'); void bell.offsetWidth; bell.classList.add('ring'); }
    playChime();
    showSystemNotification(n);
  }
});
/* Phone notification-bar alert. Shown when the app isn't on screen; tapping
   it opens the app on that exact job (see service-worker.js notificationclick).
   The server can send the same payload as a Web Push message. */
async function showSystemNotification(n){
  try {
    if(!('Notification' in window) || Notification.permission !== 'granted') return;
    if(document.visibilityState === 'visible' && document.hasFocus()) return; // already looking at the app
    const url = n.link === 'job' ? `#/dashboard?job=${encodeURIComponent(n.bookingId)}` : `#/bookings${n.bookingId ? '?b='+encodeURIComponent(n.bookingId) : ''}`;
    const opts = { body: n.text, icon: 'icons/icon-192.png', badge: 'icons/favicon-64.png', tag: n.bookingId || n.id, data: { url }, renotify: true };
    const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration();
    if(reg) reg.showNotification(n.title, opts);
    else { const sys = new Notification(n.title, opts); sys.onclick = () => { window.focus(); location.hash = url; sys.close(); }; }
  } catch(_){}
}
async function enablePhoneAlerts(){
  if(!('Notification' in window)){ showToast('This browser can’t show phone alerts'); return; }
  const result = await Notification.requestPermission();
  showToast(result === 'granted' ? 'Phone alerts on — you’ll hear about new jobs right away' : 'Alerts are blocked — turn them on in your browser settings');
  navigate({ ...state.view, keepScroll:true });
}

function playChime(){
  try {
    const A = window.AudioContext || window.webkitAudioContext; if(!A) return;
    const ctx = playChime.ctx || (playChime.ctx = new A());
    [880, 1320].forEach((f,i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f; o.type = 'sine';
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i*0.12);
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + i*0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i*0.12 + 0.35);
      o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime + i*0.12); o.stop(ctx.currentTime + i*0.12 + 0.4);
    });
  } catch(_){}
}

/* ---------------- BOOT ---------------- */
loadState();
(function boot(){
  if(window.VENDEZE_UI_PREVIEW){
    state.guest = !state.user;
    state.authToken = null;
    if(typeof setAuthToken === 'function') setAuthToken(null);
    const label = document.createElement('div');
    label.className = 'design-mode-label';
    label.textContent = 'UI preview · Sample data';
    document.body.appendChild(label);
  }
  const fromHash = hashToView(location.hash);
  if(!isSignedIn()){
    if(fromHash.name !== 'login' && location.hash && location.hash !== '#/') state.pendingView = fromHash;
    state.view = { name:'login' };
  } else {
    state.view = fromHash.name === 'login' && state.user ? { name:'home' } : fromHash;
    hydrateFromBackend().then(() => { if(state.backendConnected) render(); });
  }
  const h = viewToHash(state.view);
  if(location.hash !== h) history.replaceState(null, '', h);
  render();
  window.VendezeIntro?.ready();
})();
