(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const drawer = $("#threadDrawer");
  const scrim = $("#drawerScrim");
  const indexToggle = $("#indexToggle");
  const drawerClose = $("#drawerClose");
  const floatingMap = $("#floatingMap");
  const progressBar = $("#progressBar");
  let lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    scrim.hidden = false;
    document.body.classList.add("drawer-open");
    indexToggle.setAttribute("aria-expanded", "true");
    drawerClose.focus();
  }
  function closeDrawer() {
    drawer.hidden = true;
    scrim.hidden = true;
    document.body.classList.remove("drawer-open");
    indexToggle.setAttribute("aria-expanded", "false");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  indexToggle?.addEventListener("click", () => drawer.hidden ? openDrawer() : closeDrawer());
  floatingMap?.addEventListener("click", openDrawer);
  drawerClose?.addEventListener("click", closeDrawer);
  scrim?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!drawer.hidden) closeDrawer();
      closeLightbox();
    }
  });

  function goToTarget(targetId) {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    if (!drawer.hidden) closeDrawer();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    if (targetId !== "top") history.replaceState(null, "", `#${targetId}`);
  }

  $$("[data-target]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      goToTarget(button.dataset.target);
    });
  });
  $$("[data-thread-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goToTarget(link.getAttribute("href").slice(1));
    });
  });

  // Progress indicator follows the whole reading experience.
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  // Reveal sections softly as they enter the viewport.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("reveal-ready");
    const revealTargets = $$(".chapter-heading, .chapter-copy > p, .image-break, .image-pair, .cue-item, .final-copy > p, .connection-card");
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    revealTargets.forEach((el) => observer.observe(el));
  }

  // Mark the currently visible thread in the drawer.
  const sections = $$("[data-section]");
  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        $$(".drawer-links a").forEach((link) => {
          const active = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -60% 0px" });
    sections.forEach((section) => activeObserver.observe(section));
  }

  // Optional image lightbox: click any successfully loaded article image to enlarge.
  const lightbox = $("#imageLightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCaption = $("#lightboxCaption");
  const lightboxClose = $("#lightboxClose");
  let previousImageFocus = null;

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImage.src = "";
    if (previousImageFocus) previousImageFocus.focus();
  }
  $$(".image-break img, .image-pair img").forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Enlarge image: ${img.alt}`);
    img.style.cursor = "zoom-in";
    const open = () => {
      if (!img.complete || img.naturalWidth === 0) return;
      previousImageFocus = img;
      lightboxImage.src = img.currentSrc || img.src;
      lightboxImage.alt = img.alt;
      const caption = img.closest("figure")?.querySelector("figcaption")?.innerText || img.alt;
      lightboxCaption.textContent = caption;
      lightbox.hidden = false;
      lightboxClose.focus();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Keep direct links usable on first load.
  window.addEventListener("load", () => {
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(() => target.scrollIntoView({ behavior: "auto", block: "start" }), 100);
    }
  });
})();
