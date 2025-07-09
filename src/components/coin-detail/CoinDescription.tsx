import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CoinDescriptionProps {
  coin: {
    name: string;
    description?: string;
  };
  loading?: boolean;
}

export const CoinDescription = ({ coin, loading }: CoinDescriptionProps) => {
  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const defaultDescription = `${coin.name} is a cryptocurrency that operates on blockchain technology. 
  It enables decentralized transactions and has gained attention in the digital asset space. 
  The project aims to provide innovative solutions in the cryptocurrency ecosystem with a focus on 
  security, scalability, and user adoption. As with all cryptocurrencies, investments carry risk 
  and potential rewards in the volatile digital asset market.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-8 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📖 About {coin.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            {coin.description || defaultDescription}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};