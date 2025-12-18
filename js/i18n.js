let currentLang = 'fr'; // langue par défaut

// stocker le contenu globalement après fetch
let contentData = {};

// 1️⃣ Charger le JSON
fetch('assets/data.json')
  .then(res => res.json())
  .then(data => {
    contentData = data;
    updateContent(); // afficher le contenu initial
  })
  .catch(err => console.error('Erreur chargement JSON:', err));

// 2️⃣ Fonction pour mettre à jour le contenu
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (contentData[currentLang] && contentData[currentLang][key]) {
      el.textContent = contentData[currentLang][key];
    }
  });
}

// 3️⃣ Ajouter le listener sur le bouton
const langToggle = document.getElementById('languageToggle');
langToggle.addEventListener('click', e => {
  e.preventDefault();

  // Switch entre fr et en
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  updateContent();
});
