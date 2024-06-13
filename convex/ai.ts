'use node';

import { action } from './_generated/server';
import { v } from 'convex/values';
import fetch from 'node-fetch';

import UnrealSpeech from 'unrealspeech';

const unrealSpeech = new UnrealSpeech(
  process.env.UNREALSPEECH_API_KEY!,
);

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    const speechData = await unrealSpeech.speech(input, voice);

    return speechData.OutputUri as string;
  },
});

export const generateImageAction = action({
  args: { prompt: v.string() },
  handler: async (
    _,
    { prompt },
  ): Promise<
    | { status: 'failed'; message: string }
    | { status: 'success'; imageUrl: string }
  > => {
    const res = await fetch(
      `https://api.limewire.com/api/image/generation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Version': 'v1',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio: '1:1',
        }),
      },
    );

    const data = (await res.json()) as
      | {
          status: 'COMPLETED';
          self: string;
          data: {
            asset_url: string;
            type: string;
            width: string;
            height: string;
          }[];
        }
      | {
          status: 'FAILED';
          failure_code: string;
          failure_reason: string;
        }
      | { status: number; detail: string };

    if (typeof data.status === 'number')
      return {
        status: 'failed',
        message: data.detail,
      };

    if (data.status === 'FAILED')
      return {
        status: 'failed',
        message: data.failure_reason,
      };

    return {
      status: 'success',
      imageUrl: data.data[0].asset_url,
    };
  },
});
