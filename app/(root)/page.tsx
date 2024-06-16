'use client';

import { PodcastCard } from '@/components/podcast-card';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function HomePage() {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <main>
      <h1 className="mb-5 text-xl font-semibold capitalize">
        trending podcasts
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {trendingPodcasts?.map(
          ({ _id, description, imageUrl, title }) => (
            <PodcastCard
              key={_id}
              _id={_id}
              description={description}
              imageUrl={imageUrl as string}
              title={title}
            />
          ),
        )}
      </div>
    </main>
  );
}
