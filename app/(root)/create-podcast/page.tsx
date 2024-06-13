'use client';

import { aiVoiceModels } from '@/constants';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { mergeRefs } from '@typeweave/react-utils';
import { Button, Combobox, Input } from '@typeweave/react';
import { GenerateAudioButton } from '@/components/generate-audio-button';
import { createPodcastFormSchema } from '@/form-schemas';
import { GeneratedAudio } from '@/components/generated-audio';
import { GenerateImageButton } from '@/components/generate-image-button';
import { GeneratedImage } from '@/components/generated-image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CustomLoader } from '@/components/custom-loader';

const formSchema = createPodcastFormSchema.superRefine(
  (data, ctx) => {
    if (!data.audioUrl) {
      ctx.addIssue({
        code: 'custom',
        message: 'generate audio using `generate audio` button',
        path: ['voicePrompt'],
        fatal: true,
      });
    }

    if (!data.imageUrl) {
      ctx.addIssue({
        code: 'custom',
        message: 'generate image using `generate image` button',
        path: ['imagePrompt'],
        fatal: true,
      });
    }
  },
);

type FormValues = z.input<typeof createPodcastFormSchema>;

export type CreatePodcastFormValues = FormValues;

const CreatePodcastPage = () => {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      voiceType: '',
      voicePrompt: '',
      audioUrl: '',
      imagePrompt: '',
      // TODO: remove this url when api limit resets
      imageUrl:
        'https://images.wallpapersden.com/image/ws-one-piece-hd-luffy-cool-art_83100.jpg',
      audioDuration: 0,
    },
  });

  const createPodcast = useMutation(api.podcasts.createPodcast);

  const onSubmit = async (values: FormValues) => {
    try {
      await createPodcast({
        audioDuration: values.audioDuration,
        audioUrl: values.audioUrl,
        description: values.description,
        imagePrompt: values.imagePrompt,
        imageUrl: values.imageUrl,
        title: values.title,
        voicePrompt: values.voicePrompt,
        voiceType: values.voiceType,
        views: 0,
      });

      toast.success('Podcast created');
      router.push('/');
    } catch (error) {
      toast.error('internal error');
    }
  };

  return (
    <main>
      <h1 className="text-xl font-semibold capitalize">
        create podcast
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-5"
      >
        <Input
          label="title"
          placeholder="Podcast title"
          className="w-full"
          {...register('title')}
          error={!!errors.title}
          errorMessage={errors.title?.message}
        />

        <Controller
          control={control}
          name="voiceType"
          render={({ field: { onChange, value, ...field } }) => (
            <Combobox
              options={aiVoiceModels}
              value={value}
              onChange={(val) => {
                onChange({ target: { value: val } });
              }}
              renderInput={(props) => (
                <Input
                  label="voice type"
                  placeholder="AI model voice type"
                  className="w-full"
                  {...props}
                  {...field}
                  ref={mergeRefs(field.ref, props.ref)}
                  onBlur={(e) => {
                    field.onBlur();
                    props.onBlur?.(e);
                  }}
                  error={!!errors.voiceType}
                  errorMessage={errors.voiceType?.message}
                />
              )}
            />
          )}
        />

        <Input
          multiline
          label="description"
          placeholder="Podcast description"
          className="w-full"
          {...register('description')}
          error={!!errors.description}
          errorMessage={errors.description?.message}
        />

        <Input
          multiline
          label="AI prompt to generate podcast audio"
          placeholder="Provide text to AI to generate podcast audio"
          className="w-full"
          {...register('voicePrompt')}
          error={!!errors.voicePrompt}
          errorMessage={errors.voicePrompt?.message}
        />

        <div className="flex justify-end">
          <GenerateAudioButton
            control={control}
            setValue={setValue}
            setError={setError}
          />
        </div>

        <GeneratedAudio control={control} setValue={setValue} />

        <Input
          multiline
          label="AI prompt to generate podcast image"
          placeholder="Write a prompt to generate podcast image"
          className="w-full"
          {...register('imagePrompt')}
          error={!!errors.imagePrompt}
          errorMessage={errors.imagePrompt?.message}
        />

        <div className="flex justify-end">
          <GenerateImageButton
            control={control}
            setValue={setValue}
            setError={setError}
          />
        </div>

        <GeneratedImage control={control} />

        <Button
          variant="solid"
          color="primary"
          className="w-full"
          disabled={isSubmitting}
          startContent={isSubmitting && <CustomLoader />}
          aria-label={
            isSubmitting
              ? 'Submitting form'
              : 'submit & publish podcast'
          }
        >
          {isSubmitting ? 'Submitting' : 'submit & publish podcast'}
        </Button>
      </form>
    </main>
  );
};

export default CreatePodcastPage;
