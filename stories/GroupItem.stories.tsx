import type { Meta, StoryObj } from "@storybook/react";
import GroupItem from "@/src/entities/queue/ui/GroupItem";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import EnterButton from "@/src/features/queue/ui/EnterButton";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";

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
        <CancelButton onCancel={() => {}} />
        <NotifyButton onNotify={() => {}} />
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
        <CancelButton onCancel={() => {}} />
        <EnterButton onEnter={() => {}} />
      </div>
    ),
  },
};
