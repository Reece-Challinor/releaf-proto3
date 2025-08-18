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
        px-3 py-1.5 text-xs font-medium rounded-re-pill transition-all duration-200
        ${isActive 
          ? "bg-olive text-white border border-olive" 
          : "bg-white/90 text-olive border border-olive/30 hover:bg-white"
        }
      `}
    >
      {children}
    </button>
  );
}
