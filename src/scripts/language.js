// scripts/language.js
export let currentLang = localStorage.getItem('language') || 'en';

export function setupLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-switcher button');
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      switchLanguage(lang);
      langButtons.forEach(btn => btn.setAttribute('aria-selected', btn === button ? 'true' : 'false'));
    });
  });
}

export function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  import('./gallery.js').then(({ renderFruits, currentPage, currentFilter }) => {
    renderFruits(currentFilter, currentPage);
  });
}