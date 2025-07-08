export interface CoinPriceData {
  symbol: string;
  name: string;
  change24h: number;
  prices: { [exchange: string]: number };
  volumes: { [exchange: string]: string };
}

export interface ExchangePrice {
  exchange: string;
  key: string;
  price: number;
  volume: string;
}