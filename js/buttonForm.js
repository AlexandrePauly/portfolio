function checkForm(event) {
    event.preventDefault();

    // Déterminer la langue de la page
    const fileName = window.location.pathname.split('/').pop();
    const isFrench = fileName === 'fr.html';

    // Messages d'erreur en fonction de la langue
    const messages = {
        emptyFields: isFrench ? "Veuillez remplir tous les champs." : "Please, fill all fields.",
        invalidEmail: isFrench ? "Veuillez donner une adresse e-mail valide." : "Please, give a valid email.",
        invalidPhone: isFrench
            ? "Veuillez donner un numéro de téléphone valide : 01 02 03 04 05 ou 0102030405 sont valides."
            : "Please, give a valid phone number: 01 02 03 04 05 or 0102030405 are accepted.",
        formBlocked: isFrench
            ? "Ce site étant hébergé via GitHub, il est impossible pour ce formulaire d'atteindre sa destination.\n\nVeuillez m'en excuser, vous trouverez mes coordonnées de contact sur mon CV ou alors dans le bas de page."
            : "As this site is hosted on GitHub, it is impossible for this form to reach its destination.\n\nI apologise for this, but you can find my contact details on my CV or at the bottom of the page.",
    };

    // Champs à valider
    const fields = Array.from(document.querySelectorAll('.form-input input, .object, .message'));
    const emailField = document.querySelector('.email');
    const phoneField = document.querySelector('.phone');

    // Expressions régulières pour validations
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/; // Téléphone avec exactement 10 chiffres

    let allFieldsValid = true;

    // Validation des champs
    fields.forEach((field) => {
        if (field.value.trim() === "") {
            field.classList.add("error");
            allFieldsValid = false;
        } else {
            field.classList.remove("error");

            // Validation spécifique e-mail
            if (field === emailField && !emailPattern.test(field.value)) {
                field.classList.add("error");
                alert(messages.invalidEmail);
                allFieldsValid = false;
            }

            // Validation spécifique téléphone
            if (field === phoneField && !phonePattern.test(field.value)) {
                field.classList.add("error");
                alert(messages.invalidPhone);
                allFieldsValid = false;
            }
        }
    });

    // Si le formulaire n'est pas valide
    if (!allFieldsValid) {
        alert(messages.emptyFields);
        return;
    }

    // Simulation d'envoi du formulaire avec animation
    handleFormSubmission(messages.formBlocked);
}

// Gestion de l'animation et de la soumission
function handleFormSubmission(message) {
    const button = document.querySelector(".expand");
    button.classList.add("loading");
    button.disabled = true;

    setTimeout(() => {
        button.classList.add("loaded");
        setTimeout(() => {
            button.classList.add("finished");
            setTimeout(() => {
                button.classList.remove("finished", "loaded", "loading");
                button.disabled = false;

                alert(message);

                // Redirection vers une autre page
                window.location.href = "index.html";
            }, 1500);
        }, 700);
    }, 1500);
}

// Ajout de l'événement au bouton
document.querySelector(".expand").addEventListener("click", checkForm);
