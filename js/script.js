// variables 
// const btnLanguage = document.querySelectorAll("select option [data-language]");
const userLanguage = localStorage.getItem('ifi') || 'es';
let translations = {}
const btnSelectLanguage = document.querySelector('#languages');
const textToChange = document.querySelectorAll("[data-section]");
let idioma = "";
document.addEventListener("DOMContentLoaded",()=> {
    
    loadTranslations(userLanguage);
  
    // function traducir(language){
    //      fetch(`../languages/${language}.json`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 textToChange.forEach(atribute =>{
    //                     const section = atribute.dataset.section;
    //                     const value = atribute.dataset.value;

    //                     atribute.innerHTML = data[section][value];
    //             })
    //         })
    // }
})

//Cargar traducciones
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`../languages/${lang}.json`);      
            if(!response.ok){
                throw new Error(`Error al cargar el archivo de idioma: ${response.statusText}`);
            }
            translations = await response.json();
            // console.log(translations);
            applyTranslations();
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            updateLanguageSelect(lang);

        } catch (error) {
            console.log("No se puede cargar las traducciones del json");
        }
    }

    function applyTranslations(){
        document.querySelectorAll('[data-section]').forEach(element =>{
            const section = element.dataset.section;
            const valuePath = element.dataset.value;
            let translatedText = translations;
            const pathParts = valuePath.split('.');

            for(const part of pathParts){
                if(translatedText && translatedText[part] !== undefined){
                    translatedText = translatedText[part];
                }else{
                    translatedText = undefined;
                    break;
                }

                if(translatedText !== undefined){
                    element.innerHTML = translatedText;
                    console.log(translatedText);
                }
            }
        })
    }

    function updateLanguageSelect(currentLang){
        if(btnSelectLanguage){
            console.log(currentLang);
            btnSelectLanguage.value = currentLang;

        }
    }

    //Valor del elemento OPTION del SELECT
    //  btnSelectLanguage.addEventListener('change', (e)=>{
    //     const idioma = e.target.value;
    //     // traducir(idioma);
    //     loadTranslations(idioma);
    // })