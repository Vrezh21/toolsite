"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function AgeCalculatorClient() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();

    if (Number.isNaN(birth.getTime()) || birth > today) {
      return { error: "Enter a valid birth date" };
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const diffMs = today.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }, [birthDate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

            <ToolStructuredData
        name="Age Calculator"
        description="Calculate your exact age in years, months, and days."
        url="https://toolsite.ink/age-calculator"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Age Calculator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Age Calculator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Calculate your exact age in years, months, and days.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Date of birth
          </label>

          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          {result?.error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {result.error}
            </div>
          ) : null}

          {result && !result.error ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Age</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">
                  {result.years} years, {result.months} months., {result.days} days.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">total days</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">
                  {result.totalDays}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this Age Calculator"
          aboutParagraphs={[
            "This free age calculator helps you calculate your exact age in years, months, and days based on your date of birth.",
            "It is useful for personal use, forms, age verification, planning, and other date-related calculations.",
          ]}
          howToUseSteps={[
            "Select your date of birth.",
            "The calculator will automatically process your age.",
            "Review your age in years, months, days, and total days.",
          ]}
          faqItems={[
            {
              question: "Is this age calculator free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does it calculate exact age?",
              answer: "Yes, it calculates age in years, months, and days.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="age-calculator"
          category="calculators"
          title="Related calculators"
        />

      </main>

      <Footer />
    </div>
  );
}