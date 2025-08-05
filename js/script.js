// variables
// const btnLanguage = document.querySelectorAll("select option [data-language]");
const userLanguage = localStorage.getItem("language") || "es";
let translations = {};
const btnSelectLanguage = document.querySelector("#languages");
const textToChange = document.querySelectorAll("[data-section]");
let idioma = "";
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations(userLanguage);
});

//Cargar traducciones
async function loadTranslations(lang) {
  console.log(lang);
  try {
    const response = await fetch(`../languages/${lang}.json`);
    if (!response.ok) {
      throw new Error(
        `Error al cargar el archivo de idioma: ${response.statusText}`
      );
    }
     translations = await response.json();

    // Lógica de tu primer código para actualizar los elementos
   


    applyTranslations();
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    updateLanguageSelect(lang);
    // traducir(lang);
  } catch (error) {
    console.log("No se puede cargar las traducciones del json");
  }
}

function applyTranslations() {
     textToChange.forEach((atribute) => {
      const section = atribute.dataset.section;
      const value = atribute.dataset.value;
        let translatedText = translations;
        const pathParts = value.split(".");


      // Verificamos si los datos existen para evitar errores
      if (translations[section] && translations[section][value]) {
        atribute.innerHTML = translations[section][value];
      } else {
        console.error(`Traducción no encontrada para [${section}][${value}]`);
      }
    });

    textToChange.forEach((atribute) => {

    // for(const part of pathParts){
    //     if(translatedText && translatedText[part] !== undefined){
    //         translatedText = translatedText[part];
    //     }else{
    //         translatedText = undefined;
    //         break;
    //     }

    //     if(translatedText !== undefined){
    //         element.innerHTML = translatedText;
    //     }
    // }
  });
}

function updateLanguageSelect(currentLang) {
  if (btnSelectLanguage) {
    btnSelectLanguage.value = currentLang;
  }
}

// Valor del elemento OPTION del SELECT
btnSelectLanguage.addEventListener("change", (e) => {
  const idioma = e.target.value;
  loadTranslations(idioma);
});

function traducir(language) {
  fetch(`../languages/${language}.json`)
    .then((res) => res.json())
    .then((data) => {
      textToChange.forEach((atribute) => {
        const section = atribute.dataset.section;
        const value = atribute.dataset.value;

        atribute.innerHTML = data[section][value];
      });
    });
}
