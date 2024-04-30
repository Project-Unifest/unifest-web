import { SignUpForm } from "@/src/widgets/sign-up";
import { Meta, StoryObj } from "@storybook/react";
import { fireEvent, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "Widgets/Auth/SignUpForm",
  component: SignUpForm,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // TODO userEvent api has an error: https://github.com/testing-library/user-event/issues/922
    await fireEvent.click(canvas.getByRole("combobox", { name: "학교 선택" }));
    const option = canvas.getByText("건국대학교");
    userEvent.click(option);

    await userEvent.type(
      canvas.getByRole("textbox", { name: "이메일" }),
      "abcd1234@naver.com",
    );

    await userEvent.type(canvas.getByLabelText("비밀번호"), "012345678");

    await userEvent.type(canvas.getByLabelText("비밀번호 확인"), "012345678");

    await userEvent.type(
      canvas.getByRole("textbox", { name: "전화번호" }),
      "24884911",
    );
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "개인정보 수집 및 이용 약관을 읽고 전체 동의합니다.",
      }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "회원가입" }));
  },
};

export const WithoutSchool: Story = {};
