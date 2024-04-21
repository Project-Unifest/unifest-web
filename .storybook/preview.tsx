import { helloHandler } from "../mocks/api/hello";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../app/globals.css";
import "./preview.css";
import React from "react";

initialize();

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "Pretendard, sans-serief" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        hello: [...helloHandler],
      },
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
