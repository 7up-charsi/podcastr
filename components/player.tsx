'use client';

import { usePlayerCtx } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { createPortal } from 'react-dom';
import { PlayerVolumn } from './player-volumn';
import { PlayerControls } from './player-controls';
import { PlayerTime } from './player-time';
import { PlayerProgress } from './player-progress';

const displayName = 'Player';

export const Player = () => {
  const { audio } = usePlayerCtx();

  const audioRef = React.useRef<HTMLAudioElement>(null);

  if (!audio) return;

  {
    /* outer div is only for padding so body content does not hide beneath fixed position player */
  }
  const content = (
    <div className="h-[var(--player-height)] [--player-height:theme(spacing.24)]">
      <div className="fixed bottom-0 left-0 isolate z-50 grid h-[var(--player-height)] w-full select-none grid-cols-[1fr_auto] content-center overflow-hidden bg-muted-4/70 px-5 pb-2 pt-4 backdrop-blur-sm md:grid-cols-[auto_1fr_auto] lg:px-10">
        <PlayerProgress audioRef={audioRef} />

        <div className="flex items-center gap-2 max-md:hidden">
          <div className="relative aspect-square w-12 overflow-hidden rounded">
            <Image
              src={audio.imageUrl}
              alt="currently playing podcast image"
              fill
              className="object-cover"
            />
          </div>

          <div className="max-w-52 space-y-2">
            <div className="truncate text-sm font-medium first-letter:uppercase">
              {audio.title}
            </div>

            <div className="truncate text-xs first-letter:uppercase">
              {audio.author}
            </div>
          </div>
        </div>

        {/* show title on sm to lg */}
        <div className="col-span-2 truncate text-sm font-medium first-letter:uppercase md:hidden">
          {audio.title}
        </div>

        <div className="flex grow items-center md:justify-center">
          <audio
            ref={audioRef}
            src={audio.audioUrl}
            autoPlay
            className="hidden"
          ></audio>

          <PlayerControls audioRef={audioRef} />
        </div>

        <div className="flex items-center gap-2">
          <PlayerTime audioRef={audioRef} />
          <PlayerVolumn audioRef={audioRef} />
        </div>
      </div>
    </div>
  );

  return <>{createPortal(content, globalThis.document?.body)}</>;
};

Player.displayName = displayName;
