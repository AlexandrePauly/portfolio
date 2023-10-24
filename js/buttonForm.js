//Vérification d'envoie des données du formulaire
function checkForm(event) {
    event.preventDefault();
    
    //Initialisation de variables à partir des données du formulaires
    var formName = document.getElementsByClassName('name')[0].value;
    var formSurname = document.getElementsByClassName('surname')[0].value;
    var formMail = document.getElementsByClassName('email')[0].value;
    var formPhone = document.getElementsByClassName('phone')[0].value;
    var formObject = document.getElementsByClassName('object')[0].value;
    var formMessage = document.getElementsByClassName('message')[0].value;

    // Si l'un des champs est vide
    if (formName === "" || formSurname === "" || formMail === "" || formPhone === "" || formObject === "" || formMessage === "") {
        alert("Veuillez remplir tous les champs.");
    }
    // Sinon si tous les champs sont remplis
    else {
        document.querySelector(".expand").addEventListener(
            "click",
            function (e) {
                e.preventDefault();
                e.stopPropagation();
                const button = e.currentTarget;
                //button.style.transition = "0.5s";
                //button.style.backgroundColor = "green";
                button.classList.add("loading");
                button.disabled = true;
                setTimeout(() => {
                    button.classList.add("loaded");
                    setTimeout(() => {
                        button.classList.add("finished");
                        setTimeout(() => {
                            button.classList.remove("finished");
                            button.classList.remove("loaded");
                            button.classList.remove("loading");
                            button.disabled = false;

                            button.closest("form").submit();

                            alert("Ce site étant hébergé via GitHub, il est impossible pour ce formulaire d'atteindre sa destination. \n\nVeuillez m'en excuser, vous trouverez mes coordonnées de contact sur mon CV ou alors dans le bas de page.");

                            //Redirection vers la page "test.html"
                            window.location.href = "index.html";
                        }, 1500);
                    }, 700);
                }, 1500);
            },
            false
        );
    }
}