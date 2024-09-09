import type { Meta, StoryObj } from "@storybook/react";
import QueueTabsContainer from "@/src/entities/queue/ui/QueueTabsContainer";
import QueueTabs from "@/src/features/queue/ui/QueueTabs";
import GroupItem from "@/src/entities/queue/ui/GroupItem";
import CancelButton from "@/src/features/queue/ui/CancelButton";
import NotifyButton from "@/src/features/queue/ui/NotifyButton";

const meta = {
  title: "entities/queue/QueueTabsContainer",
  component: QueueTabsContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof QueueTabsContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const groups = [
  {
    id: "111",
    index: 1,
    partySize: 10,
    tel: "010-3042-1322",
  },
  {
    id: "112",
    index: 2,
    partySize: 10,
    tel: "010-2352-1322",
  },
  {
    id: "113",
    index: 3,
    partySize: 5,
    tel: "010-4663-4244",
  },
];

// TODO change props

export const Default: Story = {
  args: {
    tabSlot: <QueueTabs onToggle={() => {}} />,
    groupSlot: (
      <>
        <p className="pb-1">총 {groups.length}팀</p>
        {groups.map(({ id, ...props }) => (
          <GroupItem
            {...props}
            id={id}
            key={id}
            actionSlot={
              <div className="flex space-x-2">
                <CancelButton onCancel={() => {}} />
                <NotifyButton onNotify={() => {}} />
              </div>
            }
          />
        ))}
      </>
    ),
  },
};
