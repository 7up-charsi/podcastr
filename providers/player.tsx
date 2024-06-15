'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export interface PlayerAudio {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  _id: string;
}

interface PlayerCtxProps {
  audio: PlayerAudio | undefined;
  setAudio: React.Dispatch<
    React.SetStateAction<PlayerAudio | undefined>
  >;
}

export const PlayerContext = React.createContext<
  PlayerCtxProps | undefined
>(undefined);

interface PlayerProviderProps {
  children?: React.ReactNode;
}

export const PlayerProvider = (props: PlayerProviderProps) => {
  const { children } = props;

  const [audio, setAudio] = React.useState<PlayerAudio | undefined>();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === '/create-podcast') setAudio(undefined);
  }, [pathname]);

  return (
    <PlayerContext.Provider value={{ audio, setAudio }}>
      {children}
    </PlayerContext.Provider>
  );
};
