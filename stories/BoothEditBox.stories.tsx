import { BoothEditBox } from "@/src/widgets/booth";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widgets/Booth/BoothEditBox",
  component: BoothEditBox,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
