import {
  IconClipboardList,
  IconLayoutDashboard,
  IconUsers,
} from "@tabler/icons-react";
import type { NavMainItem } from "@/components/layout/NavMain";

interface SidebarData {
  navMain: NavMainItem[];
}

export const sidebarData: SidebarData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Surveys",
      url: "/surveys",
      icon: IconClipboardList,
    },
    {
      title: "Users",
      url: "/users",
      icon: IconUsers,
      role: "ADMIN",
    },
  ],
};
