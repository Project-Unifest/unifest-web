import {
  BoothDraftStoreProvider,
  useBoothDraftStore,
} from "@/src/shared/model/provider/booth-draft-store-provider";
import { OverviewSetBoothName } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useEffect, useState } from "react";

const meta = {
  title: "Widgets/AddBooth/SimpleSetBoothName",
  component: OverviewSetBoothName,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const reset = useBoothDraftStore((state) => state.reset);
      const name = useBoothDraftStore((state) => state.name);

      useEffect(() => {
        reset();
      }, [reset]);

      return <Story />;
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText(/부스 이름/),
      "컴퓨터공학부 주점",
    );
    await expect(
      canvas.findByRole("link", { name: /입력완료/ }),
    ).toBeInTheDocument();
  },
};
