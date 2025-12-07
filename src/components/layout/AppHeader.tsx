import { Bell, Search, CalendarSync, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader() {
  const navigate = useNavigate();
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
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarSync className="w-4 h-4" />
          <span className="hidden sm:inline">Sync Calendar</span>
        </Button>

        <Button
          size="sm"
          className="gap-2 bg-primary text-primary-foreground hover:brightness-95"
          onClick={() => navigate("/bookings")}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Booking</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-status-error text-[10px] text-background rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b border-border">
              <h4 className="font-semibold text-black">Notifications</h4>
            </div>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-black">Timesheet Pending Approval</p>
                <p className="text-xs text-muted-foreground">2 timesheets need your review</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-black">Resource Conflict</p>
                <p className="text-xs text-muted-foreground">John Doe is overbooked on Dec 15</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="text-sm font-medium text-black">New Project Assigned</p>
                <p className="text-xs text-muted-foreground">You've been added to Project Alpha</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-black">Yash</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
