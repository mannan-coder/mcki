
import { Link } from 'react-router-dom';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer = ({ isDarkMode }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '/' },
      { name: 'Arbitrage Scanner', href: '#arbitrage' },
      { name: 'Market Analysis', href: '#market' },
      { name: 'Calculators', href: '#tools' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
    social: [
      { name: 'Twitter', href: 'https://twitter.com/mcki' },
      { name: 'Discord', href: 'https://discord.gg/mcki' },
      { name: 'Telegram', href: 'https://t.me/mcki' },
      { name: 'GitHub', href: 'https://github.com/mcki' },
    ]
  };

  return (
    <footer className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                MCKI
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Multi-Chain Knowledge Intelligence
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
            <Link to="/" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Dashboard
            </Link>
            <Link to="/arbitrage" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Arbitrage
            </Link>
            <Link to="/market" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Market
            </Link>
            <Link to="/analytics" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Analytics
            </Link>
            <Link to="/news" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              News
            </Link>
          </div>

          {/* Social & Legal */}
          <div className="flex flex-wrap items-center justify-center space-x-4 text-sm">
            <a href="https://twitter.com/mcki" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Twitter
            </a>
            <a href="https://discord.gg/mcki" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Discord
            </a>
            <Link to="/privacy" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Privacy
            </Link>
            <Link to="/terms" className={`hover:text-blue-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {currentYear} MCKI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
