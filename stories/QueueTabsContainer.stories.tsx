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
    peopleCount: 10,
    phoneNumber: "010-3042-1322",
  },
  {
    id: "112",
    index: 2,
    peopleCount: 10,
    phoneNumber: "010-2352-1322",
  },
  {
    id: "113",
    index: 3,
    peopleCount: 5,
    phoneNumber: "010-4663-4244",
  },
];

export const Default: Story = {
  args: {
    tabSlot: <QueueTabs onToggle={() => {}} />,
    groupSlot: (
      <>
        <p className="pb-1">총 {groups.length}팀</p>
        {groups.map(({ id, ...props }) => (
          // <li key={id}>
          <GroupItem
            id={id}
            {...props}
            key={id}
            actionSlot={
              <div className="flex space-x-2">
                <CancelButton />
                <NotifyButton />
              </div>
            }
          />
          // </li>
        ))}
      </>
    ),
  },
};
