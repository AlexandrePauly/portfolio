// Permet de gérer le contenu dynamiquement en fonction de la langue sélectionnée
// Dans le html, les éléments contiennent les valeurs françaises en valeur par défaut

// Local storage sinon anglais par défaut
let currentLanguage = localStorage.getItem('language') || 'en';

// Stockage du contenu
let contentData = {};

// Chargement du JSON
fetch('assets/data.json')
  .then(res => res.json())
  .then(data => {
    contentData = data;
    updateContent(); // afficher le contenu initial
    renderWorkExperience(contentData, currentLanguage);
    renderEducation(contentData, currentLanguage);
    renderChallenges(contentData, currentLanguage);
    renderProjects(contentData, currentLanguage);
  })
  .catch(err => console.error('Erreur chargement JSON:', err));

// Fonction pour mettre à jour le contenu
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (contentData[currentLanguage] && contentData[currentLanguage][key]) {
      el.textContent = contentData[currentLanguage][key];
    }
  });

  // Mettre à jour le texte du bouton light/dark en fonction de l'état actuel
  updateLightToggleText();
}

// Ajout du listener sur le bouton
const langToggle = document.getElementById('languageToggle');
langToggle.addEventListener('click', e => {
  e.preventDefault();

  // Switch entre fr et en
  currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';

  // Sauvegarde dans le localStorage
  localStorage.setItem('language', currentLanguage);

  updateContent();
  renderWorkExperience(contentData, currentLanguage);
  renderEducation(contentData, currentLanguage);
  renderChallenges(contentData, currentLanguage);
  renderProjects(contentData, currentLanguage);
});

function getCV() {
  window.open(contentData[currentLanguage].downloadCVLink);
}

// Chargement dynamique des expériences professionnelles
function renderWorkExperience(data, lang) {
  container = document.getElementById("workExperienceContainer");
  containerReader = document.getElementById("workExperienceContainerReader");
  
  if (!container || !containerReader) return;

  container.innerHTML = ""; // reset
  containerReader.innerHTML = ""; // reset

  data[lang].workExperience.forEach(elt => {
    const expHTML = `
      <div class="workeduc-content">
        <h3>${elt.title}</h3>

        <div class="workeduc-content-info">
          <span class="year">
            <i class="bx bxs-buildings"></i>${elt.company}
          </span>
          <span class="year">
            <i class="bx bx-calendar"></i>${elt.dates}
          </span>
        </div>

        <p>${elt.description}</p>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", expHTML);
    containerReader.insertAdjacentHTML("beforeend", expHTML);
  });
}

// Chargement dynamique des formations
function renderEducation(data, lang) {
  const container = document.getElementById("educationContainer");
  const containerReader = document.getElementById("educationContainerReader");

  if (!container || !containerReader) return;

  container.innerHTML = ""; // reset
  containerReader.innerHTML = ""; // reset

  data[lang].education.forEach(elt => {
    const expHTML = `
      <div class="workeduc-content">
        <h3>${elt.title}</h3>

        <div class="workeduc-content-info">
          <span class="year">
            <i class="bx bxs-school"></i>${elt.school}
          </span>
          <span class="year">
            <i class="bx bx-calendar"></i>${elt.dates}
          </span>
        </div>

        <p>${elt.description}</p>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", expHTML);
    containerReader.insertAdjacentHTML("beforeend", expHTML);
  });
}

// Chargement dynamique des challenges
function renderChallenges(data, lang) {
  const container = document.getElementById("challengeContainer");
  const containerReader = document.getElementById("challengeContainerReader");
  
  if (!container || !containerReader) return;

  container.innerHTML = ""; // reset
  containerReader.innerHTML = ""; // reset

  data[lang].challenges.forEach(elt => {
    let expHTML = `
      <div class="services-content">
        <i class="bx ${elt.icon}"></i>
        <h3>${elt.title}</h3>
        <p>${elt.description}</p>
    `;
    
    if (elt.btnText !== undefined && elt.btnLink !== undefined) {
      expHTML = expHTML + `
        <a href="${elt.btnLink}" target="_blank">${elt.btnText}<i class="bx bx-link-external"></i></a>
      `;
    } 
    
    expHTML = expHTML + `
      </div>
    `;

    container.insertAdjacentHTML("beforeend", expHTML);
    containerReader.insertAdjacentHTML("beforeend", expHTML);
  });
}

// Chargement dynamique des projets
function renderProjects(data, lang) {
  const portfolioBoxBook = document.querySelectorAll('.portfolio-box-book');
  const portfolioBoxReader = document.querySelectorAll('.portfolio-box-reader');
  const portfolioBox = [portfolioBoxBook, portfolioBoxReader]
  
  portfolioBox.forEach(elt => {
    elt.forEach(box => {
      const projectId = box.dataset.projectId;
      const project = data[lang].projects[projectId];
      
      if (!project) return;

      elt[projectId].innerHTML = ""; // reset

      let expHTML = `
        <div class="img-box">
          <img src="${project.img}" alt="" class="expandabled-img" />
        </div>
        <div class="info-box">
          <div class="info-title">
            <h3>${project.title}</h3>
      `;

      // if (project.previewLink !== undefined) {
      //   expHTML = expHTML + `
      //       <a href="${project.previewLink}">${data[lang].buttonPreview}<i class="bx bx-link-external"></i></a>
      //   `;
      // } 

      expHTML = expHTML + `
          </div>

          <div class="tags-container">
      `;

      project.tags.forEach(tag => {
        expHTML = expHTML + `<span class="tag">${tag}</span>`
      });

      expHTML = expHTML + `
          </div>

          <p>${project.context}</p>
          <p>${project.description}</p>
        </div>
        <div class="btn-box">
          <a href="${project.sourceCode}" target="_blank" class="btn">${data[lang].buttonSourceCode}</a>
          <a href="${project.similarProjects}" target="_blank" class="btn">${data[lang].buttonSimilarProjects}</a>
        </div>
      `;

      elt[projectId].insertAdjacentHTML("beforeend", expHTML);
    });
  });
}

// Nouvelle fonction pour mettre à jour le texte du bouton light/dark
function updateLightToggleText() {
  const title = document.querySelector('#lightToggle .link-title');
  if (title && contentData[currentLanguage]) {
    // Vérifier si on est en mode lumière ou sombre
    const isLightMode = document.body.classList.contains('light-mode');
    title.textContent = isLightMode 
      ? contentData[currentLanguage].buttonDark 
      : contentData[currentLanguage].buttonLight;
  }
}