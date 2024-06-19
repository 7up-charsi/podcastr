import React from 'react';
import { Button } from '@typeweave/react';
import {
  Volume1Icon,
  Volume2Icon,
  VolumeIcon,
  VolumeXIcon,
} from 'lucide-react';

interface PlayerVolumnProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const displayName = 'PlayerVolumn';

const defaultIsMuted = false;
const defaultVolume = 0.5;

const storedIsMutedKey = 'playerIsMuted';
const storedVolumeKey = 'playerVolume';

export const PlayerVolumn = (props: PlayerVolumnProps) => {
  const { audioRef } = props;

  const [isMuted, setIsMuted] = React.useState(defaultIsMuted);
  const [volume, setVolume] = React.useState(defaultVolume);

  React.useEffect(() => {
    if (!audioRef.current) return;

    const storedIsMuted = localStorage.getItem(storedIsMutedKey);

    const shouldMuted = storedIsMuted
      ? JSON.parse(storedIsMuted)
      : defaultIsMuted;

    setIsMuted(shouldMuted);
    audioRef.current.muted = shouldMuted;

    const storedVolume = localStorage.getItem(storedVolumeKey);

    const newVolume = storedVolume
      ? JSON.parse(storedVolume)
      : defaultVolume;

    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  }, [audioRef]);

  return (
    <div
      role="group"
      aria-label="volumn controls"
      className="flex items-center gap-2"
    >
      <Button
        aria-label="toggle mute"
        isIconOnly
        color={isMuted ? 'danger' : 'default'}
        onPress={() => {
          setIsMuted((prev) => {
            if (!audioRef.current) return prev;

            const shouldMuted = !prev;

            if (shouldMuted) {
              audioRef.current.muted = shouldMuted;
            } else {
              setVolume((prevVolume) => {
                if (!audioRef.current) return prevVolume;

                const newVolume = 0.3;

                if (prevVolume === 0) {
                  audioRef.current.volume = newVolume;
                  return newVolume;
                }

                return prevVolume;
              });

              audioRef.current.muted = shouldMuted;
            }

            localStorage.setItem(
              storedIsMutedKey,
              JSON.stringify(shouldMuted),
            );

            return shouldMuted;
          });
        }}
      >
        {isMuted && <VolumeXIcon />}
        {!isMuted && volume <= 0.15 && <VolumeIcon />}
        {!isMuted && volume < 0.5 && volume > 0.15 && <Volume1Icon />}
        {!isMuted && volume >= 0.5 && <Volume2Icon />}
      </Button>

      <input
        aria-label="volumn slider"
        type="range"
        min="0"
        max="100"
        step="1"
        value={volume * 100}
        onChange={(e) => {
          if (!audioRef.current) return;
          const newVolume = +e.target.value / 100;

          if (newVolume === 0) {
            audioRef.current.muted = true;
            setIsMuted(true);
          } else {
            audioRef.current.muted = false;
            setIsMuted(false);
          }

          setVolume(newVolume);
          audioRef.current.volume = newVolume;

          localStorage.setItem(
            storedVolumeKey,
            JSON.stringify(newVolume),
          );
        }}
        className="h-1 min-h-0 w-16 min-w-0"
      />
    </div>
  );
};

PlayerVolumn.displayName = displayName;
