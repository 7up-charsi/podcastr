import { Loader2 } from 'lucide-react';
import React from 'react';

interface CustomLoaderProps {
  size?: number;
  className?: string;
}

const displayName = 'CustomLoader';

export const CustomLoader = (props: CustomLoaderProps) => {
  const { size, className } = props;

  return (
    <Loader2 className={`animate-spin ${className}`} size={size} />
  );
};

CustomLoader.displayName = displayName;
