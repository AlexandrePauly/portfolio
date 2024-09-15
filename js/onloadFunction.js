function getRandomIndex(table) {
  const randomIndex = Math.floor(Math.random() * table.length);
  return randomIndex;
}

function setHomePage() {
  // Initialisation de variables
  const imgBg =  document.getElementsByClassName("inner-shadow")[0] // Élément html de l'image en bakground
  const tabImg = ["bg1.jpg", "bg2.jpg", "bg4.jpg", "bg5.jpg", "bg6.jpg", "bg7.jpg", "bg8.jpg", "bg9.jpg"]; // Tableau des images pour la section d'accueil
  const positionImg = ["70%", "top", "top", "center", "center", "center", "center", "bottom"]; // Tableau de la position de chaque image

  // Choix de l'image en background
  index = getRandomIndex(tabImg)
  imgBg.style.backgroundImage = "url(img/background/" + tabImg[index] + ")";
  imgBg.style.backgroundPosition = positionImg[index];

  /* Animation du chargement de la page */
  const contentHome = document.querySelector('#home-img');

  contentHome.addEventListener('animationend', () => {
    const elt = document.querySelector('#content-home');

    elt.style.display = "flex";
    elt.animate([
      {
        transform: "translateX(1000px)",
        opacity: "0",
        offset: 0
      },
      {
        transform: "translateX(0)",
        opacity: "1",
        offset: 1
      }
    ],{          
      duration: 1000,
      easing: 'linear',
      delay: 0,
      iterations: 1,
      direction: 'normal',
      fill: 'none'
    });
  }, { once: true });
}

// Fonction pour choisir l'image en background au chargement de la page
window.onload = setHomePage;

// Fonction pour détecter le chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  // Initialisation de variables
  const quote = document.getElementsByClassName("quote")[0]; // Élément html de la citation
  const author = document.getElementsByClassName("author")[0]; // Élément html de l'auteur
  const tabQuote = ["Toujours coder comme si la personne qui finit par maintenir votre code sera un psychopathe violent qui sait où vous habitez."]; // Tableau des citations
  const tabAuthor = ["John Woods", ]; // Tableau des auteurs
  
  // Choix de la citation avec son auteur
  index = getRandomIndex(tabQuote);
  quote.innerHTML = "&rdquo; " + tabQuote[index] + " &rdquo;";
  author.innerHTML = tabAuthor[index];

  // Initialisation des pourcentages de compétences à 0
  const percent = document.getElementsByClassName("percent");
  for(let i = 0 ; i < percent.length ; i++){
    percent[i].style.width = 0;
  }
});

// Lorsqu'un utilisateur se connecte depuis un appareil différent d'un ordinateur, on bloque l'accès en cachant le contenu
if (navigator.userAgent.includes("Mobile")) {
  document.getElementsByClassName("mobile-hide")[0].style.display = "none";
  document.getElementsByClassName("mobile-message")[0].style.display = "block";
}