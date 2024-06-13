'use client';

import { AudioProps, useAudio } from '@/providers';
import { Button } from '@typeweave/react';
import { PlayCircleIcon } from 'lucide-react';
import React from 'react';

interface PlayPodcastButtonProps extends AudioProps {}

const displayName = 'PlayPodcastButton';

export const PlayPodcastButton = (props: PlayPodcastButtonProps) => {
  const { audioUrl, author, imageUrl, _id, title } = props;

  const { setAudio } = useAudio();

  return (
    <Button
      color="primary"
      variant="solid"
      startContent={<PlayCircleIcon />}
      onPress={() => {
        setAudio({ audioUrl, author, imageUrl, _id, title });
      }}
    >
      play
    </Button>
  );
};

PlayPodcastButton.displayName = displayName;
