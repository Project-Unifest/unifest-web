import PINCard from "@/src/entities/queue/ui/PINCard";
import RefreshIcon from "@/src/shared/ui/RefreshIcon";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "entities/queue/PINCard",
  component: PINCard,
} satisfies Meta<typeof PINCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    PIN: "1234",
    slot: (
      <button type="button" onClick={() => {}}>
        <RefreshIcon />
      </button>
    ),
  },
};
