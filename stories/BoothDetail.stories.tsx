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
      category: "FOOD",
      description: "부동산학관에 위치한 닭꼬치맛집",
      thumbnail:
        "https://content.foodspring.co.kr/vendor/1781/images/101_4100052181_r.png",
      warning: "누구나 환영",
      location: "부동산학관 1층",
      latitude: 37.54318618774414,
      longitude: 127.0783920288086,
      menus: [
        {
          id: 6,
          name: "닭꼬치",
          price: 5000,
          imgUrl:
            "https://content.foodspring.co.kr/vendor/1781/images/101_4100052181_r.png",
        },
        {
          id: 7,
          name: "타코야끼",
          price: 4500,
          imgUrl:
            "https://thenaum.cdn-nhncommerce.com/data/goods/18/01/03/1000001570/1000001570_add3_023.jpg",
        },
        {
          id: 8,
          name: "닭강정",
          price: 6000,
          imgUrl:
            "https://gwchild114.firstmall.kr/data/goods/1/2021/06/42952_tmp_bfbe39f750e2db665da61b3a2e3c74697887large.png",
        },
      ],
      enabled: false,
    },
  },
};
