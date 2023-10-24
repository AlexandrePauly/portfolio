//Fonction pour ouvrir l'image
function showSinglePict(e){
    let image = e.target;
    let imageContainer = document.getElementById('imgExpand');
    let bigImage = imageContainer.querySelector('img');

    bigImage.src = image.src;
    imageContainer.classList.toggle('visible');

    //Fermeture de l'image
    imageContainer.addEventListener('click', closeSinglePict, false);
}

//Fonction pour ouvrir l'image
function showSinglePict2(link){
    let imageContainer = document.getElementById('imgExpand');
    let bigImage = imageContainer.querySelector('img');

    bigImage.src = "img/projects/" + link + ".png";

    imageContainer.classList.toggle('visible');

    //Fermeture de l'image
    imageContainer.addEventListener('click', closeSinglePict, false);
}

//Fonction pour fermer l'image
function closeSinglePict(){
    let imageContainer = document.getElementById('imgExpand');
    imageContainer.classList.toggle('visible');
}

// Fonction pour détecter le chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    let galImages = document.querySelectorAll('.expandabled-img');

    //Ouverture de l'image
    for(let i = 0 ; i < galImages.length ; i++){
        let image = galImages[i];
        image.addEventListener('click',showSinglePict, false);
    }
});