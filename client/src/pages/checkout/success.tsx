import { useEffect, useState } from "react";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { AppShell } from "@/ui/AppShell";
import { Button } from "@/components/Button";

export default function CheckoutSuccess() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    if (id) {
      setSessionId(id);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-bone">
      <AppShell>
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="re-card p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest/10">
                <CheckCircle className="h-12 w-12 text-forest" />
              </div>
            </div>
            
            <h1
              className="mb-4 text-3xl font-bold text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Payment Successful!
            </h1>
            
            <p className="mb-6 text-gray-600">
              Your test payment has been processed successfully.
              {sessionId && (
                <span className="mt-2 block text-sm">
                  Session ID: <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">{sessionId.slice(0, 20)}...</code>
                </span>
              )}
            </p>
            
            <div className="rounded-lg bg-sage/10 p-4 text-sm text-gray-600">
              <p className="font-medium">Test Mode Notice:</p>
              <p>This was a test transaction. No real payment was processed.</p>
              <p className="mt-2">Test card: 4242 4242 4242 4242</p>
            </div>
            
            <Link href="/">
              <Button fullWidth className="mt-6">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </AppShell>
    </div>
  );
}