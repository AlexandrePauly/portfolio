// Initialisation de variables au chargement de la page
let scrollDefault = 0; // Valeur du scroll initialisée à 0
let positionDateAlternance = 0; // Valeur de la position de #date-alternance initialisé à 0
let positionImgABout = 0; // Valeur de la position de #img-about initialisé à 0
let positionPercent = 0; // Valeur de la position de #content-skills initialisé à 0
let boolDateAlternance = false; // Booléen initialisé à false (prend true lorsque l'animation s'est effectuée 1 fois) -- Animation pour la date d'alternance
let boolImgAbout = false; // Booléen initialisé à false (prend true lorsque l'animation s'est effectuée 1 fois) -- Animation pour l'image de À propos
let boolPercent = false; // Booléen initialisé à false (prend true lorsque l'animation s'est effectuée 1 fois) -- Animation pour les barres de pourcentages des compétences

// Fonction pour détecter le chargement de la page
document.addEventListener("DOMContentLoaded", function () {  
    // Affectation de la position des éléments une fois la page chargée
    positionDateAlternance = document.getElementById("date-alternance").getBoundingClientRect().y;
    positionImgABout = document.getElementById("img-about").getBoundingClientRect().y;
    positionPercent = document.getElementById("content-skills").getBoundingClientRect().y;
});

// Fonction pour détecter les scroll sur la page
addEventListener("scroll", () => {
    // Initialisation de variables
    const scrollActual = window.scrollY; // Valeur actuelle du scroll
    const header = document.querySelector('header'); // Élément html du header
    const headerLinks = document.getElementsByClassName('color'); // Éléments html avec la classe color du header
    const arrowScroll = document.getElementById("scroll-arrow"); // Éléments html de la flèche de scroll vers le haut

    // Si l'utilisateur scroll vers le haut et que ce scroll est supérieur à 750, on ajoute une classe pour fixer le header afin qu'il apparaisse
    if(scrollActual <= scrollDefault && scrollActual > 750){
        // On fixe le header avec la classe .headerFixed et on modifie la couleur de ses éléments
        header.classList.add('headerFixed');
        for(let i = 0 ; i < headerLinks.length ; i++){
            headerLinks[i].style.setProperty('--headerLinksColor', 'black');
        }

        // On affiche la flèche pour remonter
        arrowScroll.style.display = "flex";
    }
    // Sinon si ce scroll est supérieur à 300
    else if(scrollActual <= scrollDefault && scrollActual > 300){
      // On affiche la flèche pour remonter
        arrowScroll.style.display = "flex";
    }
    // Sinon s'il descend, on la supprime pour qu'il soit caché
    else{
      // On défixe le header avec la classe .headerFixed et on modifie la couleur de ses éléments
        header.classList.remove('headerFixed');
        for(let i = 0 ; i < headerLinks.length ; i++){
            headerLinks[i].style.setProperty('--headerLinksColor', 'rgba(255, 255, 255, 0.85)');
        }

        // On cache la flèche pour remonter
        arrowScroll.style.display = "none";
    }

    // Si l'utilisateur arrive à l'élément à animer, on effectue l'animation si elle n'a jamais été effectuée
    if(positionDateAlternance <= scrollActual + 600 && !boolDateAlternance){
      boolDateAlternance = true;
    
        document.getElementById('date-alternance').animate([
          {
            offset: 0,
            transform: "translateY(0)"
          },
          {
            offset: 0.25,
            transform: "translateY(0)"
          },
          {
            offset: 0.4,
            transform: "translateY(-24px)"
          },
          {
            offset: 0.55,
            transform: "translateY(0)"
          },
          {
            offset: 0.65,
            transform: "translateY(-12px)"
          },
          {
            offset: 0.75,
            transform: "translateY(0)"
          },
          {
            offset: 0.82,
            transform: "translateY(-6px)"
          },
          {
            offset: 0.87,
            transform: "translateY(0)"
          },
          {
            offset: 0.93,
            transform: "translateY(-4px)"
          },
          {
            offset: 1,
            transform: "translateY(0)"
          }
        ],{				 
          duration: 1000,
          easing: 'linear',
          delay: 0,
          iterations: 2,
          direction: 'normal',
          fill: 'none'
        });
      }

    // Si l'utilisateur arrive à l'élément à animer, on effectue l'animation si elle n'a jamais été effectuée
    if(positionImgABout <= scrollActual + 600 && !boolImgAbout){
      boolImgAbout = true;

      const elt = document.getElementById('img-about');

      elt.style.display = "block";
      elt.animate([
        {
          transform: "translateX(-1000px)",
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
    }

    // Si l'utilisateur arrive à l'élément à animer, on effectue l'animation si elle n'a jamais été effectuée
    if(positionPercent <= scrollActual && !boolPercent){
      boolPercent = true;
      
      // Fonction pour lancer l'animation
      animateSkills();
    }

    scrollDefault = scrollActual; // Valeur modifiée pour détecter par la suite si l'utilisateur est descendu ou monté sur la page
});

function animateSkills() {
  // Tableau des pourcentages respectifs
  const tabPercent = [70, 60, 94, 95, 90, 75, 80, 85, 75, 91, 87, 82, 80];

  // Itération de chaque barre de pourcentage
  for(let i = 0 ; i < tabPercent.length ; i++){
    const skillBar = document.getElementsByClassName("percent")[i]; // Élément html de la barre de pourcentage
    let currentPercent = 0;

    // Incrémentation de la barre pourcentage par pourcentage
    function updateBar() {
        if (currentPercent < tabPercent[i]) {
            currentPercent++;
            skillBar.style.width = currentPercent + "%";
            requestAnimationFrame(updateBar);
        }
    }

    // Démarrez l'animation
    updateBar();
  }
}
