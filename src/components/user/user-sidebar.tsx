"use client";

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  SettingsIcon,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Menu items.
const userNav = [
  {
    title: "Overview",
    url: "./overview",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "./transactions",
    icon: Inbox,
  },
  {
    title: "Tickets",
    url: "./tickets",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "./profile",
    icon: SettingsIcon,
  },
];

export function UserSidebar() {
  const { name } = useAuthStore();
  const { clearAuth } = useAuthStore();
  return (
    <Sidebar>
      <SidebarContent className="border-r border-[#1F3A3E] bg-[#102A2E] text-gray-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            User Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="transition-colors duration-200 hover:bg-[#1C3B40] hover:text-white"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="bg-[#102A2E] text-white"
              >
                <DropdownMenuItem
                  onClick={() => {
                    clearAuth();
                    window.location.href = "/login";
                  }}
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
