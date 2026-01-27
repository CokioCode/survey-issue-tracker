"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  role?: "ADMIN" | "USER";
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainProps {
  items: NavMainItem[];
}

export function NavMain({
  items,
  userRole,
}: NavMainProps & { userRole: "ADMIN" | "USER" | undefined }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items
          .filter((item) => {
            if (!item.role) return true;
            if (!userRole) return false;
            return item.role === userRole;
          })
          .map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link
                  href={`${userRole === "ADMIN" ? "/admin" : "/user"}${item.url}`}
                  className="flex items-center w-full"
                >
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
