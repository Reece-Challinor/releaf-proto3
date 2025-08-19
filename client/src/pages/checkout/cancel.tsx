import { Link } from "wouter";
import { XCircle } from "lucide-react";
import { AppShell } from "@/ui/AppShell";
import { Button } from "@/components/Button";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand to-bone">
      <AppShell>
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="re-card p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>
            
            <h1
              className="mb-4 text-3xl font-bold text-charcoal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Payment Cancelled
            </h1>
            
            <p className="mb-6 text-gray-600">
              Your payment was cancelled. No charges were made to your account.
            </p>
            
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              <p>If you experienced any issues, please try again or contact support.</p>
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