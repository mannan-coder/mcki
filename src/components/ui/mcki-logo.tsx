import { cn } from '@/lib/utils';

interface MCKILogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MCKILogo = ({ size = 'md', className }: MCKILogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={cn(
      "relative rounded-xl bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105",
      sizeClasses[size],
      className
    )}>
      {/* Geometric background pattern */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-300/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-yellow-600/20 to-transparent"></div>
      </div>
      
      {/* ML Text */}
      <div className={cn(
        "relative z-10 font-black tracking-tight select-none",
        textSizeClasses[size]
      )}>
        <span className="text-gray-900 drop-shadow-sm">ML</span>
      </div>
      
      {/* Subtle border effect */}
      <div className="absolute inset-0 rounded-xl border border-orange-200/50 shadow-inner"></div>
    </div>
  );
};