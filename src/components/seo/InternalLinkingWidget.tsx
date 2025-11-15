import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
}

interface InternalLinkingWidgetProps {
  title?: string;
  links: RelatedLink[];
}

/**
 * InternalLinkingWidget - Improves SEO by adding contextual internal links
 * Helps search engines discover and index pages while improving user navigation
 */
export const InternalLinkingWidget = ({ 
  title = "Related Resources", 
  links 
}: InternalLinkingWidgetProps) => {
  return (
    <Card className="p-6 bg-muted/30 border-border/40">
      <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="block p-4 bg-card hover:bg-accent/50 rounded-lg transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                  {link.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {link.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};
