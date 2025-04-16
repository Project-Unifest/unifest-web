import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-coverage",
    "@storybook/addon-mdx-gfm",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  staticDirs: [
    "../public",
    {
      from: "../static/fonts",
      to: "static/fonts",
    },
  ],

  features: {
    experimentalRSC: true,
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
