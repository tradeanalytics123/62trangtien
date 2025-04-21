// scripts/share.js
import { fruits } from './fruits.js';
import { currentLang } from './language.js';

export function shareFruit(fruitName) {
  const fruit = fruits.find(f => f.name === fruitName);
  if (!fruit) return;
  if (navigator.share) {
    navigator.share({
      title: fruit.name,
      text: fruit[currentLang],
      url: window.location.href
    }).catch(err => console.error('Share failed:', err));
  } else {
    const shareText = encodeURIComponent(`${fruit.name}: ${fruit[currentLang]}`);
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
  }
}