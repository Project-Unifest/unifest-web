import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui/tabs";
import React, { useState } from "react";

interface QueueTabsPropsType {
  activatedTab?: string;
  onToggle: (tab: "active" | "completed" | "canceled") => void;
}

export default function QueueTabs({
  activatedTab,
  onToggle,
}: QueueTabsPropsType) {
  const handleValueChange = (value: "active" | "completed" | "canceled") => {
    onToggle(value);
  };

  return (
    <Tabs
      defaultValue="queue"
      value={activatedTab}
      onValueChange={handleValueChange as any}
    >
      <TabsList>
        <TabsTrigger value="active">웨이팅</TabsTrigger>
        <TabsTrigger value="completed">입장완료</TabsTrigger>
        <TabsTrigger value="canceled">취소/부재</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
