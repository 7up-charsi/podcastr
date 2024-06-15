'use client';

import { usePlayerCtx } from '@/hooks';
import { Button } from '@typeweave/react';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { createPortal } from 'react-dom';

const displayName = 'Player';

export const Player = () => {
  const { audio } = usePlayerCtx();

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [isMuted, setIsMuted] = React.useState(false);

  if (!audio) return;

  const content = (
    <div className="fixed bottom-0 left-0 isolate z-50 flex h-20 w-full items-center gap-3 bg-muted-4/70 px-10 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square w-12 overflow-hidden rounded">
          <Image
            src={audio.imageUrl}
            alt="currently playing podcast image"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-52 space-y-2">
          <div className="truncate text-sm font-medium">
            {audio.title}
          </div>
          <div className="truncate text-xs">{audio.author}</div>
        </div>
      </div>
      <div className="h-full grow bg-muted-9">
        <audio
          ref={audioRef}
          src={audio.audioUrl}
          className="hidden"
        ></audio>
      </div>

      <Button
        aria-label="toggle mute"
        isIconOnly
        onPress={() => {
          if (!audioRef.current) return;

          setIsMuted((prev) => !prev);
          audioRef.current.muted = !audioRef.current?.muted;
        }}
      >
        {isMuted ? <VolumeXIcon /> : <Volume2Icon />}
      </Button>
    </div>
  );

  return (
    <>
      {createPortal(content, globalThis.document?.body)}

      {/* h-20 div is only to add padding so content does not hide beneath it */}
      <div className="h-20" />
    </>
  );
};

Player.displayName = displayName;
