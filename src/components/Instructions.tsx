import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Instructions: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: t('instructions.step1.title', { defaultValue: 'Khám phá Bộ sưu tập trái cây' }),
      description: t('instructions.step1.description', {
        defaultValue: 'Duyệt qua bộ sưu tập đa dạng của chúng tôi với 34 loại trái cây biểu tượng từ khắp Việt Nam. Sử dụng các bộ lọc để khám phá theo vùng hoặc tìm kiếm trái cây yêu thích của bạn.',
      }),
      image: '/images/lychee.png',
    },
    {
      title: t('instructions.step2.title', { defaultValue: 'Tìm hiểu về từng loại trái cây' }),
      description: t('instructions.step2.description', {
        defaultValue: 'Nhấp vào thẻ trái cây để mở modal chi tiết, khám phá câu chuyện, nguồn gốc, và giá trị văn hóa của từng loại trái cây qua hình ảnh và mô tả sống động.',
      }),
      image: '/images/custard-apple.png',
    },
    {
      title: t('instructions.step3.title', { defaultValue: 'Tham gia Cộng đồng của chúng tôi' }),
      description: t('instructions.step3.description', {
        defaultValue: 'Đăng ký nhận bản tin để nhận các câu chuyện trái cây độc quyền, cập nhật sự kiện, và lời mời tham quan vườn cây ảo. Chia sẻ hành trình của bạn trên mạng xã hội!',
      }),
      image: '/images/coconut.png',
    },
  ];

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-background to-secondary/20"
      role="region"
      aria-label={t('instructions.title', { defaultValue: 'How to Explore the Fruit Showroom' })}
    >
      <div
        className="absolute inset-0 opacity-10 bg-[url('/assets/textures/leaf.png')] bg-repeat animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 z-10">
        <h2 className="text-4xl font-roboto font-bold text-primary text-center mb-6 animate__animated animate__fadeIn">
          {t('instructions.title', { defaultValue: 'Khám phá Phòng trưng bày Trái cây' })}
        </h2>
        <p className="text-lg font-roboto text-muted text-center max-w-2xl mx-auto mb-10 animate__animated animate__fadeIn animate__delay-1s">
          {t('instructions.description', {
            defaultValue: 'Hãy bắt đầu hành trình của bạn qua thế giới trái cây Việt Nam với hướng dẫn từng bước dễ dàng này.',
          })}
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Card className="bg-white/95 p-6 shadow-custom rounded-lg animate__animated animate__fadeIn">
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].title}
              className="w-full h-64 object-cover rounded-lg mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-roboto font-bold text-primary mb-3">{steps[currentStep].title}</h3>
            <p className="text-base font-roboto text-muted mb-4">{steps[currentStep].description}</p>
            <Button
              asChild
              size="lg"
              className="text-base font-roboto font-medium bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              <a
                href={currentStep === 0 ? '#fruit-gallery' : currentStep === 1 ? '#fruit-gallery' : '#subscribe'}
                aria-label={steps[currentStep].title}
              >
                {t('instructions.explore', { defaultValue: 'Khám phá ngay' })}
              </a>
            </Button>
          </Card>
          <div className="flex justify-between mt-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              aria-label={t('instructions.prevStep', { defaultValue: 'Previous step' })}
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              aria-label={t('instructions.nextStep', { defaultValue: 'Next step' })}
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </Button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentStep === index ? 'bg-primary' : 'bg-muted/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructions;