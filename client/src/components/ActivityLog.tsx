interface Activity {
  id: string;
  timestamp: string;
  message: string;
  status: "success" | "info" | "warning";
}

interface ActivityLogProps {
  activities: Activity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "success":
        return "bg-emerald-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-3">
        Activity Log
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[120px]">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No activity yet.
          </p>
        ) : (
          <div className="space-y-2">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${getStatusColor(activity.status)}`} />
                <div className="flex-1">
                  <p className="text-xs text-gray-600">
                    {activity.timestamp}
                  </p>
                  <p className="text-sm text-gray-900">
                    {activity.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
