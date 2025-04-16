import { API_URL } from "@/src/shared/api/config";
import BoothList from "@/src/widgets/boothList/ui/BoothList";
import { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, http } from "msw";

const meta = {
  title: "Widgets/BoothList",
  component: BoothList,
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${API_URL}/api/booths`, () => {
          return HttpResponse.json({
            data: [],
          });
        }),
      ],
    },
  },
};

export const Contentful: Story = {};
