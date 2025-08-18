import { useState } from "react";
import { Link } from "wouter";
import { AppShell } from "@/ui/AppShell";
import { ChoiceButton } from "@/components/ChoiceButton";
import { Button } from "@/components/Button";
import { StepperDots } from "@/components/StepperDots";
import { Trees, Mountain, Fish, Tent } from "lucide-react";

/**
 * RELEAF Demo Permit Selection Page
 * Prototype for investor demos - shows license type selection flow
 * This is mock data for demonstration purposes only
 */
export default function Permits() {
  const [selectedPermit, setSelectedPermit] = useState<string | null>(null);

  // Mock permit/license types for demo
  const permits = [
    {
      id: "timber",
      title: "Timber Harvesting",
      subtitle: "For commercial logging operations",
      icon: <Trees className="w-full h-full text-forest" />
    },
    {
      id: "mining",
      title: "Mining & Extraction",
      subtitle: "For mineral and resource extraction",
      icon: <Mountain className="w-full h-full text-olive" />
    },
    {
      id: "aquatic",
      title: "Aquatic Resources",
      subtitle: "For water and fishery management",
      icon: <Fish className="w-full h-full text-sage" />
    },
    {
      id: "recreation",
      title: "Recreation & Tourism",
      subtitle: "For outdoor recreation facilities",
      icon: <Tent className="w-full h-full text-moss" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-bone">
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Select Permit Type
            </h1>
            <p className="text-gray-600">
              Choose the type of environmental permit you need for your project
            </p>
          </div>

          {/* Progress Indicator */}
          <StepperDots count={4} active={1} />

          {/* Permit Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
            {permits.map((permit) => (
              <ChoiceButton
                key={permit.id}
                isSelected={selectedPermit === permit.id}
                onClick={() => setSelectedPermit(permit.id)}
                icon={permit.icon}
                subtitle={permit.subtitle}
              >
                {permit.title}
              </ChoiceButton>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Link href="/">
              <Button variant="ghost">
                Back to Home
              </Button>
            </Link>
            <Link href="/calendar">
              <Button 
                disabled={!selectedPermit}
              >
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    </div>
  );
}