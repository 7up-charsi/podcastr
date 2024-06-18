'use client';

import { CustomLoader } from '@/components/custom-loader';
import { PodcastCard } from '@/components/podcast-card';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Image from 'next/image';

interface ProfilePageProps {
  params: { profileId: string };
}

const ProfilePage = (props: ProfilePageProps) => {
  const {
    params: { profileId },
  } = props;

  const user = useQuery(api.users.getUserById, {
    clerkId: profileId,
  });

  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: profileId,
  });

  if (!user || !podcastsData) return <CustomLoader />;

  return (
    <main>
      <h1>Profile</h1>

      <article className="my-10 flex gap-3">
        <div className="relative aspect-square w-full max-w-40 overflow-hidden rounded">
          <Image
            src={user.imageUrl}
            alt="Podcast image"
            fill
            aria-labelledby="podcast-title"
            className="object-cover"
          />
        </div>

        <div className="mt-2 space-y-3">
          <h3
            id="podcast-title"
            className="truncate text-lg font-semibold first-letter:uppercase"
          >
            {user.name}
          </h3>

          <p>
            <span className="font-semibold">
              {podcastsData?.listeners}{' '}
            </span>
            <span className="text-muted-11/70">
              monthly listeners
            </span>
          </p>
        </div>
      </article>

      <section>
        <h2 className="text-lg font-semibold capitalize">
          All podcasts
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {podcastsData.podcasts.map(
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
      </section>
    </main>
  );
};

export default ProfilePage;
