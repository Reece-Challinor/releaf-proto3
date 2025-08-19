import { useState, useCallback, useMemo } from "react";
import { Link } from "wouter";
import { Activity, Play, ArrowRight, Trees, Calendar, FileCheck, User } from "lucide-react";
import { AppShell } from "@/ui/AppShell";
import { HeroWave } from "@/ui/HeroWave";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";
import { ChoiceButton } from "@/components/ChoiceButton";
import AutomationLog from "@/components/AutomationLog";
import ProfileCard from "@/components/ProfileCard";
import { STATES, LICENSES } from "@/constants/catalog";
import { MOCK_PROFILE } from "@/constants/profile";

/**
 * RELEAF Demo Home Page
 * Prototype for investor demos and user testing - NOT production
 * Shows state selection, automation demo, and navigation to other screens
 * No real licensing operations - mock data only
 */
export default function Home() {
  const [stateCode, setStateCode] = useState("TX");
  const [log, setLog] = useState<{t:string; msg:string}[]>([]);
  const [running, setRunning] = useState(false);
  const [autofill, setAutofill] = useState(true);
  
  // License management based on selected state
  const licenseList = useMemo(() => LICENSES[stateCode] || [], [stateCode]);
  const [licenseId, setLicenseId] = useState(licenseList[0]?.id || "TX-HUNT-RES");

  function ts() { 
    return new Date().toLocaleTimeString(); 
  }

  const runAutomation = useCallback(async () => {
    setRunning(true);
    setLog([]);
    
    try {
      // Log the current selections
      setLog([{ 
        t: ts(), 
        msg: `Starting automation for ${stateCode} • ${licenseId} • Profile: ${autofill ? 'enabled' : 'disabled'}` 
      }]);
      
      // Call the new automation endpoint
      const res = await fetch("/api/automation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ 
          state: stateCode, 
          license: licenseId, 
          autofill: autofill,
          profile: autofill ? MOCK_PROFILE : undefined
        })
      });
      
      const data = await res.json();
      
      if (!data.ok) { 
        setLog(x => [...x, { t: ts(), msg: "Error starting automation" }]); 
        setRunning(false); 
        return; 
      }

      // Animate through the steps
      for (const step of data.steps) {
        setLog(x => [...x, { t: ts(), msg: step.label }]);
        // simulate time passing
        await new Promise(r => setTimeout(r, step.delayMs));
      }
      
      setLog(x => [...x, { t: ts(), msg: "Completed: License issued and saved to Wallet" }]);
      setRunning(false);
    } catch (error) {
      console.error('Automation failed:', error);
      setLog(x => [...x, { t: ts(), msg: "Error: Failed to connect to automation service" }]);
      setRunning(false);
    }
  }, [stateCode, licenseId, autofill]);

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
              {/* Profile Card */}
              <ProfileCard 
                profile={MOCK_PROFILE} 
                enabled={autofill} 
                onToggle={setAutofill} 
              />

              {/* State & License Selection */}
              <div className="re-card p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Select State & License
                </h2>
                
                {/* State Selector */}
                <div className="flex gap-1 mb-4">
                  {STATES.map(s => (
                    <button
                      key={s.code}
                      onClick={() => {
                        setStateCode(s.code);
                        setLicenseId((LICENSES[s.code] || [])[0]?.id || "");
                      }}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${s.code === stateCode 
                          ? 'bg-forest text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                      `}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                
                {/* License Selector */}
                <select
                  value={licenseId}
                  onChange={(e) => setLicenseId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                >
                  {licenseList.map(l => (
                    <option key={l.id} value={l.id}>{l.label}</option>
                  ))}
                </select>
                
                <p className="mt-3 text-sm text-gray-600">
                  Selected: {stateCode} • {licenseId}
                </p>
              </div>

              {/* Automation Runner */}
              <div className="re-card p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Automation Demo
                </h2>
                <Button
                  onClick={runAutomation}
                  disabled={running}
                  fullWidth
                >
                  {running ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Automation
                    </>
                  )}
                </Button>
                <p className="mt-3 text-sm text-gray-600">
                  Simulate hunting license automation for {stateCode}
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
              <AutomationLog items={log} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
