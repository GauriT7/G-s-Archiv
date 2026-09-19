const threadNodes = document.querySelectorAll(".thread-node");

function revealThread() {

    threadNodes.forEach((node, index) => {

        const position = node.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (position < windowHeight * 0.75) {
            node.classList.add("visible");
        }

    });

}

window.addEventListener("scroll", revealThread);

revealThread();
