import React, { ReactNode } from "react";
interface QueueTabsContainerPropsType {
  tabSlot: ReactNode;
  groupSlot: ReactNode;
}

export default function QueueTabsContainer({
  tabSlot: tabs,
  groupSlot: groupItems,
}: QueueTabsContainerPropsType) {
  return (
    <div className="flex flex-auto flex-col">
      {tabs}
      <ul className="flex flex-auto flex-col space-y-4">{groupItems}</ul>
    </div>
  );
}
