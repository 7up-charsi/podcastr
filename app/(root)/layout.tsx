import { LeftSidebar } from '@/components/left-sidebar';
import { RightSidebar } from '@/components/right-sidebar';

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <div className="grid grid-cols-[auto_1fr_auto]">
      <LeftSidebar />

      <main>{children}</main>

      <RightSidebar />
    </div>
  );
};

export default RootLayout;
