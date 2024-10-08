import { Button } from "@/src/shared/ui/button";
import ClockIcon from "@/src/shared/ui/ClockIcon";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "shared/button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CircleFilled: Story = {
  args: {
    size: "square",
    shape: "circle",
    state: "filled",
    children: <>입장</>,
  },
};

export const CircleOutlined: Story = {
  args: {
    size: "square",
    shape: "circle",
    state: "outlined",
    children: <>입장</>,
  },
};

export const CircleSecondary: Story = {
  args: {
    size: "square",
    shape: "circle",
    state: "secondary",
    children: <>입장</>,
  },
};

export const QueueButton: Story = {
  args: {
    size: "queue",
    shape: "rounded",
    state: "queue",
    children: (
      <span className="flex flex-row items-center gap-1">
        <ClockIcon />
        웨이팅 관리
      </span>
    ),
  },
};
