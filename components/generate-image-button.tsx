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

interface GenerateImageButtonProps {
  control: Control<CreatePodcastFormValues>;
  setValue: UseFormSetValue<CreatePodcastFormValues>;
  setError: UseFormSetError<CreatePodcastFormValues>;
}

const displayName = 'GenerateImageButton';

const promptSchema = createPodcastFormSchema.pick({
  imagePrompt: true,
});

export const GenerateImageButton = (
  props: GenerateImageButtonProps,
) => {
  const { control, setError, setValue } = props;

  const imagePrompt = useWatch({
    control,
    name: 'imagePrompt',
  });

  const [isDisabled, setIsDisabled] = React.useState(true);
  const deferredValue = React.useDeferredValue(imagePrompt);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const getPodcastAudio = useAction(api.ai.generateImageAction);

  React.useEffect(() => {
    const { error } = promptSchema.safeParse({
      imagePrompt: deferredValue,
    });

    if (error?.flatten().fieldErrors.imagePrompt) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [deferredValue]);

  const onGenerateImage = async () => {
    const { error } = promptSchema.safeParse({
      imagePrompt,
    });

    const fieldErrors = error?.flatten().fieldErrors;

    if (fieldErrors?.imagePrompt) {
      setError(
        'imagePrompt',
        { message: fieldErrors.imagePrompt[0] },
        { shouldFocus: true },
      );
      return;
    }

    setIsGenerating(true);
    setValue('imageUrl', '');

    const data = await getPodcastAudio({
      prompt: imagePrompt,
    });

    if (data.status === 'failed') {
      setIsGenerating(false);

      if (data.message.startsWith('NSFW image detected')) {
        setError(
          'imagePrompt',
          {
            message:
              'Please ensure your input is appropriate and try again.',
          },
          { shouldFocus: true },
        );

        return;
      }

      toast.error(data.message);
      return;
    }

    setValue('imageUrl', data.imageUrl);
    setIsGenerating(false);
    toast.success('Podcast image generated successfully');
  };

  return isGenerating ? (
    <div
      role="status"
      aria-live="polite"
      aria-atomic={true}
      aria-label="generating image"
      className="flex items-center gap-3 px-3 py-2"
    >
      <span>Generating image</span> <CustomLoader />
    </div>
  ) : (
    <Button
      type="button"
      color="primary"
      variant="solid"
      aria-label="generate podcast image base on above ai prompt"
      disabled={isDisabled}
      onPress={onGenerateImage}
    >
      Generate Image
    </Button>
  );
};

GenerateImageButton.displayName = displayName;
