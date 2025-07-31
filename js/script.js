// variables 
// const btnLanguage = document.querySelectorAll("select option [data-language]");
const btnSelectLanguage = document.querySelector('#languages');

const textToChange = document.querySelectorAll("[data-section]");
document.addEventListener("DOMContentLoaded",()=> {

    //Valor del elemento OPTION del SELECT
     btnSelectLanguage.addEventListener('change', (e)=>{
        const language = e.target.value;
        traducir(language);
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