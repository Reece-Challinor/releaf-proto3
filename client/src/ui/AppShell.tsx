import { ReactNode } from "react";
import { Pill } from "@/components/Pill";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'var(--font-ui)' }}>
                RELEAF
              </h1>
            </div>
            
            <div className="flex gap-2">
              <Pill isActive={false}>
                Investor Mode
              </Pill>
              <Pill isActive={false}>
                Demo
              </Pill>
            </div>
          </div>
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
}