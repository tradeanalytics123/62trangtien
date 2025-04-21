import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/utils';

interface Language {
  code: 'vn' | 'en' | 'cn';
  label: string;
}

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { currentLang, switchLanguage } = useLanguage();

  const languages: Language[] = [
    { code: 'vn', label: t('navbar.languages.vn', { defaultValue: 'Tiếng Việt' }) },
    { code: 'en', label: t('navbar.languages.en', { defaultValue: 'English' }) },
    { code: 'cn', label: t('navbar.languages.cn', { defaultValue: '中文' }) },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-text border-accent/50 hover:bg-accent/10 rounded-lg text-base font-roboto font-medium"
        >
          {languages.find((lang) => lang.code === currentLang)?.label || t('navbar.language', { defaultValue: 'Ngôn ngữ' })}
          <i className="fas fa-globe text-base"></i>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/95 rounded-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="cursor-pointer hover:bg-accent/10 font-roboto text-base"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;