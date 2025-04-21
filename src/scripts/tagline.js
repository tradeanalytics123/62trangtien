// scripts/tagline.js
export function setupDynamicTagline() {
    const taglineElement = document.getElementById('dynamic-tagline');
    if (!taglineElement) return;
    const taglines = [
      'Celebrating 50 Years of Liberation with Nature’s Finest',
      'A Journey Through Vietnam’s Vibrant Orchards',
      'Savor the Soul of Vietnam’s Iconic Fruits',
      'From Soil to Soul: Vietnam’s Fruit Heritage'
    ];
    let currentTagline = 0;
    taglineElement.textContent = taglines[currentTagline];
    setInterval(() => {
      currentTagline = (currentTagline + 1) % taglines.length;
      taglineElement.classList.remove('animate__fadeInUp');
      taglineElement.classList.add('animate__fadeOut');
      setTimeout(() => {
        taglineElement.textContent = taglines[currentTagline];
        taglineElement.classList.remove('animate__fadeOut');
        taglineElement.classList.add('animate__fadeInUp');
      }, 500);
    }, 5000);
  }