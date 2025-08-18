interface StepperDotsProps {
  count: number;
  active: number;
}

export function StepperDots({ count, active }: StepperDotsProps) {
  return (
    <div className="flex justify-center items-center gap-2 py-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`
            transition-all duration-300 rounded-full
            ${index === active 
              ? "w-8 h-2 bg-olive" 
              : index < active
              ? "w-2 h-2 bg-sage"
              : "w-2 h-2 bg-sage/40"
            }
          `}
        />
      ))}
    </div>
  );
}