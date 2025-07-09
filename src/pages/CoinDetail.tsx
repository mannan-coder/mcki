import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useCoinDetails } from '@/hooks/useCoinDetails';
import { CoinHeader } from '@/components/coin-detail/CoinHeader';
import { CoinStats } from '@/components/coin-detail/CoinStats';
import { CoinDescription } from '@/components/coin-detail/CoinDescription';
import { TradingViewChart } from '@/components/coin-detail/TradingViewChart';
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
      <div className="min-h-screen bg-background">
        {/* Navigation Bar */}
        <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/market">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-muted/50">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Market
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={loading}
                  className="flex items-center gap-2 hover:bg-muted/50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Badge variant="outline" className="flex items-center gap-1 bg-success/10 text-success border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Live Data
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <CoinHeader coin={coin || { id: '', symbol: '', name: '', currentPrice: 0, priceChangePercentage24h: 0, priceChange24h: 0 }} loading={loading} />
            </div>

            {/* Stats Section */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <CoinStats coin={coin || { marketCap: 0, totalVolume: 0 }} loading={loading} />
            </div>

            {/* Chart Section */}
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <TradingViewChart coin={coin || { id: '', name: '', symbol: '', currentPrice: 0, priceChangePercentage24h: 0 }} loading={loading} />
            </div>

            {/* Trading Signals Section */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <CoinSignals coin={coin || { name: '', symbol: '', priceChangePercentage24h: 0, totalVolume: 0, marketCap: 0 }} loading={loading} />
            </div>

            {/* Description Section */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <CoinDescription coin={coin || { name: '' }} loading={loading} />
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-primary" />
                      Quick Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <a 
                      href={`https://coinmarketcap.com/currencies/${id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <span className="font-medium">CoinMarketCap</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                    <a 
                      href={`https://www.coingecko.com/en/coins/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <span className="font-medium">CoinGecko</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </a>
                    <a 
                      href={`https://coinbase.com/price/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <span className="font-medium">Coinbase</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
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
                <Card className="border-warning/20 bg-warning/5 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2 text-warning">
                      <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center">
                        <span className="text-warning text-sm">!</span>
                      </div>
                      Risk Disclaimer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-3">
                    <p>
                      Cryptocurrency investments are highly volatile and carry significant risk. 
                      Past performance does not guarantee future results.
                    </p>
                    <p>
                      Always conduct your own research and consider consulting with a financial 
                      advisor before making investment decisions.
                    </p>
                    <p className="font-medium text-warning">
                      This information is for educational purposes only and should not be 
                      considered financial advice.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoinDetail;