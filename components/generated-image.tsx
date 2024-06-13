import { CreatePodcastFormValues } from '@/app/(root)/create-podcast/page';
import { Skeleton } from '@typeweave/react';
import Image from 'next/image';
import React from 'react';
import { Control, useWatch } from 'react-hook-form';

interface GeneratedImageProps {
  control: Control<CreatePodcastFormValues>;
}

const displayName = 'GeneratedImage';

type Status = 'loaded' | 'error' | 'idle' | 'loading';

export const GeneratedImage = (props: GeneratedImageProps) => {
  const { control } = props;

  const url = useWatch({ control, name: 'imageUrl' });

  const [status, setStatus] = React.useState<Status>('idle');

  React.useEffect(() => {
    if (!url) {
      setStatus('error');
      return;
    }

    let isMounted = true;

    const img = new window.Image();
    img.src = url;

    const handleStatus = (status: Status) => () => {
      if (!isMounted) return;

      setStatus(status);
    };

    setStatus('loading');

    img.onload = handleStatus('loaded');
    img.onerror = handleStatus('error');

    return () => {
      isMounted = false;
    };
  }, [url]);

  if (status === 'loading') {
    return (
      <Skeleton variant="rounded" className="h-[300px] w-[300px]" />
    );
  }

  return status === 'loaded' ? (
    <Image
      src={url}
      alt="generated image"
      width={300}
      height={300}
      className="rounded"
    />
  ) : null;
};

GeneratedImage.displayName = displayName;
