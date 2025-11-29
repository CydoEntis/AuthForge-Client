import * as React from "react";
import { Anvil, Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "../shared/NavUser";
import { NavMain } from "../shared/NavMain";
import { Link } from "@tanstack/react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Home",
        url: "/applications",
        icon: Home,
        isActive: true,
      },
    ],
    navFooter: [
      {
        title: "Settings",
        url: "/Settings",
        icon: Settings,
        isActive: false,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props} className="">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/applications" viewTransition={{ types: ["slide-down"] }}>
                <div className="bg-card  flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Anvil className="text-orange-400" size={20} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Auth Forge</span>
                  <span className="">v0.0.1</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarMenu className="gap-2"></SidebarMenu>
        </SidebarGroup>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          {data.navFooter.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <Link to={item.url} viewTransition={{ types: ["slide-down"] }}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <NavUser />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
