import PINContainer from "@/src/widgets/queue/ui/pin-container";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "widgets/queue/PINContainer",
  component: PINContainer,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    boothId: 0,
  },
};
