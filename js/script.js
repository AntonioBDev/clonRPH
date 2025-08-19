// variables
const userLanguage = localStorage.getItem("language") || "es";
const btnSelectLanguage = document.querySelector("#languages");
const textToChange = document.querySelectorAll("[data-section]");
let translations = {};
const form = document.getElementById('form');
const inputName = document.getElementById("name");
const inputMail = document.getElementById("mail");
const inputBtnSubmit = document.getElementById('to-send');
 const email = {
    name: "",
    mail: "",
 };

//EventListener
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations(userLanguage);

  // Valor del elemento OPTION del SELECT
  btnSelectLanguage.addEventListener("change", (e) => {
    const lang = e.target.value;
    loadTranslations(lang);
  });

  //validar campos input
  inputName.addEventListener("blur", validate);
  inputMail.addEventListener("blur", validate);
  form.addEventListener('submit', sendMail);
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

function validate(e){
  if(e.target.value.trim() === ""){
    console.log("sin valor");
    email[e.target.id] = "";
    checkEmail();
    return;
  }

  if(e.target.id === "mail" && !validateMail(e.target.value)){
    console.log("sin valor");
    email[e.target.id] = "";
    checkEmail();
    return;
  }
  email[e.target.id] = e.target.value.trim().toLowerCase();
  console.log("valor");
  checkEmail();
}

function checkEmail(){
  if(Object.values(email).includes("")){
    inputBtnSubmit.classList.add("opacity-50");
    inputBtnSubmit.classList.remove("btn", "btn-naranjado");
    inputBtnSubmit.disabled = true;
    console.log("sin ");

  }else{
    inputBtnSubmit.classList.remove("opacity-50");
    inputBtnSubmit.classList.add("btn", "btn-naranjado");
    inputBtnSubmit.disabled = false;
    console.log("con ");

  }
}

function validateMail(mail){
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(mail);
    return result;
}

function sendMail(e){
  e.preventDefault();

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      resetForm();

      //Crear una alerta de exito
      const alertaExito = document.createElement('P');
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      alertaExito.textContent = 'El mensaje se ha enviado con exito';
      formulario.appendChild(alertaExito);

      setTimeout(()=>{
        alertaExito.remove();
      }, 3000)
    }, 3000);
}

function resetForm() { 
    //Reiniciar variables
    email.name = "";
    email.mail = "";

    //Elimnar registro del formulario HTML
    form.reset();

    //Comprobar registro
    checkEmail();
  }

