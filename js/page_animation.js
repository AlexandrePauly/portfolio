const pageTurnSound = new Audio("assets/sound/page-turn.mp3");
pageTurnSound.volume = 0.6; // ajuste le volume si besoin

const volumeToggle = document.getElementById("volumeToggle");
const volumeIcon = volumeToggle.querySelector("i");

let isMuted = false;

volumeToggle.addEventListener("click", (e) => {
  e.preventDefault(); // empêche le scroll vers le haut

  isMuted = !isMuted;

  // mute / unmute le son
  pageTurnSound.muted = isMuted;

  // change l'icône
  if (isMuted) {
    volumeIcon.classList.remove("bx-volume-full");
    volumeIcon.classList.add("bx-volume-mute");
  } else {
    volumeIcon.classList.remove("bx-volume-mute");
    volumeIcon.classList.add("bx-volume-full");
  }
});

//turn pages when click next or prev button
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");
pageTurnBtn.forEach((el, index) => {
  el.onclick = () => {
    // Jouer le son
    pageTurnSound.currentTime = 0; // permet de rejouer rapidement
    pageTurnSound.play();

    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);
    if (pageTurn.classList.contains("turn")) {
      pageTurn.classList.remove("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - index;
      }, 500);
    } else {
      pageTurn.classList.add("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + index;
      }, 500);
    }
  };
});

const pages = document.querySelectorAll(".book-page.page-right");

//create reverse index function
let totalPages = pages.length;

//back profile button when click
function backProfileBtn() {
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
    }, (index + 1) * 200 + 100);
  });
}

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

