/* Presentation layer only. Photos illustrate service categories, not actual vendors. */
const DESIGN_PHOTOS = {
  photo: ['couple', 'celebration'],
  catering: ['catering'],
  venue: ['venue', 'dining'],
  makeup: ['beauty'],
  sound: ['music'],
  decor: ['florals'],
};
const DESIGN_OCCASIONS = {
  Wedding: { title: 'A day like no other.<br>A team that gets it.', text: 'Find the people who bring your kind of celebration to life. From the first photograph to the last dance, start here.', image: 'celebration', note: 'THE START OF SOMETHING BEAUTIFUL' },
  Engagement: { title: 'Your next chapter.<br>Beautifully begun.', text: 'An intimate gathering or a room full of love. Find the right space, the thoughtful details, and the people to make it yours.', image: 'couple', note: 'A LITTLE MOMENT. A BIG YES.' },
  Birthday: { title: 'Another year.<br>Make it a good one.', text: 'Good food, your favourite people, and a little something unexpected. Bring your birthday plans together, your way.', image: 'dining', note: 'MORE REASONS TO COME TOGETHER' },
  Corporate: { title: 'Bring people together.<br>Make an impression.', text: 'From a team celebration to your next big launch, discover local spaces and creative people who understand the occasion.', image: 'venue', note: 'GOOD THINGS HAPPEN TOGETHER' },
  Other: { title: 'Whatever the occasion.<br>Make it feel like you.', text: 'Big milestones. Small gatherings. Everything in between. Discover the local people who can bring your idea to life.', image: 'florals', note: 'EVERY CELEBRATION HAS A STORY' },
};
let designOccasion = 'Wedding';

function designPhoto(category, variant = 0, eager = false) {
  const images = DESIGN_PHOTOS[category] || DESIGN_PHOTOS.decor;
  return `<img class="service-photo" src="assets/${images[Math.abs(Number(variant)) % images.length]}.jpg" alt="Illustrative ${esc(CATEGORIES.find(c => c.id === category)?.name.toLowerCase() || 'event')} inspiration" loading="${eager ? 'eager' : 'lazy'}" decoding="async" />`;
}

function renderEditorialVendorCard(v, headingLevel = 2) {
  const saved = state.wishlist.has(v.id);
  const held = state.cart.some(c => c.id === v.id);
  const category = CATEGORIES.find(c => c.id === v.category);
  const headingTag = headingLevel === 3 ? 'h3' : 'h2';
  return `<article class="vendor-card editorial-vendor">
    <div class="vendor-img"><a class="vendor-photo-link" href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}" aria-label="Explore ${esc(v.name)}">${marketplaceVendorPhoto(v)}</a>
      <span class="vendor-category">${esc(category?.name || 'Event service')}</span>
      <button class="wishlist-btn${saved ? ' on' : ''}" data-action="wishlist" data-id="${v.id}" aria-pressed="${saved}" aria-label="${saved ? 'Unsave' : 'Save'} ${esc(v.name)}">${icon('heart', { size: 19, filled: saved })}</button>
      ${held ? '<span class="photo-note">On your hold list</span>' : ''}
    </div>
    <div class="vendor-body">
      <div class="vendor-title-row"><${headingTag} class="vendor-name"><a href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}">${esc(v.name)}</a></${headingTag}><span class="vendor-rating" aria-label="Rated ${v.rating} out of 5">${icon('star', { size: 15, filled: true })} ${Number(v.rating).toFixed(1)}</span></div>
      <p class="vendor-location">${esc(v.area)}, Batticaloa</p>
      <p class="vendor-card-meta">${esc(category?.name || 'Event service')} · ${Number(v.reviews).toLocaleString()} reviews</p>
      <div class="vendor-bottom"><span class="vendor-price"><small>Starting at</small> ${money(v.priceFrom)}${v.priceUnit ? '<small> / guest</small>' : ''}</span><a class="vendor-detail-label" href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}" aria-label="Explore ${esc(v.name)}">Explore</a></div>
    </div>
  </article>`;
}

