"use client";

import * as React from "react";
import { BotIcon, Network, SquareTerminal } from "lucide-react";
import Link from "next/link";
import { NavMain } from "@/components/layout/nav-main";
import { NavDocs } from "@/components/layout/nav-docs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { ThemeToggle } from "../ui/theme-toggle";
import AuthButton from "./wallet-button";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { NavSecondary } from "@/components/layout/nav-secondary";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  target?: string;
}

const data = {
  navMain: [
    {
      title: "Copilot",
      url: "/dashboard/copilot",
      icon: BotIcon,
    },
    {
      title: "Console",
      url: "/dashboard/console",
      icon: SquareTerminal,
    },
    {
      title: "Abilities",
      url: "/dashboard/abilities",
      icon: Network,
    },
  ],
  navSecondary: [
    {
      title: "Follow on X",
      href: "https://x.com/Arborvitai",
      icon: FaXTwitter as React.ComponentType<{ className?: string }>,
      target: "_blank",
    },
    {
      title: "Source Code",
      href: "https://github.com/ForrestDevs/arbor",
      icon: FaGithub as React.ComponentType<{ className?: string }>,
      target: "_blank",
    },
  ] as NavItem[],
  docs: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/dashboard/docs",
        },
        {
          title: "Getting Started",
          href: "/dashboard/docs/getting-started",
        },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        {
          title: "Core Architecture",
          href: "/dashboard/docs/core-architecture",
        },
        {
          title: "Key Technologies",
          href: "/dashboard/docs/key-technologies",
        },
        {
          title: "Evolutionary Process",
          href: "/dashboard/docs/evolutionary-process",
        },
      ],
    },
    {
      title: "Advanced Topics",
      items: [
        {
          title: "Advanced Capabilities",
          href: "/dashboard/docs/advanced-capabilities",
        },
        {
          title: "Technical Implementation",
          href: "/dashboard/docs/technical-implementation",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-col items-center justify-between gap-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-4">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground gap-2">
                  <Image
                    className="rounded-lg"
                    src="/arbor2.png"
                    alt="Arbor"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="grid flex-1 text-left text-4xl leading-tight">
                  <span className="truncate font-semibold font-vt323">
                    Arbor
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <AuthButton />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavUser user={data.user} /> */}
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} />
        <NavDocs docs={data.docs} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
