import { SelectMode } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "Widgets/AddBooth/SelectMode",
  component: SelectMode,
  decorators: [
    (Story) => (
      <div className="relative flex h-full min-h-screen flex-col items-start justify-start">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
