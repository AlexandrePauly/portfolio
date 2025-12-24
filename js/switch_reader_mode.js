const wrapper = document.querySelector('.wrapper');
const modeToggle = document.getElementById('readerModeToggle');
const modeIcon = modeToggle.querySelector('i');
const modeTitle = modeToggle.querySelector('.link-title');

const savedReaderMode = localStorage.getItem("readerMode");
let isEreaderMode = savedReaderMode === "eReader";

// Passer en mode liseuse
if (isEreaderMode) {
    document.querySelector('.book-container').style.display = 'none';
    document.querySelector('.ereader-container').style.display = 'flex';
    wrapper.classList.remove('book-mode');
    wrapper.classList.add('ereader-mode');
    modeIcon.classList.remove('bx-mobile');
    modeIcon.classList.add('bx-book-content');
}
// Passer en mode livre
else {
    document.querySelector('.book-container').style.display = 'flex';
    document.querySelector('.ereader-container').style.display = 'none';
    wrapper.classList.remove('ereader-mode');
    wrapper.classList.add('book-mode');
    modeIcon.classList.remove('bx-book-content');
    modeIcon.classList.add('bx-mobile');
}

modeToggle.addEventListener('click', (e) => {
    e.preventDefault();

    isEreaderMode = !isEreaderMode;

    // Passer en mode liseuse
    if (isEreaderMode) {
        document.querySelector('.book-container').style.display = 'none';
        document.querySelector('.ereader-container').style.display = 'flex';
        wrapper.classList.remove('book-mode');
        wrapper.classList.add('ereader-mode');
        modeIcon.classList.remove('bx-mobile');
        modeIcon.classList.add('bx-book-content');
    }
    // Passer en mode livre
    else {
        document.querySelector('.book-container').style.display = 'flex';
        document.querySelector('.ereader-container').style.display = 'none';
        wrapper.classList.remove('ereader-mode');
        wrapper.classList.add('book-mode');
        modeIcon.classList.remove('bx-book-content');
        modeIcon.classList.add('bx-mobile');
    }

    // Sauvegarde dans le localStorage
    localStorage.setItem("readerMode", isEreaderMode ? "eReader" : "book");
});