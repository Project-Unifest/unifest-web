import { OverviewBoothMap } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widgets/AddBooth/SimpleBoothMap",
  component: OverviewBoothMap,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
