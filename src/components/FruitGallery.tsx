import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fruits } from '@/data/fruits';
import FruitCard from '@/components/FruitCard';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 6;

const FruitGallery: React.FC = () => {
  const { t } = useTranslation();
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFact, setCurrentFact] = useState<number>(0);

  const facts = [
    t('fruitGallery.fact1', {
      defaultValue: 'The <strong>Vải Thiều Lục Ngạn</strong> is Vietnam’s “king of lychees,” exported to over 20 countries.',
    }),
    t('fruitGallery.fact2', {
      defaultValue: 'The <strong>Dien Pomelo</strong> graces Tet altars, symbolizing prosperity and joy.',
    }),
    t('fruitGallery.fact3', {
      defaultValue: 'The <strong>Cai Mon Durian</strong> stars in Southern Vietnamese desserts, from sticky rice to cakes.',
    }),
    t('fruitGallery.fact4', {
      defaultValue: 'Over <strong>30 Vietnamese fruits</strong> carry protected geographical indications, a testament to their unique heritage.',
    }),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [facts.length]);

  const filteredFruits = currentFilter === 'all'
    ? fruits
    : fruits.filter((fruit) => fruit.region === currentFilter);

  const totalPages = Math.ceil(filteredFruits.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFruits = filteredFruits.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilter = (filter: string) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-background to-secondary/20"
      role="region"
      aria-label={t('fruitGallery.title')}
    >
      <div
        className="absolute inset-0 opacity-10 bg-[url('/assets/textures/leaf.png')] bg-repeat animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 z-10">
        <h2 className="text-4xl font-roboto font-bold text-primary text-center mb-6 animate__animated animate__fadeIn">
          {t('fruitGallery.title')}
        </h2>
        <p className="text-lg font-roboto text-muted text-center max-w-2xl mx-auto mb-10 animate__animated animate__fadeIn animate__delay-1s">
          {t('fruitGallery.description')}
        </p>
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {[
            { id: 'all', label: t('fruitGallery.allRegions') },
            { id: 'north', label: t('fruitGallery.north') },
            { id: 'central', label: t('fruitGallery.central') },
            { id: 'south', label: t('fruitGallery.south') },
          ].map((filter, index) => (
            <Button
              key={filter.id}
              variant={currentFilter === filter.id ? 'default' : 'outline'}
              className={`rounded-lg px-5 py-2 text-base font-roboto font-medium animate__animated animate__slideInRight animate__delay-${index}s ${
                currentFilter === filter.id ? 'bg-primary text-white' : 'border-accent text-accent hover:bg-accent/10'
              }`}
              onClick={() => handleFilter(filter.id)}
              aria-pressed={currentFilter === filter.id}
              aria-label={t('fruitGallery.filter', { label: filter.label, defaultValue: `Show ${filter.label} fruits` })}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedFruits.map((fruit) => (
            <FruitCard key={fruit.name} fruit={fruit} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mt-10" role="navigation" aria-label={t('fruitGallery.pagination', { defaultValue: 'Fruit gallery pagination' })}>
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent/10 rounded-lg text-base font-roboto font-medium"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={t('fruitGallery.previous', { defaultValue: 'Previous page' })}
          >
            {t('fruitGallery.previous', { defaultValue: 'Previous' })}
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="lg"
                className={`rounded-lg text-base font-roboto font-medium ${
                  currentPage === page ? 'bg-primary text-white' : 'border-accent text-accent hover:bg-accent/10'
                }`}
                onClick={() => handlePageChange(page)}
                aria-label={t('fruitGallery.page', { page, defaultValue: `Go to page ${page}` })}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent/10 rounded-lg text-base font-roboto font-medium"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label={t('fruitGallery.next', { defaultValue: 'Next page' })}
          >
            {t('fruitGallery.next', { defaultValue: 'Next' })}
          </Button>
        </div>
        <Card className="mt-10 p-6 bg-white/95 border-l-4 border-accent shadow-custom text-center animate__animated animate__fadeIn">
          <h3 className="text-xl font-roboto font-bold text-primary mb-3">{t('fruitGallery.culturalSpotlight')}</h3>
          <p
            className="text-text text-base font-roboto"
            dangerouslySetInnerHTML={{ __html: facts[currentFact] }}
          />
        </Card>
        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="text-base font-roboto font-medium bg-secondary hover:bg-secondary/90 text-primary rounded-lg"
          >
            <a href="#subscribe" aria-label={t('fruitGallery.discoverMore')}>
              {t('fruitGallery.discoverMore')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FruitGallery;