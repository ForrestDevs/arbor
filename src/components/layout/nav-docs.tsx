"use client";

import { BookOpen, ChevronRight } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/ui/sidebar";

interface DocLink {
  title: string;
  href: string;
}

interface DocSection {
  title: string;
  items: DocLink[];
}

export function NavDocs({ docs }: { docs: DocSection[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Docs</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible key={"docs"} asChild>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Docs">
              <Link href="/dashboard/docs">
                <BookOpen />
                <span>Docs</span>
              </Link>
            </SidebarMenuButton>
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu>
                  {docs.map((section) => (
                    <Collapsible asChild key={section.title}>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          {section.title}
                        </SidebarMenuButton>
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <ChevronRight />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {section.items.map((item) => (
                                <SidebarMenuSubItem key={item.title}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={item.href}>
                                      <span>{item.title}</span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