function renderEditorialHome() {
  const occasion = DESIGN_OCCASIONS[designOccasion];
  const picks = [14, 1, 7, 4].map(id => VENDORS.find(v => v.id === id && !v.suspended)).filter(Boolean);
  const first = state.user ? esc(state.user.name.split(' ')[0]) : '';
  return `<div class="editorial-home">
    <div class="local-note"><span>${icon('mapPin', { size: 14 })} BATTICALOA, SRI LANKA</span><span>Local people. Unforgettable occasions.</span></div>
    <section class="editorial-hero" aria-labelledby="homeTitle">
      <div class="hero-copy"><p class="eyebrow">A LITTLE PLANNING. A LOT OF POSSIBILITY.</p>
        <h1 id="homeTitle">Big moments.<br>Good people.<br><em>Your story.</em><span class="hero-asterisk" aria-hidden="true">✳</span></h1>
        <p class="hero-description">The place to find your people. Discover event vendors in Batticaloa and bring something wonderful to life.</p>
        <div class="hero-actions"><button class="btn-gold" data-action="create-event">${state.event ? 'Continue your event' : 'Start your celebration'} ${icon('plus', { size: 17 })}</button><button class="text-button" data-action="search">Meet the vendors</button></div>
        <div class="hero-footnote"><span class="handwritten">A good day starts here.</span><span class="little-line" aria-hidden="true"></span></div>
      </div>
      <div class="hero-art"><div class="hero-photo-main"><img src="assets/celebration.jpg" alt="A couple sharing a moment with a bouquet of flowers in the sunlight" fetchpriority="high" decoding="async"><span class="image-caption">YOUR DAY, IN YOUR OWN WAY.</span></div>
        <div class="hero-photo-small"><img src="assets/dining.jpg" alt="A thoughtfully styled celebration table" decoding="async"><span>the little details, too.</span></div>
        <div class="celebration-stamp" aria-label="Made for your kind of celebration"><span>MADE FOR YOUR</span><b>kind of<br><i>celebration.</i></b><span>BATTICALOA & BEYOND</span></div>
        <span class="art-spark" aria-hidden="true">✧</span>
      </div>
    </section>
    <section class="discovery-bar" aria-label="Find your service"><form id="homeSearchForm" role="search"><label class="discovery-input">${icon('search', { size: 21 })}<span><span class="input-caption">LET’S FIND YOUR PEOPLE</span><input id="homeSearchInput" type="search" placeholder="A photographer, a perfect venue…" aria-label="Search vendors" autocomplete="off"></span></label><button type="button" class="discovery-location" data-action="search">${icon('mapPin', { size: 20 })}<span><span class="input-caption">SOMEWHERE CLOSE TO HOME</span><strong>Batticaloa & surrounding areas</strong></span></button><button type="submit" class="btn-gold">Find vendors</button></form></section>
    ${state.event ? `<section class="returning-event"><p class="eyebrow">${first ? `${first.toUpperCase()}, ` : ''}LET’S PICK UP WHERE YOU LEFT OFF</p>${renderEventPlanCard()}</section>` : ''}
    <section class="category-section" aria-labelledby="categoryTitle"><div class="editorial-section-head"><div><p class="eyebrow">THE PEOPLE WHO MAKE IT HAPPEN</p><h2 id="categoryTitle">Every detail.<br class="mobile-only"> The right people.</h2></div><button class="text-button" data-action="services">Explore all services</button></div>
      <div class="category-collection">${CATEGORIES.map(c => `<button class="editorial-category" data-action="category" data-id="${esc(c.id)}">${designPhoto(c.id)}<span class="category-overlay"><span class="category-symbol">${icon(c.icon, { size: 22 })}</span><span class="category-title">${esc(c.id === 'makeup' ? 'Beauty & bridal' : c.id === 'decor' ? 'Florals & decor' : c.id === 'venue' ? 'Venues' : c.name)}</span><span class="category-count">${VENDORS.filter(v => v.category === c.id && !v.suspended).length} local vendors</span></span></button>`).join('')}</div>
    </section>
    <section class="occasion-section" aria-labelledby="occasionTitle"><div class="occasion-intro"><p class="eyebrow">BIG MILESTONES. LITTLE GET-TOGETHERS.</p><h2 id="occasionTitle">What’s your<br> <em>occasion?</em></h2><p>There’s no one way to celebrate.<br>Let’s find yours.</p><div class="occasion-tabs" role="group" aria-label="Choose an occasion">${Object.keys(DESIGN_OCCASIONS).map(name => `<button class="occasion-tab${name === designOccasion ? ' selected' : ''}" data-occasion="${name}" aria-pressed="${name === designOccasion}">${name}</button>`).join('')}</div></div>
      <div class="occasion-photo"><img id="occasionImage" src="assets/${occasion.image}.jpg" alt="${esc(designOccasion)} celebration inspiration" loading="lazy"><span id="occasionImageNote">${occasion.note}</span></div>
      <div class="occasion-description" aria-live="polite"><span class="occasion-flower" aria-hidden="true">✳</span><h3 id="occasionHeadline">${occasion.title}</h3><p id="occasionText">${occasion.text}</p><button class="text-button" id="occasionPlan">Plan a ${designOccasion.toLowerCase() === 'other' ? 'celebration' : designOccasion.toLowerCase()}</button></div>
    </section>
    <section class="picks-section" aria-labelledby="picksTitle"><div class="editorial-section-head"><div><p class="eyebrow">A FEW GOOD PLACES TO START</p><h2 id="picksTitle">Your celebration, their craft.</h2><p class="section-description">Meet some of the people behind the moments.</p></div><button class="text-button" data-action="search">View all vendors</button></div><div class="vendor-grid home-vendor-grid">${picks.map(vendorCard).join('')}</div><p class="sample-caption">Sample vendor listings · Photography is illustrative</p></section>
    <section class="how-section" aria-labelledby="howTitle"><div><p class="eyebrow">LESS TABS OPEN. MORE POSSIBILITIES.</p><h2 id="howTitle">From “what if”<br>to <em>“it’s happening.”</em></h2><button class="btn-gold" data-action="create-event">Let’s make a plan ${icon('plus', { size: 16 })}</button></div><div class="how-steps"><div>${icon('calendar', { size: 22 })}<h3>Tell us what’s coming.</h3><p>A date, a place, and your kind of occasion. Start with what you know.</p></div><div>${icon('heart', { size: 22 })}<h3>Find your kind of people.</h3><p>Explore local vendors, look through their work, and save your favourites.</p></div><div>${icon('shoppingBag', { size: 22 })}<h3>Bring your team together.</h3><p>Explore packages and build a hold list for your celebration.</p></div></div></section>
    <section class="closing-note"><span aria-hidden="true">✧</span><p>Something wonderful<br>starts with <em>your idea.</em></p><button class="text-button" data-action="create-event">Give it a place to begin</button></section>
    ${renderDesignFooter()}
  </div>`;
}

