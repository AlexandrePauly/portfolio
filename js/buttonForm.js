//Vérification d'envoie des données du formulaire
function checkForm(event) {
    event.preventDefault();

    // Détecter la langue du navigateur
    const userLanguage = (navigator.language || navigator.userLanguage).includes('fr') ? 'fr' : 'en';
    
    //Initialisation de variables à partir des données du formulaires
    var formName = document.getElementsByClassName('name')[0];
    var formSurname = document.getElementsByClassName('surname')[0];
    var formMail = document.getElementsByClassName('email')[0];
    var formPhone = document.getElementsByClassName('phone')[0];
    var formObject = document.getElementsByClassName('object')[0];
    var formMessage = document.getElementsByClassName('message')[0];

    // Si l'un des champs est vide
    if (formName.value === "" || formSurname.value === "" || formMail.value === "" || formPhone.value === "" || formObject.value === "" || formMessage.value === "") {
        alert("Veuillez remplir tous les champs.");
    }
    // Sinon si tous les champs sont remplis
    else {
        if (formPhone.value.length < 10 ) {
            formPhone.style.borderColor = 'red';
            if (userLanguage == 'fr') {
                alert("Veuillez donner un numéro de téléphone valide : 01 02 03 04 05 ou 0102030405 sont valides.");
            }
            else {
                alert("Please, give a valid phone number : 01 02 03 04 05 or 0102030405 are accepted.");
            }
        }
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
    
                                if (userLanguage == 'fr') {
                                    alert("Ce site étant hébergé via GitHub, il est impossible pour ce formulaire d'atteindre sa destination. \n\nVeuillez m'en excuser, vous trouverez mes coordonnées de contact sur mon CV ou alors dans le bas de page.");
                                }
                                else {
                                    alert("Ce site étant hébergé via GitHub, il est impossible pour ce formulaire d'atteindre sa destination. \n\nVeuillez m'en excuser, vous trouverez mes coordonnées de contact sur mon CV ou alors dans le bas de page.");
                                }
    
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
}