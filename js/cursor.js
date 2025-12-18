// Initialisation de variables
let cursorActive = false;    // Etat global
let rafId = null;            // Pour annuler requestAnimationFrame
let mouseMoveHandler = null; // Pour retirer l'event listener

// Fonciton pour afficher un curseur customisé
function toggleCursor() {
  const tracker = document.querySelector('.cursor-tracker');
  if (!tracker) return;

  // Activer le curseur
  if (!cursorActive) {
    cursorActive = true;
    tracker.style.opacity = 1;

    // Initialisation de variables
    let trackerSize = tracker.offsetWidth;
    let trackerX = 0;
    let trackerY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const speed = 0.05;

    // Calcul de la position de la souris
    mouseMoveHandler = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    // Position du curseur
    const updatePosition = () => {
      const distanceX = mouseX - (trackerX + trackerSize / 2);
      const distanceY = mouseY - (trackerY + trackerSize / 2);

      trackerX += distanceX * speed;
      trackerY += distanceY * speed;

      tracker.style.transform = `translate(${trackerX}px, ${trackerY}px)`;

      rafId = requestAnimationFrame(updatePosition);
    };

    updatePosition();
  }
  // Désactiver le curseur
  else {
    cursorActive = false;
    tracker.style.opacity = 0;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (mouseMoveHandler) {
      document.removeEventListener('mousemove', mouseMoveHandler);
      mouseMoveHandler = null;
    }
  }
}