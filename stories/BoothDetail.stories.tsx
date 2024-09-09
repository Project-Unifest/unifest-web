import BoothDetail from "@/src/pages/booths/booth-detail";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "pages/booths/booth-detail",
  component: BoothDetail,
  parameters: {
    nextjs: {
      navigation: {
        segments: [["boothId", "0"]],
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    booth: {
      id: 78,
      name: "부동산학관 부스",
      description: "부동산학관에 위치한 닭꼬치맛집",
      location: "부동산학관 1층",
      enabled: false,
    },
  },
};
