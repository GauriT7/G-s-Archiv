/* =========================================================
   SEED 01 — THE WEB OF THINGS
   Interaction + scroll choreography
========================================================= */


/* ---------------------------------------------------------
   1. THREAD NAVIGATION
--------------------------------------------------------- */

const nodes = document.querySelectorAll(".web-node");

const threadMap = {
  art: "art",
  history: "people",
  food: "food",
  war: "war",
  economics: "economics",
  people: "people"
};

nodes.forEach(node => {
  node.addEventListener("click", () => {
    const thread = node.dataset.thread;
    const targetId = threadMap[thread];

    const target = document.getElementById(targetId);

    if (!target) return;

    document.body.classList.add("thread-pulling");

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 180);

    setTimeout(() => {
      document.body.classList.remove("thread-pulling");
    }, 1000);
  });
});


/* ---------------------------------------------------------
   2. NODE HOVER — THE WEB RESPONDS
--------------------------------------------------------- */

nodes.forEach(node => {

  node.addEventListener("mouseenter", () => {

    nodes.forEach(other => {
      if (other !== node) {
        other.classList.add("node-dim");
      }
    });

    node.classList.add("node-focus");

  });

  node.addEventListener("mouseleave", () => {

    nodes.forEach(other => {
      other.classList.remove("node-dim");
    });

    node.classList.remove("node-focus");

  });

});


/* ---------------------------------------------------------
   3. STORY SECTION REVEAL
--------------------------------------------------------- */

const sections = document.querySelectorAll(".story-section");

const sectionObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        /* stagger the internal elements */

        const images = entry.target.querySelectorAll(
          "img"
        );

        const text = entry.target.querySelectorAll(
          "h2, h3, p, .story-chain, .story-question, .timeline"
        );

        images.forEach((image, i) => {
          setTimeout(() => {
            image.classList.add("image-visible");
          }, 150 + i * 120);
        });

        text.forEach((element, i) => {
          setTimeout(() => {
            element.classList.add("text-visible");
          }, 100 + i * 90);
        });

      }

    });

  },
  {
    threshold: 0.18
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});


/* ---------------------------------------------------------
   4. ACTIVE THREAD
--------------------------------------------------------- */

const threadNodes = {
  war: "node-war",
  economics: "node-economics",
  food: "node-food",
  fashion: "node-art",
  art: "node-art",
  propaganda: "node-art",
  media: "node-history",
  people: "node-people"
};

const activeObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      nodes.forEach(node => {
        node.classList.remove("active-thread");
      });

      const nodeId = threadNodes[entry.target.id];

      if (nodeId) {

        const activeNode =
          document.getElementById(nodeId);

        if (activeNode) {
          activeNode.classList.add("active-thread");
        }

      }

    });

  },
  {
    threshold: 0.45
  }
);

sections.forEach(section => {
  activeObserver.observe(section);
});


/* ---------------------------------------------------------
   5. IMAGE PARALLAX
--------------------------------------------------------- */

const parallaxImages =
  document.querySelectorAll(".story-image img");

function updateParallax() {

  const viewportCentre =
    window.innerHeight / 2;

  parallaxImages.forEach(image => {

    const rect = image.getBoundingClientRect();

    const imageCentre =
      rect.top + rect.height / 2;

    const distance =
      imageCentre - viewportCentre;

    const movement =
      Math.max(
        -18,
        Math.min(18, distance * -0.035)
      );

    image.style.setProperty(
      "--parallax",
      `${movement}px`
    );

  });

}

window.addEventListener(
  "scroll",
  updateParallax,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateParallax
);

updateParallax();


/* ---------------------------------------------------------
   6. CHAIN — ONE IDEA AT A TIME
--------------------------------------------------------- */

document
  .querySelectorAll(".story-chain")
  .forEach(chain => {

    const pieces =
      chain.querySelectorAll("span");

    pieces.forEach((piece, i) => {

      piece.style.transitionDelay =
        `${i * 100}ms`;

    });

  });


/* ---------------------------------------------------------
   7. FINAL WEB — EVERYTHING RECONNECTS
--------------------------------------------------------- */

const finalWeb =
  document.querySelector(".final-web");

if (finalWeb) {

  const finalNodes =
    finalWeb.querySelectorAll("span");

  finalNodes.forEach(node => {

    node.addEventListener("mouseenter", () => {

      finalNodes.forEach(other => {

        if (other !== node) {
          other.classList.add("final-dim");
        }

      });

      node.classList.add("final-focus");

    });

    node.addEventListener("mouseleave", () => {

      finalNodes.forEach(other => {
        other.classList.remove("final-dim");
      });

      node.classList.remove("final-focus");

    });

  });

}


/* ---------------------------------------------------------
   8. SCROLL PROGRESS
--------------------------------------------------------- */

function updateScrollProgress() {

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? scrollTop / documentHeight
      : 0;

  document.documentElement.style
    .setProperty(
      "--scroll-progress",
      progress
    );

}

window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

updateScrollProgress();


/* ---------------------------------------------------------
   9. LIGHTBOX
--------------------------------------------------------- */

document
  .querySelectorAll(".story-section img")
  .forEach(img => {

    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {

      const overlay =
        document.createElement("div");

      overlay.className =
        "lightbox";

      const image =
        document.createElement("img");

      image.src = img.src;
      image.alt = img.alt;

      const close =
        document.createElement("button");

      close.className =
        "lightbox-close";

      close.innerHTML = "×";

      overlay.appendChild(close);
      overlay.appendChild(image);

      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.classList.add("open");
      });

      const remove = () => {

        overlay.classList.remove("open");

        setTimeout(() => {
          overlay.remove();
        }, 300);

      };

      close.addEventListener(
        "click",
        remove
      );

      overlay.addEventListener(
        "click",
        event => {

          if (event.target === overlay) {
            remove();
          }

        }
      );

      document.addEventListener(
        "keydown",
        function escape(event) {

          if (event.key === "Escape") {
            remove();
            document.removeEventListener(
              "keydown",
              escape
            );
          }

        }
      );

    });

  });
