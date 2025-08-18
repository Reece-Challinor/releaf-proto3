interface Option {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex p-1 bg-sand/50 rounded-xl">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
            ${value === option.value 
              ? "bg-olive text-white shadow-sm" 
              : "text-charcoal hover:bg-white/50"
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}