import * as React from "react";
import { Anvil, Home } from "lucide-react";

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
import { ThemeToggle } from "@/features/theme/ThemeToggle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
      name: "DemoUser",
      email: "demo@demo.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Home",
        url: "#",
        icon: Home,
        isActive: true,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props} className="">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-card  flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Anvil className="text-orange-400" size={20} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Auth Forge</span>
                  <span className="">v0.0.1</span>
                </div>
              </a>
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
          {/* 
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2">
            <ThemeToggle />
          </div>

          <NavUser user={data.user} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
