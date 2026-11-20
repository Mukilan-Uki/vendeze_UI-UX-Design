/* One expanding navigation component for customer, account, and staff screens. */
const SHARED_NAV_ITEMS = [
  { id:'explore', label:'Explore' },
  { id:'plan', label:'Plan an event' },
  { id:'plans', label:'Your plans' },
  { id:'business', label:'For businesses' },
];

function sharedNavLink(action, title, description, symbol, extra = '') {
  return `<button class="shared-nav-link" data-action="${action}" ${extra}><span class="shared-nav-link-icon">${icon(symbol, { size:20 })}</span><span><strong>${title}</strong><small>${description}</small></span></button>`;
}

function sharedNavContent(key) {
  const workspace = { vendor:['vendor-dashboard','Your dashboard','Bookings, requests, and your business.'], admin:['admin','Admin workspace','Manage your community and local vendors.'], developer:['developer','Developer workspace','Your existing site tools and settings.'] }[state.user?.role];
  const categories = CATEGORIES.map(c => `<button class="shared-nav-link" data-action="category" data-id="${esc(c.id)}"><span class="shared-nav-link-icon">${icon(c.icon, { size:20 })}</span><span><strong>${esc(c.id === 'venue' ? 'Venues' : c.id === 'makeup' ? 'Beauty & bridal' : c.id === 'sound' ? 'Sound & music' : c.id === 'decor' ? 'Florals & decor' : c.name)}</strong><small>${esc(c.note)}</small></span></button>`).join('');
  const panels = {
    explore: {
      eyebrow:'THE PEOPLE BEHIND YOUR DAY', heading:'Find your kind of people.', intro:'Discover the local talent for every part of your celebration.', links:categories,
      action:'search', actionLabel:'Explore all vendors', photo:'venue', title:'GOOD PEOPLE. GREAT CELEBRATIONS.', description:'Beautiful spaces, thoughtful details, and the people who bring them to life. All around Batticaloa.',
    },
    plan: {
      eyebrow:'A LITTLE PLANNING. A LOT TO LOOK FORWARD TO.', heading:state.event ? 'Your next good memory.' : 'What are we celebrating?', intro:state.event ? `Pick up where you left off with ${esc(state.event.name)}.` : 'The big milestones. The little moments. Start with your occasion.',
      links:[['Wedding','Your kind of forever.','heart'],['Birthday','Another year. More you.','sparkle'],['Engagement','The start of something.','gem'],['Corporate','Bring your people together.','users'],['Kovil Festival','Traditions worth celebrating.','building'],['Other','No reason needed.','calendar']].map(([type,desc,symbol]) => `<button class="shared-nav-link" data-nav-occasion="${type}"><span class="shared-nav-link-icon">${icon(symbol, { size:20 })}</span><span><strong>${type === 'Other' ? 'Just because' : type}</strong><small>${desc}</small></span></button>`).join(''),
      action:'create-event', actionLabel:state.event ? 'Continue your event' : 'Start your event', photo:'party', title:'GOOD TIMES IN THE MAKING.', description:'A date, a place, and your favourite people. Bring your celebration together, one lovely detail at a time.',
    },
    plans: {
      eyebrow:'EVERY DETAIL, TOGETHER', heading:'Keep the good things close.', intro:'Your favourite people, saved vendors, and upcoming plans, all in one place.',
      links:sharedNavLink('create-event',state.event ? 'Your event' : 'Create your event',state.event ? esc(state.event.name) : 'Give your next celebration a place to begin.','calendar') + sharedNavLink('saved','Saved vendors',`${state.wishlist.size} favourite${state.wishlist.size === 1 ? '' : 's'} on your shortlist.`,'heart') + sharedNavLink('cart','Your hold list',`${state.cart.length} vendor${state.cart.length === 1 ? '' : 's'} in your selection.`,'shoppingBag') + sharedNavLink('my-bookings','Your bookings','Event details and vendor responses.','bookmark'),
      action:'cart', actionLabel:'Open your hold list', photo:'dining', title:'YOUR WHOLE EVENT. ONE HAPPY PLACE.', description:'Less running around. More looking forward to it. Keep your plans and the people behind them together.',
    },
    business: {
      eyebrow:'VENDEZE FOR BUSINESSES', heading:'Big days. Local talent.', intro:'For the people who make the magic happen.',
      links:(workspace ? sharedNavLink(workspace[0],workspace[1],workspace[2],'building') : `<button class="shared-nav-link" ${state.user ? 'data-action="profile"' : 'data-nav-signup="VENDOR"'}><span class="shared-nav-link-icon">${icon('building',{size:20})}</span><span><strong>${state.user ? 'Your business journey' : 'Join as a vendor'}</strong><small>${state.user ? 'Your profile and account details.' : 'Introduce your services to local celebrations.'}</small></span></button>`) + (state.user?.role === 'admin' ? sharedNavLink('marketing','Promotions & updates','Manage ads, the welcome message, and notifications.','sparkle') : sharedNavLink('services','Explore the community','Photography, venues, catering, beauty, and more.','users')) + sharedNavLink('profile','Your account','Your profile and next steps.','user') + '<a class="shared-nav-link" href="mailto:support@vendeze.lk"><span class="shared-nav-link-icon">'+icon('headset',{size:20})+'</span><span><strong>Talk to Vendeze</strong><small>Get in touch with our support team.</small></span></a>',
      action:workspace ? workspace[0] : 'profile', actionLabel:workspace ? 'Open your workspace' : state.user ? 'Your account' : 'Join the community', signup:!state.user, photo:'florals', title:'DO WHAT YOU LOVE.', description:'Bring your craft to people planning their next celebration in Batticaloa. Good work deserves to be discovered.',
    },
    account: {
      eyebrow:state.user ? 'YOUR LITTLE CORNER OF VENDEZE' : 'YOUR STORY STARTS HERE', heading:state.user ? `Hello, ${esc(state.user.name.split(' ')[0])}.` : 'Hello, possibility.', intro:state.user ? 'Your profile, your plans, and your next celebration.' : 'Sign in to bring your people and your plans together.',
      links:state.user ? sharedNavLink('profile','Your profile','Account information and preferences.','user') + sharedNavLink('my-bookings','Your bookings','Keep up with your celebrations.','bookmark') + (workspace ? sharedNavLink(workspace[0],workspace[1],workspace[2],'building') : sharedNavLink('saved','Saved vendors','Come back to the people you love.','heart')) + sharedNavLink('logout','Sign out','Leave your account on this device.','logout') : `<button class="shared-nav-link" data-nav-login><span class="shared-nav-link-icon">${icon('user',{size:20})}</span><span><strong>Sign in</strong><small>Pick up where you left off.</small></span></button><button class="shared-nav-link" data-nav-signup="CUSTOMER"><span class="shared-nav-link-icon">${icon('calendar',{size:20})}</span><span><strong>Create an account</strong><small>Your next great occasion starts here.</small></span></button><button class="shared-nav-link" data-nav-signup="VENDOR"><span class="shared-nav-link-icon">${icon('building',{size:20})}</span><span><strong>Offer your services</strong><small>Be part of someone's big day.</small></span></button>` + sharedNavLink('search','Explore as a guest','Meet the local talent.','search'),
      action:state.user ? 'profile' : '', actionLabel:state.user ? 'Open your account' : 'Sign in to Vendeze', login:!state.user, photo:'celebration', title:'GOOD PEOPLE. GOOD PLANS. GOOD TIMES.', description:'Made for your kind of celebration. Find your people, save your favourites, and make something wonderful happen.',
    },
  };
  const p = panels[key];
  return `<div class="shared-nav-details-grid"><section class="shared-nav-directory"><p class="shared-nav-eyebrow">${p.eyebrow}</p><h2>${p.heading}</h2><p class="shared-nav-intro">${p.intro}</p><div class="shared-nav-links">${p.links}</div><button class="shared-nav-cta" ${p.signup ? 'data-nav-signup="VENDOR"' : p.login ? 'data-nav-login' : `data-action="${p.action}"`}>${p.actionLabel}</button></section><aside class="shared-nav-feature"><img src="assets/${p.photo}.jpg" alt="Illustrative celebration inspiration" width="640" height="360"><div><p class="shared-nav-eyebrow">PLAN. BOOK. CELEBRATE.</p><h3>${p.title}</h3><p>${p.description}</p></div></aside></div>`;
}

