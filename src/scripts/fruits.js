// scripts/fruits.js
export let fruits = [];

export async function loadFruitsData() {
  try {
    const response = await fetch('fruits.json');
    if (!response.ok) throw new Error(`Failed to load fruits.json: ${response.status}`);
    const data = await response.json();
    fruits = data.fruits;
  } catch (error) {
    console.error('Error loading fruits data:', error);
    document.getElementById('fruitGrid')?.insertAdjacentHTML('beforeend', '<p class="no-results">Failed to load fruits. Please try again later.</p>');
    throw error;
  }
}