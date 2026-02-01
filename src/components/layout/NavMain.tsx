"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMounted } from "@/hooks/useMounted";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  role?: "ADMIN" | "USER" | "ALL";
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: NavMainItem[];
  userRole?: "ADMIN" | "USER" | null;
}

export function NavMain({ items, userRole }: NavMainProps) {
  const mounted = useMounted();

  const shouldShowItem = (item: NavMainItem): boolean => {
    if (!item.role || item.role === "ALL") return true;
    if (!userRole) return false;
    return item.role === userRole;
  };

  const getBasePath = (): string => {
    if (!userRole) return "/users";
    return userRole === "ADMIN" ? "/admin" : "/users";
  };

  if (!mounted) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="h-9 w-full bg-sidebar-accent/50 rounded animate-pulse" />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="h-9 w-full bg-sidebar-accent/50 rounded animate-pulse" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  const filteredItems = items.filter(shouldShowItem);
  const basePath = getBasePath();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {filteredItems.length === 0 ? (
          <SidebarMenuItem>
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No menu items available
            </div>
          </SidebarMenuItem>
        ) : (
          filteredItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  href={`${basePath}${item.url}`}
                  className="flex items-center w-full"
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
