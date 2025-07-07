import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CountryData {
  country: string;
  visitors: number;
  percentage: number;
  flag: string;
}

interface GeographicDataProps {
  countries: CountryData[];
}

const GeographicData = ({ countries }: GeographicDataProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Geographic Distribution</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {countries.map((country, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{country.flag}</span>
                <span className="font-medium text-sm">{country.country}</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{formatNumber(country.visitors)}</div>
                <div className="text-xs text-muted-foreground">{country.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicData;