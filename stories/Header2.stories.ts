import Home from "@/app/page";
import { Header } from "@/src/widgets/header";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
  title: "Widgets/Header",
  component: Home,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
