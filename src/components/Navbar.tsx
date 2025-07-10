
import { useState } from 'react';
import { Menu, X, Sun, MoonIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { name: 'News', href: '/news' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Tools', href: '/tools' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 bg-background/95 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg transition-colors shadow-sm ${isDarkMode ? 'bg-gray-800/60 border border-gray-700/50' : 'bg-white/90 border border-gray-200/50'}`}>
              <img 
                src="/src/assets/mcki-crypto-logo.png" 
                alt="MCKI Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  // Fallback to letter if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center hidden">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
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
