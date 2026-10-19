(function () {
  const external = (a) => {
    try { return /^https?:$/.test(new URL(a.href, location.href).protocol) && new URL(a.href, location.href).origin !== location.origin; }
    catch (_) { return false; }
  };
  const getLabel = (a) => (a.getAttribute("aria-label") || a.textContent || a.href)
    .replace(/[↗↘↑↓]+/g, "").replace(/\s+/g, " ").trim();
  const getDomain = (href) => {
    try { return new URL(href).hostname.replace(/^www\./, ""); }
    catch (_) { return "external resource"; }
  };
  const favicon = (href) => "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(getDomain(href)) + "&sz=128";
  const makeThumb = (a, compact) => {
    const domain = getDomain(a.href);
    const thumb = document.createElement("span");
    thumb.className = compact ? "resource-inline-icon-wrap" : "resource-thumb";
    const img = document.createElement("img");
    img.src = favicon(a.href);
    img.alt = "";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    const mono = document.createElement("span");
    mono.className = compact ? "resource-monogram" : "resource-monogram";
    mono.textContent = domain.split(".")[0].slice(0, 2).toUpperCase();
    img.addEventListener("error", () => {
      if (compact) { img.replaceWith(mono); }
      else { thumb.classList.add("is-fallback"); }
    }, { once: true });
    thumb.appendChild(img);
    if (!compact) {
      thumb.appendChild(mono);
      const label = document.createElement("span");
      label.className = "resource-thumb-label";
      label.textContent = domain;
      thumb.appendChild(label);
    }
    return thumb;
  };
  const makeCard = (a) => {
    if (!external(a) || a.dataset.resourceEnhanced || a.closest(".cue-book-cover, .cue-book-copy")) return;
    const label = getLabel(a);
    if (!label || label.length < 2) return;
    a.dataset.resourceEnhanced = "true";
    a.classList.add("resource-card");
    const thumb = makeThumb(a, false);
    const copy = document.createElement("span");
    copy.className = "resource-card-copy";
    const title = document.createElement("span");
    title.className = "resource-card-title";
    title.textContent = label;
    const domain = document.createElement("span");
    domain.className = "resource-card-domain";
    domain.textContent = getDomain(a.href);
    const arrow = document.createElement("span");
    arrow.className = "resource-card-arrow";
    arrow.textContent = "Open resource ↗";
    copy.append(title, domain, arrow);
    a.textContent = "";
    a.append(thumb, copy);
    a.setAttribute("aria-label", label + " — opens " + getDomain(a.href));
  };
  const makeInline = (a) => {
    if (!external(a) || a.dataset.resourceEnhanced || a.closest(".cue-book-cover, .cue-book-copy")) return;
    a.dataset.resourceEnhanced = "true";
    a.classList.add("resource-inline");
    const icon = makeThumb(a, true);
    icon.classList.add("resource-inline-icon-wrap");
    icon.querySelector("img")?.classList.add("resource-inline-icon");
    a.prepend(icon);
  };
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach((a) => {
      if (!external(a) || a.closest("header, footer, nav, .thread-drawer, .contents-panel, .cue-book-cover, .cue-book-copy")) return;
      if (a.closest(".source-links, .bombay-note, .visit-copy, .cue-item, .resource-list")) {
        makeCard(a);
      } else if (a.closest("p, .section-copy, .chapter-copy")) {
        makeInline(a);
      } else {
        makeCard(a);
      }
    });
  });
})();