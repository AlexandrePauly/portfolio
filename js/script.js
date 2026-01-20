// Lorsqu'un utilisateur se connecte depuis un appareil différent d'un ordinateur, on bloque la lecture en mode liseuse
if (navigator.userAgent.includes("Mobile")) {
    localStorage.setItem("readerMode", "eReader");
    localStorage.setItem("volume", "off");
    localStorage.setItem("lightMode", true);

    const modeToggle = document.getElementById('readerModeToggle');
    modeToggle.style.display = 'none';
    document.querySelector('body').style.zoom = 0.5;
}

// Gestion du hover pour les bookmarks
const bookPagesProfile = document.querySelectorAll('.profile-page');
const bookPagesFront = document.querySelectorAll('.page-front');
const bookPagesBack = document.querySelectorAll('.page-back');

bookPagesProfile.forEach(page => {
    const bookmark = page.querySelector('.bookmark-container');
    if (bookmark) {
        page.addEventListener('mouseenter', () => {
            bookmark.classList.add('visible');
        });
        
        page.addEventListener('mouseleave', () => {
            bookmark.classList.remove('visible');
        });
    }
});

bookPagesFront.forEach(page => {
    const bookmark = page.querySelector('.bookmark-container');
    if (bookmark) {
        page.addEventListener('mouseenter', () => {
            bookmark.classList.add('visible');
        });
        
        page.addEventListener('mouseleave', () => {
            bookmark.classList.remove('visible');
        });
    }
});

bookPagesBack.forEach(page => {
    const bookmark = page.querySelector('.bookmark-container');
    if (bookmark) {
        page.addEventListener('mouseenter', () => {
            bookmark.classList.add('visible');
        });
        
        page.addEventListener('mouseleave', () => {
            bookmark.classList.remove('visible');
        });
    }
});

// Initialisation des variables du menu
const lightToggle = document.getElementById('lightToggle');    // Luminosité
const icon = lightToggle.querySelector('i');                   // Icon de la luminosité
const title = lightToggle.querySelector('.link-title');        // Label de la luminosité
const body = document.body;                                    // Élément body
const flashlight = document.querySelector('.flashlight');      // Lampe torche
const infoText = document.querySelector('.info-text');         // Notification pour expliquer l'utilisation de la torche

// Son de lampe
const flashlightSound = new Audio("assets/sound/flashlight.mp3");
flashlightSound.volume = 0.6;
flashlightSound.muted = false;

// État initial (mode sombre)
let isLightMode = localStorage.getItem('lightMode') || false;

lightToggle.addEventListener('click', (e) => {
    e.preventDefault();

    const buttonMode = document.querySelector('#readerModeToggle .link-icon i');
    const ereader = document.querySelector(".ereader-screen");

    isLightMode = !isLightMode;

    // Sauvegarde dans le localStorage
    localStorage.setItem('lightMode', isLightMode);

    const savedVolume = localStorage.getItem("volume") || "off";

    if (savedVolume === "on") {
        flashlightSound.currentTime = 0; // permet de rejouer rapidement
        flashlightSound.play();
    }

    if (buttonMode.classList.value.includes('bx-mobile')) {      
        if (isLightMode) {
            switch_on_light();
        } else {
            switch_off_light();
        }
    }
    else {
        if (isLightMode) {
            switch_on_light();
            body.style.background = "var(--bg-color)";
            ereader.style.background = "var(--bg-ereader-color)";
        } else {
            // Activer le mode sombre
            // body.classList.add('dark-mode');
            icon.classList.add('bx-sun');
            body.style.background = "var(--bg-dark-color)";
            ereader.style.background = "var(--bg-ereader-dark-color)";
            
            // Utiliser la fonction i18n pour le texte
            if (typeof updateLightToggleText === 'function') {
                updateLightToggleText();
            } else {
                title.textContent = 'Light'; // Fallback si i18n pas chargé
            }

            flashlight.style.opacity = '0';
        }
    }
});

// Fonction pour éteindre la lumière (livre)
function switch_off_light() {
    // Activer le mode sombre
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    icon.classList.remove('bx-moon');
    icon.classList.add('bx-sun');
    
    // Utiliser la fonction i18n pour le texte
    if (typeof updateLightToggleText === 'function') {
        updateLightToggleText();
    } else {
        title.textContent = 'Light'; // Fallback si i18n pas chargé
    }

    flashlight.style.opacity = '1';
    infoText.style.opacity = '1';
    setTimeout(() => {
        infoText.style.opacity = '0';
    }, 5000);
}

// Fonction pour allumer la lumière (livre et liseuse)
function switch_on_light() {
    // Activer le mode lumière
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    icon.classList.remove('bx-sun');
    icon.classList.add('bx-moon');

    // Utiliser la fonction i18n pour le texte
    if (typeof updateLightToggleText === 'function') {
        updateLightToggleText();
    } else {
        title.textContent = 'Dark'; // Fallback si i18n pas chargé
    }

    flashlight.style.opacity = '0';
}

// Suivre le curseur pour l'effet lampe torche
document.addEventListener('mousemove', (e) => {
    if (!isLightMode & !isEreaderMode) {
        flashlight.style.left = e.clientX + 'px';
        flashlight.style.top = e.clientY + 'px';
    }
});

// Animation au chargement
window.addEventListener('load', () => {
    // Icon de volume
    const volumeIcon = document.querySelector("#volumeToggle i");
    localStorage.getItem('volume') === true ? volumeIcon.classList.add("bx-volume-mute") : volumeIcon.classList.add("bx-volume-full");

    // Animation de la lumière
    if (!isLightMode) {
        body.classList.add('dark-mode');
    
        // Allumer la lumière juste avant l'ouverture du livre
        setTimeout(() => {
            isLightMode = true;

            // Sauvegarde dans le localStorage
            localStorage.setItem('lightMode', isLightMode);

            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            const icon = document.querySelector('#lightToggle i');
            const title = document.querySelector('#lightToggle .link-title');
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');

            // Utiliser la fonction i18n pour le texte
            if (typeof updateLightToggleText === 'function') {
                updateLightToggleText();
            } else {
                title.textContent = 'Dark'; // Fallback
            }
        }, 2000);
    }

    // Création dynamique des bookmars pour éviter d'inclure 1 bloc de code par page
    const bookmarkBox = document.querySelectorAll('.bookmark-container');
    
    bookmarkBox.forEach(box => {
        const bookmarkId = box.dataset.bookmarkId;
        
        bookmarkBox[bookmarkId].innerHTML = ""; // reset

        let expHTML = `
            <div class="bookmark">
                <div class="wear-effect"></div>
                <div class="metal-ring"></div>
                <div class="bookmark-ring"></div>
                
                <div class="emblem">👑</div>
                
                <div class="engraved-text">
                    PORTFOLIO<br>
                    2026
                </div>
                
                <div class="ribbon"></div>
                
                <div class="stitch"></div>
                <div class="stitch"></div>
                <div class="stitch"></div>
                <div class="stitch"></div>
            </div>
        `;

        bookmarkBox[bookmarkId].insertAdjacentHTML("beforeend", expHTML);
    });
});
