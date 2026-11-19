/* One document-load introduction. Hash navigation stays immediate. */
(() => {
  const root = document.documentElement;
  const loader = document.getElementById('brandLoader');
  const started = performance.now();
  const minimumIntroMs = 2800;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;
  let readyTimer;

  function finish(immediate = false) {
    if (finished) return;
    finished = true;
    clearTimeout(readyTimer);
    clearTimeout(window.VENDEZE_BOOT_TIMEOUT);
    clearTimeout(safetyTimer);
    if (!immediate && !reducedMotion) loader.classList.add('is-leaving');
    root.classList.remove('is-booting');
    loader.setAttribute('aria-hidden', 'true');
    if (loader.contains(document.activeElement)) {
      const heading = document.querySelector('#app h1');
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      else document.getElementById('app')?.focus({ preventScroll: true });
    }
    const hide = () => { loader.hidden = true; loader.classList.remove('is-leaving'); };
    if (immediate || reducedMotion) hide();
    else setTimeout(hide, 260);
  }

  const safetyTimer = setTimeout(() => finish(true), 6400);
  window.VendezeIntro = {
    ready() {
      if (finished) return;
      clearTimeout(readyTimer);
      readyTimer = setTimeout(() => finish(), reducedMotion ? 0 : Math.max(0, minimumIntroMs - (performance.now() - started)));
    },
  };

  document.getElementById('skipBrandIntro').addEventListener('click', () => finish(true));
  document.addEventListener('keydown', event => {
    if (!finished && event.key === 'Escape') finish(true);
  });
  // A failed script must never leave the visitor behind a permanent loading screen.
  window.addEventListener('error', event => {
    if (finished || !(event.target instanceof HTMLScriptElement)) return;
    const message = document.querySelector('[data-app-fallback] h1');
    if (message) message.textContent = 'Vendeze couldn’t finish loading.';
    finish(true);
  }, true);
  if (!root.classList.contains('is-booting')) finish(true);
})();
