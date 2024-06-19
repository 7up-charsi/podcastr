import React from 'react';
import { Button } from '@typeweave/react';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from 'lucide-react';

interface PlayerControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const displayName = 'PlayerControls';

export const PlayerControls = (props: PlayerControlsProps) => {
  const { audioRef } = props;

  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    const handler = () => {
      setIsPlaying(false);
    };

    const element = audioRef.current;

    element?.addEventListener('pause', handler);

    return () => {
      element?.removeEventListener('pause', handler);
    };
  }, [audioRef]);

  return (
    <div className="flex items-center gap-3">
      <Button
        isIconOnly
        aria-label="rewind 10 seconds"
        onPress={() => {
          if (!audioRef.current) return;

          const currentTime = audioRef.current.currentTime;

          if (currentTime - 10 < 0) {
            audioRef.current.currentTime = 0;
            return;
          }

          audioRef.current.currentTime = currentTime - 10;
        }}
      >
        <RewindIcon />
      </Button>

      <Button
        isIconOnly
        aria-label="play/pause"
        color="primary"
        variant="solid"
        onPress={() => {
          setIsPlaying((prev) => {
            if (!audioRef.current) return prev;

            const shouldPlay = !prev;

            if (shouldPlay) {
              audioRef.current.play();
              return true;
            }

            audioRef.current.pause();
            return false;
          });
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>

      <Button
        isIconOnly
        aria-label="forward 10 seconds"
        onPress={() => {
          if (!audioRef.current) return;

          const currentTime = audioRef.current.currentTime;

          if (currentTime + 10 > audioRef.current.duration) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
            setIsPlaying(false);
            return;
          }

          audioRef.current.currentTime = currentTime + 10;
        }}
      >
        <FastForwardIcon />
      </Button>
    </div>
  );
};

PlayerControls.displayName = displayName;
