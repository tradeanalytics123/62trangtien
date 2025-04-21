import { Fruit } from '@/lib/types';
import fruitData from './fruits.json';

export const fruits: Fruit[] = fruitData.fruits.map((fruit) => ({
  ...fruit,
  img: fruit.img.startsWith('images/')
    ? `/images/${fruit.img.split('/').pop()}`
    : fruit.img,
}));