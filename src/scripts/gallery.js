// scripts/gallery.js
import { fruits } from './fruits.js';
import { currentLang } from './language.js';
import { openFruitModal } from './modal.js';
import { shareFruit } from './share.js';

const ITEMS_PER_PAGE = 8;
export let currentPage = 1;
export let currentFilter = 'all';

export function renderFruits(filter = currentFilter, page = currentPage) {
  const container = document.getElementById('fruitGrid');
  if (!container || !fruits || !Array.isArray(fruits)) return;

  container.innerHTML = ''; // Clear previous

  const filteredFruits = filter === 'all' ? fruits : fruits.filter(fruit => fruit.region === filter);

  if (filteredFruits.length === 0) {
    container.innerHTML = '<p class="no-results">No fruits found for this region.</p>';
    updatePagination(filteredFruits);
    return;
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFruits = filteredFruits.slice(startIndex, endIndex);

  paginatedFruits.forEach(fruit => {
    const card = document.createElement('div');
    card.className = 'fruit-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <img src="${fruit.img}" alt="${fruit.name} from ${fruit.province}" loading="lazy" onerror="this.src='https://cdn.pixabay.com/photo/2016/11/29/13/20/fruit-1869189_1280.png'" />
      <div class="fruit-card-content">
        <h3>${fruit.name}</h3>
        <p class="location">${fruit.province}</p>
        <p class="desc">${fruit[currentLang]}</p>
        <div class="tags">
          <span class="tag">${fruit.region.charAt(0).toUpperCase() + fruit.region.slice(1)}</span>
          <span class="tag">${getSeason(fruit.name)}</span>
        </div>
        <button class="btn-primary" onclick="openFruitModal('${fruit.name}')" aria-label="Learn more about ${fruit.name}">Discover More</button>
        <button class="btn-secondary" onclick="shareFruit('${fruit.name}')" aria-label="Share ${fruit.name}">Share</button>
      </div>
    `;
    container.appendChild(card);
  });

  updatePagination(filteredFruits);
  updateDynamicFacts();
}

export function setupFruitGallery() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      currentFilter = button.getAttribute('data-filter');
      currentPage = 1;
      renderFruits(currentFilter, currentPage);
    });
  });

  setupPagination();
}

function setupPagination() {
  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  const pageNumbers = document.getElementById('pageNumbers');

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderFruits(currentFilter, currentPage);
    }
  });

  nextButton.addEventListener('click', () => {
    const filteredFruits = currentFilter === 'all' ? fruits : fruits.filter(fruit => fruit.region === currentFilter);
    const totalPages = Math.ceil(filteredFruits.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderFruits(currentFilter, currentPage);
    }
  });

  [prevButton, nextButton].forEach(btn => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

function updatePagination(filteredFruits) {
  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  const pageNumbers = document.getElementById('pageNumbers');
  const totalPages = Math.ceil(filteredFruits.length / ITEMS_PER_PAGE);

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  pageNumbers.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `pagination-number${i === currentPage ? ' active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.setAttribute('aria-label', `Go to page ${i}`);
    pageBtn.setAttribute('role', 'listitem');
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      renderFruits(currentFilter, currentPage);
    });
    pageBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pageBtn.click();
      }
    });
    pageNumbers.appendChild(pageBtn);
  }
}

function getSeason(fruitName) {
  const seasons = {
    'Vải Thiều Lục Ngạn': 'Summer (Jun-Jul)',
    'Sầu Riêng Cái Mơn': 'Year-round',
    'Xoài Tròn Yên Châu': 'Spring (May)',
    // Add more mappings as needed
  };
  return seasons[fruitName] || 'Year-round';
}

function updateDynamicFacts() {
  const highlightContent = document.getElementById('dynamic-fact');
  if (!highlightContent) return;
  const facts = [
    'The <strong>Vải Thiều Lục Ngạn</strong> is Vietnam’s “king of lychees,” exported to over 20 countries.',
    'The <strong>Dien Pomelo</strong> graces Tet altars, symbolizing prosperity and joy.',
    'The <strong>Cai Mon Durian</strong> stars in Southern Vietnamese desserts, from sticky rice to cakes.',
    'Over <strong>30 Vietnamese fruits</strong> carry protected geographical indications, a testament to their unique heritage.'
  ];
  let currentFact = 0;
  highlightContent.innerHTML = facts[currentFact];
  setInterval(() => {
    currentFact = (currentFact + 1) % facts.length;
    highlightContent.classList.add('animate__fadeOut');
    setTimeout(() => {
      highlightContent.innerHTML = facts[currentFact];
      highlightContent.classList.remove('animate__fadeOut');
      highlightContent.classList.add('animate__fadeIn');
    }, 500);
  }, 6000);
}