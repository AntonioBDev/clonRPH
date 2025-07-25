// Obtiene el idioma guardado en localStorage o usa 'es' como predeterminado
const userLanguage = localStorage.getItem('language') || 'es';
let translations = {}; // Objeto para almacenar las traducciones cargadas

// Función para cargar el archivo JSON del idioma seleccionado
async function loadTranslations(lang) {
    try {
        const response = await fetch(`../languages/${button.dataset.language}.json`); // Asume que tus JSON están en la raíz del sitio
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo de idioma: ${response.statusText}`);
        }
        translations = await response.json();
        applyTranslations();
        localStorage.setItem('language', lang); // Guarda el idioma seleccionado en localStorage
        document.documentElement.lang = lang; // Actualiza el atributo lang del <html>
    } catch (error) {
        console.error('No se pudo cargar las traducciones:', error);
        // Opcional: Podrías cargar un idioma de fallback o mostrar un mensaje al usuario
    }
}

// Función para aplicar las traducciones a los elementos HTML
function applyTranslations() {
    // Itera sobre todos los elementos con el atributo 'data-section'
    document.querySelectorAll('[data-section]').forEach(element => {
        const section = element.dataset.section; // Ej: 'navigation', 'services'
        const value = element.dataset.value;     // Ej: 'home', 'Design'

        // Verifica si la sección y la clave existen en las traducciones cargadas
        if (translations[section] && translations[section][value]) {
            // Asigna el texto traducido al elemento
            element.innerText = translations[section][value];
        } else if (section === "hero-title") { // Manejo especial para el título del hero si lo quieres fuera de una sección anidada
             if (translations[section]) {
                 element.innerText = translations[section];
             }
        }
    });

    // Para el copyright del footer que es texto simple
    const footerCopyrightElement = document.querySelector('.footer p');
    if (footerCopyrightElement && translations.footer && translations.footer.copyright) {
        footerCopyrightElement.innerText = translations.footer.copyright;
    }

    // Actualizar el título de la página
    const pageTitleElement = document.querySelector('title');
    if (pageTitleElement) {
        // Podrías tener títulos de página específicos por idioma en tu JSON
        // Por ejemplo: translations.pageTitles.services
        // Por ahora, lo dejaré estático o puedes ajustar la lógica aquí.
        // Si tienes el título del hero como "Servicios", podrías usarlo.
        if (translations["hero-title"]) { // O una clave específica para el título de la página
             pageTitleElement.innerText = `Rocky Point Home Builders | ${translations["hero-title"]}`;
        } else if (translations.navigation && translations.navigation.services) { // Si es la página de servicios
             pageTitleElement.innerText = `Rocky Point Home Builders | ${translations.navigation.services}`;
        } else {
             pageTitleElement.innerText = `Rocky Point Home Builders | ${translations.navigation.home}`; // Predeterminado para la página de inicio
        }
    }
}


// Crea los botones de cambio de idioma dinámicamente o busca los existentes.
// Para este ejemplo, asumiremos que ya tienes botones con IDs específicos.
// Si no los tienes, puedes agregarlos al HTML:
// <button id="lang-es">Español</button>
// <button id="lang-en">English</button>

document.addEventListener('DOMContentLoaded', () => {
    // Carga las traducciones del idioma inicial (guardado o predeterminado)
    loadTranslations(userLanguage);

    // Event Listeners para los botones de cambio de idioma
    // Asumiendo que tendrás botones con IDs como 'btn-lang-es', 'btn-lang-en'
    const langSwitchers = document.querySelectorAll('.language-switcher'); // Puedes usar una clase para agrupar los botones

    if (langSwitchers.length > 0) {
        langSwitchers.forEach(button => {
            button.addEventListener('click', (event) => {
                const newLang = event.target.dataset.lang; // Asume data-lang="es", data-lang="en"
                if (newLang) {
                    loadTranslations(newLang);
                }
            });
        });
    } else {
        // Si no tienes botones de cambio de idioma, puedes agregarlos
        // o simplemente confiar en la detección inicial del idioma.
        console.warn("No se encontraron botones de cambio de idioma con la clase 'language-switcher'.");
        console.warn("Asegúrate de agregar botones como: <button class='language-switcher' data-lang='es'>Español</button>");
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