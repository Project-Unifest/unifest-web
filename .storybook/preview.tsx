import React from "react";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../app/globals.css";
import "./preview.css";
import { BoothStoreProvider } from "../src/shared/model/provider/booth-store-provider";
import { AuthStoreProvider } from "../src/shared/model/provider/auth-store-provider";
import handlers from "../mocks/api/handlers";

initialize();

// TODO use next/font/local instead of global style
// see here: https://storybook.js.org/docs/get-started/nextjs#nextfontlocal

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <AuthStoreProvider>
          <BoothStoreProvider>
            <div style={{ fontFamily: "Pretendard, sans-serif" }}>
              <Story />
            </div>
          </BoothStoreProvider>
        </AuthStoreProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [...handlers],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;