function renderSharedNavigation() {
  setupSharedNavigation.cleanup?.();
  document.body.classList.add('has-shared-nav');
  const header = document.getElementById('mainHeader');
  header.style.display = '';
  const view = state.view.name;
  const role = state.user?.role || 'customer';
  const active = ['vendorDashboard','admin','marketing','developer'].includes(view) || (view === 'home' && role !== 'customer') ? 'business' : ['search','category','vendor','services'].includes(view) ? 'explore' : view === 'createEvent' ? 'plan' : ['saved','cart','checkout','confirm','myBookings'].includes(view) ? 'plans' : '';
  const trigger = (item, suffix = '') => `<button type="button" id="sharedNav-${item.id}${suffix}" class="header-nav-link shared-nav-trigger${active === item.id ? ' active' : ''}" data-nav-menu="${item.id}" aria-expanded="false" aria-controls="sharedNavPanel">${item.label}<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>`;
  document.getElementById('headerNav').innerHTML = SHARED_NAV_ITEMS.map(item => trigger(item)).join('');
  document.getElementById('sharedNavDetails').innerHTML = '';
  document.getElementById('sharedNavMobileTabs').innerHTML = [...SHARED_NAV_ITEMS, { id:'account', label:state.user ? 'My account' : 'Log in' }].map(item => trigger(item, '-mobile')).join('');
  document.getElementById('marketplaceHeaderActions').innerHTML = '';
  document.getElementById('sharedAccountButton').textContent = state.user ? 'My account' : 'Log in';
  document.getElementById('notifIcon').innerHTML = icon('bell', { size:18 });
  setupSharedNavigation();
  if (view === 'login' && state.view.signupRole) {
    document.getElementById('tabSignUp').click();
    document.querySelector(`#signupRoleChips [data-role="${state.view.signupRole === 'VENDOR' ? 'VENDOR' : 'CUSTOMER'}"]`)?.click();
    delete state.view.signupRole;
  }
}

