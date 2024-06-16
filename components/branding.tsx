import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const displayName = 'Branding';

export const Branding = () => {
  return (
    <Link
      href="/"
      aria-label="go to podcastr home page"
      className="inline-flex items-center gap-3"
    >
      <Image
        src="/logo.svg"
        alt="podcastr logo"
        height={20}
        width={20}
      />

      <span className="text-xl font-medium capitalize">podcastr</span>
    </Link>
  );
};

Branding.displayName = displayName;
