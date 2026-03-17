"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function getPasswordStrength(password: string) {
  if (!password) {
    return {
      score: 0,
      label: "",
      colorClass: "",
      feedback: [],
    };
  }

  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Use at least 8 characters.");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add lowercase letters.");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add uppercase letters.");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add numbers.");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add special characters.");
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (score <= 2) {
    return {
      score,
      label: "Weak password",
      colorClass: "bg-red-500",
      feedback,
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Medium password",
      colorClass: "bg-yellow-500",
      feedback,
    };
  }

  return {
    score,
    label: "Strong password",
    colorClass: "bg-green-500",
    feedback,
  };
}

export default function PasswordStrengthCheckerClient() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = useMemo(() => {
    return getPasswordStrength(password);
  }, [password]);

  const strengthPercent = useMemo(() => {
    const maxScore = 6;
    return Math.min((result.score / maxScore) * 100, 100);
  }, [result.score]);

  const handleClear = () => {
    setPassword("");
    setShowPassword(false);
  };

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Password Strength Checker"
        description="Check password strength instantly and see whether your password is weak, medium, or strong."
        url="https://toolsite.ink/password-strength-checker"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Password Strength Checker" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Password Strength Checker
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Check whether your password is weak, medium, or strong instantly.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Enter password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              Show password
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!password}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy password
            </button>

            <button
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Clear
            </button>
          </div>

          {password ? (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-500">Strength</span>
                <span className="text-sm font-medium text-slate-800">
                  {result.label}
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${result.colorClass}`}
                  style={{ width: `${strengthPercent}%` }}
                />
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Password status</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">
                  {result.label}
                </div>
              </div>

              {result.feedback.length ? (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 text-sm font-medium text-slate-800">
                    Suggestions
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {result.feedback.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                  Great — your password looks strong.
                </div>
              )}
            </div>
          ) : null}
        </div>

        <SeoContent
          aboutTitle="About this Password Strength Checker"
          aboutParagraphs={[
            "This free password strength checker helps you test whether a password is weak, medium, or strong.",
            "It is useful for improving account security, creating stronger passwords, and checking password quality before using it.",
          ]}
          howToUseSteps={[
            "Enter your password into the input field.",
            "The tool will instantly analyze its strength.",
            "Review the strength result and suggestions.",
            "Improve the password if needed.",
          ]}
          faqItems={[
            {
              question: "Is this password strength checker free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Does the tool send my password anywhere?",
              answer: "No, the check happens directly in your browser.",
            },
            {
              question: "How can I make my password stronger?",
              answer:
                "Use a longer password with uppercase and lowercase letters, numbers, and special characters.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="password-strength-checker"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}