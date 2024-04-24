import { SimpleSetBoothCategory } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widgets/AddBooth/SimpleSetBoothCategory",
  component: SimpleSetBoothCategory,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
