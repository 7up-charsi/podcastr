import { CreatePodcastFormValues } from '@/app/(root)/create-podcast/page';
import { createPodcastFormSchema } from '@/form-schemas';
import { Button } from '@typeweave/react';
import { useAction } from 'convex/react';
import React from 'react';
import { api } from '@/convex/_generated/api';
import { toast } from 'react-toastify';
import { CustomLoader } from './custom-loader';
import {
  Control,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';

interface GenerateAudioButtonProps {
  control: Control<CreatePodcastFormValues>;
  setValue: UseFormSetValue<CreatePodcastFormValues>;
  setError: UseFormSetError<CreatePodcastFormValues>;
}

const displayName = 'GenerateAudioButton';

const promptSchema = createPodcastFormSchema.pick({
  voicePrompt: true,
});

const generateSchema = createPodcastFormSchema.pick({
  voicePrompt: true,
  voiceType: true,
});

export const GenerateAudioButton = (
  props: GenerateAudioButtonProps,
) => {
  const { control, setError, setValue } = props;

  const [voicePrompt, voiceType] = useWatch({
    control,
    name: ['voicePrompt', 'voiceType'],
  });

  const [isDisabled, setIsDisabled] = React.useState(true);
  const deferredValue = React.useDeferredValue(voicePrompt);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const getPodcastAudio = useAction(api.ai.generateAudioAction);

  React.useEffect(() => {
    const { error } = promptSchema.safeParse({
      voicePrompt: deferredValue,
    });

    if (error?.flatten().fieldErrors.voicePrompt) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [deferredValue]);

  const onGenerateAudio = async () => {
    const { error } = generateSchema.safeParse({
      voicePrompt,
      voiceType,
    });

    const fieldErrors = error?.flatten().fieldErrors;

    if (fieldErrors?.voicePrompt) {
      setError(
        'voicePrompt',
        { message: fieldErrors.voicePrompt[0] },
        { shouldFocus: true },
      );
      return;
    }

    if (fieldErrors?.voiceType) {
      setError(
        'voiceType',
        { message: fieldErrors.voiceType[0] },
        { shouldFocus: true },
      );
      return;
    }

    setIsGenerating(true);
    setValue('audioUrl', '');

    try {
      const audioUrl = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      setValue('audioUrl', audioUrl);

      setIsGenerating(false);

      toast.success('Podcast audio generated successfully');
    } catch (error) {
      console.log('Error generating Podcast audio', error);
      toast.error('Error creating Podcast audio');
      setIsGenerating(false);
    }
  };

  return isGenerating ? (
    <div
      role="status"
      aria-live="polite"
      aria-atomic={true}
      aria-label="generating audio"
      className="flex items-center gap-3 px-3 py-2"
    >
      <span>Generating audio</span> <CustomLoader />
    </div>
  ) : (
    <Button
      type="button"
      color="primary"
      variant="solid"
      aria-label="generate podcast audio base on above ai prompt"
      disabled={isDisabled}
      onPress={onGenerateAudio}
    >
      Generate Audio
    </Button>
  );
};

GenerateAudioButton.displayName = displayName;
