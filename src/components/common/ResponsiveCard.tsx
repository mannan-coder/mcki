import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const ResponsiveCard = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  hover = true
}: ResponsiveCardProps) => {
  const baseClasses = "rounded-lg border transition-all duration-200";
  
  const variants = {
    default: "bg-card border-border shadow-sm",
    outline: "border-border/50 bg-card/50 backdrop-blur-sm",
    ghost: "border-transparent bg-transparent"
  };
  
  const sizes = {
    sm: "p-3",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8"
  };
  
  const hoverClasses = hover ? "hover:shadow-md hover:border-border" : "";
  
  return (
    <div className={cn(
      baseClasses,
      variants[variant],
      sizes[size],
      hoverClasses,
      className
    )}>
      {children}
    </div>
  );
};