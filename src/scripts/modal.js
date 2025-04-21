// scripts/modal.js
import { fruits } from './fruits.js';
import { currentLang } from './language.js';

export function openFruitModal(fruitName) {
  const fruit = fruits.find(f => f.name === fruitName);
  if (!fruit) return;
  const modal = document.createElement('div');
  modal.className = 'modal animate__animated animate__fadeIn';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close" onclick="closeModal(this)" aria-label="Close modal" role="button" tabindex="0">×</span>
      <h2 id="modal-title">${fruit.name}</h2>
      <img src="${fruit.img}" alt="${fruit.name} from ${fruit.province}" loading="lazy" onerror="this.src='https://cdn.pixabay.com/photo/2016/11/29/13/20/fruit-1869189_1280.png'" />
      <p><strong>Province:</strong> ${fruit.province}</p>
      <p>${fruit[currentLang]}</p>
      ${fruit.link ? `<a href="${fruit.link}" target="_blank" aria-label="Learn more about ${fruit.name}">Learn More</a>` : ''}
      ${fruit.video ? `<p><a href="${fruit.video}" target="_blank" aria-label="Watch video about ${fruit.name}">Watch Video</a></p>` : ''}
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.modal-close').focus();
  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal(modal.querySelector('.modal-close'));
  });
}

export function closeModal(element) {
  const modal = element.closest('.modal');
  modal.classList.remove('animate__fadeIn');
  modal.classList.add('animate__fadeOut');
  setTimeout(() => modal.remove(), 500);
}