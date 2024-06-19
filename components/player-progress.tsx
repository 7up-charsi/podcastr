import React from 'react';

interface PlayerProgressProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const displayName = 'PlayerProgress';

export const PlayerProgress = (props: PlayerProgressProps) => {
  const { audioRef } = props;

  const progressBarRef = React.useRef<HTMLDivElement>(null);

  const [isEnded, setIsEnded] = React.useState(false);

  React.useEffect(() => {
    const pauseHandler = () => {
      if (!audioRef.current) return;

      if (
        audioRef.current?.currentTime === audioRef.current?.duration
      ) {
        setIsEnded(true);
        return;
      }

      setIsEnded(false);
    };

    const playHandler = () => {
      setIsEnded(false);
    };

    const element = audioRef.current;

    element?.addEventListener('pause', pauseHandler);
    element?.addEventListener('play', playHandler);

    return () => {
      element?.removeEventListener('pause', pauseHandler);
      element?.removeEventListener('play', playHandler);
    };
  }, [audioRef]);

  React.useEffect(() => {
    const updateProgress = () => {
      if (progressBarRef.current && audioRef.current) {
        const progress =
          (audioRef.current.currentTime / audioRef.current.duration) *
          100;

        progressBarRef.current.style.width = `${progress}%`;
      }
    };

    const intervalId = setInterval(updateProgress, 100);

    return () => clearInterval(intervalId);
  }, [audioRef]);

  return (
    <div className="absolute left-0 top-0 h-2 w-full overflow-hidden bg-primary-4">
      <div
        ref={progressBarRef}
        data-ended={isEnded}
        className="h-full w-0 rounded-r-full bg-primary-9 data-[ended=true]:rounded-r-none"
      />
    </div>
  );
};

PlayerProgress.displayName = displayName;
