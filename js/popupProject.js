//Fonction pour ouvrir l'image
function showPopup(elt){
    const tabWebSite = ["Site E-Commerce", "Ce site web est issu d'un projet de formation.<br><br>Cliquez sur une image pour l'afficher en grand.","Faire mes premiers pas dans le développement web.","https://github.com/AlexandrePauly/Web-site",["web-site2", "web-site6", "web-site8", "web-site11", "web-site2"],["html", "css", "js", "php", "mysql"]];
    const tabForm =  ["Formulaires", "Vous trouverez ici quelques formulaires que j'ai pu réaliser pour un site web E-commerce.<br><br>Cliquez sur une image pour essayer le formulaire.","Faire mes premiers pas dans le développement web et développer des compétences en design.","https://github.com/AlexandrePauly?tab=repositories",["form-connexion", "form-contact4", "form-paiement", "gift-card", "form-connexion"],["html", "css", "js"],["HTML-form-connexion","html-form","HTML-form-paiement","gift-card","HTML-form-connexion"]];
    const tabPortfolio = ["Portfolio","Site sur lequel vous êtes actuellement.<br><br>Cliquez sur une image pour l'afficher en grand ou sur le bouton pour accéder au code source et tester par vous-même.","Apprendre à faire des animations et à monter en compétences en web design (choix des thèmes de couleurs, des photos, retouches des photos, etc.). L'intérêt était de développer un projet de A à Z en l'hébergeant.","https://alexandrepauly.github.io/portfolio/",["portfolio1", "portfolio6", "portfolio8", "portfolio10", "portfolio1"],["html", "css", "js"],["HTML-form-connexion","html-form","HTML-form-paiement","gift-card","HTML-form-connexion"]];
    const tabCV = ["Curriulum Vitae","Réalisation d'un CV en langages web.","Apprendre à gérer les styles et le positionnement des balises.","https://github.com/AlexandrePauly/HTML-CV",["cv", "cv", "cv", "cv", "cv"],["html", "css", "js"],["HTML-CV","HTML-CV","HTML-CV","HTML-CV","HTML-CV"]];
    const tabJavaFX = ["Interface JavaFX","Ce site web est issu d'un projet de formation. Ces interfaces sont issues de projet de formation. L'une pour la gestion d'un centre de tri et l'autre pour le débruitage d'images par ACP.<br><br>Cliquez sur une image pour l'afficher en grand.","Faire mes premiers pas en langage objet.","https://github.com/AlexandrePauly/JavaFX-interface",["javafx1", "javafx2", "javafx3", "javafx4", "javafx1"],["java", "javafx"]];

    let tabContent = [tabWebSite,tabForm,tabPortfolio,tabCV,tabJavaFX];
        
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
