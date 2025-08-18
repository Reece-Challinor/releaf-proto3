import { ReactNode } from "react";
import { Check } from "lucide-react";

interface ChoiceButtonProps {
  children: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  subtitle?: string;
}

export function ChoiceButton({ 
  children, 
  isSelected = false, 
  onClick,
  icon,
  subtitle
}: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full p-6 rounded-2xl border-2 transition-all duration-200
        ${isSelected 
          ? "border-olive bg-sand/20 shadow-md" 
          : "border-sage/40 bg-white hover:border-sage hover:shadow-sm"
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-olive rounded-full flex items-center justify-center">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}
      
      <div className="flex flex-col items-center text-center space-y-2">
        {icon && (
          <div className="w-16 h-16 mb-2">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-charcoal">
          {children}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
}