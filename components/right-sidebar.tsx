import React from 'react';

export interface RightSidebarProps {}

const displayName = 'RightSidebar';

export const RightSidebar = (props: RightSidebarProps) => {
  const {} = props;

  return (
    <div role="presentation" className="hidden w-[270px] lg:block">
      <aside className="fixed right-0 top-0 h-full w-[270px] bg-muted-2">
        <div className="ml-5 mt-10 text-lg font-semibold capitalize">
          right sidebar
        </div>
      </aside>
    </div>
  );
};

RightSidebar.displayName = displayName;
