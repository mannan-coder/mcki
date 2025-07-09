import React from 'react';
import { getCoinLogoById } from '@/utils/coinLogos';

export const getArbitragePageColumns = () => [
  { 
    key: 'coin', 
    header: 'Coin', 
    sortable: true,
    render: (value: string, row: any) => {
      const coinSymbol = row.coin.toLowerCase();
      const coinLogo = getCoinLogoById(coinSymbol);
      return React.createElement('div', {
        className: "flex items-center space-x-3"
      }, [
        React.createElement('img', {
          key: 'img',
          src: coinLogo,
          alt: row.coin,
          className: "w-8 h-8 rounded-full",
          onError: (e: any) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }
        }),
        React.createElement('div', { key: 'text' }, [
          React.createElement('div', {
            key: 'coin',
            className: "font-semibold text-foreground"
          }, row.coin),
          React.createElement('div', {
            key: 'pair',
            className: "text-sm text-muted-foreground"
          }, row.pair)
        ])
      ]);
    }
  },
  { key: 'buyExchange', header: 'Buy Exchange', sortable: true },
  { key: 'sellExchange', header: 'Sell Exchange', sortable: true },
  { key: 'buyPrice', header: 'Buy Price', sortable: true },
  { key: 'sellPrice', header: 'Sell Price', sortable: true },
  { key: 'spread', header: 'Spread', sortable: true },
  { key: 'profit', header: 'Est. Profit', sortable: true },
  { key: 'volume', header: '24h Volume', sortable: true }
];

export const getExchangeColumns = () => [
  { key: 'name', header: 'Exchange', sortable: true },
  { key: 'volume', header: '24h Volume', sortable: true },
  { key: 'spread', header: 'Avg Spread', sortable: true },
  { key: 'status', header: 'Status', sortable: false }
];