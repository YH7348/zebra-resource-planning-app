import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Download, Send, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockData from "@/services/mockData";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

interface PendingTimesheet {
  id: string;
  user: string;
  period: string;
  totalHours: number;
  status: "awaiting" | "pending" | "approved";
}

export default function Timesheets() {
  const [currentWeek] = useState("December 8 - 12, 2025");
  const allocations = mockData.getProjectAllocations();
  const resources = mockData.getResources();
  const projects = mockData.getProjects();

  // Generate timesheet entries from real allocation data
  const timesheetEntries = useMemo(() => {
    return allocations.map((allocation, index) => {
      const resource = resources.find(r => r.id === allocation.resourceId);
      const project = projects.find(p => p.id === allocation.projectId);
      
      // Calculate hours based on FTE allocation (40 hour work week)
      // Assuming December 8-12 is a typical work week
      const monthlyFTE = allocation.monthlyAllocations["2026-12"] || 0.5;
      const hoursPerDay = (monthlyFTE * 40) / 5; // 40 hours per week / 5 days
      const hours = [hoursPerDay, hoursPerDay, hoursPerDay, hoursPerDay, hoursPerDay];
      const total = hours.reduce((sum, h) => sum + h, 0);

      return {
        id: `${index}`,
        project: project?.name || "Unknown Project",
        resource: resource?.name || "Unknown Resource",
        hours: hours.map(h => Math.round(h * 10) / 10), // Round to 1 decimal
        total: Math.round(total * 10) / 10,
      };
    });
  }, [allocations, resources, projects]);

  // Generate pending timesheets from resources
  const pendingTimesheets: PendingTimesheet[] = useMemo(() => {
    return resources.slice(0, 3).map((resource, index) => {
      const statuses: ("awaiting" | "pending" | "approved")[] = ["pending", "pending", "awaiting"];
      return {
        id: `${index}`,
        user: resource.name,
        period: "Dec 8-12",
        totalHours: 40,
        status: statuses[index],
      };
    });
  }, [resources]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold text-black">Timesheets</h1>
          <p className="text-muted-foreground mt-1">Track and submit your working hours</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:brightness-95">
            <Send className="w-4 h-4" />
            Submit Week
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-timesheet" className="animate-slide-in">
        <TabsList className="mb-6">
          <TabsTrigger value="my-timesheet">My Timesheet</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending Review
            <span className="ml-2 w-5 h-5 rounded-full bg-status-warning text-background text-xs flex items-center justify-center">
              2
            </span>
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="my-timesheet" className="space-y-6">
          {/* Week Navigation */}
          <div className="flex items-center justify-between zebra-card p-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-medium">{currentWeek}</h2>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Timesheet Grid */}
          <div className="zebra-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2fr_repeat(5,1fr)_100px] border-b border-border bg-muted/30">
              <div className="p-4 font-medium text-sm">Project / Resource</div>
              {days.map((day) => (
                <div key={day} className="p-4 font-medium text-sm text-center border-l border-border">
                  {day}
                </div>
              ))}
              <div className="p-4 font-medium text-sm text-center border-l border-border">Total</div>
            </div>

            {/* Entries */}
            {timesheetEntries.length > 0 ? (
              timesheetEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-[2fr_repeat(5,1fr)_100px] border-b border-border last:border-b-0 hover:bg-muted/10 transition-colors"
                >
                  <div className="p-4">
                    <p className="font-medium text-sm">{entry.project}</p>
                    <p className="text-xs text-muted-foreground">{entry.resource}</p>
                  </div>
                  {entry.hours.map((hours, dayIndex) => (
                    <div key={dayIndex} className="p-2 border-l border-border flex items-center justify-center">
                      <Input
                        type="number"
                        defaultValue={hours > 0 ? hours.toFixed(1) : ""}
                        placeholder="0"
                        className="w-16 h-10 text-center"
                        min={0}
                        max={24}
                      />
                    </div>
                  ))}
                  <div className="p-4 border-l border-border flex items-center justify-center">
                    <span className="font-semibold">{entry.total.toFixed(1)}h</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No timesheet entries available
              </div>
            )}

            {/* Totals Row */}
            <div className="grid grid-cols-[2fr_repeat(5,1fr)_100px] bg-muted/30">
              <div className="p-4 font-semibold text-sm">Daily Total</div>
              {[8, 8, 8, 8, 8].map((total, index) => (
                <div key={index} className="p-4 font-semibold text-sm text-center border-l border-border">
                  {total}h
                </div>
              ))}
              <div className="p-4 font-semibold text-sm text-center border-l border-border text-primary">
                40h
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingTimesheets.filter(t => t.status === "pending").map((timesheet, index) => (
            <div
              key={timesheet.id}
              className="zebra-card p-4 flex items-center justify-between animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-status-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-status-warning" />
                </div>
                <div>
                  <p className="font-medium">{timesheet.user}</p>
                  <p className="text-sm text-muted-foreground">Week of {timesheet.period} • {timesheet.totalHours}h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Reject</Button>
                <Button size="sm" className="gap-2 bg-status-success text-background hover:bg-status-success/90">
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="approved">
          <div className="text-center py-12 text-muted-foreground">
            <Check className="w-12 h-12 mx-auto mb-4 text-status-success" />
            <p>All timesheets have been processed</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
