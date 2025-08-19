/**
 * RELEAF Demo Catalog Constants
 * State and license configurations for the hunting license automation demo
 * This is mock data for prototype/investor demonstrations
 */

export const STATES = [
  { code: "TX", name: "Texas" },
  { code: "CO", name: "Colorado" },
  { code: "AR", name: "Arkansas" },
];

export const LICENSES: Record<string, { id: string; label: string }[]> = {
  TX: [
    { id: "TX-HUNT-RES", label: "Resident Hunting (TX)" },
    { id: "TX-FISH-RES", label: "Resident Fishing (TX)" },
    { id: "TX-HUNT-NR",  label: "Non-Resident Hunting (TX)" },
  ],
  CO: [
    { id: "CO-HUNT-RES", label: "Resident Small Game (CO)" },
    { id: "CO-FISH-RES", label: "Resident Annual Fishing (CO)" },
    { id: "CO-HUNT-NR",  label: "Non-Resident Combo (CO)" },
  ],
  AR: [
    { id: "AR-HUNT-RES", label: "Resident Hunting (AR)" },
    { id: "AR-FISH-RES", label: "Resident Fishing (AR)" },
    { id: "AR-HUNT-NR",  label: "Non-Resident Hunting (AR)" },
  ],
};