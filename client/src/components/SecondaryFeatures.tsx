export function SecondaryFeatures() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Compliance Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Compliance Overview
          </h3>
          <div className="w-3 h-3 bg-green-400 rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Environmental Impact</span>
            <span className="text-sm font-medium text-green-600">Compliant</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Safety Standards</span>
            <span className="text-sm font-medium text-green-600">Approved</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Documentation</span>
            <span className="text-sm font-medium text-yellow-600">In Review</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <div>
              <p className="text-sm text-gray-900">Permit TX-2024-001 approved</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <div>
              <p className="text-sm text-gray-900">New regulation update available</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <div>
              <p className="text-sm text-gray-900">System maintenance completed</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
