import { motion } from 'framer-motion';

interface ExchangeStatusCardProps {
  exchange: {
    name: string;
    volume: string;
    spread: string;
    status: string;
  };
  index: number;
}

export const ExchangeStatusCard = ({ exchange, index }: ExchangeStatusCardProps) => {
  return (
    <motion.div
      className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div>
        <div className="font-medium text-foreground">{exchange.name}</div>
        <div className="text-sm text-muted-foreground">{exchange.volume}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-foreground">{exchange.spread}</div>
        <div className="text-xs">
          <span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs">
            {exchange.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
};