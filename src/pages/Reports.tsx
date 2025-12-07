import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import mockData from "@/services/mockData";

export default function Reports() {
  const financialSummary = mockData.getProjectFinancialSummary();
  const resourceUtilization = mockData.getResourceUtilization();
  const financialData = mockData.getFinancialData();
  const projects = mockData.getProjects();

  // Calculate overall statistics
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const overallStats = useMemo(() => {
    const totalCost = Object.values(financialSummary).reduce(
      (sum, p) => sum + p.totalCost,
      0
    );

    const monthlyTotals: Record<string, number> = {};
    const monthlyFTE: Record<string, number> = {};

    financialData.forEach((data) => {
      monthlyTotals[data.month] = (monthlyTotals[data.month] || 0) + data.monthlyCost;
      monthlyFTE[data.month] = (monthlyFTE[data.month] || 0) + data.fte;
    });

    const months = [
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

    const maxMonthlyCost = Math.max(...months.map((m) => monthlyTotals[m] || 0));
    const avgMonthlyCost = totalCost / 12;

    const totalAllocations = Object.values(resourceUtilization).length;
    const fullyUtilized = Object.values(resourceUtilization).filter(
      (r) => r.avgUtilization >= 80
    ).length;

    return {
      totalCost,
      monthlyTotals,
      monthlyFTE,
      maxMonthlyCost,
      avgMonthlyCost,
      months,
      totalAllocations,
      fullyUtilized,
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-black">Resource Reports</h1>
        <p className="text-muted-foreground mt-1">
          Financial tracking, utilization, and trends for 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-in">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <p className="text-xs font-semibold text-green-700 uppercase">
            Total Cost
          </p>
          <p className="text-3xl font-bold text-black mt-2">
            ${(overallStats.totalCost / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-muted-foreground mt-1">Full Year 2026</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-xs font-semibold text-color-blue-700 uppercase">
            Avg Monthly
          </p>
          <p className="text-3xl font-bold text-black mt-2">
            ${(overallStats.avgMonthlyCost / 1000).toFixed(1)}K
          </p>
          <p className="text-xs text-muted-foreground mt-1">Per Month</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <p className="text-xs font-semibold text-purple-700 uppercase">
            Resources
          </p>
          <p className="text-3xl font-bold text-black mt-2">
            {overallStats.totalAllocations}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Active</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <p className="text-xs font-semibold text-color-message-yellow uppercase">
            Utilization
          </p>
          <p className="text-3xl font-bold text-black mt-2">
            {overallStats.fullyUtilized}
          </p>
          <p className="text-xs text-muted-foreground mt-1">80%+ Utilized</p>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-4 mt-6">
          {/* Project Costs */}
          <Card className="p-6 animate-slide-in">
            <h2 className="text-lg font-semibold text-black mb-6">
              Project Financial Summary
            </h2>

            <div className="space-y-4">
              {Object.entries(financialSummary)
                .sort(([, a], [, b]) => b.totalCost - a.totalCost)
                .map(([projectId, summary]) => {
                  const project = projects.find((p) => p.id === projectId);
                  if (!project) return null;

                  const q1 = summary.quarterlyBreakdown[1] || 0;
                  const q2 = summary.quarterlyBreakdown[2] || 0;
                  const q3 = summary.quarterlyBreakdown[3] || 0;
                  const q4 = summary.quarterlyBreakdown[4] || 0;
                  const maxQuarter = Math.max(q1, q2, q3, q4);

                  return (
                    <div
                      key={projectId}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-black">
                            {project.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {summary.resourceCount} resources
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-700">
                            ${(summary.totalCost / 1000).toFixed(1)}K
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Annual
                          </p>
                        </div>
                      </div>

                      {/* Quarterly Breakdown Chart */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { q: 1, cost: q1 },
                            { q: 2, cost: q2 },
                            { q: 3, cost: q3 },
                            { q: 4, cost: q4 },
                          ].map(({ q, cost }) => (
                            <div key={q} className="space-y-2">
                              <div className="h-20 bg-white rounded border border-gray-300 flex items-end justify-center p-1">
                                <div
                                  className="w-full bg-gradient-to-t from-[hsl(var(--zebra-lime))] to-green-400 rounded-t transition-all"
                                  style={{
                                    height: `${maxQuarter > 0 ? (cost / maxQuarter) * 100 : 0}%`,
                                  }}
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-black">
                                  Q{q}
                                </p>
                                <p className="text-xs text-green-700">
                                  ${(cost / 1000).toFixed(1)}K
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Monthly breakdown */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                          Monthly Costs
                        </p>
                        <div className="grid grid-cols-12 gap-1">
                          {[
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
                          ].map((month, index) => {
                            const monthKey = `2026-${String(index + 1).padStart(2, "0")}`;
                            const monthlyCost = summary.monthlyBreakdown[monthKey] || 0;
                            const maxMonthly = Math.max(
                              ...Object.values(summary.monthlyBreakdown)
                            );

                            return (
                              <div key={month} className="text-center group">
                                <div className="h-12 bg-white rounded border border-gray-300 flex items-end justify-center p-0.5 relative">
                                  <div
                                    className="w-full bg-blue-400 rounded-t transition-all"
                                    style={{
                                      height: `${maxMonthly > 0 ? (monthlyCost / maxMonthly) * 100 : 0}%`,
                                    }}
                                  />
                                  {/* Tooltip */}
                                  {monthlyCost > 0 && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                      ${(monthlyCost / 1000).toFixed(1)}K
                                    </div>
                                  )}
                                </div>
                                <p className="text-xs font-semibold text-black mt-1">
                                  {month}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </TabsContent>

        {/* Utilization Reports */}
        <TabsContent value="utilization" className="space-y-4 mt-6">
          <Card className="p-6 animate-slide-in">
            <h2 className="text-lg font-semibold text-black mb-6">
              Resource Utilization Report
            </h2>

            <div className="space-y-4">
              {Object.entries(resourceUtilization)
                .sort(([, a], [, b]) => b.avgUtilization - a.avgUtilization)
                .map(([resourceId, util]) => (
                  <div
                    key={resourceId}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-black">
                          {util.resourceName}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Total Allocation: {util.totalAllocation.toFixed(1)} FTE
                        </p>
                      </div>
                      <Badge
                        className={`${
                          util.avgUtilization >= 80
                            ? "bg-status-success/10 text-status-success"
                            : util.avgUtilization >= 50
                              ? "bg-color-message-yellow-background text-color-message-yellow"
                              : "bg-color-message-red-background text-color-message-red"
                        } border`}
                        variant="outline"
                      >
                        {util.avgUtilization}%
                      </Badge>
                    </div>

                    {/* Monthly Utilization Bars */}
                    <div className="grid grid-cols-12 gap-1">
                      {[
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
                      ].map((month, index) => {
                        const monthKey = `2026-${String(index + 1).padStart(2, "0")}`;
                        const monthlyFTE = util.monthlyBreakdown[monthKey] || 0;
                        const maxFTE = Math.max(
                          ...Object.values(util.monthlyBreakdown)
                        );

                        return (
                          <div key={month} className="text-center group">
                            <div className="h-12 bg-white rounded border border-gray-300 flex items-end justify-center p-0.5 relative">
                              <div
                                className={`w-full rounded-t transition-all ${
                                  monthlyFTE === 0
                                    ? "bg-gray-300"
                                    : monthlyFTE < 0.5
                                      ? "bg-color-blue-700"
                                      : monthlyFTE < 1
                                        ? "bg-color-message-yellow"
                                        : "bg-status-success"
                                }`}
                                style={{
                                  height: `${maxFTE > 0 ? (monthlyFTE / maxFTE) * 100 : 0}%`,
                                }}
                              />
                              {/* Tooltip */}
                              {monthlyFTE > 0 && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                  {(monthlyFTE * 100).toFixed(0)}% FTE
                                </div>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-black mt-1">
                              {month}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* Trend Analysis */}
        <TabsContent value="trends" className="space-y-4 mt-6">
          <Card className="p-6 animate-slide-in">
            <h2 className="text-lg font-semibold text-black mb-6">
              Cost & FTE Trends
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Cost Trend */}
              <div>
                <h3 className="font-semibold text-black mb-4">
                  Monthly Cost Trend
                </h3>
                <div className="space-y-3">
                  {overallStats.months.map((month) => {
                    const cost = overallStats.monthlyTotals[month] || 0;
                    const pct = (cost / overallStats.maxMonthlyCost) * 100;

                    return (
                      <div key={month} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-black">
                            {month.split("-")[1]}
                          </span>
                          <span className="font-bold text-green-700">
                            ${(cost / 1000).toFixed(1)}K
                          </span>
                        </div>
                        <Progress
                          value={pct}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly FTE Trend */}
              <div>
                <h3 className="font-semibold text-black mb-4">
                  Monthly FTE Trend
                </h3>
                <div className="space-y-3">
                  {overallStats.months.map((month) => {
                    const fte = overallStats.monthlyFTE[month] || 0;
                    const maxFTE = Math.max(
                      ...overallStats.months.map((m) => overallStats.monthlyFTE[m] || 0)
                    );
                    const pct = (fte / maxFTE) * 100;

                    return (
                      <div key={month} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-black">
                            {month.split("-")[1]}
                          </span>
                          <span className="font-bold text-color-blue-700">
                            {fte.toFixed(1)} FTE
                          </span>
                        </div>
                        <Progress
                          value={pct}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <p className="text-sm font-semibold text-black">Key Insights</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • Peak allocation: {Math.max(...overallStats.months.map((m) => overallStats.monthlyFTE[m] || 0)).toFixed(1)}{" "}
                  FTE
                </li>
                <li>
                  • Average monthly cost: ${(overallStats.avgMonthlyCost / 1000).toFixed(1)}K
                </li>
                <li>
                  • {overallStats.fullyUtilized} of {overallStats.totalAllocations} resources at 80%+ utilization
                </li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
