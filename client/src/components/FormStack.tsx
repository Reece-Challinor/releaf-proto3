import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
}

export function FormField({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange,
  helpText 
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-sage/40 bg-white focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/25 transition-all"
      />
      {helpText && (
        <p className="text-xs text-gray-600">{helpText}</p>
      )}
    </div>
  );
}

interface FormStackProps {
  children: ReactNode;
}

export function FormStack({ children }: FormStackProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
}