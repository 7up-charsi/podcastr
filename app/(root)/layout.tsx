import { LeftSidebar } from '@/components/left-sidebar';
import { Player } from '@/components/player';
import { RightSidebar } from '@/components/right-sidebar';

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <LeftSidebar />

      <div className="px-10 pb-5 pt-10">{children}</div>

      <RightSidebar />

      <Player />
    </div>
  );
};

export default RootLayout;
