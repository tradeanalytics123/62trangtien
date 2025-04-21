import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    localStorage.setItem('subscriber', data.email);
    form.reset();
    alert(t('footer.success', { defaultValue: 'Thank you for subscribing!' }));
  };

  return (
    <footer
      className="relative bg-gradient-to-t from-secondary/60 to-background text-text py-20"
      role="contentinfo"
      aria-label={t('footer.title', { defaultValue: 'Footer' })}
    >
      <div
        className="absolute inset-0 opacity-10 bg-[url('/assets/textures/leaf.png')] bg-repeat animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 z-10">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-roboto font-bold text-primary mb-6">
            {t('footer.aboutTitle')}
          </h3>
          <p className="text-base font-roboto text-muted leading-relaxed mb-6">
            {t('footer.aboutDescription')}
          </p>
          <img
            src="/images/DMSLogo.png"
            alt="DMS Logo"
            className="h-10 mt-6 mx-auto md:mx-0 filter opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-roboto font-bold text-primary mb-6">
            {t('footer.exploreTitle')}
          </h3>
          <ul className="space-y-3" role="list" aria-label={t('footer.sitemap', { defaultValue: 'Sitemap' })}>
            {['Home', 'Fruit Gallery', 'How to Explore', 'Subscribe', 'Contact'].map((item) => (
              <li key={item} role="listitem">
                <a
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-base font-roboto text-text hover:text-accent transition"
                  aria-label={t(`footer.nav.${item.toLowerCase().replace(' ', '')}`, { defaultValue: `Go to ${item} section` })}
                >
                  {t(`footer.nav.${item.toLowerCase().replace(' ', '')}`, { defaultValue: item })}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-roboto font-bold text-primary mb-6">
            {t('footer.connectTitle')}
          </h3>
          <p className="text-base font-roboto text-muted leading-relaxed mb-6">
            {t('footer.connectDescription')}
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('footer.emailPlaceholder')}
                        {...field}
                        className="w-full sm:w-60 text-base font-roboto py-6 bg-white/10 text-text border-accent/50 focus:border-accent rounded-lg"
                        aria-label={t('footer.emailPlaceholder')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="text-base font-roboto font-medium bg-primary hover:bg-primary/90 text-white rounded-lg"
                aria-label={t('footer.subscribe')}
              >
                {t('footer.subscribe')}
              </Button>
            </form>
          </Form>
          <div className="flex justify-center md:justify-start gap-6 mt-8">
            {[
              { href: 'https://facebook.com', icon: 'fab fa-facebook-f', label: 'Facebook' },
              { href: 'https://youtube.com', icon: 'fab fa-youtube', label: 'YouTube' },
              { href: 'https://tiktok.com', icon: 'fab fa-tiktok', label: 'TikTok' },
            ].map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-text hover:text-accent transition"
                aria-label={t('footer.social', { platform: label, defaultValue: `Follow us on ${label}` })}
              >
                <i className={icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-muted/20 mt-12 pt-6 text-center text-muted text-base font-roboto">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;