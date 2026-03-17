"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function csvToJson(text: string) {
  const lines = text.split("\n").filter(Boolean);
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = values[i]));
    return obj;
  });
}

export default function CsvToJsonClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    try {
      const json = csvToJson(input);
      setOutput(JSON.stringify(json, null, 2));
    } catch {
      setOutput("Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold">CSV to JSON</h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          className="mt-4 w-full border p-3 rounded"
        />

        <button onClick={handleConvert} className="mt-4 bg-black text-white px-4 py-2 rounded">
          Convert
        </button>

        <textarea value={output} readOnly rows={8} className="mt-4 w-full border p-3 rounded" />
      </main>

      <Footer />
    </div>
  );
}