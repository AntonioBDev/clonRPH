// variables
const userLanguage = localStorage.getItem("language") || "es";
const btnSelectLanguage = document.querySelector("#languages");
const textToChange = document.querySelectorAll("[data-section]");
let translations = {};

//EventListener
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations(userLanguage);

  // Valor del elemento OPTION del SELECT
  btnSelectLanguage.addEventListener("change", (e) => {
    const lang = e.target.value;
    loadTranslations(lang);
  });
});

//Cargar traducciones
async function loadTranslations(lang) {
  try {
    const response = await fetch(`../languages/${lang}.json`);
    if (!response.ok) {
      throw new Error(
        `Error al cargar el archivo de idioma: ${response.statusText}`
      );
    }
    translations = await response.json();
    applyTranslations();
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    updateLanguageSelect(lang);
  } catch (error) {
    console.log("No se puede cargar las traducciones del json");
  }
}

//Aplicar traducción
function applyTranslations() {
  textToChange.forEach((element) => {
    const section = element.dataset.section;
    const value = element.dataset.value;
    let translatedText = translations;

    if (translatedText !== undefined) {
      // Si es un input o textarea, actualiza el atributo placeholder o value
      if (element.tagName === "INPUT") {
        if (element.type === "submit") {
          element.setAttribute("value", translations[section][value]);
        } else {
          element.setAttribute("placeholder", translations[section][value]);
        }
      } else if (element.tagName === "TEXTAREA") {
        element.setAttribute("placeholder", translations[section][value]);
      } else {
        // Para otros elementos, actualiza el innerHTML
        element.innerHTML = translations[section][value];
      }
    }
  });
}

function updateLanguageSelect(currentLang) {
  if (btnSelectLanguage) {
    btnSelectLanguage.value = currentLang;
  }
}
