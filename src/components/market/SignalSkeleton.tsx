import React, { memo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const SignalSkeleton = memo(() => (
  <Card className="bg-muted/20">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-muted rounded animate-pulse" />
        <div className="w-20 h-4 bg-muted rounded animate-pulse" />
        <div className="w-8 h-5 bg-muted rounded-full animate-pulse ml-auto" />
      </div>
    </CardHeader>
    <CardContent className="pt-0 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-muted rounded-full animate-pulse" />
            <div className="w-12 h-4 bg-muted rounded animate-pulse" />
          </div>
          <div className="w-12 h-4 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </CardContent>
  </Card>
));