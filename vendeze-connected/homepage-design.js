/* Celebration-led homepage. Shared vendor imagery also serves the inner pages. */
function marketplaceChevron(direction = 'right') {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${direction === 'left' ? 'M14 6l-6 6 6 6' : 'M10 6l6 6-6 6'}"/></svg>`;
}

function marketplaceVendorPhoto(v, eager = false) {
  const category = CATEGORIES.find(c => c.id === v.category);
  const choices = DESIGN_PHOTOS[v.category] || ['celebration'];
  const photo = choices[Math.abs(Number(v.id) || 0) % choices.length];
  return `<img class="service-photo" src="assets/${photo}.jpg" alt="Illustrative ${esc(category?.name.toLowerCase() || 'event')} inspiration" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}

let marketplaceHomeCategory = '';

function marketplaceCard(v) {
  const saved = state.wishlist.has(v.id);
  const category = CATEGORIES.find(c => c.id === v.category);
  return `<article class="marketplace-card">
    <div class="marketplace-card-photo">
      <a class="marketplace-photo-link" href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}" aria-label="Explore ${esc(v.name)}">${marketplaceVendorPhoto(v)}</a>
      <span class="marketplace-badge">${esc(category?.name || 'Event service')}</span>
      <button class="marketplace-save${saved ? ' is-saved' : ''}" data-action="wishlist" data-id="${v.id}" aria-pressed="${saved}" aria-label="${saved ? 'Unsave' : 'Save'} ${esc(v.name)}">${icon('heart', { size: 21, filled: saved })}</button>
    </div>
    <div class="marketplace-card-title"><h3><a href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}">${esc(v.name)}</a></h3><span class="marketplace-rating" aria-label="Rated ${v.rating} out of 5">${icon('star', { size: 15, filled: true })}${Number(v.rating).toFixed(1)}</span></div>
    <p>${esc(v.area)}, Batticaloa</p>
    <p>${Number(v.reviews).toLocaleString()} reviews<span class="marketplace-dot">·</span>From ${money(v.priceFrom)}${v.priceUnit ? ' / person' : ''}</p>
  </article>`;
}

function marketplaceHomeVendors() {
  const matching = VENDORS.filter(v => !v.suspended && (!marketplaceHomeCategory || v.category === marketplaceHomeCategory));
  const preferred = [14, 1, 7, 4];
  const vendors = [...preferred.map(id => matching.find(v => v.id === id)).filter(Boolean), ...matching.filter(v => !preferred.includes(v.id))];
  return {
    cards: vendors.length ? vendors.slice(0, 4).map(marketplaceCard).join('') : '<p class="celebrate-empty">More local talent is on the way. Explore another service.</p>',
    count: `Showing ${Math.min(4, vendors.length)} of ${vendors.length} ${marketplaceHomeCategory ? 'matching' : 'local'} vendors`,
  };
}

function celebrateStar(className = '') {
  return `<svg class="celebrate-star ${className}" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M50 0 60 29 85 15 71 40 100 50 71 60 85 85 60 71 50 100 40 71 15 85 29 60 0 50 29 40 15 15 40 29Z"/></svg>`;
}

