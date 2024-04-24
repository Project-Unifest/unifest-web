import React from "react";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { helloHandler } from "../mocks/api/hello";
import "../app/globals.css";
import "./preview.css";

initialize();

// TODO use next/font/local instead of global style
// see here: https://storybook.js.org/docs/get-started/nextjs#nextfontlocal

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "Pretendard, sans-serif" }}>
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
    nextjs: {
      appDirectory: true,
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;