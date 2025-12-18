"use client";

import { TrendingUp, Users, FolderKanban, DollarSign } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import mockData from "@/services/mockData";

interface Stat {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: typeof TrendingUp;
}

export function QuickStatsWidget() {
  const stats: Stat[] = useMemo(() => {
    const allocations = mockData.getProjectAllocations();
    const projects = mockData.getProjects();
    const financialData = mockData.getFinancialData();
    const resourceUtilization = mockData.getResourceUtilization();

    const activeResources = allocations.length;
    const activeProjects = projects.length;
    const totalMonthlyCost = financialData.reduce((sum, data) => sum + data.monthlyCost, 0);
    const formattedCost = `$${(totalMonthlyCost / 1000).toFixed(1)}K`;
    const avgUtilization = Object.values(resourceUtilization).reduce((sum, r) => sum + r.avgUtilization, 0) / Object.keys(resourceUtilization).length;
    const utilizationPercent = Math.round(avgUtilization);

    return [
      { label: "Avg Utilization", value: `${utilizationPercent}%`, change: "+3%", changeType: "positive", icon: TrendingUp },
      { label: "Active Resources", value: `${activeResources}`, change: `+${Math.floor(activeResources / 2)}`, changeType: "positive", icon: Users },
      { label: "Active Projects", value: `${activeProjects}`, change: "0", changeType: "neutral", icon: FolderKanban },
      { label: "Monthly Cost", value: formattedCost, change: "+2%", changeType: "positive", icon: DollarSign },
    ];
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="zebra-card p-4 animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
              <stat.icon className="w-5 h-5 text-gray-700" />
            </div>
          </div>
          {stat.change && (
            <p
              className={cn(
                "text-xs mt-2 font-medium",
                stat.changeType === "positive" && "text-status-success",
                stat.changeType === "negative" && "text-status-error",
                stat.changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {stat.change} from last week
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
