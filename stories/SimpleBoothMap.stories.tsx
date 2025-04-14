import useBoothDraftStore from "@/src/shared/model/store/booth-draft-store";
import { OverviewBoothMap } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { useEffect } from "react";

const meta = {
  title: "Widgets/AddBooth/SimpleBoothMap",
  component: OverviewBoothMap,
  decorators: [
    (Story) => {
      const reset = useBoothDraftStore((state) => state.reset);

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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole("button", { name: "back" }),
    ).toBeInTheDocument();
    await expect(
      await canvas.findByRole("region", { name: "Map" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "저장 완료" }),
    ).toBeInTheDocument();
  },
};
