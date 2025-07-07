export const timeRanges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'Last year', value: '1y' }
];

export const overviewStats = {
  totalVisitors: 45820,
  pageViews: 128450,
  bounceRate: 42.3,
  avgSessionDuration: '2m 34s',
  conversionRate: 3.2,
  newUsers: 68.5
};

export const trafficData = [
  { date: 'Mon', visitors: 2400, pageviews: 4200, sessions: 1800 },
  { date: 'Tue', visitors: 1398, pageviews: 2800, sessions: 1200 },
  { date: 'Wed', visitors: 9800, pageviews: 15600, sessions: 8200 },
  { date: 'Thu', visitors: 3908, pageviews: 7200, sessions: 3100 },
  { date: 'Fri', visitors: 4800, pageviews: 9600, sessions: 4200 },
  { date: 'Sat', visitors: 3800, pageviews: 6800, sessions: 3200 },
  { date: 'Sun', visitors: 4300, pageviews: 8100, sessions: 3700 }
];

export const topPages = [
  { page: '/', views: 15420, percentage: 23.8, avgTime: '3m 12s' },
  { page: '/market', views: 12350, percentage: 19.1, avgTime: '2m 45s' },
  { page: '/arbitrage', views: 8920, percentage: 13.8, avgTime: '4m 18s' },
  { page: '/news', views: 7650, percentage: 11.8, avgTime: '1m 52s' },
  { page: '/analytics', views: 6280, percentage: 9.7, avgTime: '5m 23s' },
  { page: '/about', views: 4180, percentage: 6.5, avgTime: '1m 38s' }
];

export const trafficSources = [
  { source: 'Organic Search', visitors: 18200, percentage: 39.7, color: 'hsl(var(--primary))' },
  { source: 'Direct', visitors: 12800, percentage: 27.9, color: 'hsl(var(--success))' },
  { source: 'Social Media', visitors: 8900, percentage: 19.4, color: 'hsl(var(--accent))' },
  { source: 'Referral', visitors: 4200, percentage: 9.2, color: 'hsl(var(--secondary))' },
  { source: 'Email', visitors: 1720, percentage: 3.8, color: 'hsl(var(--muted))' }
];

export const deviceData = [
  { device: 'Desktop', users: 24500, percentage: 53.4 },
  { device: 'Mobile', users: 18200, percentage: 39.7 },
  { device: 'Tablet', users: 3120, percentage: 6.9 }
];

export const geographicData = [
  { country: 'United States', visitors: 12800, percentage: 27.9, flag: '🇺🇸' },
  { country: 'United Kingdom', visitors: 8200, percentage: 17.9, flag: '🇬🇧' },
  { country: 'Germany', visitors: 6400, percentage: 14.0, flag: '🇩🇪' },
  { country: 'Japan', visitors: 4100, percentage: 8.9, flag: '🇯🇵' },
  { country: 'Canada', visitors: 3800, percentage: 8.3, flag: '🇨🇦' },
  { country: 'France', visitors: 3200, percentage: 7.0, flag: '🇫🇷' },
  { country: 'Others', visitors: 7320, percentage: 16.0, flag: '🌍' }
];