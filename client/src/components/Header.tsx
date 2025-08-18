import { Pill } from "./Pill";
import { useState } from "react";

export function Header() {
  const [investorMode, setInvestorMode] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-emerald-700">
              RELEAF
            </h1>
            <p className="text-xs text-gray-600 -mt-1">
              Less red tape. More wild places.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Pill 
              isActive={investorMode} 
              onClick={() => setInvestorMode(!investorMode)}
            >
              Investor Mode
            </Pill>
            <Pill 
              isActive={demoMode} 
              onClick={() => setDemoMode(!demoMode)}
            >
              Demo
            </Pill>
          </div>
        </div>
      </div>
    </div>
  );
}
