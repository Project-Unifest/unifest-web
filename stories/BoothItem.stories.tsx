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
    name: "컴공주점",
    editButton: <BoothEditButton />,
    deleteButton: <BoothDeleteButton />,
    switchButton: <BoothSwitchButton />,
  },
};

export const WithOptional: Story = {
  args: {
    name: "컴공주점",
    description: "컴퓨터공학부 전용 부스",
    location: "청심대 앞",
    editButton: <BoothEditButton />,
    deleteButton: <BoothDeleteButton />,
    switchButton: <BoothSwitchButton />,
  },
};
