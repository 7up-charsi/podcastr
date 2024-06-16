'use client';

import { LogOutIcon } from 'lucide-react';
import React from 'react';
import {
  useUser,
  SignOutButton,
  SignedOut,
  SignInButton,
  SignedIn,
  ClerkLoading,
  ClerkLoaded,
} from '@clerk/nextjs';
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Button,
  Skeleton,
} from '@typeweave/react';

const displayName = 'User';

export const User = () => {
  const { user } = useUser();

  return (
    <div className="flex h-14 items-center">
      <ClerkLoading>
        <Skeleton variant="rounded" className="h-14" />
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <SignInButton>
            <Button
              variant="solid"
              color="primary"
              className="w-full"
            >
              sign in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {!user ? null : (
            <div className="flex grow items-center gap-2 px-2">
              <AvatarRoot className="shrink-0">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {`${user.firstName?.[0] ?? ''} ${user.lastName?.[0] ?? ''}`}
                </AvatarFallback>
              </AvatarRoot>

              <span
                aria-label="name of logged in user"
                className="truncate capitalize"
              >
                {user.fullName}
              </span>

              <SignOutButton redirectUrl="/">
                <Button
                  aria-label="sign out"
                  isIconOnly
                  color="danger"
                  className="ml-auto shrink-0"
                >
                  <LogOutIcon />
                </Button>
              </SignOutButton>
            </div>
          )}
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
};

User.displayName = displayName;
