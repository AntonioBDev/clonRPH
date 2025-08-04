// variables 
// const btnLanguage = document.querySelectorAll("select option [data-language]");
const userLanguage = localStorage.getItem('language') || 'es';
let translations = {}
const btnSelectLanguage = document.querySelector('#languages');
const textToChange = document.querySelectorAll("[data-section]");
let idioma = "";
document.addEventListener("DOMContentLoaded",()=> {
    
    //Cargar traducciones
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`../languages/${lang}.json`);      
            if(!response.ok){
                throw new Error(`Error al cargar el archivo de idioma: ${response.statusText}`);
            }
            translations = await response.json();
            console.log(translations);
            // applyTranslations();
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;

        } catch (error) {
            console.log("No se puede cargar las traducciones del json");
        }
    }

    //Valor del elemento OPTION del SELECT
     btnSelectLanguage.addEventListener('change', (e)=>{
        const idioma = e.target.value;
        traducir(idioma);
        loadTranslations(idioma);
    })
  
    function traducir(language){
         fetch(`../languages/${language}.json`)
                .then(res => res.json())
                .then(data => {
                    textToChange.forEach(atribute =>{
                        const section = atribute.dataset.section;
                        const value = atribute.dataset.value;

                        atribute.innerHTML = data[section][value];
                })
            })
    }
})