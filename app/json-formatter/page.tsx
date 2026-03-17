"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JsonFormatterPage() {
  const [input, setInput] = useState(`{"name":"ToolSite","type":"json formatter"}`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setOutput("");
      setError("Невалидный JSON");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch {
      setOutput("");
      setError("Невалидный JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-900">JSON Formatter</h1>
        <p className="mt-3 text-lg text-slate-700">
          Форматируй, минифицируй и проверяй JSON прямо в браузере.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Исходный JSON
            </label>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"example": true}'
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleFormat}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Форматировать
              </button>

              <button
                onClick={handleMinify}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Минифицировать
              </button>

              <button
                onClick={handleClear}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Очистить
              </button>
            </div>

            {error ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Результат
            </label>

            <textarea
              value={output}
              readOnly
              placeholder="Здесь появится результат..."
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}