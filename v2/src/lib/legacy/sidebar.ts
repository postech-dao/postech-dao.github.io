import { changeLanguage, getCurrentLanguage } from '$lib/legacy/i18n';

let sidebarInitialized = false;

export function initSidebar(): void {
  if (sidebarInitialized) return;
  sidebarInitialized = true;

  const toggleBtn = document.querySelector<HTMLButtonElement>('#sidebar-toggle');
  const nav = document.querySelector<HTMLElement>('.sidebar__nav');
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement | null;
      const isClickInsideSidebar = target?.closest('.sidebar');
      const isClickOnToggle = target?.closest('#sidebar-toggle');
      if (!isClickInsideSidebar && !isClickOnToggle && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  initLanguageToggle();
}

function initLanguageToggle(): void {
  const languageToggle = document.querySelector<HTMLElement>('#language-toggle');
  if (!languageToggle || languageToggle.dataset.bound === 'true') return;
  languageToggle.dataset.bound = 'true';

  languageToggle.addEventListener('click', async () => {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    const text = languageToggle.querySelector<HTMLElement>('.language-toggle__text');
    languageToggle.dataset.lang = newLang;
    if (text) text.textContent = newLang === 'ko' ? 'KO' : 'EN';
    await changeLanguage(newLang);
  });

  const savedLang = getCurrentLanguage();
  const text = languageToggle.querySelector<HTMLElement>('.language-toggle__text');
  languageToggle.dataset.lang = savedLang;
  if (text) text.textContent = savedLang === 'ko' ? 'KO' : 'EN';
}
