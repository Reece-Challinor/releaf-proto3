import { Play } from "lucide-react";
import { ActivityLog } from "./ActivityLog";
import { Button } from "./Button";
import { useState } from "react";

interface Stats {
  processed: number;
  pending: number;
  runtime: string;
}

export function AutomationDemo() {
  const [activities, setActivities] = useState<Array<{
    id: string;
    timestamp: string;
    message: string;
    status: "success" | "info" | "warning";
  }>>([]);
  
  const [stats, setStats] = useState<Stats>({
    processed: 0,
    pending: 0,
    runtime: "--",
  });
  
  const [isRunning, setIsRunning] = useState(false);

  const runAutomation = async () => {
    setIsRunning(true);
    setActivities([]);
    setStats({ processed: 0, pending: 0, runtime: "--" });

    const startTime = Date.now();

    // Simulate automation steps
    const steps = [
      { message: "Initializing Texas regulatory data fetch...", delay: 1000 },
      { message: "Processing permit requirements...", delay: 2000 },
      { message: "Validating compliance standards...", delay: 1500 },
      { message: "Automation completed successfully.", delay: 1000 },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].delay));
      
      const timestamp = new Date().toLocaleTimeString();
      const newActivity = {
        id: `activity-${i}`,
        timestamp,
        message: steps[i].message,
        status: i === steps.length - 1 ? ("success" as const) : ("info" as const),
      };

      setActivities(prev => [...prev, newActivity]);
      
      // Update stats
      setStats({
        processed: i + 1,
        pending: steps.length - i - 1,
        runtime: `${Math.floor((Date.now() - startTime) / 1000)}s`,
      });
    }

    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Automation Demo
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-emerald-400" : "bg-gray-300"}`} />
          <span>{isRunning ? "Running" : "Ready"}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Button
            size="lg"
            onClick={runAutomation}
            isLoading={isRunning}
            className="w-full sm:w-auto"
          >
            <Play size={20} className="mr-2" />
            {isRunning ? "Running..." : "Run Automation"}
          </Button>
        </div>

        <ActivityLog activities={activities} />

        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-emerald-600">
                {stats.processed}
              </div>
              <div className="text-xs text-gray-500">
                Processed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">
                {stats.pending}
              </div>
              <div className="text-xs text-gray-500">
                Pending
              </div>
            </div>
            <div className="text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-semibold text-gray-400">
                {stats.runtime}
              </div>
              <div className="text-xs text-gray-500">
                Runtime
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
