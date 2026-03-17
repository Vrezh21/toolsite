"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function formatDate(date: Date) {
  return {
    local: date.toLocaleString(),
    iso: date.toISOString(),
    utc: date.toUTCString(),
  };
}

export default function TimestampConverterClient() {
  const [timestampInput, setTimestampInput] = useState("1700000000");
  const [dateInput, setDateInput] = useState("2025-01-01T12:00");
  const [mode, setMode] = useState<"seconds" | "milliseconds">("seconds");

  const timestampResult = useMemo(() => {
    const raw = Number(timestampInput);

    if (Number.isNaN(raw)) {
      return null;
    }

    const date = new Date(mode === "seconds" ? raw * 1000 : raw);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return formatDate(date);
  }, [timestampInput, mode]);

  const dateResult = useMemo(() => {
    if (!dateInput) return null;

    const date = new Date(dateInput);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return {
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
      local: date.toLocaleString(),
      iso: date.toISOString(),
    };
  }, [dateInput]);

  const now = () => {
    const current = Date.now();
    setTimestampInput(String(Math.floor(current / 1000)));
    setMode("seconds");

    const localDate = new Date(current);
    const offset = localDate.getTimezoneOffset();
    const local = new Date(current - offset * 60000)
      .toISOString()
      .slice(0, 16);
    setDateInput(local);
  };

  const handleCopy = async (value: string) => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Timestamp Converter"
        description="Convert Unix timestamps to readable dates and convert dates to Unix timestamps online."
        url="https://toolsite.ink/timestamp-converter"
      />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Timestamp Converter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Timestamp Converter
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Convert Unix timestamps to readable dates and convert dates back to Unix timestamps.
        </p>

        <div className="mt-6">
          <button
            onClick={now}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            Use current time
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Unix timestamp to date
            </h2>

            <label className="mt-4 mb-2 block text-sm font-medium text-slate-800">
              Timestamp
            </label>
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="Enter Unix timestamp"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setMode("seconds")}
                className={`rounded-xl px-4 py-2 transition ${
                  mode === "seconds"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                Seconds
              </button>

              <button
                onClick={() => setMode("milliseconds")}
                className={`rounded-xl px-4 py-2 transition ${
                  mode === "milliseconds"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                Milliseconds
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Local time</div>
                <div className="mt-1 text-slate-900">
                  {timestampResult?.local || "Invalid timestamp"}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">ISO</div>
                <div className="mt-1 break-all text-slate-900">
                  {timestampResult?.iso || "Invalid timestamp"}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">UTC</div>
                <div className="mt-1 text-slate-900">
                  {timestampResult?.utc || "Invalid timestamp"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Date to Unix timestamp
            </h2>

            <label className="mt-4 mb-2 block text-sm font-medium text-slate-800">
              Date and time
            </label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Seconds</div>
                <div className="mt-1 text-slate-900">
                  {dateResult?.seconds ?? "Invalid date"}
                </div>
                {dateResult ? (
                  <button
                    onClick={() => handleCopy(String(dateResult.seconds))}
                    className="mt-3 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition hover:bg-slate-50"
                  >
                    Copy seconds
                  </button>
                ) : null}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Milliseconds</div>
                <div className="mt-1 text-slate-900">
                  {dateResult?.milliseconds ?? "Invalid date"}
                </div>
                {dateResult ? (
                  <button
                    onClick={() => handleCopy(String(dateResult.milliseconds))}
                    className="mt-3 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition hover:bg-slate-50"
                  >
                    Copy milliseconds
                  </button>
                ) : null}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">ISO</div>
                <div className="mt-1 break-all text-slate-900">
                  {dateResult?.iso || "Invalid date"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Timestamp Converter"
          aboutParagraphs={[
            "This timestamp converter helps you convert Unix timestamps into human-readable date and time values.",
            "It also lets you convert regular dates back into Unix timestamps in seconds or milliseconds.",
          ]}
          howToUseSteps={[
            "Enter a Unix timestamp to convert it into a readable date.",
            "Or choose a date and time to convert it into a Unix timestamp.",
            "Copy the result in seconds, milliseconds, ISO, or local time format.",
          ]}
          faqItems={[
            {
              question: "What is a Unix timestamp?",
              answer:
                "A Unix timestamp is the number of seconds or milliseconds since January 1, 1970 UTC.",
            },
            {
              question: "Can I convert both seconds and milliseconds?",
              answer:
                "Yes, this tool supports both Unix timestamp formats.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="timestamp-converter"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}