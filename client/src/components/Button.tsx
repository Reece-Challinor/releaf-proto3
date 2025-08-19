import { ReactNode } from "react";

/**
 * Button Component - Core UI element with RELEAF brand styling
 * Demo prototype component for investor presentations
 * Supports multiple variants matching the retro-modern outdoor theme (WPA/Orvis feel)
 */
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  fullWidth = false
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] touch-none";
  const shadowStyle = { boxShadow: "var(--shadow-button)" };
  
  const variantClasses = {
    primary: "bg-olive hover:bg-forest text-white focus:ring-olive hover:shadow-lg",
    secondary: "bg-sand hover:bg-sage/30 text-forest focus:ring-sage border border-sage/20",
    outline: "border-2 border-olive text-olive hover:bg-sand/20 focus:ring-olive",
    ghost: "hover:bg-sand/20 text-olive focus:ring-sage"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm min-h-[40px]",
    md: "px-6 py-3 text-sm min-h-[44px]",
    lg: "px-8 py-4 text-base min-h-[48px]"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={shadowStyle}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}