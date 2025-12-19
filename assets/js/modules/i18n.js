/**
 * i18n Module
 * Handles internationalization using i18next
 */

/**
 * Initialize i18next
 */
export async function initI18n() {
  // Get saved language or default to Korean
  const savedLang = localStorage.getItem('language') || 'ko';

  await window.i18next
    .use(window.i18nextHttpBackend)
    .init({
      lng: savedLang,
      fallbackLng: 'ko',
      debug: false,
      backend: {
        loadPath: '/locales/{{lng}}/translation.json'
      }
    });

  // Translate the page
  translatePage();
}

/**
 * Translate all elements with data-i18n attribute
 */
export function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = window.i18next.t(key);

    if (translation && translation !== key) {
      element.textContent = translation;
    }
  });
}

/**
 * Change language
 * @param {string} lang - Language code (ko or en)
 */
export async function changeLanguage(lang) {
  await window.i18next.changeLanguage(lang);
  translatePage();
  localStorage.setItem('language', lang);
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return window.i18next.language || 'ko';
}
