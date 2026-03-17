"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

function encodeToBase64(value: string) {
  try {
    return btoa(unescape(encodeURIComponent(value)));
  } catch {
    return null;
  }
}

function decodeFromBase64(value: string) {
  try {
    return decodeURIComponent(escape(atob(value)));
  } catch {
    return null;
  }
}

export default function Base64EncoderDecoderClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    const result = encodeToBase64(input);

    if (result === null) {
      setError("Не удалось закодировать текст");
      setOutput("");
      return;
    }

    setOutput(result);
  };

  const handleDecode = () => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    const result = decodeFromBase64(input);

    if (result === null) {
      setError("Введите корректную Base64 строку");
      setOutput("");
      return;
    }

    setOutput(result);
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
    setError("");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleCopyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Base64 Encoder / Decoder"
        description="Encode text to Base64 and decode Base64 back to text instantly."
        url="https://toolsite.ink/base64-encoder-decoder"
      />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Base64 Encoder / Decoder" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Base64 Encoder / Decoder
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Encode text to Base64 and decode Base64 back to plain text instantly.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-800">
            Input
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите текст или Base64 строку..."
            rows={8}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleEncode}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Encode to Base64
            </button>

            <button
              onClick={handleDecode}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Decode Base64
            </button>

            <button
              onClick={handleSwap}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Swap
            </button>

            <button
              onClick={handleCopyOutput}
              disabled={!output}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Copy output
            </button>

            <button
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800"
            >
              Clear
            </button>
          </div>

          {error ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Output
            </label>

            <textarea
              value={output}
              readOnly
              rows={8}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            />
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Base64 Encoder / Decoder"
          aboutParagraphs={[
            "This free Base64 encoder and decoder helps you convert plain text to Base64 and decode Base64 strings back to text.",
            "It is useful for developers, testing, APIs, debugging, and working with encoded data online.",
          ]}
          howToUseSteps={[
            "Enter plain text to encode it into Base64.",
            "Or paste a Base64 string to decode it back to text.",
            "Use the copy button to quickly copy the output.",
            "Use swap if you want to move the output back into the input field.",
          ]}
          faqItems={[
            {
              question: "Is this Base64 encoder and decoder free?",
              answer: "Yes, this tool is completely free to use online.",
            },
            {
              question: "Can I both encode and decode?",
              answer: "Yes, this tool supports both Base64 encoding and decoding.",
            },
            {
              question: "Does it work in the browser?",
              answer: "Yes, the conversion happens directly in your browser.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="base64-encoder-decoder"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}