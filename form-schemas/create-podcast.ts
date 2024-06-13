import { z } from 'zod';

export const createPodcastFormSchema = z.object({
  title: z
    .string()
    .min(5, '`title` must contain at least 5 character(s)'),
  description: z
    .string()
    .min(10, '`description` must contain at least 10 character(s)'),
  voiceType: z.string().min(1, 'AI voice type is required'),
  audioDuration: z.number(),
  audioUrl: z.string(),
  voicePrompt: z
    .string()
    .min(10, '`AI prompt` must contain at least 10 character(s)'),
  imageUrl: z.string(),
  imagePrompt: z
    .string()
    .min(10, '`AI prompt` must contain at least 10 character(s)'),
});
