import { BoothCategory } from "@/src/shared/lib/types";
import { useBoothDraftStore } from "@/src/shared/model/provider/booth-draft-store-provider";
import { OverviewSetBoothDescription } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useEffect } from "react";

const meta = {
  title: "Widgets/AddBooth/SimpleSetBoothDescription",
  component: OverviewSetBoothDescription,
  decorators: [
    (Story) => {
      const [reset, editCategory, editName] = useBoothDraftStore((state) => [
        state.reset,
        state.editCategory,
        state.editName,
      ]);
      useEffect(() => {
        reset();
        editCategory(BoothCategory.BAR);
        editName("컴퓨터공학부 주점");
      }, [reset, editCategory, editName]);

      return <Story />;
    },
  ],
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyDescription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("button", { name: "건너뛰기" }),
    ).toBeInTheDocument();

    await expect(
      canvas.getByPlaceholderText(
        /부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요/,
      ),
    ).toBeInTheDocument();

    await expect(
      canvas.getByRole("button", { name: "건너뛰기" }),
    ).toBeInTheDocument();

    await expect(
      canvas.queryByRole("button", { name: "입력완료" }),
    ).not.toBeInTheDocument();
  },
};

export const FilledDescription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText(
        /부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요/,
      ),
      "컴퓨터공학부 주점입니다. 새내기, 헌내기 모두 환영합니다.",
    );
    await expect(
      canvas.getByRole("button", { name: "건너뛰기" }),
    ).toBeInTheDocument();
    await expect(
      await canvas.findByRole("button", { name: "입력완료" }),
    ).toBeInTheDocument();
  },
};

export const OverfilledDescription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const descriptionTextField = canvas.getByPlaceholderText(
      /부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요/,
    );

    await userEvent.type(
      canvas.getByPlaceholderText(
        /부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요/,
      ),
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    );
    await expect(descriptionTextField.textContent?.length).toBeLessThanOrEqual(
      100,
    );
  },
};
