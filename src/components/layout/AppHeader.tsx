"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function AppHeader() {
  const router = useRouter();
  
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search resources, projects..."
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="gap-2 bg-primary text-primary-foreground hover:brightness-95"
          onClick={() => router.push("/allocations")}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Allocation</span>
        </Button>
      </div>
    </header>
  );
}
