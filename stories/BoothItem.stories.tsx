import { BoothItem } from "@/src/entities/booth";
import {
  BoothEditButton,
  BoothDeleteButton,
  BoothSwitchButton,
} from "@/src/features/booth";
import { Meta, StoryObj } from "@storybook/react";

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
