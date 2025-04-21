// scripts/components.js
export const includes = [
    { id: 'navbar', file: 'navbar.html' },
    { id: 'hero', file: 'hero.html' },
    { id: 'fruit-gallery', file: 'fruit-gallery.html' },
    { id: 'call-to-action', file: 'call-to-action.html' },
    { id: 'subscribe', file: 'subscribe.html' },
    { id: 'instructions', file: 'instructions.html' },
    { id: 'footer', file: 'footer.html' }
  ];
  
  export async function loadComponents() {
    try {
      const fetchPromises = includes.map(async ({ id, file }) => {
        const container = document.getElementById(id);
        if (container) {
          const response = await fetch(file);
          if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
          const html = await response.text();
          container.innerHTML = html;
          return id;
        }
      });
      return await Promise.all(fetchPromises);
    } catch (error) {
      console.error('Error loading components:', error);
      document.getElementById('loading-spinner')?.insertAdjacentHTML('afterend', '<p class="error">Error loading content. Please refresh.</p>');
      throw error;
    }
  }