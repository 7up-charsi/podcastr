'use client';

import { LogOutIcon, SettingsIcon } from 'lucide-react';
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
import Link from 'next/link';

const displayName = 'User';

export const User = () => {
  const { user } = useUser();

  return (
    <div className="p-2">
      <ClerkLoading>
        <Skeleton variant="rounded" className="h-[50px]" />
        <Skeleton variant="rounded" className="mt-1 h-[50px]" />
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
            <div className="w-full">
              <div className="flex grow items-center gap-2">
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
              </div>

              <div className="mt-3 flex gap-3">
                <Link href={`/profile/${user.id}`}>
                  <Button
                    startContent={<SettingsIcon />}
                    className="grow"
                  >
                    profile
                  </Button>
                </Link>

                <SignOutButton redirectUrl="/">
                  <Button
                    color="danger"
                    startContent={<LogOutIcon />}
                    className="grow"
                  >
                    logout
                  </Button>
                </SignOutButton>
              </div>
            </div>
          )}
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
};

User.displayName = displayName;
