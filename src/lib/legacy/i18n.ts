import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { base } from '$app/paths';

let initialized = false;

export async function initI18n(): Promise<void> {
  if (!initialized) {
    const savedLang = localStorage.getItem('language') ?? 'ko';
    await i18next.use(HttpBackend).init({
      lng: savedLang,
      fallbackLng: 'ko',
      debug: false,
      backend: {
        loadPath: `${base}/locales/{{lng}}/translation.json`,
      },
    });
    initialized = true;
  }
  translatePage();
}

export function translatePage(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>('[data-i18n]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (!key) return;
    const translation = i18next.t(key);
    if (translation && translation !== key) {
      element.textContent = translation;
    }
  });
}

export async function changeLanguage(lang: string): Promise<void> {
  await i18next.changeLanguage(lang);
  translatePage();
  localStorage.setItem('language', lang);
}

export function getCurrentLanguage(): string {
  return i18next.language || localStorage.getItem('language') || 'ko';
}