function renderMarketplaceHome() {
  const vendors = VENDORS.filter(v => !v.suspended);
  const areas = [...new Set(vendors.map(v => v.area))].sort();
  const homeVendors = marketplaceHomeVendors();
  const occasions = [
    { type: 'Wedding', name: 'THE BIG\nI DO.', note: 'Weddings & forever things', theme: 'wedding', photo: 'couple' },
    { type: 'Birthday', name: 'ANOTHER\nYEAR.\nMORE YOU.', note: 'Birthdays done your way', theme: 'birthday', photo: 'birthday' },
    { type: 'Other', name: 'JUST\nBECAUSE.', note: 'No reason needed', theme: 'because' },
    { type: 'Engagement', name: 'IT’S\nA YES!', note: 'The start of something', theme: 'engagement', photo: 'florals' },
    { type: 'Other', name: 'ONE\nMORE\nDANCE.', note: 'Good music. Better company.', theme: 'dance', photo: 'dance' },
    { type: 'Corporate', name: 'OUT OF\nOFFICE.', note: 'A different kind of team meeting', theme: 'corporate' },
    { type: 'Kovil Festival', name: 'TRADITIONS.\nTOGETHER.', note: 'Community & celebrations', theme: 'festival', photo: 'dining' },
  ];
  return `<div class="marketplace-home celebrate-home">
    <section class="celebrate-hero" aria-labelledby="homeTitle">
      <div class="celebrate-hero-inner"><div class="celebrate-hero-copy">
        <p class="celebrate-eyebrow">GOOD PEOPLE. UNFORGETTABLE OCCASIONS.</p>
        <h1 id="homeTitle"><span>GOOD TIMES.</span><span>START HERE.</span></h1>
        <p class="celebrate-hero-description">Your people. Your plans.<br>Find the local talent to bring it all together.</p>
        <div class="celebrate-actions"><button class="celebrate-button white" data-action="create-event">${state.event ? 'Continue your event' : 'Plan an event'}</button><button class="celebrate-button outline" data-home-scroll="homeVendors">Explore vendors</button></div>
        <p class="celebrate-hero-location">${icon('mapPin', { size: 16 })} Made for celebrations in Batticaloa</p>
      </div>
      <div class="celebrate-hero-art">
        <img class="celebrate-hero-photo" src="assets/party.jpg" alt="Friends raising a toast together under warm celebration lights" width="1200" height="800" fetchpriority="high" decoding="async">
        <div class="celebrate-photo-title" aria-hidden="true"><span>THESE ARE</span><strong>THE DAYS.</strong></div>
        <span class="celebrate-photo-tag">a little planning. a lot of living.</span>
        <div class="celebrate-hero-sticker" aria-hidden="true">${celebrateStar()}<span>LET’S<br>MAKE<br>MEMORIES</span></div>
        <div class="celebrate-message"><span class="celebrate-message-avatar">${icon('heart', { size: 21 })}</span><span>so… what are we celebrating?</span></div>
      </div></div>
    </section>

    <div class="celebrate-strip" aria-label="Local event services"><span>PHOTOGRAPHY</span>${celebrateStar()}<span>GOOD FOOD</span>${celebrateStar()}<span>GREAT SPACES</span>${celebrateStar()}<span>YOUR PEOPLE</span>${celebrateStar()}<span>UNFORGETTABLE DAYS</span></div>

    <section class="celebrate-how celebrate-section" id="homeHow" aria-labelledby="homeHowTitle">
      <div class="celebrate-section-heading"><h2 id="homeHowTitle">ONE PLACE.<br>YOUR WHOLE EVENT.</h2><p>Less running around. More looking forward to it.</p></div>
      <div class="celebrate-steps">
        <article><div class="celebrate-step-art plan-art" aria-hidden="true"><div class="celebrate-mini-poster"><span>something good is coming</span><strong>YOUR NEXT<br>BIG THING.</strong><img src="assets/birthday.jpg" alt="" loading="lazy"><span class="mini-poster-label">made by you. made for memories.</span></div>${celebrateStar('step-star')}</div><h3>Make it your occasion</h3><p>A date, a place, and your kind of celebration.<br> Start with the details you know.</p></article>
        <article><div class="celebrate-step-art team-art" aria-hidden="true"><div class="celebrate-mini-team"><span class="mini-label">THE PEOPLE BEHIND YOUR DAY</span><strong>Your dream team</strong>${[{ image: 'couple', name: 'The moment catchers', sub: 'Photography' }, { image: 'catering', name: 'The crowd pleasers', sub: 'Catering' }, { image: 'florals', name: 'The detail people', sub: 'Decoration' }].map(v => `<div class="mini-team-row"><img src="assets/${v.image}.jpg" alt="" loading="lazy"><span><b>${v.name}</b><small>${v.sub}</small></span><span class="mini-team-check">${icon('check', { size: 16 })}</span></div>`).join('')}</div></div><h3>Find your kind of people</h3><p>Discover local vendors, compare packages,<br> and save the ones you love.</p></article>
        <article><div class="celebrate-step-art details-art" aria-hidden="true"><div class="celebrate-mini-plan"><div class="mini-plan-image"><img src="assets/dining.jpg" alt="" loading="lazy"><span>IT’S ALL COMING TOGETHER.</span></div><strong>The best day, in the making.</strong><div>${icon('calendar', { size: 17 })}<span>Your date. Your place.</span></div><div>${icon('users', { size: 17 })}<span>All your favourite people.</span></div><span class="mini-plan-pill">A little closer to the good times</span></div></div><h3>Bring it all together</h3><p>Your shortlist, your packages, your plans.<br> Everything in one happy place.</p></article>
      </div>
      <div class="celebrate-section-action"><button class="celebrate-button primary" data-action="create-event">${state.event ? 'Open your event' : 'Start your plan'}</button><span>Your next good memory starts with an idea.</span></div>
    </section>

    <section class="celebrate-occasions" aria-labelledby="homeOccasionsTitle">
      <div class="celebrate-section-heading"><h2 id="homeOccasionsTitle">A MILLION REASONS<br>TO GET TOGETHER.</h2><p>The big milestones. The little moments. All of it.</p></div>
      <div class="celebrate-poster-track" role="region" aria-label="Choose an occasion" tabindex="0"><div class="celebrate-posters">${occasions.map((o, i) => `<button class="celebrate-poster poster-${o.theme}" data-home-occasion="${esc(o.type)}" style="--poster-index:${i}">${o.photo ? `<img src="assets/${o.photo}.jpg" alt="" loading="lazy" decoding="async">` : ''}<span class="poster-kicker">VENDEZE PRESENTS</span>${celebrateStar('poster-star')}<strong>${o.name.replace(/\n/g, '<br>')}</strong><span class="poster-note">${o.note}</span></button>`).join('')}</div></div>
      <p class="celebrate-occasions-hint">Pick an occasion. Make it yours.</p>
    </section>

    <section class="celebrate-vendors celebrate-section" id="homeVendors" aria-labelledby="homeVendorsTitle">
      <div class="celebrate-section-heading"><p class="celebrate-eyebrow">RIGHT HERE IN BATTICALOA</p><h2 id="homeVendorsTitle">GOOD PEOPLE.<br>GREAT CELEBRATIONS.</h2><p>Meet the local talent behind your next great occasion.</p></div>
      <div class="celebrate-category-tabs" role="group" aria-label="Filter vendors by service"><button data-home-category="" aria-pressed="${!marketplaceHomeCategory}" class="${!marketplaceHomeCategory ? 'is-selected' : ''}">All services</button>${CATEGORIES.map(c => `<button data-home-category="${esc(c.id)}" aria-pressed="${marketplaceHomeCategory === c.id}" class="${marketplaceHomeCategory === c.id ? 'is-selected' : ''}">${esc(c.name)}</button>`).join('')}</div>
      <form class="celebrate-search" id="homeSearchForm" role="search"><label>${icon('search', { size: 20 })}<span class="sr-only">Search event services</span><input id="homeSearchInput" type="search" placeholder="Find your next favourite vendor" value="${esc(state.search.q)}" autocomplete="off"></label><label class="celebrate-search-area">${icon('mapPin', { size: 19 })}<span class="sr-only">Location</span><select id="homeSearchArea"><option value="">All of Batticaloa</option>${areas.map(a => `<option value="${esc(a)}"${state.search.area === a ? ' selected' : ''}>${esc(a)}</option>`).join('')}</select><span class="celebrate-select-chevron">${marketplaceChevron()}</span></label><button class="marketplace-ask-ai-button" id="homeAskAiButton" type="button" aria-label="Ask AI" data-tooltip="Ask AI">${icon('sparkle', { size: 23 })}</button><button class="celebrate-button primary" type="submit">Search</button></form>
      <div class="celebrate-vendor-grid" id="homeVendorGrid" role="region" aria-label="Local vendors" tabindex="0">${homeVendors.cards}</div>
      <div class="celebrate-vendor-caption"><p id="homeVendorCount" role="status">${homeVendors.count}</p><p>Photos are for inspiration.</p></div>
      <div class="celebrate-section-action"><button class="celebrate-button primary" data-home-all-vendors>Explore more vendors</button></div>
    </section>

    <section class="celebrate-together" aria-labelledby="homeTogetherTitle"><div class="celebrate-together-inner">
      <div class="celebrate-together-copy"><p class="celebrate-eyebrow">A LITTLE LESS CHAOS</p><h2 id="homeTogetherTitle">LESS TABS.<br>MORE<br><span>TOGETHER.</span></h2></div>
      <div class="celebrate-phone" aria-hidden="true"><div class="celebrate-phone-island"></div><div class="celebrate-phone-brand"><img src="icons/logo-word-dark.png" alt="" width="100" height="15"><span>${icon('heart', { size: 17 })}</span></div><div class="celebrate-phone-photo"><img src="assets/party.jpg" alt="" loading="lazy"><span>GOOD TIMES<br>IN THE MAKING.</span></div><div class="celebrate-phone-body"><span class="mini-label">YOUR CELEBRATION STARTS HERE</span><strong>All the good things.<br>One happy place.</strong><div>${icon('calendar', { size: 17 })}<span>A date to look forward to</span></div><div>${icon('mapPin', { size: 17 })}<span>Somewhere in Batticaloa</span></div><div class="phone-vendor-row"><span>${icon('camera', { size: 20 })}</span><span>${icon('plate', { size: 20 })}</span><span>${icon('music', { size: 20 })}</span><span>${icon('sparkle', { size: 20 })}</span></div></div></div>
      <div class="celebrate-together-detail"><p>All your event plans.<br>Finally in the same place.</p><ul><li>${icon('heart', { size: 19 })} Save the vendors you love</li><li>${icon('shoppingBag', { size: 19 })} Build your event hold list</li><li>${icon('calendar', { size: 19 })} Keep your plans together</li></ul><button class="celebrate-button white" data-action="${state.event ? 'cart' : 'create-event'}">${state.event ? 'Open your hold list' : 'Let’s start planning'}</button></div>
    </div></section>

    ${state.event ? `<section class="celebrate-current-event celebrate-section" aria-labelledby="homeCurrentEventTitle"><h2 id="homeCurrentEventTitle">YOUR GOOD TIMES,<br>IN THE MAKING.</h2>${renderEventPlanCard()}</section>` : ''}

    <section class="celebrate-business celebrate-section" id="homeBusiness" aria-labelledby="homeBusinessTitle"><div class="celebrate-section-heading"><h2 id="homeBusinessTitle">BIG DAYS.<br>LOCAL TALENT.</h2><p>For the people who make the magic happen.</p></div><div class="celebrate-business-grid"><div class="celebrate-business-photo"><img src="assets/venue.jpg" alt="A beautifully prepared venue waiting for a celebration" loading="lazy" decoding="async"><span>YOUR WORK. THEIR BIG MOMENT.</span></div><div class="celebrate-business-card">${celebrateStar()}<span class="celebrate-eyebrow">VENDEZE FOR BUSINESSES</span><h3>DO WHAT<br>YOU LOVE.</h3><p>Bring your business to people planning their next celebration in Batticaloa.</p><button class="celebrate-button primary" data-home-account>${state.user ? 'Your account' : 'Join the community'}</button></div></div><div class="celebrate-local-facts"><span><strong>${vendors.length}</strong> local vendors to discover</span><span><strong>${CATEGORIES.length}</strong> ways to bring your day to life</span><span><strong>${areas.length}</strong> areas around Batticaloa</span></div></section>

    <section class="celebrate-finale" aria-labelledby="homeFinaleTitle"><div><p class="celebrate-eyebrow">THE NEXT GOOD THING IS YOURS TO PLAN</p><h2 id="homeFinaleTitle">MAKE IT<br>A GOOD ONE.</h2><button class="celebrate-button primary" data-action="create-event">${state.event ? 'Continue your event' : 'Start your event'}</button></div><div class="celebrate-finale-art" aria-hidden="true">${celebrateStar('finale-star')}<div class="celebrate-finale-photo"><img src="assets/dance.jpg" alt="" loading="lazy"><strong>SEE YOU<br>THERE.</strong></div><span class="celebrate-finale-sticker">good things<br>happen together.</span></div></section>

    <footer class="celebrate-footer"><div class="celebrate-footer-top"><div><p>GOOD PEOPLE. GOOD PLANS. GOOD TIMES.</p><span>Born for celebrations in Batticaloa.</span></div><nav aria-label="Explore Vendeze"><button data-action="search">Explore vendors</button><button data-action="create-event">Plan an event</button><button data-action="saved">Saved vendors</button><button data-action="cart">Your hold list</button><button data-action="my-bookings">My bookings</button><button data-home-account>${state.user ? 'My account' : 'Log in'}</button></nav></div><img class="celebrate-footer-wordmark" src="icons/logo-word-dark.png" alt="Vendeze" width="1320" height="179" loading="lazy"><div class="celebrate-footer-bottom"><span>© ${new Date().getFullYear()} Vendeze</span><span>Plan. Book. Celebrate.</span><span>Batticaloa, Sri Lanka</span></div></footer>
  </div>`;
}

