/* =========================================================
   SEED 01 — THE WEB OF THINGS
   INTERACTION
========================================================= */


/* ---------------------------------------------------------
   1. THREAD CLICKS
--------------------------------------------------------- */

const nodes = document.querySelectorAll(".web-node");

nodes.forEach((node) => {

  node.addEventListener("click", () => {

    const targetName = node.dataset.thread;
    const target = document.getElementById(targetName);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* ---------------------------------------------------------
   2. SCROLL REVEAL
--------------------------------------------------------- */

const sections = document.querySelectorAll(".story-section");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);


sections.forEach((section) => {
  observer.observe(section);
});


/* ---------------------------------------------------------
   3. ACTIVE THREAD
   As you move through the story, the corresponding
   node on the opening web becomes slightly emphasized.
--------------------------------------------------------- */

const sectionMap = [
  { id: "war", node: "node-war" },
  { id: "economics", node: "node-economics" },
  { id: "food", node: "node-food" },
  { id: "fashion", node: "node-art" },
  { id: "art", node: "node-art" },
  { id: "people", node: "node-people" }
];


const activeObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      document
        .querySelectorAll(".web-node")
        .forEach((node) => node.classList.remove("active"));


      const match = sectionMap.find(
        item => item.id === entry.target.id
      );


      if (match) {

        const node =
          document.querySelector("." + match.node);

        if (node) {
          node.classList.add("active");
        }

      }

    });

  },
  {
    threshold: 0.45
  }
);


sections.forEach((section) => {
  activeObserver.observe(section);
});


/* ---------------------------------------------------------
   4. MAKE ACTIVE NODE LOOK ALIVE
--------------------------------------------------------- */

const interactionStyle = document.createElement("style");

interactionStyle.textContent = `

  .web-node.active strong {
    transform: translateY(-2px);
  }

  .web-node.active::after {
    opacity: .8;
    transform: translateY(0);
  }

  .web-node.active {
    transform: translate(-50%, -50%) scale(1.08);
  }

`;

document.head.appendChild(interactionStyle);


/* ---------------------------------------------------------
   5. IMAGE LIGHTBOX
   Click photographs to enlarge them.
--------------------------------------------------------- */

const clickableImages = document.querySelectorAll(
  ".story-section img"
);


const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close">×</button>
  <img src="" alt="">
  <div class="lightbox-caption"></div>
`;

document.body.appendChild(lightbox);


const lightboxImage =
  lightbox.querySelector("img");

const lightboxCaption =
  lightbox.querySelector(".lightbox-caption");


clickableImages.forEach((image) => {

  image.style.cursor = "zoom-in";

  image.addEventListener("click", () => {

    lightboxImage.src =
      image.currentSrc || image.src;

    lightboxImage.alt =
      image.alt || "";

    const caption =
      image.closest("figure")?.querySelector("figcaption");

    lightboxCaption.textContent =
      caption ? caption.textContent : image.alt;

    lightbox.classList.add("open");

  });

});


function closeLightbox() {
  lightbox.classList.remove("open");
}


lightbox.addEventListener("click", (event) => {

  if (
    event.target === lightbox ||
    event.target.classList.contains("lightbox-close")
  ) {
    closeLightbox();
  }

});


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeLightbox();
  }

});


/* ---------------------------------------------------------
   6. GENTLE IMAGE MOVEMENT
--------------------------------------------------------- */

const parallaxImages =
  document.querySelectorAll(
    ".story-image img"
  );


function moveImages() {

  parallaxImages.forEach((image) => {

    const rect =
      image.getBoundingClientRect();

    const screenMiddle =
      window.innerHeight / 2;

    const imageMiddle =
      rect.top + rect.height / 2;

    const distance =
      imageMiddle - screenMiddle;

    const movement =
      Math.max(
        -7,
        Math.min(7, distance * -0.012)
      );

    image.style.setProperty(
      "--image-offset",
      `${movement}px`
    );

  });

}


window.addEventListener(
  "scroll",
  moveImages,
  { passive: true }
);

moveImages();


/* ---------------------------------------------------------
   7. FINAL WEB — HOVER CONNECTION
--------------------------------------------------------- */

const finalNodes =
  document.querySelectorAll(".final-web span");


finalNodes.forEach((node) => {

  node.addEventListener("mouseenter", () => {

    finalNodes.forEach((other) => {

      if (other !== node) {
        other.style.opacity = "0.3";
      }

    });

  });


  node.addEventListener("mouseleave", () => {

    finalNodes.forEach((other) => {
      other.style.opacity = "1";
    });

  });

});


/* ---------------------------------------------------------
   8. SCROLL PROGRESS
--------------------------------------------------------- */

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const pageHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    pageHeight > 0
      ? scrollTop / pageHeight
      : 0;

  document.body.style.setProperty(
    "--scroll",
    progress
  );

});


/* ---------------------------------------------------------
   9. TINY THREAD PARALLAX
--------------------------------------------------------- */

const webLines =
  document.querySelector(".web-lines");


window.addEventListener(
  "scroll",
  () => {

    if (!webLines) return;

    const movement =
      Math.min(window.scrollY * 0.015, 12);

    webLines.style.transform =
      `translateY(${movement}px)`;

  },
  { passive: true }
);

/* =========================================================
   WAR SCENE — ACTIVE ON SCROLL
========================================================= */

const warScene = document.querySelector("#war");

if (warScene) {
  const warObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        warScene.classList.add("active");
      } else {
        warScene.classList.remove("active");
      }
    },
    {
      threshold: 0.35
    }
  );

  warObserver.observe(warScene);
}
