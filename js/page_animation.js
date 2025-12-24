// Création du son
const pageTurnSound = new Audio("assets/sound/page-turn.mp3");
pageTurnSound.volume = 0.6;

// États
const savedVolume = localStorage.getItem("volume");
let isMuted = savedVolume === "off";
pageTurnSound.muted = false;
let userHasInteracted = false;

// Déblocage de l'audio
// Les navigateurs interdisent toute lecture audio automatique tant que : l’utilisateur n’a pas cliqué ou n’a pas interagi avec la page
function unlockAudio() {
  if (userHasInteracted) return;

  userHasInteracted = true;

  // Hack standard pour débloquer l'audio
  pageTurnSound.play()
    .then(() => {
      pageTurnSound.pause();
      pageTurnSound.currentTime = 0;
    })
    .catch(() => {});
}

// Débloquer le son au premier geste utilisateur
document.addEventListener("click", unlockAudio, { once: true });
document.addEventListener("keydown", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });

// Fonction pour jouer le son
function playPageSound() {
  if (!userHasInteracted || pageTurnSound.muted) return;

  pageTurnSound.currentTime = 0;
  pageTurnSound.play().catch(() => {});
}

// Bouton pour régler le volume
const volumeToggle = document.getElementById("volumeToggle");
const volumeIcon = volumeToggle.querySelector("i");

volumeIcon.classList.toggle("bx-volume-full", !isMuted);
volumeIcon.classList.toggle("bx-volume-mute", isMuted);

volumeToggle.addEventListener("click", (e) => {
  e.preventDefault();

  isMuted = !isMuted;
  pageTurnSound.muted = isMuted;

  volumeIcon.classList.toggle("bx-volume-full", !isMuted);
  volumeIcon.classList.toggle("bx-volume-mute", isMuted);

  // Sauvegarde dans le localStorage
  localStorage.setItem("volume", isMuted ? "off" : "on");
});


// Changement de page
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

pageTurnBtn.forEach((el, index) => {
  el.addEventListener("click", () => {
    playPageSound();

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
  });
});

// Retour à la page du profil
const pages = document.querySelectorAll(".book-page.page-right");
const totalPages = pages.length;

function backProfileBtn() {
  pages.forEach((_, index) => {
    setTimeout(() => {
      playPageSound();

      const currentPage = totalPages - 1 - index;
      pages[currentPage].classList.remove("turn");

      setTimeout(() => {
        pages[currentPage].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });
}

// Ouverture du livre
const coverRight = document.querySelector(".cover.cover-right");
const pageLeft = document.querySelector(".book-page.page-left");

setTimeout(() => {
  coverRight.classList.add("turn");
}, 2100);

setTimeout(() => {
  coverRight.style.zIndex = -1;
}, 2800);

setTimeout(() => {
  pageLeft.style.zIndex = 20;
}, totalPages + 400 * 2100);

pages.forEach((_, index) => {
  setTimeout(() => {
    const currentPage = totalPages - 1 - index;
    pages[currentPage].classList.remove("turn");

    setTimeout(() => {
      pages[currentPage].style.zIndex = 10 + index;
    }, 500);
  }, (index + 1) * 300 + 2100);
});
