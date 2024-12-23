//Fonction pour ouvrir l'image
function showPopup(elt){
    const tabWebSite = ["Site E-Commerce", "Ce site web est issu d'un projet de formation.<br><br>Cliquez sur une image pour l'afficher en grand.","Faire mes premiers pas dans le développement web.","https://github.com/AlexandrePauly/Web-site",["web-site2", "web-site6", "web-site8", "web-site11", "web-site2"],["html", "css", "js", "php", "mysql"]];
    const tabForm =  ["Formulaires", "Vous trouverez ici quelques formulaires que j'ai pu réaliser pour un site web E-commerce.<br><br>Cliquez sur une image pour essayer le formulaire.","Faire mes premiers pas dans le développement web et développer des compétences en design.","https://github.com/AlexandrePauly?tab=repositories",["form-connexion", "form-contact4", "form-paiement", "gift-card", "form-connexion"],["html", "css", "js"],["HTML-form-connexion","html-form","HTML-form-paiement","gift-card","HTML-form-connexion"]];
    const tabPortfolio = ["Portfolio","Site sur lequel vous êtes actuellement.<br><br>Cliquez sur une image pour l'afficher en grand ou sur le bouton pour accéder au code source et tester par vous-même.","Apprendre à faire des animations et à monter en compétences en web design (choix des thèmes de couleurs, des photos, retouches des photos, etc.). L'intérêt était de développer un projet de A à Z en l'hébergeant.","https://alexandrepauly.github.io/portfolio/",["portfolio1", "portfolio6", "portfolio8", "portfolio10", "portfolio1"],["html", "css", "js"]];
    const tabDesigns = ["Designs & Affiches","Réalisation de CV, d'affiches et d'interface mobile ou web en langages de programmation.","Apprendre à gérer les styles et le positionnement des balises, de nouveaux outils, etc.","https://github.com/AlexandrePauly?tab=repositories",["cv", "affiche1", "app_travel2", "interface", "cv"],["html", "css", "js", 'angular'],["HTML-CV","slider","travel-diary","HTML-app-interface","HTML-CV"]];
    const tabJavaFX = ["Interface JavaFX","Cette interface est issue d'un projet de formation pour le débruitage d'images par ACP.<br><br>Cliquez sur une image pour l'afficher en grand.","Faire mes premiers pas en langage objet.","https://github.com/AlexandrePauly/JavaFX-interface",["javafx1", "javafx2", "javafx3", "javafx4", "javafx1"],["java", "javafx"]];
    const tabFingerprint = ["Reconnaissance d'empreintes digitales", "L'utilité de ce projet est de mettre en pratique des compétences de traitement d'images vues en cours.<br><br>Cliquez sur une image pour l'afficher en grand.","Développer des compétences en traitement d'images et trouver des solutions adaptées.", "https://github.com/AlexandrePauly/Fingerprint-recognition", ["fingerprint_recognition1", "fingerprint_recognition2", "fingerprint_recognition3", "fingerprint_recognition4", "fingerprint_recognition1"],["python"]]
    const tabGames = ["Jeux", "L'utilité de ces projets est d'apprendre comment développer des jeux, de la manipulation de la syntaxe à la réalisation d'une IA simple ou avec renforcement par apprentissage, créer une interface, etc.<br><br>Cliquez sur une image pour l'afficher en grand.","Développer des compétences en développement de jeu.", "https://github.com/AlexandrePauly?tab=repositories", ["tic-tac-toe1", "tic-tac-toe4", "demineur", "snake", "tic-tac-toe1"],["python", "c"], ["Tic-Tac-Toe", "Tic-Tac-Toe", "C-Deminer", "RL-snake", "Tic-Tac-Toe"]]
    const tabEdgeDetection = ["Détection de bordures de routes et rivières", "Ce projet vise à manipuler des images par l'utilisation de réseaux de neurones et des méthodes de pré et post-traitement pour améliorer les résultats.<br><br>Cliquez sur une image pour l'afficher en grand.","Détecter des contours d'images de route et rivières acquises par drone en utilisant des méthodes d'IA.", "https://github.com/AlexandrePauly/edges-detection", ["edge_detection_1", "edge_detection_2", "edge_detection_3", "edge_detection_4", "edge_detection_1"],["python"]]
    const tabMobileApp = ["Carnet de musculation", "Ce projet est à but personnel et l'idée derrière cette application est de m'aider dans la gestion de mes entraînements de musculation, mais à l'avenir j'aimerais en faire une application multi-sport pour traquer les performances.<br><br>Cliquez sur une image pour l'afficher en grand.","Développer une application mobile de gestion de carnet d'entraînement pour stocker des données autour d'un entraînement de type musculation.", "https://github.com/AlexandrePauly/mobile-app", ["app_mobile_6", "app_mobile_7", "app_mobile_8", "app_mobile_1", "app_mobile_6"],["react_js", "figma"]]
    
    let tabContent = [tabWebSite,tabForm,tabPortfolio,tabDesigns,tabJavaFX,tabFingerprint,tabGames,tabEdgeDetection,tabMobileApp];
        
    // Modification des valeurs des éléments de la popup en fonction du projet cliqué
    document.querySelector("#popup .content-rightCol h1").innerHTML = tabContent[elt][0];   // Titre du projet
    document.querySelector("#popup .content-rightCol p").innerHTML = tabContent[elt][1];    // Détail du projet
    document.querySelector("#popup .content-rightCol span").innerHTML = tabContent[elt][2]; // Objectif du projet
    document.querySelector("#popup .content-rightCol a").href = tabContent[elt][3];         // Lien vers le github du projet
    if(tabContent[elt][3] != "#"){
        document.querySelector("#popup .content-rightCol a").target = "_blank";
    }

    const languages = tabContent[elt][5];                                                   // Languages utilisés pour le projet
    languages.forEach(value => {
        var img = document.createElement("img");
        img.setAttribute("src", "img/logo/" + value + ".png");
        img.setAttribute("alt", value);
        document.querySelector("#popup .content-rightCol .languages-used").appendChild(img);
    });

    const images = tabContent[elt][4];
    let i = 0;
    images.forEach(imageUrl => {
        const projectImg = document.createElement("div");
        projectImg.className = "project-img expandabled-project";
        projectImg.style.backgroundImage = "url(img/projects/" + imageUrl + ".png)";                                                      // Images du/des projet(s)
        if(elt != 1 && elt != 3){
            projectImg.onclick = function() {
                showSinglePict2(imageUrl);
            };
        }      
        else{
            const link = tabContent[elt][6][i]; // Lien pour essayer le formulaire
            projectImg.onclick = function() {
                goOn(link);
            };
        }
        document.querySelector('#popup .content-leftCol .slider').appendChild(projectImg);
        i++;
    });

    let popup = document.getElementById('popup'); // Élément de le popup

    popup.classList.toggle('visible');

    //Fermeture de l'image
    popup.addEventListener('click', hidePopup, false);
}

//Fonction pour fermer l'image
function hidePopup(e){
    let popup = document.getElementById('popup'); // Élément de le popup

    if(e == 'close'){
        popup.classList.toggle('visible');

        // Suppression des images du projet et des languages utilisés pour ne pas qu'ils restent affichés entre les popup
        document.querySelector("#popup .content-leftCol .slider").innerHTML = "";
        document.querySelector("#popup .content-rightCol .languages-used").innerHTML = "";
    }
    else if(e.target == popup){
        popup.classList.toggle('visible');

        // Suppression des images du projet et des languages utilisés pour ne pas qu'ils restent affichés entre les popup
        document.querySelector("#popup .content-leftCol .slider").innerHTML = "";
        document.querySelector("#popup .content-rightCol .languages-used").innerHTML = "";
    }
}

// Fonction pour rediriger vers une autre page
function goOn(link){
    window.open("https://alexandrepauly.github.io/" + link + "/", "_blank");
  }
