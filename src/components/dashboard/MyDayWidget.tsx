import { Clock } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import mockData from "@/services/mockData";

interface Booking {
  id: string;
  time: string;
  title: string;
  project: string;
  type: "meeting" | "work" | "review";
}

const typeColors = {
  meeting: "bg-color-blue-50 border-color-blue-700/30 text-color-blue-700",
  work: "bg-green-50 border-green-700/30 text-green-700",
  review: "bg-color-message-yellow-background border-color-message-yellow/30 text-color-message-yellow",
};

export function MyDayWidget() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { bookings, totalHours } = useMemo(() => {
    const allocations = mockData.getProjectAllocations();
    const projects = mockData.getProjects();
    const times = ["09:00 - 10:30", "10:30 - 12:00", "13:00 - 14:00", "14:30 - 17:00"];
    const types: ("meeting" | "work" | "review")[] = ["meeting", "work", "review", "work"];
    const titles = ["Resource Planning", "Project Development", "Performance Review", "Technical Sync"];

    const generatedBookings: Booking[] = allocations.slice(0, 4).map((allocation, index) => {
      const project = projects.find(p => p.id === allocation.projectId);
      return {
        id: `${index}`,
        time: times[index],
        title: titles[index],
        project: project?.name || "Unknown Project",
        type: types[index],
      };
    });

    const hours = [1.5, 1.5, 1, 2.5].reduce((sum) => sum, 0);
    return { bookings: generatedBookings, totalHours: hours.toFixed(1) };
  }, []);

  return (
    <div className="zebra-card p-6 animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-black">My Day</h3>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{totalHours}h scheduled</span>
        </div>
      </div>

      <div className="space-y-3">
        {bookings.map((booking, index) => (
          <div
            key={booking.id}
            className={cn(
              "p-3 rounded-lg border transition-all duration-200 hover:shadow-sm cursor-pointer",
              typeColors[booking.type],
              "opacity-0 animate-slide-in"
            )}
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{booking.title}</p>
                <p className="text-sm text-muted-foreground">{booking.project}</p>
              </div>
              <span className="text-xs font-medium">{booking.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
