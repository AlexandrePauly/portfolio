// Détecter la langue du navigateur
const userLanguage = (navigator.language || navigator.userLanguage).includes('fr') ? 'fr' : 'en';

if (userLanguage == 'fr') {
  window.location.href = 'fr.html'
}
else {
  window.location.href = 'en.html'
}