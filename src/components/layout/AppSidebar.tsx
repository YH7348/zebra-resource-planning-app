"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FolderKanban,
  BarChart3,
  Plus,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Allocations", path: "/allocations", icon: Plus },
  { title: "Schedule", path: "/schedule", icon: Calendar },
  { title: "People", path: "/people", icon: Users },
  { title: "Projects", path: "/projects", icon: FolderKanban },
  { title: "Reports", path: "/reports", icon: BarChart3 },
];

export function AppSidebar({ onCollapsedChange }: { onCollapsedChange?: (collapsed: boolean) => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapsedChange?.(newState);
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/" className="flex flex-col items-center gap-2">
          {!collapsed && (
            <div className="flex flex-col items-center animate-fade-in gap-2">
              <img src="/zebra-logo.svg" alt="Zebra ResourceHub" className="w-32" />
            </div>
          )}
          {collapsed && (
            <img src="/zebra-logo.svg" alt="Zebra ResourceHub" className="w-10 h-10 mx-auto" />
          )}
        </Link>
        <button
          onClick={handleCollapse}
          className={cn(
            "p-1.5 rounded-md hover:bg-sidebar-accent transition-colors",
            collapsed && "mx-auto mt-2"
          )}
        >
          {collapsed ? (
            <Menu className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "text-black",
                "hover:bg-[hsl(var(--zebra-lime))] hover:text-black hover:font-medium",
                isActive && "bg-[hsl(var(--zebra-lime))] text-black font-medium shadow-sm",
                collapsed && "justify-center px-2"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <item.icon className={cn("w-5 h-5 shrink-0")} />
              {!collapsed && (
                <span className="animate-fade-in">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
