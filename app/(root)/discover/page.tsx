'use client';

import { CustomLoader } from '@/components/custom-loader';
import { PodcastCard } from '@/components/podcast-card';
import { Searchbar } from '@/components/searchbar';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React from 'react';

interface DiscoverPageProps {
  searchParams: { search: string };
}

const DiscoverPage = (props: DiscoverPageProps) => {
  const {
    searchParams: { search: searchParam },
  } = props;

  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: searchParam ?? '',
  });

  return (
    <>
      <Searchbar />

      <h1
        aria-describedby="description"
        className="my-5 text-xl font-semibold"
      >
        {!searchParam
          ? 'Discover Trending Podcasts'
          : 'Search results for '}

        {searchParam && (
          <span className="font-normal">{`"${searchParam}"`}</span>
        )}
      </h1>

      {!podcastsData ? (
        <div
          id="description"
          role="status"
          className="flex justify-center pt-10"
        >
          <CustomLoader size={50} />
        </div>
      ) : null}

      {podcastsData && !podcastsData.length && !searchParam ? (
        <div id="description" className="flex justify-center pt-10">
          <span className="text-xl font-semibold capitalize text-muted-11/70">
            nothing found
          </span>
        </div>
      ) : null}

      {podcastsData && !podcastsData.length && searchParam ? (
        <div id="description" className="flex justify-center pt-10">
          <span className="text-xl font-semibold capitalize text-muted-11/70">
            no results found
          </span>
        </div>
      ) : null}

      {podcastsData && podcastsData.length ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {podcastsData?.map(
            ({ _id, title, description, imageUrl }) => (
              <PodcastCard
                key={_id}
                imageUrl={imageUrl!}
                title={title}
                description={description}
                _id={_id}
              />
            ),
          )}
        </div>
      ) : null}
    </>
  );
};

export default DiscoverPage;
