import { QueueAvailabilitySwitchButton } from "@/src/features/booth/ui/QueueAvailabilitySwitchButton";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "features/booths/QueueAvailabilitySwitchButton",
  component: QueueAvailabilitySwitchButton,
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    boothId: 77,
    initialOpened: false,
  },
};
