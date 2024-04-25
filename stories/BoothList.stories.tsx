import { BoothList } from "@/src/widgets/boothList";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widgets/BoothList",
  component: BoothList,
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

export const Empty: Story = {};
