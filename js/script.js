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

const lightToggle = document.getElementById('lightToggle');
const icon = lightToggle.querySelector('i');
const title = lightToggle.querySelector('.link-title');
const body = document.body;
const flashlight = document.querySelector('.flashlight');
const customCursor = document.querySelector('.custom-cursor');
const infoText = document.querySelector('.info-text');

// Son de lampe
const flashlightSound = new Audio("assets/sound/flashlight.mp3");
flashlightSound.volume = 0.6;
flashlightSound.muted = false;

// État initial (mode sombre)
let isLightMode = localStorage.getItem('lightMode') || false;

lightToggle.addEventListener('click', (e) => {
    e.preventDefault();

    const buttonMode = document.querySelector('#readerModeToggle .link-icon i');

    if (buttonMode.classList.value.includes('bx-mobile')) {
        isLightMode = !isLightMode;

        // Sauvegarde dans le localStorage
        localStorage.setItem('lightMode', isLightMode);

        const savedVolume = localStorage.getItem("volume") || "off";

        if (savedVolume === "on") {
            flashlightSound.currentTime = 0; // permet de rejouer rapidement
            flashlightSound.play();
        }
        
        if (isLightMode) {
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
            customCursor.style.opacity = '0';
        } else {
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
            customCursor.style.opacity = '1';
            infoText.style.opacity = '1';
            setTimeout(() => {
                infoText.style.opacity = '0';
            }, 5000);
        }
    }
});

// Suivre le curseur pour l'effet lampe torche
document.addEventListener('mousemove', (e) => {
    if (!isLightMode) {
        flashlight.style.left = e.clientX + 'px';
        flashlight.style.top = e.clientY + 'px';
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
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
