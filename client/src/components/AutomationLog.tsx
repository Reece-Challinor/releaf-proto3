/**
 * AutomationLog Component - Displays automation step activity
 * Demo component for investor presentations
 * Shows animated log of automation steps in monospace font
 */
import React from "react";

type Item = { 
  t: string;  // timestamp
  msg: string; // message
};

interface AutomationLogProps {
  items: Item[];
}

export default function AutomationLog({ items }: AutomationLogProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 h-36 overflow-auto text-xs font-mono">
      {items.length === 0 ? (
        <div className="text-zinc-400">No activity yet.</div>
      ) : (
        items.map((it, i) => (
          <div key={i} className="py-0.5">
            <span className="text-zinc-500">{it.t}</span>
            <span className="text-zinc-700"> • </span>
            <span className="text-zinc-900">{it.msg}</span>
          </div>
        ))
      )}
    </div>
  );
}