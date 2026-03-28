let pages = document.querySelectorAll(".page");
let current = 0;

/* afficher page */
function showPage(index) {
    pages.forEach((p, i) => {
        p.classList.remove("active");

        if (i === index) {
            p.style.transform = "translateX(0) scale(1)";
            p.style.opacity = "1";
            p.classList.add("active");
        } 
        else if (i < index) {
            p.style.transform = "translateX(-100%) scale(0.9)";
            p.style.opacity = "0";
        } 
        else {
            p.style.transform = "translateX(100%) scale(0.9)";
            p.style.opacity = "0";
        }
    });

    // Run animation only when page index = 2
    if (index === 2) {
        setTimeout(animateSkills, 200);
    }
}
/* navigation */
function nextPage() {
    if (current < pages.length - 1) {
        current++;
        showPage(current);
    }
}

function goToPage(index) {
    if (index >= 0 && index < pages.length) {
        current = index;
        showPage(current);
    }
}

function prevPage() {
    if (current > 0) {
        current--;
        showPage(current);
    }
}

/* clavier */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
});



/*  SWIPE MOBILE */
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

/*  SWIPE PC (drag souris) */
document.addEventListener("mousedown", (e) => {
    startX = e.clientX;
});

document.addEventListener("mouseup", (e) => {
    endX = e.clientX;
    handleSwipe();
});

/* logique swipe */
function handleSwipe() {
    let diff = startX - endX;

    if (diff > 50) {
        nextPage(); // swipe gauche
    } else if (diff < -50) {
        prevPage(); // swipe droite
    }
}

/*  TRACKPAD (scroll horizontal / vertical) */

let scrollTimeout;

document.addEventListener("wheel", (e) => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {

        if (e.deltaX > 50 || e.deltaY > 50) {
            nextPage(); // swipe gauche / bas
        } 
        else if (e.deltaX < -50 || e.deltaY < -50) {
            prevPage(); // swipe droite / haut
        }

    }, 50);
});


function animateSkills() {
    document.querySelectorAll(".bar div").forEach(bar => {
        let width = bar.getAttribute("data-width");
        bar.style.width = width;
    });
}