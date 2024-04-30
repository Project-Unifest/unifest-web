import { useBoothStore } from "@/src/shared/model/provider/booth-store-provider";
import { OverviewSetBoothCategory } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useEffect } from "react";

const meta = {
  title: "Widgets/AddBooth/SimpleSetBoothCategory",
  component: OverviewSetBoothCategory,
  decorators: [
    (Story) => {
      const reset = useBoothStore((state) => state.reset);
      useEffect(() => {
        reset();
      }, [reset]);
      return <Story />;
    },
  ],
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BarRadioClicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("주점"));
    await expect(
      canvas.getByRole("button", { name: /입력완료/ }),
    ).toBeInTheDocument();
  },
};

export const FoodRadioClicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("먹거리"));
    await expect(
      canvas.getByRole("button", { name: /입력완료/ }),
    ).toBeInTheDocument();
  },
};

export const EventRadioClicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("이벤트"));
    await expect(
      canvas.getByRole("button", { name: /입력완료/ }),
    ).toBeInTheDocument();
  },
};

export const MoreRadioClicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("일반"));
    await expect(
      canvas.getByRole("button", { name: /입력완료/ }),
    ).toBeInTheDocument();
  },
};
