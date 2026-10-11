(() => {
  const body = document.body;
  const drawer = document.getElementById('threadDrawer');
  const scrim = document.getElementById('drawerScrim');
  const toggle = document.getElementById('indexToggle');
  const close = document.getElementById('drawerClose');
  const floating = document.getElementById('floatingMap');
  const progress = document.getElementById('progressBar');
  const openDrawer = () => { drawer.hidden = false; scrim.hidden = false; body.classList.add('drawer-open'); toggle?.setAttribute('aria-expanded','true'); close?.focus(); };
  const closeDrawer = () => { drawer.hidden = true; scrim.hidden = true; body.classList.remove('drawer-open'); toggle?.setAttribute('aria-expanded','false'); toggle?.focus(); };
  toggle?.addEventListener('click', openDrawer);
  floating?.addEventListener('click', openDrawer);
  close?.addEventListener('click', closeDrawer);
  scrim?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) closeDrawer(); });
  document.querySelectorAll('[data-target]').forEach(button => button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    if (target) target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    if (!drawer.hidden) { drawer.hidden = true; scrim.hidden = true; body.classList.remove('drawer-open'); toggle?.setAttribute('aria-expanded','false'); }
  }));
  document.querySelectorAll('.drawer-links a').forEach(link => link.addEventListener('click', () => {
    drawer.hidden = true; scrim.hidden = true; body.classList.remove('drawer-open'); toggle?.setAttribute('aria-expanded','false');
  }));
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();
  body.classList.add('reveal-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      if (entry.target.matches('p')) observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.section-copy p, .section-inner h2, .closing-vial').forEach(el => observer.observe(el));
  const sections = [...document.querySelectorAll('.reading-section[id]')];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) document.querySelectorAll('.drawer-links a').forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
  }), { rootMargin: '-25% 0px -60% 0px' });
  sections.forEach(section => activeObserver.observe(section));
})();
