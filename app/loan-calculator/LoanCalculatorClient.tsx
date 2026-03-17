"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [years, setYears] = useState("5");

  const result = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const yearsValue = Number(years);

    if (
      Number.isNaN(principal) ||
      Number.isNaN(annualRate) ||
      Number.isNaN(yearsValue) ||
      principal <= 0 ||
      yearsValue <= 0
    ) {
      return {
        error: "Enter valid values.",
        monthlyPayment: null,
        totalPayment: null,
        totalInterest: null,
      };
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = yearsValue * 12;

    const monthlyPayment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      error: "",
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  }, [loanAmount, interestRate, years]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Loan Calculator"
        description="Estimate monthly payments, total payment, and total interest."
        url="https://toolsite.ink/loan-calculator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Loan Calculator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Loan Calculator</h1>
        <p className="mt-3 text-lg text-slate-700">
          Calculate your monthly loan payment, total payment, and total interest.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Loan amount
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Interest rate (% annually)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Loan term (years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            {result.error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {result.error}
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Monthly Payment</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">
                    ${result.monthlyPayment?.toFixed(2)}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Total Payment</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">
                    ${result.totalPayment?.toFixed(2)}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Total Interest</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">
                    ${result.totalInterest?.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Loan Calculator"
          aboutParagraphs={[
            "This loan calculator estimates monthly loan payments.",
            "It also shows total payment and total interest.",
          ]}
          howToUseSteps={[
            "Enter the loan amount.",
            "Enter interest rate and loan term.",
            "Review monthly payment and total interest.",
          ]}
          faqItems={[
            {
              question: "Can I use this for budgeting?",
              answer: "Yes, it helps estimate loan repayment costs.",
            },
            {
              question: "Does it work for different loan types?",
              answer: "Yes, it can estimate payments for most fixed-rate loans.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="loan-calculator"
          category="calculators"
          title="Related calculators"
        />

      </main>

      <Footer />
    </div>
  );
}