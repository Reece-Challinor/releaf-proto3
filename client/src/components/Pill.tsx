import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export function Pill({ children, isActive = false, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 text-sm font-medium rounded-full transition-colors
        ${isActive 
          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {children}
    </button>
  );
}
