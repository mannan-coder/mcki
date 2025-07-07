import { Monitor, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DeviceData {
  device: string;
  users: number;
  percentage: number;
}

interface DeviceBreakdownProps {
  devices: DeviceData[];
}

const DeviceBreakdown = ({ devices }: DeviceBreakdownProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop':
        return <Monitor className="h-4 w-4 text-muted-foreground" />;
      case 'Mobile':
        return <Smartphone className="h-4 w-4 text-muted-foreground" />;
      case 'Tablet':
        return <Monitor className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Monitor className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Monitor className="h-5 w-5" />
          <span>Device Breakdown</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getDeviceIcon(device.device)}
                <span className="font-medium text-sm">{device.device}</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{formatNumber(device.users)}</div>
                <div className="text-xs text-muted-foreground">{device.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceBreakdown;