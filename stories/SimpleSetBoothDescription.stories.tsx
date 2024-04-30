import { useBoothStore } from "@/src/shared/model/provider/booth-store-provider";
import { OverviewSetBoothDescription } from "@/src/widgets/add-booth";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useEffect } from "react";

const meta = {
  title: "Widgets/AddBooth/SimpleSetBoothDescription",
  component: OverviewSetBoothDescription,
  decorators: [
    (Story) => {
      const [reset, editCategory, editName] = useBoothStore((state) => [
        state.reset,
        state.editCategory,
        state.editName,
      ]);
      useEffect(() => {
        reset();
        editCategory("bar");
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

export const DescriptionTyped: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("link", { name: "건너뛰기" }),
    ).toBeInTheDocument();
    await userEvent.type(
      canvas.getByPlaceholderText(
        /부스 컨텐츠, 판매 음식 등 자유롭게 부스를 소개해보세요/,
      ),
      "컴퓨터공학부 주점입니다. 새내기, 헌내기 모두 환영합니다.",
    );
    await expect(
      canvas.getByRole("link", { name: "건너뛰기" }),
    ).toBeInTheDocument();
    await expect(
      await canvas.findByRole("link", { name: "입력완료" }),
    ).toBeInTheDocument();
  },
};
