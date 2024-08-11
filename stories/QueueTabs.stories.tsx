import type { Meta, StoryObj } from "@storybook/react";
import QueueTabs from "@/src/features/queue/ui/QueueTabs";
import { useState } from "react";

const meta = {
  title: "feature/queue/tabs",
  component: QueueTabs,
  tags: ["autodocs"],
} satisfies Meta<typeof QueueTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activatedTab: undefined,
    onToggle: (updatedTab) => {},
  },
  render: () => {
    const [activatedTab, setActivatedTab] = useState<string | undefined>();
    const handleToggle = (updatedTab: string) => {
      setActivatedTab(updatedTab);
    };

    return <QueueTabs activatedTab={activatedTab} onToggle={handleToggle} />;
  },
};
