/**
 * ProfileCard Component - Displays mock user profile with autofill toggle
 * Demo component for investor presentations
 * Shows fake profile data that can be toggled for autofill
 */
import React from "react";

interface ProfileCardProps {
  profile: {
    name: string;
    dob: string;
    address: string;
    hunterEdId: string;
    email: string;
  };
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function ProfileCard({ profile, enabled, onToggle }: ProfileCardProps) {
  return (
    <div className="re-card p-6">
      <h3 className="text-lg font-semibold text-charcoal mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Profile
      </h3>
      
      {/* Autofill Toggle */}
      <div className="flex items-center justify-between mb-4 p-3 bg-sand/30 rounded-lg">
        <label htmlFor="autofill" className="text-sm font-medium text-charcoal cursor-pointer">
          Autofill from profile
        </label>
        <button
          id="autofill"
          role="switch"
          aria-checked={enabled}
          onClick={() => onToggle(!enabled)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${enabled ? 'bg-forest' : 'bg-gray-300'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
              ${enabled ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
      
      {/* Profile Details */}
      <div className="space-y-2 text-sm">
        <div className="flex">
          <span className="font-semibold text-charcoal/70 w-24">Name:</span>
          <span className="text-charcoal">{profile.name}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-charcoal/70 w-24">DOB:</span>
          <span className="text-charcoal">{profile.dob}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-charcoal/70 w-24">Address:</span>
          <span className="text-charcoal">{profile.address}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-charcoal/70 w-24">Hunter Ed:</span>
          <span className="text-charcoal">{profile.hunterEdId}</span>
        </div>
        <div className="flex">
          <span className="font-semibold text-charcoal/70 w-24">Email:</span>
          <span className="text-charcoal">{profile.email}</span>
        </div>
      </div>
    </div>
  );
}