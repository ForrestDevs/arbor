import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JetBrains_Mono, Azeret_Mono, VT323} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const azeretMono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret-mono",
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
}); 

export const metadata: Metadata = {
  title: "Arbor AI",
  description: "Advanced blockchain copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          jetbrainsMono.variable,
          azeretMono.variable,
          vt323.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
