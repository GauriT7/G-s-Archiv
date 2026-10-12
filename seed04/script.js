(() => {
  const body = document.body;
  const drawer = document.getElementById('threadDrawer');
  const scrim = document.getElementById('drawerScrim');
  const toggle = document.getElementById('indexToggle');
  const close = document.getElementById('drawerClose');
  const floating = document.getElementById('floatingRoute');
  const progress = document.getElementById('progressBar');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const openDrawer = () => {
    drawer.hidden = false; scrim.hidden = false; body.classList.add('drawer-open');
    toggle?.setAttribute('aria-expanded', 'true'); close?.focus();
  };
  const closeDrawer = (returnFocus = true) => {
    drawer.hidden = true; scrim.hidden = true; body.classList.remove('drawer-open');
    toggle?.setAttribute('aria-expanded', 'false'); if (returnFocus) toggle?.focus();
  };
  toggle?.addEventListener('click', openDrawer);
  floating?.addEventListener('click', openDrawer);
  close?.addEventListener('click', () => closeDrawer());
  scrim?.addEventListener('click', () => closeDrawer());
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });

  document.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    if (!drawer.hidden) closeDrawer(false);
  }));
  document.querySelectorAll('.drawer-links a').forEach(link => link.addEventListener('click', () => closeDrawer(false)));

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  if ('IntersectionObserver' in window && !reducedMotion) {
    body.classList.add('reveal-ready');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); if (entry.target.matches('p')) revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.section-copy p, .section-inner h2, .ritual-board, .endurance-meter, .court-scoreboard, .body-dashboard, .question-card, .pull-quote').forEach(el => revealObserver.observe(el));
    const sections = [...document.querySelectorAll('.reading-section[id]')];
    const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll('.drawer-links a').forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
    }), { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach(section => activeObserver.observe(section));
  } else {
    document.querySelectorAll('.typed-text').forEach(el => { el.style.maxWidth = '100%'; el.style.opacity = '1'; });
  }
})();
