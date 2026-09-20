/* =========================================================
   SEED 01 — TRUE SCROLL CHOREOGRAPHY
   The scroll position is the story timeline.
========================================================= */

const nodes = document.querySelectorAll('.web-node');

const threadMap = {
  art: 'art',
  history: 'people',
  food: 'food',
  war: 'war',
  economics: 'economics',
  people: 'people'
};

/* ---------------------------------------------------------
   THREAD NAVIGATION
--------------------------------------------------------- */

nodes.forEach(node => {
  node.addEventListener('click', () => {
    const target = document.getElementById(threadMap[node.dataset.thread]);
    if (!target) return;

    document.body.classList.add('thread-pulling');

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    setTimeout(() => {
      document.body.classList.remove('thread-pulling');
    }, 900);
  });

  node.addEventListener('mouseenter', () => {
    nodes.forEach(other => {
      if (other !== node) other.classList.add('node-dim');
    });
    node.classList.add('node-focus');
  });

  node.addEventListener('mouseleave', () => {
    nodes.forEach(other => other.classList.remove('node-dim'));
    node.classList.remove('node-focus');
  });
});

/* ---------------------------------------------------------
   SCROLL SCENES
--------------------------------------------------------- */

const sections = [...document.querySelectorAll('.story-section')];

const phaseConfig = {
  war: [
    ['.section-meta', 1],
    ['.story-image.large', 2],
    ['h2', 3],
    ['.section-heading p', 4],
    ['.chain', 5]
  ],
  economics: [
    ['.section-meta', 1],
    ['.story-image', 2],
    ['h2', 3],
    ['.body-copy', 4],
    ['.question', 5]
  ],
  food: [
    ['.section-meta', 1],
    ['.story-image', 2],
    ['h2', 3],
    ['.section-heading p', 4],
    ['.mini-chain', 5]
  ],
  fashion: [
    ['.section-meta', 1],
    ['h2', 2],
    ['.fashion-line', 3],
    ['.fashion-chain', 4]
  ],
  art: [
    ['.section-meta', 1],
    ['.art-intro h2', 2],
    ['.art-intro p', 3],
    ['.art-grid', 4]
  ],
  propaganda: [
    ['.section-meta', 1],
    ['.propaganda-heading h2', 2],
    ['.propaganda-heading p', 3],
    ['.poster-grid', 4]
  ],
  media: [
    ['.section-meta', 1],
    ['h2', 2],
    ['.body-copy', 3],
    ['.media-line', 4]
  ],
  people: [
    ['.section-meta', 1],
    ['.people-statement p', 2],
    ['.people-statement h2', 3],
    ['.people-statement span', 4]
  ],
  'final-web': [
    ['.section-meta', 1],
    ['h2', 2],
    ['.final-web', 3],
    ['.ending-line', 4]
  ]
};

const phaseThresholds = {
  /* Phase 1 is the quiet opening frame. Everything else earns its entrance. */
  1: 0.00,
  2: 0.24,
  3: 0.46,
  4: 0.66,
  5: 0.82
};

const sceneState = [];

sections.forEach(section => {
  const id = section.id;
  const config = phaseConfig[id] || [];

  config.forEach(([selector, phase]) => {
    const elements = section.querySelectorAll(selector);
    elements.forEach(element => {
      element.dataset.phase = phase;
    });
  });

  /* War's chain pieces get their own mini-timeline. */
  if (id === 'war') {
    const chain = section.querySelector('.chain');
    if (chain) {
      [...chain.children].forEach((piece, index) => {
        piece.dataset.chainPiece = index;
      });
    }
  }

  sceneState.push({ section, elements: [...section.querySelectorAll('[data-phase]')] });
});

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function updateScenes() {
  const viewportH = window.innerHeight;
  const scrollY = window.scrollY;

  sceneState.forEach(({ section, elements }) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const travel = Math.max(1, section.offsetHeight - viewportH);
    const progress = clamp((scrollY - sectionTop) / travel);

    section.style.setProperty('--scene-progress', progress.toFixed(4));

    let activePhase = 0;

    Object.entries(phaseThresholds).forEach(([phase, threshold]) => {
      if (progress >= threshold) activePhase = Math.max(activePhase, Number(phase));
    });

    section.dataset.activePhase = activePhase;

    elements.forEach(element => {
      const phase = Number(element.dataset.phase);
      const active = progress >= phaseThresholds[phase];
      element.classList.toggle('phase-active', active);

      /* subtle depth movement while the object is on screen */
      if (active) {
        const drift = Math.sin((progress - phaseThresholds[phase]) * Math.PI) * -10;
        element.style.setProperty('--scene-drift', `${drift.toFixed(2)}px`);
      }
    });

    /* War timeline: each idea arrives separately. */
    if (section.id === 'war') {
      const chain = section.querySelector('.chain');
      if (chain) {
        const chainStart = phaseThresholds[5];
        const chainProgress = clamp((progress - chainStart) / (1 - chainStart));
        chain.classList.toggle('chain-active', progress >= chainStart);

        const pieces = [...chain.children];
        pieces.forEach((piece, index) => {
          const pieceThreshold = (index + 1) / pieces.length;
          piece.classList.toggle('chain-piece-active', chainProgress >= pieceThreshold);
        });
      }
    }
  });

  updateActiveThread();
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScenes();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener('resize', updateScenes);
window.addEventListener('load', updateScenes);
updateScenes();

/* ---------------------------------------------------------
   ACTIVE THREAD IN THE OPENING WEB
--------------------------------------------------------- */

const threadNodes = {
  war: 'node-war',
  economics: 'node-economics',
  food: 'node-food',
  fashion: 'node-art',
  art: 'node-art',
  propaganda: 'node-art',
  media: 'node-history',
  people: 'node-people',
  'final-web': null
};

function updateActiveThread() {
  const viewportCentre = window.innerHeight * 0.5;
  let current = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= viewportCentre && rect.bottom >= viewportCentre) current = section.id;
  });

  nodes.forEach(node => node.classList.remove('active-thread'));

  const nodeId = threadNodes[current];
  if (nodeId) document.getElementById(nodeId)?.classList.add('active-thread');
}

/* ---------------------------------------------------------
   SCROLL PROGRESS
--------------------------------------------------------- */

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = documentHeight > 0 ? scrollTop / documentHeight : 0;
  document.documentElement.style.setProperty('--scroll-progress', progress);
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

/* ---------------------------------------------------------
   LIGHTBOX
--------------------------------------------------------- */

document.querySelectorAll('.story-section img').forEach(img => {
  img.style.cursor = 'zoom-in';

  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';

    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;

    const close = document.createElement('button');
    close.className = 'lightbox-close';
    close.innerHTML = '×';
    close.setAttribute('aria-label', 'Close image');

    overlay.append(close, image);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('open'));

    const remove = () => {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 300);
      document.removeEventListener('keydown', escape);
    };

    function escape(event) {
      if (event.key === 'Escape') remove();
    }

    close.addEventListener('click', remove);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) remove();
    });
    document.addEventListener('keydown', escape);
  });
});

/* ---------------------------------------------------------
   REDUCED MOTION
--------------------------------------------------------- */

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduced-motion');
}
