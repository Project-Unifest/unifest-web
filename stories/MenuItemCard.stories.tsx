import { MenuStatus } from "@/src/features/menu/lib/types";
import { MenuCard } from "@/src/features/menu/ui/MenuItem";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "entities/menu/MenuCard",
  component: MenuCard,
} satisfies Meta;

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    boothId: 0,
    id: 0,
    name: "abcd",
    price: 1000,
    menuStatus: MenuStatus.Enough,

    add: () => {},
    remove: () => {},
    edit: () => {},
  },
};
