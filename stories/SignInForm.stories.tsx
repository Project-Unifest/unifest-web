import { SignInForm } from "@/src/widgets/sign-in";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "Widgets/SignIn/SignInForm",
  component: SignInForm,
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Submit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText("아이디를 입력해주세요"),
      "abcd@efgh.com",
    );
    await userEvent.type(
      canvas.getByPlaceholderText("비밀번호를 입력해주세요"),
      "12345678",
    );

    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "로그인" }),
      ).toBeInTheDocument(),
    );
  },
};
