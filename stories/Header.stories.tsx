import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/src/widgets/header";

const meta = {
  title: "Widgets/Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Navigatable: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/booth",
        query: {
          user: "1",
        },
      },
    },
  },
};

// TODO write tests for different pathnames and different history stack
