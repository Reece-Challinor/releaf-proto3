import { useState } from "react";
import { Link } from "wouter";
import { HeroWave } from "@/ui/HeroWave";
import { SSOButtons } from "@/components/SSOButtons";
import { FormStack, FormField } from "@/components/FormStack";
import { Button } from "@/components/Button";

export default function Login() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen">
      {/* Hero Section with vintage outdoor background */}
      <div className="relative h-80 bg-gradient-to-b from-forest/80 to-olive/60 overflow-hidden">
        {/* Placeholder for vintage landscape image */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyRjNFMkEiLz48L3N2Zz4=')] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        
        {/* RELEAF Logo */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white tracking-wider" style={{ fontFamily: 'var(--font-ui)' }}>
            RELEAF
          </h1>
        </div>
        
        <HeroWave />
      </div>

      {/* Login Card */}
      <div className="relative -mt-20 z-20 px-4 pb-12">
        <div className="max-w-sm mx-auto">
          <div className="re-card p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Log in to your account
            </h2>

            {!showEmailForm ? (
              <>
                <SSOButtons onEmailClick={() => setShowEmailForm(true)} />
                
                <div className="mt-8 pt-6 border-t border-sage/20 text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Don't have an account?
                  </p>
                  <Button variant="outline" fullWidth>
                    Sign up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <FormStack>
                  <FormField
                    label="Email address"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormField
                    label="Your password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormStack>
                
                <div className="mt-6 space-y-3">
                  <Button fullWidth>
                    Continue
                  </Button>
                  <button 
                    onClick={() => setShowEmailForm(false)}
                    className="w-full text-sm text-olive hover:text-forest transition-colors"
                  >
                    Back to other options
                  </button>
                </div>
                
                <div className="mt-6 text-center">
                  <a href="#" className="text-sm text-olive hover:text-forest">
                    Forgot your password?
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}