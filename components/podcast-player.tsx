'use client';

import { useAudio } from '@/providers';
import React from 'react';
import { createPortal } from 'react-dom';

const displayName = 'PodcastPlayer';

export const PodcastPlayer = () => {
  const { audio } = useAudio();

  const content = (
    <div className="fixed bottom-0 left-0 z-50 h-20 w-full bg-muted-4/70 backdrop-blur-sm"></div>
  );

  return (
    <>
      {audio && createPortal(content, globalThis.document?.body)}

      {/* h-20 div is only to add padding so content does not hide beneath it */}
      {audio && <div className="h-20" />}
    </>
  );
};

PodcastPlayer.displayName = displayName;
