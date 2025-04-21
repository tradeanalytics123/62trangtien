import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

const Subscribe: React.FC = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    localStorage.setItem('subscriber', data.email);
    form.reset();
    alert(t('subscribe.success', { defaultValue: 'Thank you for subscribing!' }));
  };

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-background to-secondary/20"
      role="region"
      aria-label={t('subscribe.title')}
    >
      <div
        className="absolute inset-0 opacity-10 bg-[url('/assets/textures/food.png')] bg-repeat animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 z-10 text-center">
        <h2 className="text-4xl font-roboto font-bold text-primary mb-6 animate__animated animate__fadeIn">
          {t('subscribe.title')}
        </h2>
        <p className="text-lg font-roboto text-muted max-w-2xl mx-auto mb-10 animate__animated animate__fadeIn animate__delay-1s">
          {t('subscribe.description')}
        </p>
        <Card className="max-w-2xl mx-auto bg-white/95 shadow-custom rounded-lg p-6 animate__animated animate__fadeInUp">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('subscribe.emailPlaceholder')}
                        {...field}
                        className="w-full sm:w-80 bg-white/10 text-text border-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/50 rounded-lg text-base font-roboto py-6 transition-all duration-300"
                        aria-label={t('subscribe.emailPlaceholder')}
                      />
                    </FormControl>
                    <FormMessage className="text-accent" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="text-base font-roboto font-medium bg-primary hover:bg-primary/90 text-white rounded-lg animate__animated animate__pulse animate__infinite"
                aria-label={t('subscribe.joinNow')}
              >
                {t('subscribe.joinNow')}
              </Button>
            </form>
          </Form>
          <Card className="mt-6 bg-secondary/30 p-4 rounded-lg text-base font-roboto text-muted italic">
            <p>{t('subscribe.culturalNote')}</p>
          </Card>
        </Card>
      </div>
    </section>
  );
};

export default Subscribe;