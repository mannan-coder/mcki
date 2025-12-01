
import { useState } from 'react';
import { Menu, X, Sun, MoonIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// import logoHD from '@/assets/mcki-logo-new.png';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Arbitrage', href: '/arbitrage' },
    { name: 'Market', href: '/market' },
    { name: 'Events', href: '/events' },
    { name: 'News', href: '/news' },
    { name: 'Blog', href: '/blog' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Tools', href: '/tools' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 bg-background/95 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/lovable-uploads/620785b2-17ba-4248-823a-88525d9470d2.png"
              alt="MCKI Logo" 
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
              style={{
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                MCKI
              </h1>
              <p className="text-xs text-muted-foreground">
                Crypto Intelligence Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary text-foreground"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary text-foreground"
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg transition-colors bg-secondary hover:bg-muted text-foreground"
            >
              {isDarkMode ? <Sun size={20} /> : <MoonIcon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors bg-secondary hover:bg-muted text-foreground"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
