// Création du son
const pageTurnSound = new Audio("assets/sound/page-turn.mp3");
pageTurnSound.volume = 0.6;

// États
const savedVolume = localStorage.getItem("volume") || "off";
let isMuted = savedVolume === "off";
pageTurnSound.muted = isMuted;
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
    userHasInteracted = true;
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

/* =====================================================
   E-READER PAGE SYSTEM
===================================================== */

const pagesReader = document.querySelectorAll(".ereader-content > div");
const prevBtnReader = document.getElementById("prevBtn");
const nextBtnReader = document.getElementById("nextBtn");
const pageIndicatorReader = document.getElementById("pageIndicator");

let currentPageReader = 0;
const totalPagesReader = pagesReader.length;

// Fonction pour initialiser le reader
function initReader() {
  pagesReader.forEach(page => page.classList.remove("active"));
  pagesReader[currentPageReader].classList.add("active");
  updateIndicator();
}

initReader();

// Fonction pour mettre à jour l'indicateur du nombre de pages
function updateIndicator() {
  pageIndicatorReader.textContent = `Page ${currentPageReader + 1} / ${totalPagesReader}`;
  
  // Application de styles au bouton 'Suivant' en fonction de la page
  if (currentPageReader >= totalPagesReader - 1) {
    nextBtnReader.disabled = true;
    nextBtnReader.classList.add("disabled");
  } else {
    nextBtnReader.disabled = false;
    nextBtnReader.classList.remove("disabled");
  }

  // Application de styles au bouton 'Précédent' en fonction de la page
  if (currentPageReader <= 0) {
    prevBtnReader.disabled = true;
    prevBtnReader.classList.add("disabled");
  } else {
    prevBtnReader.disabled = false;
    prevBtnReader.classList.remove("disabled");
  }
}

// Fonction pour changer la page
function changePage(direction) {
  const oldPage = pagesReader[currentPageReader];

  // Déterminer la nouvelle page
  if (direction === "next" && currentPageReader < totalPagesReader - 1) {
    currentPageReader++;
  } else if (direction === "prev" && currentPageReader > 0) {
    currentPageReader--;
  } else {
    return;
  }

  const newPage = pagesReader[currentPageReader];

  // Animation sortie
  oldPage.classList.add(direction === "next" ? "exit-left" : "exit-right");

  setTimeout(() => {
    oldPage.classList.remove("active", "exit-left", "exit-right");
    newPage.classList.add("active");
    updateIndicator();
  }, 300);
}

// Évènements des boutons
nextBtnReader.addEventListener("click", () => {
  changePage("next");
});
prevBtnReader.addEventListener("click", () => {
  changePage("prev");
});
