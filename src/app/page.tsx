import { QuickStatsWidget } from "@/components/dashboard/QuickStatsWidget";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold text-black">Good morning, Yash</h1>
        <p className="text-muted-foreground mt-1">Here&apos;s an overview of your resource planning.</p>
      </div>

      {/* Quick Stats */}
      <QuickStatsWidget />
    </div>
  );
}
