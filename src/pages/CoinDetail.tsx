import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useCoinDetails } from '@/hooks/useCoinDetails';
import { CoinHeader } from '@/components/coin-detail/CoinHeader';
import { CoinStats } from '@/components/coin-detail/CoinStats';
import { CoinDescription } from '@/components/coin-detail/CoinDescription';
import { EnhancedCoinChart } from '@/components/coin-detail/EnhancedCoinChart';
import { CoinSignals } from '@/components/coin-detail/CoinSignals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: coin, loading, error, refetch } = useCoinDetails(id || '');

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Coin Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The cryptocurrency you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link to="/market">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Market
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/market">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Market
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="outline" className="flex items-center gap-1">
              🔴 Live Data
            </Badge>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Header */}
          <CoinHeader coin={coin || { id: '', symbol: '', name: '', currentPrice: 0, priceChangePercentage24h: 0, priceChange24h: 0 }} loading={loading} />

          {/* Stats */}
          <CoinStats coin={coin || { marketCap: 0, totalVolume: 0 }} loading={loading} />

          {/* Trading Signals */}
          <CoinSignals coin={coin || { name: '', symbol: '', priceChangePercentage24h: 0, totalVolume: 0, marketCap: 0 }} loading={loading} />

          {/* Price Chart */}
          <EnhancedCoinChart coin={coin || { id: '', name: '', symbol: '', currentPrice: 0, priceChangePercentage24h: 0 }} loading={loading} />

          {/* Description */}
          <CoinDescription coin={coin || { name: '' }} loading={loading} />

          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🔗 Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a 
                    href={`https://coinmarketcap.com/currencies/${id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">CoinMarketCap</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                  <a 
                    href={`https://www.coingecko.com/en/coins/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">CoinGecko</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                  <a 
                    href={`https://coinbase.com/price/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium">Coinbase</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Risk Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-yellow-500/20 bg-yellow-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    ⚠️ Risk Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Cryptocurrency investments are highly volatile and carry significant risk. 
                    Past performance does not guarantee future results.
                  </p>
                  <p>
                    Always conduct your own research and consider consulting with a financial 
                    advisor before making investment decisions.
                  </p>
                  <p className="font-medium text-foreground">
                    This information is for educational purposes only and should not be 
                    considered financial advice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoinDetail;