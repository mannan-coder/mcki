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
      "relative rounded-lg bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 border border-orange-300/50",
      sizeClasses[size],
      className
    )}>
      {/* Corner accent - top right */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-slate-800"></div>
      
      {/* ML Text with better styling to match reference */}
      <div className={cn(
        "relative z-10 font-black tracking-tight select-none transform",
        textSizeClasses[size]
      )}>
        <span className="text-slate-800 drop-shadow-sm">ML</span>
      </div>
      
      {/* Subtle lighting effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none"></div>
    </div>
  );
};