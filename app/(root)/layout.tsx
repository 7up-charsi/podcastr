import { Branding } from '@/components/branding';
import { NavLink } from '@/components/nav-link';
import { Player } from '@/components/player';
import { RightSidebar } from '@/components/right-sidebar';
import { User } from '@/components/user';
import { sidebarLinks } from '@/constants';
import {
  Button,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
} from '@typeweave/react';
import { MenuIcon } from 'lucide-react';

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <div className="lg:grid lg:grid-cols-[auto_1fr_auto]">
      <header className="flex h-16 items-center justify-between px-5 lg:hidden">
        <Branding />

        <DrawerRoot>
          <DrawerTrigger>
            <Button aria-label="menu" isIconOnly>
              <MenuIcon />
            </Button>
          </DrawerTrigger>

          <DrawerPortal>
            <DrawerOverlay className="lg:hidden" />
            <DrawerContent className="flex flex-col lg:hidden">
              <div className="flex h-16 items-center justify-center">
                <Branding />
              </div>

              <nav
                aria-label="primary navigation"
                className="mt-2 space-y-1"
              >
                {sidebarLinks.map((ele) => (
                  <NavLink key={ele.label} {...ele} />
                ))}
              </nav>

              <div className="mt-auto">
                <User />
              </div>
            </DrawerContent>
          </DrawerPortal>
        </DrawerRoot>
      </header>

      <div role="presentation" className="hidden w-[270px] lg:block">
        <aside className="fixed left-0 top-0 flex h-full w-[270px] flex-col bg-muted-2">
          <div className="flex h-16 items-center justify-center">
            <Branding />
          </div>

          <nav
            aria-label="primary navigation"
            className="mt-2 space-y-1"
          >
            {sidebarLinks.map((ele) => (
              <NavLink key={ele.label} {...ele} />
            ))}
          </nav>

          <div className="mt-auto">
            <User />
          </div>
        </aside>
      </div>

      <div className="px-5 pb-5 pt-5 lg:px-10 lg:pt-10">
        {children}
      </div>

      <RightSidebar />

      <Player />
    </div>
  );
};

export default RootLayout;
