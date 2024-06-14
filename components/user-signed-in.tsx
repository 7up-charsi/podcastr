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
    <div className="flex h-14 items-center bg-muted-3 px-3">
      <AvatarRoot className="shrink-0">
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>
          {`${user.firstName?.[0] ?? ''} ${user.lastName?.[0] ?? ''}`}
        </AvatarFallback>
      </AvatarRoot>

      <span
        aria-label="logged in username"
        className="mx-2 truncate capitalize"
      >
        {user.fullName}
      </span>

      <Link
        href={`/profile/${user.id}`}
        className="flex grow items-center space-x-3 overflow-auto"
      >
        <Button
          aria-label="profile settings"
          isIconOnly
          className="ml-auto"
        >
          <SettingsIcon />
        </Button>
      </Link>

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
  );
};

UserSignedIn.displayName = displayName;
