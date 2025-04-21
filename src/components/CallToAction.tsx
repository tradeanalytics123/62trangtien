import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: t('callToAction.testimonial1', {
        defaultValue: '“Visiting the fruit gallery felt like traveling through Vietnam’s orchards without leaving my home!” – Linh, Hanoi',
      }),
      image: '/images/lychee.png',
    },
    {
      quote: t('callToAction.testimonial2', {
        defaultValue: '“The flavors and stories of these fruits are a true celebration of Vietnam’s heritage!” – Minh, Ho Chi Minh City',
      }),
      image: '/images/coconut.png',
    },
    {
      quote: t('callToAction.testimonial3', {
        defaultValue: '“An unforgettable experience exploring Vietnam’s fruit treasures!” – Anh, Da Nang',
      }),
      image: '/images/mango.png',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-br from-background to-secondary/30"
      role="region"
      aria-label={t('callToAction.title')}
    >
      <div
        className="absolute inset-0 opacity-10 bg-[url('/assets/textures/food.png')] bg-repeat animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6 z-10">
        <div className="flex-1 max-w-lg text-center md:text-left">
          <h2 className="text-4xl font-roboto font-bold text-primary mb-6 animate__animated animate__fadeIn">
            {t('callToAction.title')}
          </h2>
          <p className="text-lg font-roboto text-muted leading-relaxed mb-8 animate__animated animate__fadeIn animate__delay-1s">
            {t('callToAction.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="text-base font-roboto font-medium bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              <a href="#fruit-gallery" aria-label={t('callToAction.discoverFruits')}>
                {t('callToAction.discoverFruits')}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-roboto font-medium border-accent text-accent hover:bg-accent/10 rounded-lg"
            >
              <a href="#subscribe" aria-label={t('callToAction.joinJourney')}>
                {t('callToAction.joinJourney')}
              </a>
            </Button>
          </div>
        </div>
        <div className="flex-1 text-center">
          <Card className="relative bg-white/95 p-6 shadow-custom rounded-lg animate__animated animate__fadeInUp">
            <img
              src={testimonials[currentTestimonial].image}
              alt="Testimonial fruit"
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-2 border-accent shadow-md animate__animated animate__zoomIn"
            />
            <blockquote className="text-base font-roboto italic text-text mt-14 mb-4">
              {testimonials[currentTestimonial].quote}
            </blockquote>
            <div className="flex justify-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                aria-label={t('callToAction.prevTestimonial', { defaultValue: 'Previous testimonial' })}
              >
                <ChevronLeft className="h-5 w-5 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                aria-label={t('callToAction.nextTestimonial', { defaultValue: 'Next testimonial' })}
              >
                <ChevronRight className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;