import { ReactNode } from "react";

/**
 * AppShell Component - Main layout wrapper with RELEAF branding
 * Demo prototype shell for investor presentations
 * Provides consistent header with navigation pills across all demo pages
 * Part of the retro-modern outdoor design system (WPA/Orvis feel)
 */
interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <h1
            className="text-xl font-bold tracking-wider text-forest"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            RELEAF
          </h1>
          {/* room for future actions (profile, settings) */}
          <div className="h-6 w-6" />
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
}