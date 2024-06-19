import { formatPlayerTime } from '@/utils';
import React, { useRef } from 'react';

interface PlayerTimeProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const displayName = 'PlayerTime';

export const PlayerTime = (props: PlayerTimeProps) => {
  const { audioRef } = props;

  const [currentTime, setCurrentTime] = React.useState(0);

  const timerRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const playHandler = () => {
      timerRef.current = setInterval(() => {
        if (!audioRef.current) return;

        setCurrentTime(audioRef.current.currentTime);
      }, 100);
    };

    const pauseHandler = () => {
      clearInterval(timerRef.current);
    };

    const element = audioRef.current;

    element?.addEventListener('play', playHandler);
    element?.addEventListener('pause', pauseHandler);

    return () => {
      element?.removeEventListener('play', playHandler);
      element?.removeEventListener('pause', pauseHandler);
    };
  }, [audioRef]);

  return (
    <div className="">
      {audioRef.current
        ? `${formatPlayerTime(currentTime)} / ${formatPlayerTime(audioRef.current.duration)}`
        : ''}
    </div>
  );
};

PlayerTime.displayName = displayName;
