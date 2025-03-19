import { BoothItem } from "@/src/entities/booth";
import {
  BoothEditButton,
  BoothDeleteButton,
  BoothSwitchButton,
} from "@/src/features/booth";
import { QueueAvailabilitySwitchButton } from "@/src/features/booth/ui/QueueAvailabilitySwitchButton";
import { Button } from "@/src/shared/ui/button";
import ClockIcon from "@/src/shared/ui/ClockIcon";
import { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

const meta = {
  title: "entities/booth/BoothItem",
  component: BoothItem,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 0,
    name: "컴공주점",
    description: "컴공주점입니다",
    location: "청심대 맞은편",
    editButton: <BoothEditButton boothId={0} />,
    deleteButton: <BoothDeleteButton boothId={0} />,
    switchButton: <BoothSwitchButton boothId={0} />,
  },
};

export const WithOptional: Story = {
  args: {
    id: 0,
    name: "컴공주점",
    description: "컴공주점입니다",
    location: "청심대 맞은편",
    editButton: <BoothEditButton boothId={0} />,
    deleteButton: <BoothDeleteButton boothId={0} />,
    switchButton: <BoothSwitchButton boothId={0} />,
  },
};

export const QueueToggleSlot: Story = {
  args: {
    id: 0,
    name: "컴공주점",
    description: "컴공주점입니다",
    location: "청심대 맞은편",
    editButton: <BoothEditButton boothId={0} />,
    deleteButton: <BoothDeleteButton boothId={0} />,
    switchButton: (
      <QueueAvailabilitySwitchButton boothId={0} initialEnabled={false} />
    ),
  },
};

// HACK: use render property to avoid circular dependencies caused by <Link /> Component
export const QueueButtonSlot: Story = {
  render: (args) => (
    <BoothItem
      {...args}
      switchButton={
        <div className="flex flex-col items-end justify-start gap-2 ">
          <BoothSwitchButton boothId={args.id} />
          <Button size="queue" state="queue" shape="rounded">
            <Link
              href={`/booths/${args.id}`}
              className="flex flex-row items-center justify-center gap-1"
            >
              <ClockIcon />
              웨이팅 관리
            </Link>
          </Button>
        </div>
      }
    />
  ),
  args: {
    id: 0,
    name: "컴공주점",
    description: "컴공주점입니다",
    location: "청심대 맞은편",
    editButton: <BoothEditButton boothId={0} />,
    deleteButton: <BoothDeleteButton boothId={0} />,
    switchButton: <></>,
  },
};
