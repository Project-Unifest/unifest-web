import { BoothEditBox } from "@/src/widgets/booth";
import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";

const meta = {
  title: "Widgets/Booth/BoothEditBox",
  component: BoothEditBox,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MinimalInputField: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("select category and type name", async () => {
      await userEvent.click(canvas.getByLabelText("주점"));
      await userEvent.type(
        canvas.getByPlaceholderText("부스/주점 이름 *"),
        "컴퓨터공학부 주점",
      );
    });

    await step("submit form", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "등록하기" }));
    });

    // FIXME add an assertion; it doens't work for now
  },
};
