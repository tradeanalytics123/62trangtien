import { useState, useEffect } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState<string>(
    localStorage.getItem('language') || 'vn', // Set Vietnamese as default
  );

  const switchLanguage = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
  };

  return { currentLang, switchLanguage };
};

export const useDynamicTagline = () => {
  const taglines = {
    vn: [
      'Kỷ niệm 50 năm Giải phóng với những trái cây tuyệt vời',
      'Hành trình qua những vườn cây Việt Nam rực rỡ',
      'Thưởng thức linh hồn của trái cây biểu tượng Việt Nam',
      'Từ đất đến tâm hồn: Di sản trái cây Việt Nam',
    ],
    en: [
      'Celebrating 50 Years of Liberation with Nature’s Finest',
      'A Journey Through Vietnam’s Vibrant Orchards',
      'Savor the Soul of Vietnam’s Iconic Fruits',
      'From Soil to Soul: Vietnam’s Fruit Heritage',
    ],
    cn: [
      '庆祝解放50周年，品味自然精华',
      '穿越越南生机勃勃的果园之旅',
      '品尝越南标志性水果的灵魂',
      '从土壤到灵魂：越南水果遗产',
    ],
  };

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const { currentLang } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines[currentLang].length);
        setIsFading(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentLang, taglines]);

  return { tagline: taglines[currentLang][currentTaglineIndex], isFading };
};