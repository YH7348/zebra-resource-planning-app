import { Calendar, Plus, Plane, Briefcase, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeOff {
  id: string;
  type: "vacation" | "sick" | "personal";
  startDate: string;
  endDate: string;
  status: "approved" | "pending";
}

const mockTimeOff: TimeOff[] = [
  { id: "1", type: "vacation", startDate: "Dec 23", endDate: "Dec 27", status: "approved" },
  { id: "2", type: "personal", startDate: "Jan 2", endDate: "Jan 2", status: "pending" },
];

const typeConfig = {
  vacation: { icon: Plane, label: "Vacation", color: "text-status-info" },
  sick: { icon: Heart, label: "Sick Leave", color: "text-status-error" },
  personal: { icon: Briefcase, label: "Personal", color: "text-status-warning" },
};

export function TimeOffWidget() {
  return (
    <div className="zebra-card p-6 animate-slide-in stagger-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-lg text-black">Time Off</h3>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Request
        </Button>
      </div>

      <div className="space-y-3">
        {mockTimeOff.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-background", config.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{config.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.startDate} {item.startDate !== item.endDate && `- ${item.endDate}`}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  item.status === "approved"
                    ? "bg-status-success/10 text-status-success"
                    : "bg-status-warning/10 text-status-warning"
                )}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Remaining PTO</span>
          <span className="font-semibold">12 days</span>
        </div>
      </div>
    </div>
  );
}
