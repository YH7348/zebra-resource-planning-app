"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mockData from "@/services/mockData";

export default function SchedulePage() {
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = Jan, 11 = Dec
  const allocations = mockData.getProjectAllocations();
  const resources = mockData.getResources();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthDates = [
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
    "2026-07",
    "2026-08",
    "2026-09",
    "2026-10",
    "2026-11",
    "2026-12",
  ];

  // Group allocations by resource
  const resourceAllocations = allocations.reduce(
    (acc: Record<string, (typeof allocations)[0][]>, allocation) => {
      if (!acc[allocation.resourceId]) {
        acc[allocation.resourceId] = [];
      }
      acc[allocation.resourceId].push(allocation);
      return acc;
    },
    {}
  );

  const getUtilizationColor = (fte: number | null | undefined) => {
    if (!fte || fte === 0) return "bg-gray-100";
    if (fte < 0.5) return "bg-color-blue-50 border-color-blue-700";
    if (fte < 1) return "bg-color-message-yellow-background border-color-message-yellow";
    return "bg-status-success/10 border-status-success";
  };

  const getUtilizationText = (fte: number | null | undefined) => {
    if (!fte || fte === 0) return "";
    return `${(fte * 100).toFixed(0)}%`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-black">Resource Schedule</h1>
        <p className="text-muted-foreground mt-1">
          View resource allocations and FTE utilization across projects
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="flex items-center justify-between animate-slide-in">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedMonth(Math.max(0, selectedMonth - 1))}
          disabled={selectedMonth === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedMonth === index
                  ? "bg-[hsl(var(--zebra-lime))] text-black"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedMonth(Math.min(11, selectedMonth + 1))}
          disabled={selectedMonth === 11}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Schedule Overview - Annual Timeline */}
      <Card className="p-6 animate-slide-in">
        <h2 className="text-lg font-semibold text-black mb-6">
          Annual Allocation Timeline - 2026
        </h2>

        <div className="space-y-3">
          {/* Monthly Header */}
          <div className="flex gap-1">
            <div className="w-48 flex-shrink-0" />
            {months.map((month) => (
              <div
                key={month}
                className="flex-1 text-center text-xs font-semibold text-black"
              >
                {month}
              </div>
            ))}
          </div>

          {/* Resource Rows */}
          {Object.entries(resourceAllocations).map(([resourceId, rAllocations]) => {
            const resource = resources.find((r) => r.id === resourceId);
            if (!resource) return null;

            return (
              <div
                key={resourceId}
                className="flex gap-1 pb-2 border-b border-gray-200 hover:bg-gray-50 p-2 rounded"
              >
                <div className="w-48 flex-shrink-0">
                  <div>
                    <p className="font-medium text-black text-sm">
                      {resource.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {resource.businessUnit}
                    </p>
                  </div>
                </div>

                {monthDates.map((month) => {
                  let totalFTE = 0;
                  const allocatedProjects: string[] = [];

                  rAllocations.forEach((allocation) => {
                    const fte = allocation.monthlyAllocations[month] || 0;
                    if (fte > 0) {
                      totalFTE += fte;
                      allocatedProjects.push(allocation.projectName);
                    }
                  });

                  return (
                    <div
                      key={month}
                      className={`flex-1 aspect-square border rounded ${getUtilizationColor(totalFTE)} flex items-center justify-center text-xs font-semibold group relative cursor-pointer transition-all duration-200 hover:shadow-md`}
                    >
                      {getUtilizationText(totalFTE)}

                      {/* Tooltip */}
                      {totalFTE > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                          {allocatedProjects.join(", ")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-black mb-3">Utilization Legend</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-100 rounded border border-gray-300" />
              <span className="text-xs text-gray-600">Unallocated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-color-blue-50 rounded border border-color-blue-700" />
              <span className="text-xs text-gray-600">&lt; 50% FTE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-color-message-yellow-background rounded border border-color-message-yellow" />
              <span className="text-xs text-gray-600">50-99% FTE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-status-success/10 rounded border border-status-success" />
              <span className="text-xs text-gray-600">100% FTE</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Detailed View */}
      <Card className="p-6 animate-slide-in stagger-2">
        <h2 className="text-lg font-semibold text-black mb-6">
          {months[selectedMonth]} 2026 - Detailed View
        </h2>

        <div className="space-y-3">
          {Object.entries(resourceAllocations).map(([resourceId, rAllocations]) => {
            const resource = resources.find((r) => r.id === resourceId);
            if (!resource) return null;

            const monthData = monthDates[selectedMonth];
            const monthAllocations = rAllocations
              .filter((a) => a.monthlyAllocations[monthData])
              .map((a) => ({
                ...a,
                fte: a.monthlyAllocations[monthData],
                monthlyCost: mockData.calculateMonthlyCost(
                  a.hourlyRate,
                  a.monthlyAllocations[monthData],
                  a.monthlyWorkdays[monthData]
                ),
              }));

            if (monthAllocations.length === 0) return null;

            return (
              <Card
                key={resourceId}
                className="p-4 bg-gray-50 border-l-4 border-[hsl(var(--zebra-lime))]"
              >
                <div className="mb-3">
                  <h3 className="font-semibold text-black">{resource.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {resource.role || resource.businessUnit} • Rate: $
                    {resource.hourlyRate}/hr
                  </p>
                </div>

                <div className="space-y-2">
                  {monthAllocations.map((allocation) => (
                    <div
                      key={allocation.id}
                      className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-black text-sm">
                          {allocation.projectName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {allocation.functionalTeam}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-bold text-black">
                            {(allocation.fte * 100).toFixed(0)}% FTE
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {allocation.monthlyWorkdays[monthData] || 20} workdays
                          </div>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <div className="text-sm font-bold text-green-700">
                            ${allocation.monthlyCost.toFixed(0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            monthly
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total for month */}
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Total FTE</p>
                    <p className="text-lg font-bold text-black">
                      {monthAllocations
                        .reduce((sum, a) => sum + a.fte, 0)
                        .toFixed(1)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-in stagger-3">
        {(() => {
          const monthData = monthDates[selectedMonth];
          const monthAllocations = allocations
            .filter((a) => a.monthlyAllocations[monthData])
            .map((a) => ({
              ...a,
              fte: a.monthlyAllocations[monthData],
              monthlyCost: mockData.calculateMonthlyCost(
                a.hourlyRate,
                a.monthlyAllocations[monthData],
                a.monthlyWorkdays[monthData]
              ),
            }));

          const totalFTE = monthAllocations.reduce((sum, a) => sum + a.fte, 0);
          const totalCost = monthAllocations.reduce((sum, a) => sum + a.monthlyCost, 0);
          const avgUtilization = (
            (totalFTE / monthAllocations.length) * 100
          ).toFixed(0);

          return (
            <>
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
                <p className="text-xs font-semibold text-green-700 uppercase">
                  Total FTE
                </p>
                <p className="text-3xl font-bold text-black mt-2">
                  {totalFTE.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {monthAllocations.length} allocations
                </p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-xs font-semibold text-color-blue-700 uppercase">
                  Monthly Cost
                </p>
                <p className="text-3xl font-bold text-black mt-2">
                  ${(totalCost / 1000).toFixed(1)}K
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  for {months[selectedMonth]} 2026
                </p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <p className="text-xs font-semibold text-color-message-yellow uppercase">
                  Avg Utilization
                </p>
                <p className="text-3xl font-bold text-black mt-2">
                  {avgUtilization}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  resource utilization
                </p>
              </Card>
            </>
          );
        })()}
      </div>
    </div>
  );
}
