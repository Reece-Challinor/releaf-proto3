import { useCallback, useEffect, useMemo, useState } from "react";
import { Play, ShoppingCart } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { AppShell } from "@/ui/AppShell";
import { StepperDots } from "@/components/StepperDots";
import { Button } from "@/components/Button";
import AutomationLog from "@/components/AutomationLog";
import { WalletCard } from "@/components/WalletCard";
import { STATES, LICENSES } from "@/constants/catalog";
import { MOCK_PROFILE } from "@/constants/profile";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

/**
 * Home = App-like, responsive screen:
 * - Left: phone-style permit flow preview
 * - Right: automation runner + log
 */
export default function Home() {
  // Core selection for the automation
  const [stateCode, setStateCode] = useState<"TX" | "CO" | "AR">("TX");
  const [autofill, setAutofill] = useState(true);
  const licenseList = useMemo(() => LICENSES[stateCode] || [], [stateCode]);
  const [licenseId, setLicenseId] = useState(licenseList[0]?.id || "TX-HUNT-RES");

  // lightweight "in-app" flow preview state (left phone)
  const [permitChoice, setPermitChoice] = useState<"hunting" | "fishing">("hunting");
  const [flowStep, setFlowStep] = useState(1); // 1: Permit types, 2: Info, 3: Checkout

  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<{ t: string; msg: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [issued, setIssued] = useState<{ id: string; stateCode: string; licenseId: string; timestamp: number } | null>(null);
  const ts = () => new Date().toLocaleTimeString();
  
  // Load last issued license and user selections on mount
  useEffect(() => {
    const stored = localStorage.getItem("releaf_last_license");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setIssued(data);
      } catch (e) {
        console.error("Failed to load last license:", e);
      }
    }
    
    // Restore state and license selections
    const storedState = localStorage.getItem("releaf_state_code");
    const storedLicense = localStorage.getItem("releaf_license_id");
    if (storedState && ["TX", "CO", "AR"].includes(storedState)) {
      setStateCode(storedState as "TX" | "CO" | "AR");
    }
    if (storedLicense) {
      setLicenseId(storedLicense);
    }
  }, []);

  // Persist state and license selections to localStorage
  useEffect(() => {
    localStorage.setItem("releaf_state_code", stateCode);
    localStorage.setItem("releaf_license_id", licenseId);
  }, [stateCode, licenseId]);

  const runAutomation = useCallback(async () => {
    setRunning(true);
    setLog([]);
    setCurrentStep(0);
    setTotalSteps(0);
    
    try {
      setLog((x) => [
        ...x,
        { t: ts(), msg: `Using profile: ${autofill ? "true" : "false"} • Starting automation for ${stateCode} • ${licenseId}` },
      ]);

      const res = await fetch("/api/automation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          state: stateCode,
          license: licenseId,
          autofill,
          profile: autofill ? MOCK_PROFILE : undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setLog((x) => [...x, { t: ts(), msg: "Error starting automation" }]);
        setRunning(false);
        return;
      }
      
      setTotalSteps(data.steps.length);
      const attemptId = data.attemptId; // Save attempt ID for completion
      
      // Iterate through steps with retry logic
      for (let i = 0; i < data.steps.length; i++) {
        const step = data.steps[i];
        setCurrentStep(i + 1);
        setLog((x) => [...x, { t: ts(), msg: step.label }]);
        await new Promise((r) => setTimeout(r, step.delayMs));
        
        // 10% chance of retry after step 3
        if (i === 2 && Math.random() < 0.1) {
          setLog((x) => [...x, { t: ts(), msg: "Portal session expired — retrying…" }]);
          await new Promise((r) => setTimeout(r, 600));
        }
      }
      
      // Generate and persist license card
      const id = `${stateCode}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      const licenseData = {
        id,
        stateCode,
        licenseId,
        timestamp: Date.now()
      };
      setIssued(licenseData);
      localStorage.setItem("releaf_last_license", JSON.stringify(licenseData));
      
      setLog((x) => [...x, { t: ts(), msg: "Completed: License issued and saved to Wallet" }]);
      
      // Mark attempt as completed in database
      try {
        await fetch(`/api/automation/${attemptId}/complete`, {
          method: "POST",
          headers: { "content-type": "application/json" },
        });
      } catch (e) {
        console.error("Failed to mark attempt as completed:", e);
      }
    } catch (e) {
      console.error(e);
      setLog((x) => [...x, { t: ts(), msg: "Error: Failed to connect to automation service" }]);
    } finally {
      setRunning(false);
      setCurrentStep(0);
      setTotalSteps(0);
    }
  }, [stateCode, licenseId, autofill]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-bone">
      <AppShell>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[420px_1fr]">
          {/* LEFT: phone-style flow preview */}
          <section className="mx-auto w-full max-w-[420px]">
            <div className="rounded-[28px] border bg-gradient-to-b from-white/70 to-bone p-4 shadow-xl">
              {/* phone header */}
              <div className="flex items-center justify-between px-1">
                <span
                  className="text-lg font-bold tracking-wider text-forest"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  RELEAF
                </span>
                <div className="h-6 w-6 rounded-full bg-sage/40" />
              </div>

              {/* step content */}
              <div className="re-card mt-6 p-5">
                {flowStep === 1 && (
                  <>
                    <h2
                      className="mb-4 text-center text-xl font-semibold text-charcoal"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Select the permits<br />you would like
                    </h2>
                    <div className="grid gap-3">
                      <button
                        onClick={() => setPermitChoice("fishing")}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium shadow-sm transition-all ${
                          permitChoice === "fishing"
                            ? "border-olive bg-sand text-olive"
                            : "border-sage/40 text-charcoal hover:border-sage"
                        }`}
                      >
                        <span>Fishing</span>
                        <span
                          className={`h-3.5 w-3.5 rounded-full ${
                            permitChoice === "fishing" ? "bg-olive" : "bg-gray-300"
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => setPermitChoice("hunting")}
                        className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-medium shadow-sm transition-all ${
                          permitChoice === "hunting"
                            ? "border-olive bg-sand text-olive"
                            : "border-sage/40 text-charcoal hover:border-sage"
                        }`}
                      >
                        <span>Hunting</span>
                        <span
                          className={`h-3.5 w-3.5 rounded-full ${
                            permitChoice === "hunting" ? "bg-olive" : "bg-gray-300"
                          }`}
                        />
                      </button>
                    </div>
                  </>
                )}

                {flowStep === 2 && (
                  <>
                    <h2
                      className="mb-2 text-left text-xl font-semibold text-charcoal"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Your information
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                      Autofill from verified profile is{" "}
                      <strong>{autofill ? "ON" : "OFF"}</strong>.
                    </p>
                    <div className="grid gap-2 rounded-xl border p-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name</span>
                        <span className="font-medium">{MOCK_PROFILE.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">DOB</span>
                        <span className="font-medium">{MOCK_PROFILE.dob}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hunter Ed</span>
                        <span className="font-medium">{MOCK_PROFILE.hunterEdId}</span>
                      </div>
                    </div>
                  </>
                )}

                {flowStep === 3 && (
                  <>
                    <h2
                      className="mb-2 text-left text-xl font-semibold text-charcoal"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Checkout
                    </h2>
                    <p className="text-sm text-gray-600">
                      {licenseId} • {stateCode}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Secure payment and issuance preview.
                    </p>
                  </>
                )}
              </div>

              {/* phone footer progress */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg px-3 py-2 text-sm text-olive hover:bg-sand"
                    onClick={() => setFlowStep((s) => Math.max(1, s - 1))}
                    disabled={flowStep === 1}
                  >
                    Back
                  </button>
                </div>
                <StepperDots count={3} active={flowStep} />
                <Button
                  variant="outline"
                  onClick={() => setFlowStep((s) => Math.min(3, s + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </section>

          {/* RIGHT: controls + automation + log */}
          <section className="space-y-6">
            {/* State & license controls (compact) */}
            <div className="re-card p-6">
              <h2
                className="mb-4 text-lg font-semibold text-charcoal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Setup
              </h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {STATES.map((s) => (
                  <button
                    key={s.code}
                    onClick={() => {
                      setStateCode(s.code as typeof stateCode);
                      setLicenseId((LICENSES[s.code] || [])[0]?.id || "");
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      s.code === stateCode
                        ? "bg-forest text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm text-gray-600">License</label>
                  <select
                    value={licenseId}
                    onChange={(e) => setLicenseId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
                  >
                    {licenseList.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="mt-3 inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={autofill}
                    onChange={(e) => setAutofill(e.target.checked)}
                  />
                  Autofill from profile
                </label>
                {autofill && (
                  <div className="mt-3 rounded-lg bg-sage/10 p-3 text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{MOCK_PROFILE.name}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">DOB:</span>
                      <span className="font-medium">{MOCK_PROFILE.dob}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hunter Ed:</span>
                      <span className="font-medium">{MOCK_PROFILE.hunterEdId}</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Selected: {stateCode} • {licenseId}
              </p>
            </div>

            {/* Automation Runner */}
            <div className="re-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className="text-lg font-semibold text-charcoal"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Automation
                </h2>
                {totalSteps > 0 && (
                  <StepperDots count={totalSteps} active={currentStep} />
                )}
              </div>
              <Button onClick={runAutomation} disabled={running} fullWidth>
                {running ? (
                  <>Processing…</>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Automation
                  </>
                )}
              </Button>
              <p className="mt-3 text-sm text-gray-600">
                Simulate license automation for {stateCode}
              </p>
            </div>

            {/* Wallet Card (if issued) */}
            {issued && (
              <>
                <WalletCard
                  stateCode={issued.stateCode}
                  licenseId={issued.licenseId}
                  id={issued.id}
                  timestamp={issued.timestamp}
                />
                
                {/* Checkout Button */}
                <div className="re-card p-6">
                  <h2
                    className="mb-4 text-lg font-semibold text-charcoal"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Complete Purchase
                  </h2>
                  <Button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/checkout", {
                          method: "POST",
                          headers: { "content-type": "application/json" },
                          body: JSON.stringify({ 
                            state: issued.stateCode, 
                            license: issued.licenseId 
                          })
                        });
                        const data = await res.json();
                        
                        if (!data.ok) {
                          alert("Checkout failed: " + (data.error || "Unknown error"));
                          return;
                        }
                        
                        // If we have a direct URL, use that
                        if (data.url) {
                          window.location.href = data.url;
                          return;
                        }
                        
                        // Otherwise try Stripe.js redirect
                        const stripe = await stripePromise;
                        if (stripe && data.id) {
                          await stripe.redirectToCheckout({ sessionId: data.id });
                        }
                      } catch (error) {
                        console.error("Checkout error:", error);
                        alert("Failed to start checkout");
                      }
                    }}
                    fullWidth
                    className="bg-forest hover:bg-olive"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Proceed to Checkout ($25 test)
                  </Button>
                  <p className="mt-3 text-xs text-gray-600">
                    Test mode: Use card 4242 4242 4242 4242
                  </p>
                </div>
              </>
            )}

            {/* Activity Log */}
            <div className="re-card p-6">
              <h2
                className="mb-4 text-lg font-semibold text-charcoal"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Activity Log
              </h2>
              <AutomationLog items={log} />
            </div>
          </section>
        </div>
      </AppShell>
    </div>
  );
}
