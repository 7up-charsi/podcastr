'use client';

import { useUser, SignOutButton } from '@clerk/nextjs';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Button,
} from '@typeweave/react';

const displayName = 'UserSignedIn';

export const UserSignedIn = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn || !isLoaded) return;

  return (
    <div className="space-y-2 overflow-hidden rounded">
      <div className="flex items-center gap-2 bg-muted-3 px-2 py-2">
        <AvatarRoot className="shrink-0">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            {`${user.firstName?.[0] ?? ''} ${user.lastName?.[0] ?? ''}`}
          </AvatarFallback>
        </AvatarRoot>

        <span
          aria-label="logged in username"
          className="truncate capitalize"
        >
          {user.fullName}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Button
          aria-label="profile settings"
          asChild
          className="grow-0 gap-0"
          startContent={<SettingsIcon />}
        >
          <Link
            href={`/profile/${user.id}`}
            className="flex grow items-center space-x-3 overflow-auto"
          >
            profile
          </Link>
        </Button>

        <SignOutButton redirectUrl="/">
          <Button
            aria-label="sign out"
            isIconOnly
            variant="text"
            className="shrink-0"
          >
            <LogOutIcon />
          </Button>
        </SignOutButton>
      </div>
    </div>
  );
};

UserSignedIn.displayName = displayName;
