//Fonction pour ouvrir l'image
function showPopup(elt){
    const tabWebSite = ["E-Commerce Website", "This website is part of a training project.<br><br>Click on an image to display it in full size.", "Taking my first steps in web development.", "https://github.com/AlexandrePauly/Web-site", ["web-site2", "web-site6", "web-site8", "web-site11", "web-site2"], ["html", "css", "js", "php", "mysql"]];
    const tabForm = ["Forms", "Here you will find some forms I created for an E-commerce website.<br><br>Click on an image to try out the form.", "Taking my first steps in web development and building design skills.", "https://github.com/AlexandrePauly?tab=repositories", ["form-connexion", "form-contact4", "form-paiement", "gift-card", "form-connexion"], ["html", "css", "js"], ["HTML-form-connexion", "html-form", "HTML-form-payment", "gift-card", "HTML-form-connexion"]];
    const tabPortfolio = ["Portfolio", "This is the site you are currently on.<br><br>Click on an image to display it in full size or click the button to access the source code and try it yourself.", "Learning how to create animations and improving my skills in web design (color theme choices, photos, photo editing, etc.). The goal was to develop a project from A to Z and host it.", "https://alexandrepauly.github.io/portfolio/", ["portfolio1", "portfolio6", "portfolio8", "portfolio10", "portfolio1"], ["html", "css", "js"]];
    const tabDesigns = ["Designs & Posters", "Creation of resumes, posters, and mobile or web interfaces using programming languages.", "Learning how to manage styles, tag positioning, new tools, etc.", "https://github.com/AlexandrePauly?tab=repositories", ["cv", "affiche1", "app_travel2", "interface", "cv"], ["html", "css", "js", 'angular'], ["HTML-CV", "slider", "travel-diary", "HTML-app-interface", "HTML-CV"]];
    const tabJavaFX = ["JavaFX Interface", "This interface is part of a training project for image denoising using PCA.<br><br>Click on an image to display it in full size.", "Taking my first steps in object-oriented programming.", "https://github.com/AlexandrePauly/JavaFX-interface", ["javafx1", "javafx2", "javafx3", "javafx4", "javafx1"], ["java", "javafx"]];
    const tabFingerprint = ["Fingerprint Recognition", "The purpose of this project is to apply image processing skills learned in class.<br><br>Click on an image to display it in full size.", "Developing skills in image processing and finding suitable solutions.", "https://github.com/AlexandrePauly/Fingerprint-recognition", ["fingerprint_recognition1", "fingerprint_recognition2", "fingerprint_recognition3", "fingerprint_recognition4", "fingerprint_recognition1"], ["python"]];
    const tabGames = ["Games", "The purpose of these projects is to learn how to develop games, from syntax manipulation to building a simple AI or using reinforcement learning, creating an interface, etc.<br><br>Click on an image to display it in full size.", "Developing game development skills.", "https://github.com/AlexandrePauly?tab=repositories", ["tic-tac-toe1", "tic-tac-toe4", "demineur", "snake", "tic-tac-toe1"], ["python", "c"], ["Tic-Tac-Toe", "Tic-Tac-Toe", "C-Deminer", "RL-snake", "Tic-Tac-Toe"]];
    const tabEdgeDetection = ["Road and River Edge Detection", "This project involves manipulating images by using neural networks and pre- and post-processing methods to improve results.<br><br>Click on an image to display it in full size.", "Detecting the edges of road and river images captured by drones using AI methods.", "https://github.com/AlexandrePauly/edges-detection", ["edge_detection_1", "edge_detection_2", "edge_detection_3", "edge_detection_4", "edge_detection_1"], ["python"]];
    const tabMobileApp = ["Workout Log", "This project is for personal use, and the idea behind this application is to help me manage my workout routines. In the future, I would like to expand it into a multi-sport app to track performance.<br><br>Click on an image to display it in full size.", "Developing a mobile app for managing workout logs to store data related to strength training.", "https://github.com/AlexandrePauly/mobile-app", ["app_mobile_6", "app_mobile_7", "app_mobile_8", "app_mobile_1", "app_mobile_6"], ["react_js", "figma"]];
    
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
