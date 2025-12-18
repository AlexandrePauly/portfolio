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

// État initial (mode sombre)
let isLightMode = false;

lightToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    isLightMode = !isLightMode;
    
    if (isLightMode) {
        // Activer le mode lumière
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
        title.textContent = 'Dark';
        flashlight.style.opacity = '0';
        customCursor.style.opacity = '0';
    } else {
        // Activer le mode sombre
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
        title.textContent = 'Light';
        flashlight.style.opacity = '1';
        customCursor.style.opacity = '1';
        infoText.style.opacity = '1';
        setTimeout(() => {
            infoText.style.opacity = '0';
        }, 5000);
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
    body.classList.add('dark-mode');
    
    // Allumer la lumière juste avant l'ouverture du livre
    setTimeout(() => {
        isLightMode = true;
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        const icon = document.querySelector('#lightToggle i');
        const title = document.querySelector('#lightToggle .link-title');
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
        title.textContent = 'Dark';
    }, 2000);
});