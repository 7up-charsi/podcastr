'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import autoPlayCarousel from 'embla-carousel-autoplay';
import Image from 'next/image';

export interface RightSidebarProps {}

const displayName = 'RightSidebar';

export const RightSidebar = (props: RightSidebarProps) => {
  const {} = props;

  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  const [emblaRef] = useEmblaCarousel({}, [autoPlayCarousel()]);

  return (
    <div role="presentation" className="hidden w-[270px] xl:block">
      <aside className="fixed right-0 top-0 h-full w-[270px] bg-muted-2 px-5 py-5">
        <div className="mt-5 flex justify-between gap-2">
          <h2 className="text-sm font-semibold capitalize">
            fans also like
          </h2>

          <Link
            href="/discover"
            className="text-sm font-medium capitalize text-primary-11"
          >
            see all
          </Link>
        </div>

        <div ref={emblaRef} className="mt-5 overflow-hidden rounded">
          <div className="flex aspect-square w-full">
            {topPodcasters?.map(
              ({ name, imageUrl, podcast, _id }) => (
                <Link
                  key={_id}
                  href={`/podcasts/${podcast[0]?.podcastId}`}
                  className="relative h-full w-full shrink-0 overflow-hidden rounded bg-muted-3"
                >
                  <Image
                    src={imageUrl}
                    alt="podcaster image"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-muted-9/70 px-3 py-2 text-white backdrop-blur-sm">
                    <div className="mb-px truncate text-sm">
                      {podcast[0].title}
                    </div>
                    <div className="truncate text-xs text-white/85">
                      {name}
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-2">
          <h2 className="text-sm font-semibold capitalize">
            Top Podcasters
          </h2>

          <Link
            href="/discover"
            className="text-sm font-medium capitalize text-primary-11"
          >
            see all
          </Link>
        </div>

        <div className="space-y-3">
          {topPodcasters
            ?.slice(0, 3)
            .map(({ _id, imageUrl, name, podcast }) => (
              <div key={_id} className="mt-5 flex items-center gap-2">
                <div className="relative size-10 overflow-hidden rounded">
                  <Image
                    src={imageUrl}
                    alt="podcaster image"
                    fill
                    className="object-cover"
                  />
                </div>

                <span className="grow truncate text-sm font-medium">
                  {name}
                </span>
                <span className="text-xs">
                  {podcast.length} Podcasts
                </span>
              </div>
            ))}
        </div>
      </aside>
    </div>
  );
};

RightSidebar.displayName = displayName;