function setupEditorialHome() {
  const form = document.getElementById('homeSearchForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    state.search.q = document.getElementById('homeSearchInput').value;
    navigate({ name: 'search' });
  });
  document.querySelectorAll('[data-occasion]').forEach(button => button.addEventListener('click', () => {
    designOccasion = button.dataset.occasion;
    const occasion = DESIGN_OCCASIONS[designOccasion];
    document.querySelectorAll('[data-occasion]').forEach(tab => {
      tab.classList.toggle('selected', tab === button);
      tab.setAttribute('aria-pressed', String(tab === button));
    });
    document.getElementById('occasionImage').src = `assets/${occasion.image}.jpg`;
    document.getElementById('occasionImage').alt = `${designOccasion} celebration inspiration`;
    document.getElementById('occasionImageNote').textContent = occasion.note;
    document.getElementById('occasionHeadline').innerHTML = occasion.title;
    document.getElementById('occasionText').textContent = occasion.text;
    document.getElementById('occasionPlan').textContent = `Plan a ${designOccasion === 'Other' ? 'celebration' : designOccasion.toLowerCase()}`;
  }));
  document.getElementById('occasionPlan')?.addEventListener('click', () => {
    navigate({ name: 'createEvent', suggestedType: designOccasion });
  });
}

function renderDesignFooter() {
  return `<footer class="design-footer"><div class="footer-brand"><img src="icons/logo-word-dark.png" alt="Vendeze" width="150" height="20"><p>Good people.<br>Great celebrations.</p></div><div><p class="eyebrow">MAKE IT HAPPEN</p><button data-action="search">Discover vendors</button><button data-action="create-event">Plan your event</button><button data-action="saved">Your saved vendors</button></div><div class="footer-local"><p class="eyebrow">A LITTLE CLOSER TO HOME</p><p>Made for celebrations<br>in Batticaloa, Sri Lanka.</p><span>Plan · Book · Celebrate</span></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Vendeze</span><span>UI design preview · Sample content</span><button data-action="profile">Your account</button></div></footer>`;
}
