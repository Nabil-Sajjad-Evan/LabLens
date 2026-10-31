// lib/sample-data.ts
// All sample data for the LabLens UI. Every value here is made up for the demo.

export type Status = "low" | "high" | "normal" | "urgent";

export type LabResult = {
  id: string;
  name: string;
  value: number | null; // null = no value on the report (e.g. MPV)
  unit: string;
  normalLow: number;
  normalHigh: number;
  criticalLow?: number; // from a published critical-value list, not from AI
  criticalHigh?: number;
};

// Plain-code status check. The AI never decides this.
export function getStatus(r: LabResult): Status | null {
  if (r.value === null) return null;
  if (r.criticalLow !== undefined && r.value < r.criticalLow) return "urgent";
  if (r.criticalHigh !== undefined && r.value > r.criticalHigh) return "urgent";
  if (r.value < r.normalLow) return "low";
  if (r.value > r.normalHigh) return "high";
  return "normal";
}

// Where the marker sits on the range bar (0-100). The normal zone is 25-75.
export function markerPosition(r: LabResult): number {
  if (r.value === null) return 50;
  const pos = 25 + ((r.value - r.normalLow) / (r.normalHigh - r.normalLow)) * 50;
  return Math.max(3, Math.min(97, pos));
}

// Indian digit grouping: 135000 -> "1,35,000"
export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

export const report = {
  id: "latest",
  date: "7 Oct 2026",
  lab: "Lab A",
  panel: "Blood count",
};

export const results: LabResult[] = [
  // Low (8)
  { id: "plt", name: "Platelet count", value: 135000, unit: "/Cmm", normalLow: 150000, normalHigh: 450000 },
  { id: "hb", name: "Haemoglobin", value: 11.8, unit: "g/dl", normalLow: 13.0, normalHigh: 17.0 },
  { id: "pcv", name: "PCV (haematocrit)", value: 36, unit: "%", normalLow: 40, normalHigh: 50 },
  { id: "mcv", name: "MCV", value: 72, unit: "fl", normalLow: 80, normalHigh: 100 },
  { id: "mch", name: "MCH", value: 24, unit: "pg", normalLow: 27, normalHigh: 32 },
  { id: "mchc", name: "MCHC", value: 31, unit: "g/dl", normalLow: 32, normalHigh: 36 },
  { id: "lym", name: "Lymphocytes", value: 15, unit: "%", normalLow: 20, normalHigh: 40 },
  { id: "mono", name: "Monocytes", value: 1, unit: "%", normalLow: 2, normalHigh: 10 },
  // High (3)
  { id: "esr", name: "ESR", value: 36, unit: "mm", normalLow: 0, normalHigh: 10 },
  { id: "neu", name: "Neutrophils", value: 80, unit: "%", normalLow: 40, normalHigh: 75 },
  { id: "rdw", name: "RDW-CV", value: 16.2, unit: "%", normalLow: 11.5, normalHigh: 14.5 },
  // Normal (5)
  { id: "rbc", name: "Total RBC", value: 4.74, unit: "million/Cmm", normalLow: 4.5, normalHigh: 5.5 },
  { id: "wbc", name: "Total WBC", value: 6800, unit: "/Cmm", normalLow: 4000, normalHigh: 11000 },
  { id: "eos", name: "Eosinophils", value: 3, unit: "%", normalLow: 1, normalHigh: 6 },
  { id: "bas", name: "Basophils", value: 0, unit: "%", normalLow: 0, normalHigh: 1 },
  { id: "pdw", name: "PDW", value: 12.5, unit: "fl", normalLow: 9, normalHigh: 17 },
  // No value on the report
  { id: "mpv", name: "MPV", value: null, unit: "fl", normalLow: 7.5, normalHigh: 11.5 },
];

// For the Urgent demo screen (/demo/urgent). 20,000 is the sample critical limit.
export const urgentResult: LabResult = {
  id: "plt-urgent",
  name: "Platelet count",
  value: 18000,
  unit: "/Cmm",
  normalLow: 150000,
  normalHigh: 450000,
  criticalLow: 20000,
};

// Haemoglobin over time (Trends screen). "printedAs" is how that lab wrote the test name.
export const hbTrend = [
  { date: "12 Jan 2026", month: "Jan", value: 9.8, lab: "Lab A", printedAs: "Haemoglobin" },
  { date: "9 Apr 2026", month: "Apr", value: 10.4, lab: "Lab B", printedAs: "Hb" },
  { date: "14 Jul 2026", month: "Jul", value: 11.1, lab: "Lab B", printedAs: "HGB" },
  { date: "7 Oct 2026", month: "Oct", value: 11.8, lab: "Lab A", printedAs: "Haemoglobin" },
];
export const hbNormal = { low: 13, high: 17 };

// Your reports screen
export const reportHistory = [
  { id: "latest", date: "7 Oct 2026", sub: "Blood count from Lab A", outside: 11 },
  { id: "jul", date: "14 Jul 2026", sub: "Blood count from Lab B", outside: 13 },
  { id: "apr", date: "9 Apr 2026", sub: "Blood count from Lab B", outside: 14 },
  { id: "jan", date: "12 Jan 2026", sub: "Blood count from Lab A", outside: 15 },
  { id: "lipid", date: "3 Oct 2025", sub: "Lipid profile from Lab A", outside: 0 },
];

export const insights = [
  "Haemoglobin, MCV and MCH are all lower than normal. Doctors often look into this pattern when checking for low iron, among other possible causes.",
  "Platelets are a little lower than normal. This can be seen with infections, some medicines and other conditions.",
  "ESR and neutrophils are higher than normal. These can go up with infection or inflammation.",
];

export const disclaimer =
  "Automated summary for general information. It is not a diagnosis. Always check with your doctor.";

export const plan = {
  nextTest: "Repeat your blood count in about 3 months",
  nextTestDate: "Around 7 January 2027",
  habits: [
    "Eat a mix of foods such as lentils, leafy greens, eggs and fruit",
    "Drink enough water through the day",
    "Sleep 7 to 8 hours a night",
    "Take a short walk every day",
  ],
  doctorQuestions: [
    "My haemoglobin and platelets are lower than normal. Which follow-up tests do you suggest?",
    "How soon should I test again?",
    "Could my food or medicines be affecting these values?",
  ],
};

export const user = { name: "Sample User", email: "sample.user@gmail.com", initials: "SU" };
