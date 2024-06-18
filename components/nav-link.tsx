'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  route: string;
  label: string;
  icon: string;
}

const displayName = 'NavLink';

export const NavLink = (props: NavLinkProps) => {
  const { icon, label, route } = props;

  const pathname = usePathname();

  const isActive = pathname === route;

  return (
    <Link
      href={route}
      data-active={isActive}
      className="relative flex items-center gap-3 from-primary-3 px-4 py-3 after:absolute after:right-0 after:hidden after:h-full after:w-1 after:rounded-l after:bg-primary-9 hover:bg-primary-3 data-[active=true]:bg-gradient-to-r data-[active=true]:after:block"
    >
      <Image src={icon} alt="icon" width={24} height={24} />

      <span className="first-letter:uppercase">{label}</span>
    </Link>
  );
};

NavLink.displayName = displayName;
