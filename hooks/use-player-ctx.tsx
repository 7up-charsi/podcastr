import { PlayerContext } from '@/providers';
import React from 'react';

export const usePlayerCtx = () => {
  const context = React.useContext(PlayerContext);

  if (!context)
    throw new Error('usePlayerCtx must be used within an PlayerCtx');

  return context;
};
