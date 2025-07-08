import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MarketHeaderProps {
  isDarkMode: boolean;
  totalMarketCap: string;
}

export const MarketHeader = ({ isDarkMode, totalMarketCap }: MarketHeaderProps) => {
  return (
    <motion.div 
      className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 lg:mb-8 gap-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex-1">
        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Cryptocurrency Prices by Market Cap
        </h2>
        <p className={`text-sm lg:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
          The global cryptocurrency market cap today is{' '}
          <span className="font-semibold text-primary">{totalMarketCap}</span>, a{' '}
          <span className="text-green-500 font-semibold">+2.9% change</span> in the last 24 hours.{' '}
          <Link to="/market" className="text-primary hover:underline">Read more</Link>
        </p>
      </div>
      <div className="flex items-center space-x-2 lg:mt-2">
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Highlights</span>
        <div className="w-10 h-5 bg-green-500 rounded-full relative transition-colors duration-300">
          <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform duration-300"></div>
        </div>
      </div>
    </motion.div>
  );
};