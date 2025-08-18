import { useState } from "react";

const states = ["TX", "CO", "AR"] as const;
type State = (typeof states)[number];

export function StateSelector() {
  const [selectedState, setSelectedState] = useState<State>("TX");

  return (
    <div className="mb-8">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Select State
      </p>
      <div className="inline-flex bg-gray-100 p-1 rounded-lg">
        {states.map((state) => (
          <button
            key={state}
            onClick={() => setSelectedState(state)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${selectedState === state
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
}
