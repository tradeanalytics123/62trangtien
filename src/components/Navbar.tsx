import { useState } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { Search, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { href: '#hero', label: t('navbar.home') },
    { href: '#fruit-gallery', label: t('navbar.fruitGallery') },
    { href: '#instructions', label: t('navbar.howToExplore') },
    { href: '#subscribe', label: t('navbar.subscribe') },
    { href: '#contact', label: t('navbar.contact') },
  ];

  const languages = [
    { code: 'vn', label: t('navbar.languages.vn', { defaultValue: 'Tiếng Việt' }) },
    { code: 'en', label: t('navbar.languages.en', { defaultValue: 'English' }) },
    { code: 'cn', label: t('navbar.languages.cn', { defaultValue: '中文' }) },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: 'fab fa-facebook-f', label: t('navbar.social.facebook', { defaultValue: 'Facebook' }) },
    { href: 'https://youtube.com', icon: 'fab fa-youtube', label: t('navbar.social.youtube', { defaultValue: 'YouTube' }) },
    { href: 'https://tiktok.com', icon: 'fab fa-tiktok', label: t('navbar.social.tiktok', { defaultValue: 'TikTok' }) },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `#fruit-gallery?search=${encodeURIComponent(searchQuery)}`;
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-background to-secondary/60 backdrop-blur-md shadow-custom">
      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        <div className="flex items-center gap-4">
          <img
            src="/images/DMSLogo.png"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-roboto font-bold text-primary">
            {t('navbar.title')}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-text font-roboto font-medium text-base hover:text-accent hover:border-b-2 border-accent transition py-2"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={t('navbar.searchPlaceholder', { defaultValue: 'Tìm kiếm trái cây...' })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 bg-white/10 text-text border-accent/50 focus:border-accent rounded-lg text-base font-roboto"
            />
            <Button type="submit" variant="ghost" size="icon" aria-label={t('navbar.search', { defaultValue: 'Search' })}>
              <Search className="h-5 w-5 text-accent" />
            </Button>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-text border-accent/50 hover:bg-accent/10 rounded-lg text-base font-roboto font-medium"
              >
                {languages.find((lang) => lang.code === i18n.language)?.label || t('navbar.language', { defaultValue: 'Ngôn ngữ' })}
                <i className="fas fa-globe text-base"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white/95 rounded-lg">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className="cursor-pointer hover:bg-accent/10 font-roboto text-base"
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-3">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-accent transition"
                aria-label={t('navbar.socialLink', { platform: label, defaultValue: `Follow us on ${label}` })}
              >
                <i className={`${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          className="md:hidden text-text text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('navbar.toggleMenu', { defaultValue: 'Toggle navigation menu' })}
        >
          {isOpen ? <X /> : <Menu />}
          <span className="sr-only">{t('navbar.toggleMenu', { defaultValue: 'Toggle navigation menu' })}</span>
        </Button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-background to-secondary/60 px-6 py-6 rounded-b-lg shadow-custom animate__animated animate__slideInDown">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className="block py-2 text-text font-roboto font-medium text-base hover:text-accent transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <form onSubmit={handleSearch} className="flex items-center gap-2 mt-4">
            <Input
              type="text"
              placeholder={t('navbar.searchPlaceholder', { defaultValue: 'Tìm kiếm trái cây...' })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 text-text border-accent/50 focus:border-accent rounded-lg text-base font-roboto"
            />
            <Button type="submit" variant="ghost" size="icon" aria-label={t('navbar.search', { defaultValue: 'Search' })}>
              <Search className="h-5 w-5 text-accent" />
            </Button>
          </form>
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 text-text border-accent/50 hover:bg-accent/10 rounded-lg text-base font-roboto font-medium"
                >
                  {languages.find((lang) => lang.code === i18n.language)?.label || t('navbar.language', { defaultValue: 'Ngôn ngữ' })}
                  <i className="fas fa-globe"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 rounded-lg">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className="cursor-pointer hover:bg-accent/10 font-roboto text-base"
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-accent transition"
                aria-label={t('navbar.socialLink', { platform: label, defaultValue: `Follow us on ${label}` })}
              >
                <i className={`${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;