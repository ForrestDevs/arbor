import React from "react";
import { ChatProvider } from "./_components/context";

export default function InterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
