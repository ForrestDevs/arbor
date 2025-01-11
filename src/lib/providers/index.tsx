"use client";

import { Analytics } from "@vercel/analytics/react";
import { PrivyProvider } from "./privy";
import { ThemeProvider } from "./theme";
import { PostHogProvider } from "./posthog";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <PostHogProvider>
      <PrivyProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </PrivyProvider>
    </PostHogProvider>
  );
};

export default Providers;