/* Recreated per home render; the router removes the previous listeners first. */
function setupMarketplaceNav() {
  const header = document.getElementById('mainHeader');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  const scrollPosition = () => Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - innerHeight));
  let lastY = scrollPosition();
  let direction = 0;
  let distance = 0;
  let frame = 0;

  const reveal = () => {
    header.classList.remove('is-home-nav-hidden');
    lastY = scrollPosition();
    direction = 0;
    distance = 0;
  };
  const update = () => {
    frame = 0;
    const y = scrollPosition();
    const delta = y - lastY;
    lastY = y;
    if (y <= 110 || motion.matches || header.matches(':focus-within') || header.querySelector('[aria-expanded="true"]')) {
      reveal();
      return;
    }
    if (!delta) return;
    const nextDirection = Math.sign(delta);
    if (nextDirection !== direction) {
      direction = nextDirection;
      distance = 0;
    }
    distance += delta;
    // Small touchpad movements must not make the navbar flicker.
    if (distance >= 12) header.classList.add('is-home-nav-hidden');
    else if (distance <= -8) header.classList.remove('is-home-nav-hidden');
  };

  reveal();
  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true, signal: events.signal });
  window.addEventListener('resize', () => {
    reveal();
    if (header.querySelector('[aria-expanded="true"]')) closeNotifications();
  }, { signal: events.signal });
  header.addEventListener('focusin', reveal, { signal: events.signal });
  motion.addEventListener('change', reveal, { signal: events.signal });
  setupMarketplaceNav.cleanup = () => {
    events.abort();
    cancelAnimationFrame(frame);
    header.classList.remove('is-home-nav-hidden');
  };
}

