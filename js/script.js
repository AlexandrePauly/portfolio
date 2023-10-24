// Fonction du texte à copier
function copyMail(){
    // Initialisation de variables
    var copyText = "alexandre.pauly@cy-tech.fr"; // Texte à copier
    const tempTextArea = document.createElement('textarea'); // Création d'un élément de texte temporaire
    tempTextArea.value = copyText;

    // Ajout de l'élément temporaire au DOM
    document.body.appendChild(tempTextArea);

    // Sélection du texte dans l'élément temporaire
    tempTextArea.select();

    // Copie du message
    document.execCommand('copy');

    // Affichage d'une notification pour informer l'utilisateur
    showToast("L'adresse-mail a été copiée !");

    // Suppression de l'élément temporaire du DOM
    document.body.removeChild(tempTextArea);
}

// Fonction pour afficher une notification avec un message formaté
function showToast(message){
    // Initialisation de variables
    const toast = document.getElementById("toast"); // Toast à afficher
    document.getElementById("toast-message").innerHTML = message; // Message du toast

    // Animation pour l'affichage du toast
    toast.animate([
      {
        opacity: "0",
        offset: 0
      },
        {
        opacity: "1",
        offset: 0.2
      },
      {
        opacity: "1",
        offset: 0.8
      },
      {
        opacity: "0",
        offset: 1
      }],
      {				 
          duration: 5000,
          easing: 'linear',
          delay: 0,
          iterations: 1,
          direction: 'normal',
          fill: 'forwards'
      });
}

// Function pour changer l'onglet des projets
function changeProjects(elt){
    const points = document.getElementsByClassName("submenu-content");

    // Itération des onglets
    for (let i = 0 ; i < 3 ; i++){
        // Si l'élément cliqué correspond, on l'affiche
        if(i == elt){
            points[i].style.display = "block";
        }
        // Sinon on le d2sqctive
        else{
            points[i].style.display = "none";
        }
    }
}

// Fonction pour animer le lien sécurité
function onSecurity(elt){
  elt.animate([
    {
      offset: 0,
      filter: "blur(0)"
    },
    {
      offset: 1,
      filter: "blur(12px) opacity(0%)"
    }
  ],{				 
    duration: 1000,
    easing: 'linear',
    delay: 0,
    iterations: 1,
    direction: 'normal',
    fill: 'forwards',
  });

  // On attend 1s que l'animation se termine
  setTimeout(function(){ elt.style.display = "none" }, 1000);
}

// On récupère la position du scroll
let previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
document.addEventListener("scroll", hideSubmenu);

// Fonction pour cacher le sous-menu lorsque l'on scroll
function hideSubmenu() {
  // Initialisation de variables
  const submenu = document.getElementsByClassName("submenu")[0]; // Div du sous-menu
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Valeur du scroll sur la page

  // Si le sous-menu est affiché
  if (window.getComputedStyle(submenu).display === 'flex') {
    // Si l'utilisateur a scroll vers le bas, on passe le sous-menu en display none
    if (currentScrollPosition > previousScrollPosition) {
      submenu.classList.remove("submenu-open");
    }

    // Mise à jour de la position de scroll
    previousScrollPosition = currentScrollPosition;
  }
}

// Fonction pour afficher et cacher le sous-menu
function toggleSubmenu(bool) {
  const submenu = document.getElementsByClassName("submenu")[0];
  const header = document.querySelector('.headerFixed'); // Élément html du header
  
  if(bool && header != null){
    submenu.classList.add("submenu-open");
  }
  else{
    submenu.classList.remove("submenu-open");
  }
}

// Fonction pour calculer le nombre de mois de pratique du Dev Web
function countMonth(){
  // Initialisation de variables
  const date = new Date("04/03/2023"); // Date de départ
  const currentDate = new Date(); // Date du jour

  // Affichage du nombre de jours 
  document.getElementById("about-month").innerHTML = dateDiff(date, currentDate).month;
}

// Fonction pour calculer le nombre de mois, jours, heures
function dateDiff(date, currentDate){
  // Initialisation de variables
  var diff = {} // Initialisation du retour
  var tmp = currentDate - date; // Différence entre la date du jour et celle de départ

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures
   
  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp % 30;                    // Extraction du nombre de jours

  tmp = Math.floor((tmp-diff.day)/30);    // Nombre de mois restants
  diff.month = tmp;
   
  return diff;
}