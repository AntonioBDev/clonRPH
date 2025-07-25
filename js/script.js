// variables 
const btnLanguage = document.querySelectorAll("select [data-language]");
const textToChange = document.querySelectorAll("[data-section]")
document.addEventListener("DOMContentLoaded",()=> {
    btnLanguage.forEach(button =>{
        button.addEventListener("click", ()=>{
            fetch(`../languages/${button.dataset.language}.json`)
                .then(res => res.json())
                .then(data => {
                    textToChange.forEach(atribute =>{
                        const section = atribute.dataset.section;
                        const value = atribute.dataset.value;

                        atribute.innerHTML = data[section][value];
                    })
                })
        });
    })
})