function setupSharedNavigation() {
  const header = document.getElementById('mainHeader');
  const shell = header.querySelector('.header-inner');
  const panel = document.getElementById('sharedNavPanel');
  const content = document.getElementById('sharedNavContent');
  const details = document.getElementById('sharedNavDetails');
  const mobileToggle = document.getElementById('sharedNavToggle');
  const events = new AbortController();
  const signal = events.signal;
  let active = '';
  let lastTrigger = null;
  let leaveTimer;
  let frame;
  let viewportWidth = innerWidth;
  const measure = () => {
    if (active) panel.style.setProperty('--shared-panel-height', `${Math.ceil(content.getBoundingClientRect().height)}px`);
  };
  const close = (restoreFocus = false) => {
    clearTimeout(leaveTimer);
    active = '';
    shell.classList.remove('is-mega-open');
    panel.inert = true;
    panel.setAttribute('aria-hidden','true');
    header.querySelectorAll('[data-nav-menu]').forEach(button => button.setAttribute('aria-expanded','false'));
    mobileToggle.setAttribute('aria-expanded','false');
    mobileToggle.setAttribute('aria-label','Open navigation');
    if (restoreFocus && lastTrigger?.isConnected) lastTrigger.focus({ preventScroll:true });
  };
  const open = (key, trigger) => {
    clearTimeout(leaveTimer);
    if (active !== key) {
      details.innerHTML = sharedNavContent(key);
      content.scrollTop = 0;
    }
    active = key;
    lastTrigger = panel.contains(trigger) ? mobileToggle : trigger;
    closeNotifications();
    header.classList.remove('is-home-nav-hidden');
    shell.classList.add('is-mega-open');
    panel.inert = false;
    panel.setAttribute('aria-hidden','false');
    panel.setAttribute('aria-labelledby', trigger.id || 'sharedNavToggle');
    header.querySelectorAll('[data-nav-menu]').forEach(button => button.setAttribute('aria-expanded', String(button.dataset.navMenu === key)));
    mobileToggle.setAttribute('aria-expanded','true');
    mobileToggle.setAttribute('aria-label','Close navigation');
    measure();
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(measure);
  };
  // A route can replace the buttons beneath a stationary cursor. Open on
  // actual pointer movement so a newly rendered page starts with a closed nav.
  header.addEventListener('pointermove', event => {
    const button = event.target.closest('[data-nav-menu]');
    if (event.pointerType === 'mouse' && button && active !== button.dataset.navMenu) open(button.dataset.navMenu, button);
  }, { signal });
  header.querySelectorAll('[data-nav-menu]').forEach(button => {
    button.addEventListener('focus', () => {
      if (active && button.matches(':focus-visible') && button.dataset.navMenu !== active) open(button.dataset.navMenu, button);
    }, { signal });
    button.addEventListener('click', event => {
      const same = active === button.dataset.navMenu;
      if (same && (event.detail === 0 || !matchMedia('(hover:hover)').matches)) close();
      else open(button.dataset.navMenu, button);
    }, { signal });
  });
  mobileToggle.addEventListener('click', () => {
    if (active) close();
    else open('explore', document.getElementById('sharedNav-explore-mobile'));
  }, { signal });
  shell.addEventListener('pointerenter', () => clearTimeout(leaveTimer), { signal });
  shell.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') leaveTimer = setTimeout(() => {
      if (!header.querySelector(':focus-visible')) close();
    }, 180);
  }, { signal });
  header.addEventListener('focusout', event => {
    if (active && event.relatedTarget && !header.contains(event.relatedTarget)) close();
  }, { signal });
  header.addEventListener('keydown', event => {
    const trigger = event.target.closest('[data-nav-menu]');
    if (event.key === 'ArrowDown' && trigger) {
      event.preventDefault();
      open(trigger.dataset.navMenu, trigger);
      details.querySelector('button,a')?.focus({ preventScroll:true });
    } else if (['ArrowLeft','ArrowRight'].includes(event.key) && trigger) {
      const group = trigger.closest('nav');
      if (!group) return;
      const buttons = [...group.querySelectorAll('[data-nav-menu]')];
      const index = (buttons.indexOf(trigger) + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      event.preventDefault();
      buttons[index].focus({ preventScroll:true });
    }
  }, { signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) {
      event.preventDefault();
      event.stopPropagation();
      close(true);
    }
  }, { capture:true, signal });
  document.addEventListener('pointerdown', event => {
    if (active && !shell.contains(event.target)) close();
  }, { signal });
  header.addEventListener('click', event => {
    const occasion = event.target.closest('[data-nav-occasion]');
    const signup = event.target.closest('[data-nav-signup]');
    const login = event.target.closest('[data-nav-login]');
    const action = event.target.closest('[data-action],a[href]');
    if (occasion) {
      close();
      navigate({ name:'createEvent', suggestedType:occasion.dataset.navOccasion });
    } else if (signup) {
      close();
      navigate({ name:'login', signupRole:signup.dataset.navSignup });
    } else if (login) {
      close();
      navigate({ name:'login' });
    } else if (action && active) close();
  }, { signal });
  window.addEventListener('resize', () => {
    if (innerWidth !== viewportWidth) {
      viewportWidth = innerWidth;
      close();
    } else measure();
  }, { signal });
  const observer = new ResizeObserver(measure);
  observer.observe(content);
  close();
  setupSharedNavigation.cleanup = () => {
    events.abort();
    observer.disconnect();
    clearTimeout(leaveTimer);
    cancelAnimationFrame(frame);
    close();
  };
}
