import type { Meta, StoryObj } from "@storybook/react";
import GroupItem from "@/src/entities/queue/ui/GroupItem";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import Enter from "@/src/features/queue/ui/EnterButton";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";
import EnterButton from "@/src/features/queue/ui/EnterButton";

const meta = {
  title: "Entities/queue/GroupItem",
  component: GroupItem,
} satisfies Meta<typeof GroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 112,
    waitingOrder: 1,
    partySize: 4,
    tel: "01012416364",
    actionSlot: (
      <div className="flex space-x-2">
        <CancelButton id={112} onCancel={() => {}} />
        <NotifyButton id={112} onNotify={() => {}} />
      </div>
    ),
  },
};

export const Notified: Story = {
  args: {
    id: "112",
    waitingOrder: 1,
    partySize: 4,
    tel: "01012416364",
    actionSlot: (
      <div className="flex space-x-2">
        <CancelButton id={112} onCancel={() => {}} />
        <EnterButton id={112} onEnter={() => {}} />
      </div>
    ),
  },
};
