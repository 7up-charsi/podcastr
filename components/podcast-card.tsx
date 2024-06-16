import { PointerEvents } from '@typeweave/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface PodcastCardProps {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
}

const displayName = 'PodcastCard';

export const PodcastCard = (props: PodcastCardProps) => {
  const { _id, imageUrl, title, description } = props;

  const router = useRouter();

  return (
    <PointerEvents
      onPress={() =>
        router.push(`/podcasts/${_id}`, { scroll: true })
      }
    >
      <article className="cursor-pointer">
        <div className="relative aspect-video w-full overflow-hidden rounded">
          <Image
            src={imageUrl as string}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="mt-2 truncate text-sm font-medium">{title}</h3>
        <div className="mt-px truncate text-xs text-foreground/80">
          {description}
        </div>
      </article>
    </PointerEvents>
  );
};

PodcastCard.displayName = displayName;
