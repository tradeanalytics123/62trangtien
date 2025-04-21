import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Fruit } from '@/lib/types';
import { useLanguage } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface FruitModalProps {
  fruit: Fruit | null;
  isOpen: boolean;
  onClose: () => void;
}

const FruitModal: React.FC<FruitModalProps> = ({ fruit, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  if (!fruit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl text-primary">{fruit.name}</DialogTitle>
          <DialogClose className="absolute right-6 top-6 text-text hover:text-primary text-2xl" aria-label={t('fruitModal.close', { defaultValue: 'Close modal' })} />
        </DialogHeader>
        <img
          src={fruit.img}
          alt={`${fruit.name} from ${fruit.province}`}
          className="w-full h-80 object-cover rounded-lg mb-6"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = 'https://cdn.pixabay.com/photo/2016/11/29/13/20/fruit-1869189_1280.png')}
        />
        <p className="text-muted text-lg"><strong>{t('fruitModal.province', { defaultValue: 'Province' })}:</strong> {fruit.province}</p>
        <p className="text-text text-base mt-4">{fruit[currentLang]}</p>
        <div className="flex gap-4 mt-6">
          {fruit.link && (
            <Button asChild size="lg">
              <a href={fruit.link} target="_blank" rel="noopener noreferrer" aria-label={t('fruitModal.learnMore', { name: fruit.name, defaultValue: `Learn more about ${fruit.name}` })}>
                {t('fruitModal.learnMoreButton', { defaultValue: 'Learn More' })}
              </a>
            </Button>
          )}
          {fruit.video && (
            <Button asChild variant="outline" size="lg">
              <a href={fruit.video} target="_blank" rel="noopener noreferrer" aria-label={t('fruitModal.watchVideo', { name: fruit.name, defaultValue: `Watch video about ${fruit.name}` })}>
                {t('fruitModal.watchVideoButton', { defaultValue: 'Watch Video' })}
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FruitModal;