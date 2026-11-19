/* Homepage presentation. Reuses the existing vendors, saved list, and event flow. */
function marketplaceChevron(direction = 'right') {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${direction === 'left' ? 'M14 6l-6 6 6 6' : 'M10 6l6 6-6 6'}"/></svg>`;
}

function marketplaceVendorPhoto(v, eager = false) {
  const category = CATEGORIES.find(c => c.id === v.category);
  // Keep the same category-appropriate photo when a vendor appears in another row.
  const choices = DESIGN_PHOTOS[v.category] || ['celebration'];
  const photo = choices[Math.abs(Number(v.id) || 0) % choices.length];
  return `<img class="service-photo" src="assets/${photo}.jpg" alt="Illustrative ${esc(category?.name.toLowerCase() || 'event')} inspiration" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}

function marketplaceCard(v, index, badge) {
  const saved = state.wishlist.has(v.id);
  const category = CATEGORIES.find(c => c.id === v.category);
  return `<article class="marketplace-card">
    <div class="marketplace-card-photo">
      <a class="marketplace-photo-link" href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}" aria-label="Explore ${esc(v.name)}">${marketplaceVendorPhoto(v, index < 4)}</a>
      ${badge ? `<span class="marketplace-badge">${esc(badge)}</span>` : ''}
      <button class="marketplace-save${saved ? ' is-saved' : ''}" data-action="wishlist" data-id="${v.id}" aria-pressed="${saved}" aria-label="${saved ? 'Unsave' : 'Save'} ${esc(v.name)}">${icon('heart', { size: 21, filled: saved })}</button>
    </div>
    <div class="marketplace-card-title"><h3><a href="#/vendor/${v.id}" data-action="vendor" data-id="${v.id}">${esc(v.name)}</a></h3><span class="marketplace-rating" aria-label="Rated ${v.rating} out of 5">${icon('star', { size: 15, filled: true })}${Number(v.rating).toFixed(1)}</span></div>
    <p>${esc(v.area)}, Batticaloa</p>
    <p>${esc(category?.name || 'Event service')}<span class="marketplace-dot">·</span>${Number(v.reviews).toLocaleString()} reviews</p>
  </article>`;
}

function marketplaceRow(title, id, vendors, featured = false) {
  if (!vendors.length) return '';
  return `<section class="marketplace-section" aria-labelledby="${id}Title">
    <h2 id="${id}Title">${title}</h2>
    <div class="marketplace-carousel">
      <div class="marketplace-track" id="${id}" tabindex="0" role="region" aria-label="${title} vendors">${vendors.map((v, i) => marketplaceCard(v, i, featured && i < 2 ? 'Featured' : '')).join('')}</div>
      <button class="marketplace-carousel-button previous" data-home-carousel="${id}" data-direction="-1" aria-label="Previous ${title.toLowerCase()} vendors" disabled>${marketplaceChevron('left')}</button>
      <button class="marketplace-carousel-button next" data-home-carousel="${id}" data-direction="1" aria-label="More ${title.toLowerCase()} vendors">${marketplaceChevron()}</button>
    </div>
  </section>`;
}

function renderMarketplaceHome() {
  const vendors = VENDORS.filter(v => !v.suspended);
  const byIds = ids => [...ids.map(id => vendors.find(v => v.id === id)).filter(Boolean), ...vendors.filter(v => !ids.includes(v.id))].slice(0, 6);
  const recommended = byIds([14, 1, 7, 4, 12, 10]);
  const discover = byIds([12, 15, 5, 13, 3, 16]);
  const topRated = [...vendors].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 6);
  const areas = [...new Set(vendors.map(v => v.area))].sort();
  const steps = [
    { icon: 'search', title: 'Find your kind of people', text: 'Discover local photographers, beautiful venues, caterers, and the people behind every detail.' },
    { icon: 'heart', title: 'Keep your favourites close', text: 'See something you love? Save it to your shortlist and come back when you’re ready.' },
    { icon: 'calendar', title: 'Make it your occasion', text: 'Start with your date, your place, and your guest list. Bring your event details together.' },
    { icon: 'shoppingBag', title: 'Bring your team together', text: 'Explore packages, compare your options, and build a hold list for your celebration.' },
  ];
  return `<div class="marketplace-home">
    <section class="marketplace-hero" aria-labelledby="homeTitle">
      <h1 id="homeTitle">Book local event services</h1>
      <p class="marketplace-hero-description">Discover photographers, venues, caterers and creative people for your next celebration</p>
      <form class="marketplace-search" id="homeSearchForm" role="search">
        <label class="marketplace-search-field">${icon('search', { size: 22 })}<input id="homeSearchInput" type="search" placeholder="All event services" aria-label="Search event services" autocomplete="off" value="${esc(state.search.q)}"></label>
        <label class="marketplace-search-field marketplace-area">${icon('mapPin', { size: 22 })}<span class="sr-only">Location</span><select id="homeSearchArea" aria-label="Location"><option value="">Batticaloa</option>${areas.map(a => `<option value="${esc(a)}"${state.search.area === a ? ' selected' : ''}>${esc(a)}</option>`).join('')}</select><span class="marketplace-select-chevron">${marketplaceChevron()}</span></label>
        <button class="marketplace-search-field marketplace-date" type="button" data-action="create-event">${icon('calendar', { size: 22 })}<span>${state.event?.date ? esc(fmtDate(state.event.date, { day: 'numeric', month: 'short', year: 'numeric' })) : 'Any date'}</span></button>
        <div class="marketplace-search-actions">
          <button class="marketplace-ask-ai-button" id="homeAskAiButton" type="button" aria-label="Ask AI" data-tooltip="Ask AI">${icon('sparkle', { size: 23 })}</button>
          <button class="marketplace-button marketplace-search-button" type="submit">Search</button>
        </div>
      </form>
      <p class="marketplace-hero-note"><strong>${vendors.length} local vendors.</strong> One unforgettable occasion.</p>
      <button class="marketplace-button light" data-action="create-event">${state.event ? 'Continue your event' : 'Start planning'}${icon('calendar', { size: 18 })}</button>
    </section>
    <div class="marketplace-content">
      ${marketplaceRow('Recommended', 'homeRecommended', recommended, true)}
      ${marketplaceRow('More to discover', 'homeDiscover', discover)}
      ${marketplaceRow('Top rated near you', 'homeTopRated', topRated)}
      <p class="marketplace-photo-caption">Sample vendor listings · Photos are for inspiration</p>
      ${state.event ? `<section class="marketplace-current-event" aria-label="Your event plan">${renderEventPlanCard()}</section>` : ''}
      <section class="marketplace-planning" aria-labelledby="homePlanningTitle">
        <div><p class="marketplace-small-label">PLAN · BOOK · CELEBRATE</p><h2 id="homePlanningTitle">Your whole event.<br>One beautiful plan.</h2><p>Good people. Thoughtful details. Bring everything together for a celebration that feels like you.</p><button class="marketplace-button" data-action="create-event">${state.event ? 'Open your event' : 'Plan your celebration'}</button></div>
        <div class="marketplace-planning-art"><img src="assets/dining.jpg" alt="A beautifully set table ready for a celebration" loading="lazy" decoding="async"><div class="marketplace-planning-caption">${icon('calendar', { size: 25 })}<span><strong>Every detail, together.</strong><span>A little planning. A lot to look forward to.</span></span></div></div>
      </section>
      <section class="marketplace-how" aria-labelledby="homeHowTitle"><h2 id="homeHowTitle">A little planning goes a long way</h2><div class="marketplace-how-grid" role="region" aria-label="How event planning works" tabindex="0">${steps.map(s => `<article class="marketplace-how-card"><span class="marketplace-how-icon">${icon(s.icon, { size: 27 })}</span><h3>${s.title}</h3><p>${s.text}</p><span class="marketplace-how-signature">Made for your next celebration</span></article>`).join('')}</div></section>
      <section class="marketplace-stats" aria-labelledby="homeStatsTitle"><h2 id="homeStatsTitle">The local destination for your big moments</h2><p>One place to find the people who bring it all together</p><strong class="marketplace-pink">Your day. Your way.</strong><p>Make room for something wonderful</p><div class="marketplace-stats-grid"><div><strong>${vendors.length}</strong><span>local event vendors</span></div><div><strong>${CATEGORIES.length}</strong><span>services to explore</span></div><div><strong>${areas.length}</strong><span>areas around Batticaloa</span></div></div></section>
      <section class="marketplace-business" id="homeBusiness" aria-labelledby="homeBusinessTitle"><h2 id="homeBusinessTitle">Vendeze for businesses</h2><p>Do what you love. Be part of their big day.<br>Introduce your business to people planning their next celebration in Batticaloa.</p><button class="marketplace-button" data-home-account>${state.user ? 'Your account' : 'Get started'}</button><div class="marketplace-business-note">${icon('users', { size: 22 })}<span>Local talent. More possibilities.<br><small>Photography, venues, catering, beauty, music and decor.</small></span></div></section>
    </div>
    <section class="marketplace-browse" aria-labelledby="homeBrowseTitle"><div class="marketplace-content"><h2 id="homeBrowseTitle">Explore near you</h2><div class="marketplace-area-tabs" role="group" aria-label="Browse by area"><button class="is-selected" data-home-area="" aria-pressed="true">All areas</button>${areas.map(a => `<button data-home-area="${esc(a)}" aria-pressed="false">${esc(a)}</button>`).join('')}</div><div class="marketplace-browse-grid">${CATEGORIES.map(c => `<div><h3>${esc(c.name)}</h3>${areas.map(a => `<button data-home-browse-category="${esc(c.id)}" data-home-browse-area="${esc(a)}">${esc(c.name)} in ${esc(a)}</button>`).join('')}</div>`).join('')}</div><div class="marketplace-category-pills">${CATEGORIES.map(c => `<button data-action="category" data-id="${esc(c.id)}">${esc(c.name)}</button>`).join('')}</div></div></section>
    <footer class="marketplace-footer"><div class="marketplace-content marketplace-footer-grid"><div class="marketplace-footer-brand"><img src="icons/logo-word-dark.png" alt="Vendeze" width="132" height="18"><p>Plan. Book. Celebrate.</p><span>Batticaloa, Sri Lanka</span></div><div><h3>Discover Vendeze</h3><button data-action="search">Explore vendors</button><button data-action="services">Browse services</button><button data-action="saved">Your saved vendors</button></div><div><h3>Your celebration</h3><button data-action="create-event">Plan an event</button><button data-action="cart">Your hold list</button><button data-action="my-bookings">Your bookings</button></div><div><h3>For businesses</h3><button data-home-scroll="homeBusiness">Meet Vendeze</button><button data-home-account>${state.user ? 'Your account' : 'Join the community'}</button><button data-action="profile">Account and profile</button></div></div><div class="marketplace-footer-bottom marketplace-content"><span>${icon('mapPin', { size: 16 })} Made for Batticaloa</span><span>© ${new Date().getFullYear()} Vendeze</span></div></footer>
  </div>`;
}

function setupMarketplaceHome() {
  const header = document.getElementById('marketplaceHeaderActions');
  header.innerHTML = `<button class="marketplace-login" data-home-account>${state.user ? 'My account' : 'Log in'}</button><button class="marketplace-header-pill marketplace-business-link" data-home-scroll="homeBusiness">For businesses</button><details class="marketplace-menu"><summary class="marketplace-header-pill">Menu <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></summary><nav aria-label="Homepage menu"><button data-action="search">Explore vendors</button><button data-action="create-event">${state.event ? 'My event' : 'Plan an event'}</button><button data-action="saved">Saved vendors${state.wishlist.size ? ` (${state.wishlist.size})` : ''}</button><button data-action="cart">Hold list${state.cart.length ? ` (${state.cart.length})` : ''}</button><button data-action="my-bookings">My bookings</button><button data-action="profile">My profile</button></nav></details>`;
  // Header content is replaced on each home render, so listeners cannot accumulate.
  header.onkeydown = e => {
    if (e.key === 'Escape') {
      const menu = header.querySelector('details');
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  };
  document.getElementById('homeSearchForm').addEventListener('submit', e => {
    e.preventDefault();
    state.search = { q: document.getElementById('homeSearchInput').value.trim(), area: document.getElementById('homeSearchArea').value, category: '', sort: 'rating', freeOnly: false, maxPrice: '' };
    navigate({ name: 'search' });
  });
  document.querySelectorAll('[data-home-account]').forEach(b => b.addEventListener('click', () => navigate({ name: state.user ? 'profile' : 'login' })));
  document.querySelectorAll('[data-home-scroll]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.homeScroll)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })));
  document.querySelectorAll('[data-home-carousel]').forEach(b => b.addEventListener('click', () => {
    const track = document.getElementById(b.dataset.homeCarousel);
    track.scrollBy({ left: Number(b.dataset.direction) * (track.clientWidth + 26), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
  document.querySelectorAll('.marketplace-track').forEach(track => {
    const update = () => {
      const buttons = track.parentElement.querySelectorAll('[data-home-carousel]');
      buttons[0].disabled = track.scrollLeft < 2;
      buttons[1].disabled = Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2;
    };
    track.addEventListener('scroll', update, { passive: true });
    // Re-evaluate when a viewport change changes the number of visible cards.
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        if (!track.isConnected) { observer.disconnect(); return; }
        update();
      });
      observer.observe(track);
    }
    update();
  });
  document.querySelectorAll('[data-home-area]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-home-area]').forEach(tab => {
      tab.classList.toggle('is-selected', tab === b);
      tab.setAttribute('aria-pressed', String(tab === b));
    });
    document.querySelectorAll('[data-home-browse-category]').forEach(link => {
      link.hidden = !!b.dataset.homeArea && link.dataset.homeBrowseArea !== b.dataset.homeArea;
    });
  }));
  document.querySelectorAll('[data-home-browse-category]').forEach(b => b.addEventListener('click', () => {
    state.search = { q: '', category: b.dataset.homeBrowseCategory, area: b.dataset.homeBrowseArea, sort: 'rating', freeOnly: false, maxPrice: '' };
    navigate({ name: 'search' });
  }));
}
