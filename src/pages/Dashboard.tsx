import { MyDayWidget } from "@/components/dashboard/MyDayWidget";
import { TimeOffWidget } from "@/components/dashboard/TimeOffWidget";
import { NotificationsWidget } from "@/components/dashboard/NotificationsWidget";
import { QuickStatsWidget } from "@/components/dashboard/QuickStatsWidget";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-black">Good morning, Yash</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your resources today.</p>
      </div>

      {/* Quick Stats */}
      <QuickStatsWidget />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - My Day */}
        <div className="lg:col-span-2">
          <MyDayWidget />
        </div>

        {/* Right Column - Widgets */}
        <div className="space-y-6">
          <TimeOffWidget />
          <NotificationsWidget />
        </div>
      </div>
    </div>
  );
}
