import Page from "@/app/add-booth/set-category/page";
import Queue from "@/src/widgets/queue/ui";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";

const meta = {
  title: "widgets/queue/queue",
  component: Queue,
  decorators: [
    (Story) => {
      return (
        <div className="mx-auto flex min-h-screen flex-col items-stretch justify-start sm:w-[640px]">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Queue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FillAllTabs: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [["boothId", "0"]],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const emptyItemMessage = canvas.queryByText(/비어있어요./);

    await expect(emptyItemMessage).not.toBeInTheDocument();

    const completedButton = await canvas.findByRole("tab", {
      name: "입장완료",
    });

    await user.click(completedButton);

    await expect(emptyItemMessage).not.toBeInTheDocument();

    const canceledButton = canvas.getByRole("tab", { name: "취소/부재" });
    await user.click(canceledButton);

    await expect(emptyItemMessage).not.toBeInTheDocument();
  },
};

export const EmptyAllTabs: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [["boothId", "1"]],
      },
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const emptyItemMessage = await canvas.findByText(/비어있어요./);

    await expect(emptyItemMessage).toBeInTheDocument();

    const completedButton = await canvas.findByRole("tab", {
      name: "입장완료",
    });

    await user.click(completedButton);

    await expect(emptyItemMessage).toBeInTheDocument();

    const canceledButton = canvas.getByRole("tab", { name: "취소/부재" });
    await user.click(canceledButton);

    await expect(emptyItemMessage).toBeInTheDocument();
  },
};

export const EnterReservedItem: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [["boothId", "0"]],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await canvas.findByText("123", {}, { timeout: 10000 });

    const groupItemElements = await canvas.findAllByRole("listitem");

    const reservedGroupElement = groupItemElements.find((groupItemElement) => {
      const groupItem = within(groupItemElement);
      return groupItem.queryByText("123");
    })!;
    const reservedGroup = within(reservedGroupElement);
    const callButtonElement = await reservedGroup.findByRole("button", {
      name: "호출",
    });
    await user.click(callButtonElement);

    const enterButtonElement = await reservedGroup.findByRole("button", {
      name: "입장",
    });
    await user.click(enterButtonElement);

    await waitFor(() => expect(reservedGroupElement).not.toBeInTheDocument());

    const completedTab = await canvas.findByRole("tab", {
      name: "입장완료",
    });

    await user.click(completedTab);

    const updatedGroupItemElements = await canvas.findAllByRole("listitem");
    const enteredGroupElement = updatedGroupItemElements.find(
      (groupItemElement) => {
        const groupItem = within(groupItemElement);
        return groupItem.queryByText("123");
      },
    )!;
    await expect(enteredGroupElement).not.toBeNull();
  },
};

export const CancelReservedItem: Story = {
  parameters: {
    nextjs: {
      navigation: {
        segments: [["boothId", "0"]],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    await canvas.findByText("124", {}, { timeout: 10000 });

    const groupItemElements = await canvas.findAllByRole("listitem");
    const reservedGroupElement = groupItemElements.find((groupItemElement) => {
      const groupItem = within(groupItemElement);
      return groupItem.queryByText("124");
    })!;

    const reservedGroup = within(reservedGroupElement);
    const callButtonElement = await reservedGroup.findByRole("button", {
      name: "부재",
    });
    await user.click(callButtonElement);

    const completedTab = await canvas.findByRole("tab", {
      name: "취소/부재",
    });

    await user.click(completedTab);

    const updatedGroupItemElements = await canvas.findAllByRole("listitem");
    const canceledGroupElement = updatedGroupItemElements.find(
      (groupItemElement) => {
        const groupItem = within(groupItemElement);
        return groupItem.queryByText("124");
      },
    )!;
    await waitFor(() => expect(canceledGroupElement).not.toBeNull());
  },
};
