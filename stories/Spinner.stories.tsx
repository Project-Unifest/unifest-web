// TODO: Spinner 추가
import { Meta, StoryObj } from "@storybook/react";
import Spinner from "@/src/shared/ui/spinner";

const meta = {
  title: "shared/spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Centered: Story = {
  args: {},
  render: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  ),
};
