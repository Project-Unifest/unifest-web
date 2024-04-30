import { SelectMode } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

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

export const RadioClicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText(/간단하게 생성하기/));
    await expect(
      canvas.getByRole("link", { name: "선택완료" }),
    ).toBeInTheDocument();
  },
};
