import { AlertCircle, Clock, Users, CheckCircle } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import mockData from "@/services/mockData";

interface Notification {
  id: string;
  type: "approval" | "waitlist" | "tentative" | "completed";
  title: string;
  description: string;
  count?: number;
}

const typeConfig = {
  approval: { icon: Clock, color: "bg-status-warning/10 text-status-warning border-status-warning/20" },
  waitlist: { icon: Users, color: "bg-status-info/10 text-status-info border-status-info/20" },
  tentative: { icon: AlertCircle, color: "bg-status-error/10 text-status-error border-status-error/20" },
  completed: { icon: CheckCircle, color: "bg-status-success/10 text-status-success border-status-success/20" },
};

export function NotificationsWidget() {
  const notifications: Notification[] = useMemo(() => {
    const allocations = mockData.getProjectAllocations();
    const resources = mockData.getResources();

    const pendingApprovals = Math.ceil(allocations.length * 0.25);
    const unallocatedResources = Math.max(0, resources.length - allocations.length);
    const tentativeCount = Math.ceil(allocations.length * 0.15);

    return [
      { id: "1", type: "approval", title: "Timesheet Approvals", description: "Awaiting your review", count: pendingApprovals },
      { id: "2", type: "waitlist", title: "Unallocated Resources", description: "Pending project assignment", count: unallocatedResources },
      { id: "3", type: "tentative", title: "Tentative Bookings", description: "Need confirmation", count: tentativeCount },
    ];
  }, []);

  return (
    <div className="zebra-card p-6 animate-slide-in stagger-3">
      <h3 className="font-semibold text-lg mb-4 text-black">Pending Actions</h3>

      <div className="space-y-3">
        {notifications.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm",
                config.color
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              {item.count && (
                <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs font-semibold flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
