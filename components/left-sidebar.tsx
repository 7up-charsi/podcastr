'use client';

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavbarLink } from './navbar-link';

const displayName = 'LeftSidebar';

export const LeftSidebar = () => {
  return (
    <div role="presentation" className="hidden w-[270px] lg:block">
      <aside className="fixed left-0 top-0 flex h-full w-[270px] flex-col bg-muted-2">
        <div className="flex justify-center px-4 py-5">
          <Link
            aria-label="home-page"
            href="/"
            className="flex gap-2"
          >
            <Image
              src="/logo.svg"
              alt="logo"
              width={23}
              height={27}
            />

            <span className="text-xl font-semibold text-primary-11">
              Podcastr
            </span>
          </Link>
        </div>

        <nav
          aria-label="primary navigation"
          className="mt-1 space-y-1"
        >
          {sidebarLinks.map((ele) => (
            <NavbarLink key={ele.label} {...ele} />
          ))}
        </nav>
      </aside>
    </div>
  );
};

LeftSidebar.displayName = displayName;
