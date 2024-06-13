'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  _id: string;
}

interface AudioContextProps {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<
    React.SetStateAction<AudioProps | undefined>
  >;
}

const AudioContext = React.createContext<
  AudioContextProps | undefined
>(undefined);

interface AudioProviderProps {
  children: React.ReactNode;
}

const AudioProvider = (props: AudioProviderProps) => {
  const { children } = props;

  const [audio, setAudio] = React.useState<AudioProps | undefined>();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === '/create-podcast') setAudio(undefined);
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = React.useContext(AudioContext);

  if (!context)
    throw new Error('useAudio must be used within an AudioProvider');

  return context;
};

export default AudioProvider;
