import { Switch } from "@/src/shared/ui/switch";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "shared/switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
  },
};

export const Primary: Story = {
  args: {
    id: "2",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    id: "2",
    color: "secondary",
  },
};
