import React from 'react';

export interface RightSidebarProps {}

const displayName = 'RightSidebar';

export const RightSidebar = (props: RightSidebarProps) => {
  const {} = props;

  return <aside className="hidden lg:block">right sidebar</aside>;
};

RightSidebar.displayName = displayName;
