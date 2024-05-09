import { MenuItemForm } from "@/src/features/menu";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "features/menu/MenuItemForm",
  component: MenuItemForm,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
