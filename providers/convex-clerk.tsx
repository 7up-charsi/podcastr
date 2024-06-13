'use client';

import React from 'react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string,
);

export interface ConvexClerkProviderProps {
  children?: React.ReactNode;
}

const displayName = 'ConvexClerkProvider';

export const ConvexClerkProvider = (
  props: ConvexClerkProviderProps,
) => {
  const { children } = props;

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        layout: {
          logoImageUrl: '/logo.svg',
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

ConvexClerkProvider.displayName = displayName;
