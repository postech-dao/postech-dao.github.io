/**
 * Sidebar Module
 * Handles mobile sidebar toggle and language toggle functionality
 */

import { changeLanguage, getCurrentLanguage } from './i18n.js';

export function initSidebar() {
  const toggleBtn = document.querySelector('#sidebar-toggle');
  const nav = document.querySelector('.sidebar__nav');

  if (!toggleBtn || !nav) {
    console.warn('Sidebar toggle button or navigation not found');
    return;
  }

  // Toggle sidebar navigation
  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');

    // Update ARIA attribute for accessibility
    toggleBtn.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const isClickInsideSidebar = e.target.closest('.sidebar');
    const isClickOnToggle = e.target.closest('#sidebar-toggle');

    if (!isClickInsideSidebar && !isClickOnToggle && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close sidebar on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Language toggle functionality
  initLanguageToggle();
}

/**
 * Initialize language toggle
 */
function initLanguageToggle() {
  const languageToggle = document.querySelector('#language-toggle');

  if (!languageToggle) {
    console.warn('Language toggle button not found');
    return;
  }

  // Toggle language on click
  languageToggle.addEventListener('click', async () => {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    const newText = newLang === 'ko' ? 'KO' : 'EN';

    // Update button
    languageToggle.dataset.lang = newLang;
    languageToggle.querySelector('.language-toggle__text').textContent = newText;

    // Change language using i18next
    await changeLanguage(newLang);

    console.log('Language changed to:', newLang);
  });

  // Load saved language preference on init
  const savedLang = getCurrentLanguage();
  if (savedLang) {
    const langText = savedLang === 'ko' ? 'KO' : 'EN';
    languageToggle.dataset.lang = savedLang;
    languageToggle.querySelector('.language-toggle__text').textContent = langText;
  }
}
