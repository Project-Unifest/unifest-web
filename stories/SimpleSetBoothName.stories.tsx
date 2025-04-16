import useBoothDraftStore from "@/src/shared/model/store/booth-draft-store";
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

export const EmptyName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("textbox", { name: "" })).toBeInTheDocument();

    await expect(
      canvas.queryByRole("link", { name: /입력완료/ }),
    ).not.toBeInTheDocument();
  },
};

export const FilledName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText(/부스 이름/),
      "컴퓨터공학부 주점",
    );
    await expect(
      canvas.getByRole("link", { name: /입력완료/ }),
    ).toBeInTheDocument();
  },
};

export const OverfilledName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameTextField = canvas.getByPlaceholderText(/부스 이름/);

    await userEvent.type(
      nameTextField,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    );

    await expect(nameTextField.textContent?.length).toBeLessThanOrEqual(30);
  },
};
