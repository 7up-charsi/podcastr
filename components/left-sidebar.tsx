'use client';

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface LeftSidebarProps {}

const displayName = 'LeftSidebar';

export const LeftSidebar = (props: LeftSidebarProps) => {
  const {} = props;

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div role="presentation" className="hidden w-[270px] lg:block">
      <aside className="fixed left-0 top-0 h-full w-[270px] bg-muted-2">
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
          {sidebarLinks.map(({ icon, label, route }) => {
            const isActive = pathname === route;

            return (
              <Link
                key={label}
                href={route}
                data-active={isActive}
                className="relative flex items-center gap-3 from-primary-3 px-4 py-3 after:absolute after:right-0 after:hidden after:h-full after:w-1 after:rounded-l after:bg-primary-9 hover:bg-primary-3 data-[active=true]:bg-gradient-to-r data-[active=true]:after:block"
              >
                <Image src={icon} alt="icon" width={24} height={24} />

                <span className="first-letter:uppercase">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

LeftSidebar.displayName = displayName;
