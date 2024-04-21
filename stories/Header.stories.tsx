import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/src/widgets/header";

const meta = {
  title: "Widgets/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      router: {
        pathname: "/booth",
        asPath: "/booth",
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Navigatable: Story = {};

// TODO write tests for different pathnames and different history stack
