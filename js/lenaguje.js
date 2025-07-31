// js/script.js

// Obtiene el idioma guardado en localStorage o usa 'es' como predeterminado
const userLanguage = localStorage.getItem('language') || 'es';

let translations = {}; // Objeto para almacenar las traducciones cargadas

// Función para cargar el archivo JSON del idioma seleccionado
async function loadTranslations(lang) {
    try {
        // Asume que tus JSON están en la carpeta 'languages'
        const response = await fetch(`languages/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo de idioma: ${response.statusText}`);
        }
        translations = await response.json();
        applyTranslations();
        localStorage.setItem('language', lang); // Guarda el idioma seleccionado en localStorage
        document.documentElement.lang = lang; // Actualiza el atributo lang del <html>
        updateLanguageSelect(lang); // Actualiza la selección en el dropdown
    } catch (error) {
        console.error('No se pudieron cargar las traducciones:', error);
        // Opcional: Podrías cargar un idioma de fallback o mostrar un mensaje al usuario
    }
}

// Función para aplicar las traducciones a los elementos HTML
function applyTranslations() {
    // Itera sobre todos los elementos con el atributo 'data-section'
    document.querySelectorAll('[data-section]').forEach(element => {
        const section = element.dataset.section;
        const valuePath = element.dataset.value;

        // Soporte para anidación profunda (ej: "text-services.text-1", "fields.field-1")
        let translatedText = translations;
        const pathParts = valuePath.split('.');
        for (const part of pathParts) {
            if (translatedText && translatedText[part] !== undefined) {
                translatedText = translatedText[part];
            } else {
                translatedText = undefined; // No se encontró la ruta
                break;
            }
        }

        if (translatedText !== undefined) {
            // Si es un input o textarea, actualiza el atributo placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', translatedText);
            } else {
                // Para otros elementos, actualiza el innerHTML (permite HTML si lo necesitas, si no, usa innerText)
                element.innerHTML = translatedText;
            }
        }
    });

    // Actualizar el título de la página
    // const pageTitleElement = document.querySelector('title');
    // if (pageTitleElement) {
    //     let pageTitleKey;
    //     const path = window.location.pathname;

    //     if (path.includes('index.html') || path === '/') {
    //         pageTitleKey = "hero-title-index";
    //     } else if (path.includes('nosotros.html')) {
    //         pageTitleKey = "hero-title-about-us";
    //     } else if (path.includes('proyectos.html')) {
    //         pageTitleKey = "hero-title-projects";
    //     } else if (path.includes('servicios.html')) {
    //         pageTitleKey = "hero-title-services";
    //     } else if (path.includes('contacto.html')) {
    //         pageTitleKey = "hero-title-contact";
    //     }

    //     if (pageTitleKey && translations[pageTitleKey]) {
    //         pageTitleElement.innerText = `Rocky Point Home Builders | ${translations[pageTitleKey]}`;
    //     } else if (translations.navigation && translations.navigation.home) {
    //         // Fallback al título de inicio si no se encuentra uno específico
    //         pageTitleElement.innerText = `Rocky Point Home Builders | ${translations.navigation.home}`;
    //     }
    // }
}

// Función para actualizar la selección en el <select> de idioma
function updateLanguageSelect(currentLang) {
    const selectElement = document.getElementById('languages');
    if (selectElement) {
        selectElement.value = currentLang;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Carga las traducciones del idioma inicial (guardado o predeterminado)
    loadTranslations(userLanguage);

    // Event Listener para el select de cambio de idioma
    const btnSelectLanguage = document.querySelector('#languages');
    if (btnSelectLanguage) {
        btnSelectLanguage.addEventListener('change', (e) => {
            const newLang = e.target.value;
            loadTranslations(newLang);
        });
    }

    // Lógica para el menú móvil
    const menuIcono = document.querySelector('.menu__icono-movil');
    const contenidoMenu = document.querySelector('.contenido-menu');

    if (menuIcono && contenidoMenu) {
        menuIcono.addEventListener('click', () => {
            contenidoMenu.classList.toggle('activo');
        });
    }
});