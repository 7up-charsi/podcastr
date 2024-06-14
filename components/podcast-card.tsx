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
        <div className="overflow-hidden rounded">
          <Image
            src={imageUrl as string}
            width={174}
            height={174}
            alt={title}
            className="aspect-square w-full rounded-xl 2xl:size-[200px]"
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
