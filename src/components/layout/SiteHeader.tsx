"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="flex h-12 items-center gap-4 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 hover:bg-slate-100 transition-colors" />
          <Separator orientation="vertical" className="h-6 bg-slate-300" />
        </div>
      </div>
    </header>
  );
}
