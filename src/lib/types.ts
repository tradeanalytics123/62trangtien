export interface Fruit {
  name: string;
  province: string;
  region: 'north' | 'central' | 'south';
  img: string;
  vn: string;
  en: string;
  cn: string;
  video: string;
  link?: string;
}