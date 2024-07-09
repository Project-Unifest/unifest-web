import { SignUpForm } from "@/src/widgets/sign-up";
import { Meta, StoryObj } from "@storybook/react";
import { expect, fireEvent, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "Widgets/Auth/SignUpForm",
  component: SignUpForm,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "회원가입" }));

    const schoolErrorMessage = "학교를 선택해주세요";
    const emailErrorMessage = "올바른 이메일이 아닙니다";
    const passwordErrorMessage = "비밀번호는 8자 이상이 되어야 합니다";
    const contactNumberErrorMessage = "전화번호는 숫자만 입력하셔야 합니다";
    const termsAndConditionsErrorMessage = "약관에 동의하셔야 합니다";

    await expect(canvas.getByText(schoolErrorMessage)).toBeInTheDocument();
    await expect(canvas.getByText(emailErrorMessage)).toBeInTheDocument();
    await expect(canvas.getByText(passwordErrorMessage)).toBeInTheDocument();
    await expect(
      canvas.getByText(contactNumberErrorMessage),
    ).toBeInTheDocument();
    await expect(canvas.getByText(schoolErrorMessage)).toBeInTheDocument();
    await expect(
      canvas.getByText(termsAndConditionsErrorMessage),
    ).toBeInTheDocument();
  },
};

export const Success: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // TODO userEvent api has an error: https://github.com/testing-library/user-event/issues/922
    await fireEvent.click(canvas.getByRole("combobox", { name: "학교 선택" }));
    const option = canvas.getByText(/건국대/);
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
