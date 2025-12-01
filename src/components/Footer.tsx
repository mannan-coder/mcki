
import { Link } from 'react-router-dom';
import { 
  Twitter, 
  MessageCircle, 
  Send, 
  Github, 
  Mail, 
  Shield, 
  FileText, 
  Info,
  Building2,
  Users,
  Briefcase,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer = ({ isDarkMode }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: {
      title: 'Platform',
      links: [
        { name: 'Dashboard', href: '/', icon: Building2 },
        { name: 'Arbitrage Scanner', href: '/arbitrage', icon: Briefcase },
        { name: 'Market Analysis', href: '/market', icon: FileText },
        { name: 'Analytics', href: '/analytics', icon: Info },
        { name: 'News', href: '/news', icon: BookOpen },
        { name: 'Tools', href: '/tools', icon: Briefcase },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', icon: Users },
        { name: 'Contact', href: '/contact', icon: Mail },
        { name: 'Blog', href: '/blog', icon: BookOpen },
        // Removed careers link as requested
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy', icon: Shield },
        { name: 'Terms of Service', href: '/terms', icon: FileText },
        { name: 'Cookie Policy', href: '/cookies', icon: FileText },
        { name: 'Disclaimer', href: '/disclaimer', icon: Info },
      ]
    }
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/mcki_crypto', icon: Twitter },
    { name: 'Discord', href: 'https://discord.gg/mcki', icon: MessageCircle },
    { name: 'Telegram', href: 'https://t.me/mcki_official', icon: Send },
    { name: 'GitHub', href: 'https://github.com/mcki-platform', icon: Github },
  ];

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <img 
                src="/lovable-uploads/620785b2-17ba-4248-823a-88525d9470d2.png"
                alt="MCKI Logo" 
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                style={{
                  imageRendering: 'crisp-edges',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              />
              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">MCKI</h3>
                <p className="text-sm text-muted-foreground">Crypto Intelligence Platform</p>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Advanced cryptocurrency arbitrage intelligence powered by AI. Real-time market analysis, 
              profitable trading opportunities, and comprehensive tools for multi-chain operations.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <link.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} MCKI Platform. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-muted-foreground">Built with</span>
            <div className="flex items-center space-x-1">
              <span className="text-red-500">♥</span>
              <span className="text-muted-foreground">for crypto traders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
