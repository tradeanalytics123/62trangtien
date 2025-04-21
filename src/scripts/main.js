// scripts/main.js
import { loadComponents } from './components.js';
import { loadFruitsData } from './fruits.js';
import { setupFruitGallery, renderFruits } from './gallery.js';
import { setupLanguageSwitcher } from './language.js';
import { setupSubscriptionForm } from './subscription.js';
import { setupNavbarScroll } from './navbar.js';
import { setupDynamicTagline } from './tagline.js';

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  await loadFruitsData();
  await loadComponents();
  setupFruitGallery();
  renderFruits();
  setupLanguageSwitcher();
  setupSubscriptionForm();
  setupNavbarScroll();
  setupDynamicTagline();
  document.getElementById('loading-spinner')?.remove();
});