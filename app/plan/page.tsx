// app/plan/page.tsx
// Screen C9: Plan (route: /plan)
"use client";

import { useState } from "react";
import Screen from "@/components/Screen";
import { PageTitle } from "@/components/Headings";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { plan } from "@/lib/sample-data";

export default function PlanPage() {
  // Habit 0 ("Eat a mix of foods...") is checked by default matching the mockup
  const [checkedHabits, setCheckedHabits] = useState<number[]>([0]);

  const toggleHabit = (index: number) => {
    setCheckedHabits((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Screen active="Plan">
      <PageTitle>Your plan</PageTitle>
      <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">
        General tips from your latest results. This is not medical advice.
      </p>

      {/* Next test section */}
      <section className="mt-7">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">Next test</h2>
        </div>
        <h3 className="mt-4 font-serif text-[1.375rem] font-bold leading-snug text-ink">
          {plan.nextTest}
        </h3>
        <p className="mt-1.5 font-serif text-[1.125rem] font-bold text-brand">
          {plan.nextTestDate}
        </p>
        <p className="mt-1 text-[1.0625rem] text-muted">
          Your doctor decides the right time.
        </p>
        <SecondaryButton
          className="mt-4"
          onClick={() => {
            alert("Added test reminder to your calendar.");
          }}
        >
          Add to my calendar
        </SecondaryButton>
      </section>

      {/* Healthy habits to try section */}
      <section className="mt-8">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">
            Healthy habits to try
          </h2>
        </div>
        <ul className="divide-y divide-rule border-b border-rule">
          {plan.habits.map((habit, index) => {
            const isChecked = checkedHabits.includes(index);
            return (
              <li key={habit} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleHabit(index)}
                  className="flex w-full items-center gap-3.5 text-left"
                  aria-checked={isChecked}
                  role="checkbox"
                >
                  <span
                    className={`flex size-6 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                      isChecked
                        ? "border-brand bg-brand text-white"
                        : "border-rule bg-white"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2.5 6.5L5 9L9.5 3.5" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[1.0625rem] leading-normal text-ink">
                    {habit}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          General tips only. LabLens never suggests medicines or supplements.
        </p>
      </section>

      {/* Questions for your doctor section */}
      <section className="mt-8">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-serif text-[1.375rem] font-bold text-ink">
            Questions for your doctor
          </h2>
        </div>
        <ul className="divide-y divide-rule border-b border-rule">
          {plan.doctorQuestions.map((question) => (
            <li
              key={question}
              className="py-4 text-[1.0625rem] leading-normal text-ink"
            >
              {question}
            </li>
          ))}
        </ul>
      </section>

      {/* Print summary button */}
      <div className="mt-6">
        <PrimaryButton onClick={handlePrint}>
          Print a summary for my doctor
        </PrimaryButton>
      </div>
    </Screen>
  );
}
