import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Fruit } from '@/lib/types';
import { useLanguage } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface FruitModalProps {
  fruit: Fruit;
  isOpen: boolean;
  onClose: () => void;
}

const FruitModal: React.FC<FruitModalProps> = ({ fruit, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-roboto font-bold text-primary">{fruit.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img
            src={fruit.img}
            alt={fruit.name}
            className="w-full h-64 object-cover rounded-lg"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/11/29/13/20/fruit-1869189_1280.png')}
          />
          <p className="text-text text-base font-roboto mt-4">{fruit[currentLang]}</p>
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-muted font-roboto"><strong>{t('fruitModal.province', { defaultValue: 'Province' })}:</strong> {fruit.province}</p>
            <p className="text-muted font-roboto"><strong>{t('fruitModal.region', { defaultValue: 'Region' })}:</strong> {fruit.region}</p>
            {fruit.link && (
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 font-roboto">
                <a href={fruit.link} target="_blank" rel="noopener noreferrer">
                  {t('fruitModal.learnMore', { defaultValue: 'Learn More' })}
                </a>
              </Button>
            )}
            {fruit.video && (
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 font-roboto">
                <a href={fruit.video} target="_blank" rel="noopener noreferrer">
                  {t('fruitModal.watchVideo', { defaultValue: 'Watch Video' })}
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FruitModal;