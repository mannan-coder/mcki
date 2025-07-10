import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface AboutHeroProps {
  achievements: Array<{
    metric: string;
    label: string;
    icon: any;
  }>;
}

export const AboutHero = ({ achievements }: AboutHeroProps) => {
  return (
    <div className="text-center mb-16">
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About MCKI
      </motion.h1>
      
      <motion.div 
        className="text-xl md:text-2xl font-semibold text-primary mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Monitor Coins. Know Instantly.
      </motion.div>
      
      <motion.p 
        className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Welcome to MCKI, a next-generation crypto intelligence platform designed to empower traders and investors with real-time market insights, arbitrage data, trading signals, and financial tools — all in one place.
      </motion.p>
      
      <motion.p 
        className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        In today's volatile and fast-moving crypto markets, seconds matter. MCKI helps you move with clarity, speed, and confidence by delivering the data you need to act on opportunities the moment they appear.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <achievement.icon className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{achievement.metric}</div>
            <div className="text-sm text-muted-foreground">{achievement.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Badge variant="outline" className="text-primary border-primary px-4 py-2">
          ⚡ Real-Time Data
        </Badge>
        <Badge variant="outline" className="text-success border-success px-4 py-2">
          🎯 Arbitrage Intelligence
        </Badge>
        <Badge variant="outline" className="text-accent border-accent px-4 py-2">
          🌍 Global Exchanges
        </Badge>
      </motion.div>
    </div>
  );
};