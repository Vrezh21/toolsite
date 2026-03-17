"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JsonMinifyClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">JSON Minify</h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-4 w-full border p-3 rounded"
          rows={8}
        />

        <button onClick={handleMinify} className="mt-4 px-4 py-2 bg-black text-white rounded">
          Minify
        </button>

        {error && <div className="mt-3 text-red-600">{error}</div>}

        <textarea value={output} readOnly className="mt-4 w-full border p-3 rounded" rows={8} />
      </main>

      <Footer />
    </div>
  );
}