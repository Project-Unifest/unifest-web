import React, { ReactNode } from "react";
import GroupItem from "./GroupItem";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";

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
