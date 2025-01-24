
interface ITool {
  type: "function";
  name: string;
  description: string;
  parameters?: {
    type: string;
    properties: Record<
      string,
      {
        type: string;
        description: string;
      }
    >;
  };
}

const toolDefinitions = {
  getTrendingTokens: {
    description: "Gets the trending crypto tokens in the market",
    parameters: {
      limit: {
        type: "number",
        description: "The number of trending tokens to return",
      },
    },
  },
  getTokenAddress: {
    description: "Gets the address of a token",
    parameters: {
      name: {
        type: "string",
        description: "The name of the token",
      },
    },
  },
  getPriceData: {
    description: "Gets the price data of a token",
    parameters: {
      address: {
        type: "string",
        description: "The address of the token",
      },
    },
  },
  getCurrentTime: {
    description: "Gets the current time in the user's timezone",
    parameters: {},
  },
  changeBackgroundColor: {
    description: "Changes the background color of the page",
    parameters: {
      color: {
        type: "string",
        description: "Color value (hex, rgb, or color name)",
      },
    },
  },
  partyMode: {
    description: "Triggers a confetti animation on the page",
    parameters: {},
  },
  launchWebsite: {
    description: "Launches a website in the user's browser",
    parameters: {
      url: {
        type: "string",
        description: "The URL to launch",
      },
    },
  },
  copyToClipboard: {
    description: "Copies text to the user's clipboard",
    parameters: {
      text: {
        type: "string",
        description: "The text to copy",
      },
    },
  },
  takeScreenshot: {
    description: "Takes a screenshot of the current page",
    parameters: {},
  },
  scrapeWebsite: {
    description:
      "Scrapes a URL and returns content in markdown and HTML formats",
    parameters: {
      url: {
        type: "string",
        description: "The URL to scrape",
      },
    },
  },
} as const;

const tools: ITool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
  type: "function",
  name,
  description: config.description,
  parameters: {
    type: "object",
    properties: config.parameters,
  },
}));

export type { ITool };
export { tools };
