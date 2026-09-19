const revealElements = document.querySelectorAll(
    ".story-section, .chain, .fashion-item, .art-gallery figure, .poster-wall img, .media-timeline div, .people-statement, .final-thread span, .ending p"
);


function revealOnScroll() {

    revealElements.forEach((element) => {

        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight * 0.82) {
            element.classList.add("revealed");
        }

    });

}


window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
