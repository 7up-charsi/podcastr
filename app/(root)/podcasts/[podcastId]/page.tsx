'use client';

import { CustomLoader } from '@/components/custom-loader';
import { DeletePodcastButton } from '@/components/delete-podcast-button';
import { PlayPodcastButton } from '@/components/play-podcast-button';
import { PodcastCard } from '@/components/podcast-card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Button,
} from '@typeweave/react';
import { useQuery } from 'convex/react';
import {
  HeadphonesIcon,
  PlayCircleIcon,
  TrashIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PodcastDetailsPageProps {
  params: { podcastId: Id<'podcasts'> };
}

const PodcastDetailsPage = ({
  params: { podcastId },
}: PodcastDetailsPageProps) => {
  const { user } = useUser();

  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId,
  });

  const similarPodcasts = useQuery(
    api.podcasts.getPodcastByVoiceType,
    { podcastId },
  );

  const isOwner = user?.id === podcast?.authorId;

  if (!similarPodcasts || !podcast) return <CustomLoader />;

  return (
    <main className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Currenty Playing</h1>

        <div
          aria-label={`This podcast has been listened to ${podcast?.views} times.`}
          className="flex items-center gap-3"
        >
          <HeadphonesIcon size={20} />

          <span>{podcast?.views}</span>
        </div>
      </div>

      <article className="my-10 flex items-center gap-5">
        <Image
          src={podcast.imageUrl as string}
          width={200}
          height={200}
          alt="Podcast image"
          className="aspect-square rounded-lg"
          aria-labelledby="podcast-title"
        />

        <div className="flex flex-col items-start gap-5">
          <h2
            id="podcast-title"
            className="truncate text-lg font-semibold first-letter:uppercase"
          >
            {podcast.title}
          </h2>

          <div className="space-x-3">
            <AvatarRoot>
              <AvatarImage src={podcast.authorImageUrl} />
              <AvatarFallback>
                {podcast.author.slice(0, 1)}
              </AvatarFallback>
            </AvatarRoot>

            <span className="first-letter:uppercase">
              {podcast.author}
            </span>
          </div>

          <div className="mt-7 flex w-full items-center justify-between gap-5">
            <PlayPodcastButton
              _id={podcast._id}
              audioUrl={podcast.audioUrl as string}
              author={podcast.author}
              imageUrl={podcast.imageUrl as string}
              title={podcast.title}
            />

            {!isOwner ? null : (
              <DeletePodcastButton id={podcast._id} />
            )}
          </div>
        </div>
      </article>

      <section aria-label="podcast details" className="space-y-5">
        <h2 className="text-lg font-semibold capitalize">
          description
        </h2>

        <p>{podcast?.description}</p>

        <h2 className="text-lg font-semibold capitalize">
          Transcription
        </h2>

        <p>{podcast?.voicePrompt}</p>

        <h2 className="text-lg font-semibold capitalize">
          Thumbnail Prompt
        </h2>

        <p>{podcast?.imagePrompt}</p>
      </section>

      <section className="mt-8 flex flex-col gap-5">
        <h2
          aria-describedby={
            !similarPodcasts.length ? 'nothing-found' : undefined
          }
          className="text-20 text-white-1 font-bold"
        >
          Similar Podcasts
        </h2>

        {similarPodcasts.length > 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {similarPodcasts.map(
              ({ _id, title, description, imageUrl }) => (
                <PodcastCard
                  key={_id}
                  imageUrl={imageUrl as string}
                  title={title}
                  description={description}
                  _id={_id}
                />
              ),
            )}
          </div>
        ) : (
          <div className="my-10 flex flex-col items-center gap-3">
            <div
              id="nothing-found"
              className="mb-5 text-xl font-semibold capitalize text-muted-11/50"
            >
              No similar podcasts found
            </div>

            <Button asChild color="primary" variant="solid">
              <Link href="/discover">Discover more podcasts</Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default PodcastDetailsPage;
