const wrapper = document.querySelector('.wrapper');
const modeToggle = document.getElementById('readerModeToggle');
const modeIcon = modeToggle.querySelector('i');
const modeTitle = modeToggle.querySelector('.link-title');

let isEreaderMode = false;

modeToggle.addEventListener('click', (e) => {
    e.preventDefault();

    isEreaderMode = !isEreaderMode;

    if (isEreaderMode) {
        // Passer en mode liseuse
        wrapper.classList.remove('book-mode');
        wrapper.classList.add('ereader-mode');
        modeIcon.classList.remove('bx-mobile');
        modeIcon.classList.add('bx-book-content');
    } else {
        // Passer en mode livre
        showLoader();
        wrapper.classList.remove('ereader-mode');
        wrapper.classList.add('book-mode');
        modeIcon.classList.remove('bx-book-content');
        modeIcon.classList.add('bx-mobile');
    }
});

// Fonction pour afficher le loader
function showLoader() {
    //opening animation
    const coverRight = document.querySelector(".cover.cover-right");
    const pageLeft = document.querySelector(".book-page.page-left");

    //opening animation (cover right animation)
    setTimeout(() => {
    coverRight.classList.add("turn");
    }, 2100);
    setTimeout(() => {
    coverRight.style.zIndex = -1;
    }, 2800);

    //opening animation (page left or profile page animation)
    setTimeout(() => {
    pageLeft.style.zIndex = 20;
    }, totalPages + 400 * 2100);

    //opening animation (all page right animation)
    pages.forEach((_, index) => {
    setTimeout(() => {
        // Jouer le son
        pageTurnSound.currentTime = 0; // permet de rejouer rapidement
        pageTurnSound.play();

        const currentPage = totalPages - 1 - index;
        pages[currentPage].classList.remove("turn");
        setTimeout(() => {
        pages[currentPage].style.zIndex = 10 + index;
        }, 500);
    }, (index + 1) * 300 + 2100);
    });
}