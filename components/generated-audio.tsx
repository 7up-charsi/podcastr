import { CreatePodcastFormValues } from '@/app/(root)/create-podcast/page';
import React from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';

interface GeneratedAudioProps {
  control: Control<CreatePodcastFormValues>;
  setValue: UseFormSetValue<CreatePodcastFormValues>;
}

const displayName = 'GeneratedAudio';

export const GeneratedAudio = (props: GeneratedAudioProps) => {
  const { control, setValue } = props;

  const url = useWatch({ control, name: 'audioUrl' });

  return !url ? null : (
    <audio
      controls
      src={url}
      className="h-10 w-full"
      onLoadedMetadata={(e) => {
        setValue('audioDuration', e.currentTarget.duration);
      }}
    />
  );
};

GeneratedAudio.displayName = displayName;
