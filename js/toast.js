// Fonction pour afficher une notification avec un message formaté
function showToast(type){
  if (type == "mail_copied" || type == "phone_copied"){
    // Toast à afficher
    const toast = document.getElementById("toast");
    const toastContentIcon = document.getElementById("toast-content-icon-container");
    const toastIcon = document.querySelectorAll("#toast-content-icon-container i")[0];    
    
    // Message du toast
    try {
      // Initialisation de variables
      var copyText = "alexandrepauly775@gmail.com"; // Texte à copier
      const tempTextArea = document.createElement('textarea'); // Création d'un élément de texte temporaire
      tempTextArea.value = copyText;

      // Ajout de l'élément temporaire au DOM
      document.body.appendChild(tempTextArea);

      // Sélection du texte dans l'élément temporaire
      tempTextArea.select();

      // Copie du message
      document.execCommand('copy');

      // Suppression de l'élément temporaire du DOM
      document.body.removeChild(tempTextArea);

      toastIcon.classList.add("bx-check");
      toast.style.borderLeftColor = 'var(--toast-success-color)';
      toastContentIcon.style.backgroundColor = 'var(--toast-success-color)';
      document.getElementById("toast-title").innerHTML = 'Success';
      if (type == "mail_copied") {
        document.getElementById("toast-label").innerHTML = 'Email successfully copied';
      }
      else {
        document.getElementById("toast-label").innerHTML = 'Phone number successfully copied';
      }
    } catch (error) {
      toastIcon.classList.add("bx-x");
      toast.style.borderLeftColor = 'var(--toast-error-color)';
      toastContentIcon.style.backgroundColor = 'var(--toast-error-color)';
      document.getElementById("toast-title").innerHTML = 'Error';
      if (type == "mail_copied") {
        document.getElementById("toast-label").innerHTML = 'Unfortunately, we did not copy the email.';
      }
      else {
        document.getElementById("toast-label").innerHTML = 'Unfortunately, we did not copy the phone number.';
      }
    }

    // Animation pour l'affichage du toast
    toast.style.display = "flex";
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
        offset: 1,
      }],
      {				 
          duration: 5000,
          easing: 'linear',
          delay: 0,
          iterations: 1,
          direction: 'normal',
          fill: 'forwards'
      });

    setTimeout(function () {
        toast.style.display = "none";
    }, 5000);
  }
}