function setupMarketplaceHome() {
  document.getElementById('homeSearchForm').addEventListener('submit', e => {
    e.preventDefault();
    state.search = { q: document.getElementById('homeSearchInput').value.trim(), area: document.getElementById('homeSearchArea').value, category: marketplaceHomeCategory, sort: 'rating', freeOnly: false, maxPrice: '' };
    navigate({ name: 'search' });
  });
  document.querySelectorAll('[data-home-account]').forEach(b => b.addEventListener('click', () => navigate({ name: state.user ? 'profile' : 'login' })));
  document.querySelectorAll('[data-home-scroll]').forEach(b => b.addEventListener('click', () => {
    const section = document.getElementById(b.dataset.homeScroll);
    section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    const heading = section?.querySelector('h2');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }));
  document.querySelectorAll('[data-home-occasion]').forEach(b => b.addEventListener('click', () => navigate({ name: 'createEvent', suggestedType: b.dataset.homeOccasion })));
  document.querySelectorAll('[data-home-category]').forEach(b => b.addEventListener('click', () => {
    marketplaceHomeCategory = b.dataset.homeCategory;
    document.querySelectorAll('[data-home-category]').forEach(tab => {
      const selected = tab === b;
      tab.classList.toggle('is-selected', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    const vendors = marketplaceHomeVendors();
    document.getElementById('homeVendorGrid').innerHTML = vendors.cards;
    document.getElementById('homeVendorGrid').scrollLeft = 0;
    document.getElementById('homeVendorCount').textContent = vendors.count;
  }));
  document.querySelector('[data-home-all-vendors]').addEventListener('click', () => {
    state.search = { q: '', area: '', category: marketplaceHomeCategory, sort: 'rating', freeOnly: false, maxPrice: '' };
    navigate({ name: 'search' });
  });
  setupMarketplaceHome.revealObserver?.disconnect();
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.celebrate-section-heading, .celebrate-step-art, .celebrate-business-grid').forEach(el => {
      el.classList.add('celebrate-reveal');
      observer.observe(el);
    });
    setupMarketplaceHome.revealObserver = observer;
  }
}
