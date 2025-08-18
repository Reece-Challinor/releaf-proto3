import { useState } from "react";
import { Link } from "wouter";
import { Activity, Play, ArrowRight, Trees, Calendar, FileCheck, User } from "lucide-react";
import { AppShell } from "@/ui/AppShell";
import { HeroWave } from "@/ui/HeroWave";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";
import { ChoiceButton } from "@/components/ChoiceButton";

/**
 * RELEAF Demo Home Page
 * Prototype for investor demos and user testing - NOT production
 * Shows state selection, automation demo, and navigation to other screens
 * No real licensing operations - mock data only
 */
export default function Home() {
  const [selectedState, setSelectedState] = useState("TX");
  const [isRunning, setIsRunning] = useState(false);
  const [activities, setActivities] = useState<string[]>([]);

  const stateOptions = [
    { value: "TX", label: "Texas" },
    { value: "CO", label: "Colorado" },
    { value: "AR", label: "Arkansas" }
  ];

  const runAutomation = () => {
    setIsRunning(true);
    setActivities([]);
    
    const steps = [
      "🔍 Analyzing state requirements...",
      "📋 Identifying required permits...",
      "🏛️ Checking county regulations...",
      "📄 Processing documentation...",
      "✅ Automation complete!"
    ];
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        setActivities(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 1000);
    });
  };

  const screens = [
    {
      path: "/login",
      title: "Login Flow",
      subtitle: "SSO and email authentication",
      icon: <User className="w-full h-full text-olive" />
    },
    {
      path: "/permits",
      title: "Permit Selection",
      subtitle: "Environmental permit types",
      icon: <Trees className="w-full h-full text-forest" />
    },
    {
      path: "/calendar",
      title: "Calendar Booking",
      subtitle: "Schedule site visits",
      icon: <Calendar className="w-full h-full text-sage" />
    },
    {
      path: "#",
      title: "KYC Checkout",
      subtitle: "Coming soon",
      icon: <FileCheck className="w-full h-full text-moss" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-bone">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-forest to-olive overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black/20" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider" style={{ fontFamily: 'var(--font-ui)' }}>
            RELEAF
          </h1>
          <p className="text-xl text-white/90 font-light" style={{ fontFamily: 'var(--font-display)' }}>
            Less red tape. More wild places.
          </p>
        </div>
        
        <HeroWave />
      </div>

      {/* Main Content */}
      <main className="relative -mt-10 z-20">
        <div className="max-w-7xl mx-auto px-4 pb-16">
          {/* Example Screens */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Brand System Examples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {screens.map((screen) => (
                <Link key={screen.path} href={screen.path}>
                  <ChoiceButton
                    icon={screen.icon}
                    subtitle={screen.subtitle}
                  >
                    {screen.title}
                  </ChoiceButton>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* State Selection */}
              <div className="re-card p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Select State
                </h2>
                <SegmentedControl
                  options={stateOptions}
                  value={selectedState}
                  onChange={setSelectedState}
                />
                <p className="mt-3 text-sm text-gray-600">
                  Current selection: {stateOptions.find(s => s.value === selectedState)?.label}
                </p>
              </div>

              {/* Automation Runner */}
              <div className="re-card p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Automation Demo
                </h2>
                <Button
                  onClick={runAutomation}
                  disabled={isRunning}
                  fullWidth
                >
                  {isRunning ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Automation
                    </>
                  )}
                </Button>
                <p className="mt-3 text-sm text-gray-600">
                  Simulate regulatory compliance automation for {selectedState}
                </p>
              </div>

              {/* Status Overview */}
              <div className="re-card p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Compliance Status
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Environmental Impact</span>
                    <Pill isActive>Compliant</Pill>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Safety Standards</span>
                    <Pill isActive>Approved</Pill>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Documentation</span>
                    <Pill>Pending</Pill>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Activity Log */}
            <div className="re-card p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Activity Log
              </h2>
              <div className="space-y-2 min-h-[400px]">
                {activities.length === 0 ? (
                  <p className="text-gray-500 text-sm">No activities yet. Run automation to see updates.</p>
                ) : (
                  activities.map((activity, index) => (
                    <div
                      key={index}
                      className="p-3 bg-sand/50 rounded-lg text-sm text-charcoal animate-fade-in"
                    >
                      {activity}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
