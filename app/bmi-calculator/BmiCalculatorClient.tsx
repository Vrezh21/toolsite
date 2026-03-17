"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function BmiCalculatorPage() {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");

  const result = useMemo(() => {
    const w = Number(weight);
    const hCm = Number(height);

    if (!w || !hCm) return null;

    const h = hCm / 100;
    const bmi = w / (h * h);

    let category = "Норма";
    if (bmi < 18.5) category = "Недостаточный вес";
    else if (bmi < 25) category = "Норма";
    else if (bmi < 30) category = "Избыточный вес";
    else category = "Ожирение";

    return {
      bmi: bmi.toFixed(2),
      category,
    };
  }, [weight, height]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="BMI Calculator"
        description="Calculate your body mass index using your weight and height."
        url="https://toolsite.ink/bmi-calculator"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "BMI Calculator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">BMI Calculator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Calculate your body mass index using your height and weight.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="For example 70"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="For example 175"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          {result ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">BMI</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {result.bmi}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Category</div>
                <div className="mt-1 text-2xl font-semibold text-slate-900">
                  {result.category}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this BMI Calculator"
          aboutParagraphs={[
            "This BMI calculator estimates your body mass index using your weight and height.",
            "BMI is commonly used to categorize body weight status such as underweight, normal weight, overweight, and obesity.",
          ]}
          howToUseSteps={[
            "Enter your weight in kilograms.",
            "Enter your height in centimeters.",
            "Review your BMI score and category.",
          ]}
          faqItems={[
            {
              question: "What does BMI mean?",
              answer: "BMI stands for Body Mass Index and is calculated from weight and height.",
            },
            {
              question: "Is BMI always accurate?",
              answer: "BMI is a general indicator but does not measure body fat directly.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="bmi-calculator"
          category="calculators"
          title="Related calculators"
        />

      </main>
      <Footer />
    </div>
  );
}