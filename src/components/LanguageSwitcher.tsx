import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/utils';

const LanguageSwitcher: React.FC = () => {
  const { currentLang, switchLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'vn', label: 'Vietnamese' },
    { code: 'cn', label: 'Chinese' },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? 'default' : 'outline'}
          className="rounded-full"
          onClick={() => switchLanguage(lang.code)}
          aria-selected={currentLang === lang.code}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;