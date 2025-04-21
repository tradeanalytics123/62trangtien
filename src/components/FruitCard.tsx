import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Fruit } from '@/lib/types';
import { useLanguage } from '@/lib/utils';
import FruitModal from '@/components/FruitModal';
import { useTranslation } from 'react-i18next';
import Tilt from 'react-parallax-tilt';

interface FruitCardProps {
  fruit: Fruit;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruit }) => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSeason = (name: string): string => {
    const seasons: { [key: string]: string } = {
      'Vải Thiều Lục Ngạn': t('fruitCard.season.summer', { defaultValue: 'Summer (Jun-Jul)' }),
      'Sầu Riêng Cái Mơn': t('fruitCard.season.yearRound', { defaultValue: 'Year-round' }),
    };
    return seasons[name] || t('fruitCard.season.yearRound', { defaultValue: 'Year-round' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: fruit.name,
        text: fruit[currentLang],
        url: window.location.href,
      }).catch((err) => console.error('Share failed:', err));
    } else {
      const shareText = encodeURIComponent(`${fruit.name}: ${fruit[currentLang]}`);
      const shareUrl = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank');
    }
  };

  return (
    <>
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000}>
        <Card className="flex flex-col overflow-hidden shadow-custom hover:shadow-3xl transition-shadow duration-500 bg-white rounded-lg">
          <div className="relative group">
            <img
              src={fruit.img}
              alt={`${fruit.name} from ${fruit.province}`}
              className="w-full h-64 object-cover border-b-2 border-accent group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/11/29/13/20/fruit-1869189_1280.png')}
            />
            <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-base font-roboto">
              {t('fruitCard.discoverStory', { name: fruit.name, defaultValue: `Discover the story of ${fruit.name}` })}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-3">
            <h3 className="text-xl font-roboto font-bold text-primary">{fruit.name}</h3>
            <p className="text-muted text-base font-roboto font-medium">{fruit.province}</p>
            <p className="text-text text-sm font-roboto line-clamp-3">{fruit[currentLang]}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary/20 text-primary px-2 py-1 rounded-lg text-sm font-roboto font-medium animate__animated animate__pop-in">
                {fruit.region.charAt(0).toUpperCase() + fruit.region.slice(1)}
              </span>
              <span className="bg-secondary/20 text-primary px-2 py-1 rounded-lg text-sm font-roboto font-medium animate__animated animate__pop-in animate__delay-1s">
                {getSeason(fruit.name)}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-roboto font-medium rounded-lg text-base"
                onClick={() => setIsModalOpen(true)}
                aria-label={t('fruitCard.discoverMore', { name: fruit.name, defaultValue: `Learn more about ${fruit.name}` })}
              >
                {t('fruitCard.discoverMoreButton', { defaultValue: 'Discover More' })}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent/10 font-roboto font-medium rounded-lg text-base"
                onClick={handleShare}
                aria-label={t('fruitCard.share', { name: fruit.name, defaultValue: `Share ${fruit.name}` })}
              >
                {t('fruitCard.shareButton', { defaultValue: 'Share' })}
              </Button>
            </div>
          </div>
        </Card>
      </Tilt>
      <FruitModal fruit={fruit} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FruitCard;