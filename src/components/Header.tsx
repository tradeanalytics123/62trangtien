import { Button } from '@/components/ui/button';
import { useDynamicTagline } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { tagline, isFading } = useDynamicTagline();

  return (
    <header
      className="relative bg-[url('/images/VietnamFruits.png')] bg-cover bg-center h-screen flex items-center justify-center text-white overflow-hidden"
      role="banner"
      style={{ backgroundAttachment: 'fixed' }}
    >
      <div
        className="absolute inset-0 bg-[url('/assets/textures/food.png')] bg-repeat opacity-10 animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-background/40 z-10" />
      <div className="container mx-auto px-6 z-20 text-center max-w-2xl">
        <h1 className="text-5xl font-roboto font-bold text-white mb-6 text-shadow-custom animate__animated animate__fadeIn">
          {t('header.title')}
        </h1>
        <p
          id="dynamic-tagline"
          className={`text-lg font-roboto font-medium mb-8 opacity-95 ${
            isFading ? 'animate__animated animate__fadeOut' : 'animate__animated animate__fadeInUp'
          }`}
        >
          {tagline}
        </p>
        <p className="text-base font-roboto italic mb-10 opacity-90">{t('header.organization')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="text-base font-roboto font-medium bg-secondary hover:bg-secondary/90 text-primary rounded-lg"
          >
            <a href="#fruit-gallery" aria-label={t('header.discoverFruits')}>
              {t('header.discoverFruits')}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base font-roboto font-medium border-accent text-accent hover:bg-accent/10 rounded-lg"
          >
            <a href="#subscribe" aria-label={t('header.joinJourney')}>
              {t('header.joinJourney')}
            </a>
          </Button>
        </div>
        <div className="mt-10 bg-white/20 backdrop-blur-md p-6 rounded-lg text-base font-roboto max-w-md mx-auto animate__animated animate__fadeIn animate__delay-1s">
          <em>{t('header.culturalNote')}</em>
        </div>
      </div>
      <div className="absolute bottom-12 w-full text-center text-white/80 text-3xl animate-bounce">
        <i className="fas fa-chevron-down"></i>
        <span className="sr-only">{t('header.scrollDown', { defaultValue: 'Scroll down' })}</span>
      </div>
    </header>
  );
};

export default Header;