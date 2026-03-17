"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function TextRepeaterPage() {
  const [text, setText] = useState("Hello");
  const [count, setCount] = useState("5");
  const [separator, setSeparator] = useState("\\n");

  const repeatedText = useMemo(() => {
    const times = Number(count);

    if (!text || !times || times < 1) return "";

    const actualSeparator = separator === "\\n" ? "\n" : separator;
    return Array(times).fill(text).join(actualSeparator);
  }, [text, count, separator]);

  const handleCopy = async () => {
    if (!repeatedText) return;
    await navigator.clipboard.writeText(repeatedText);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Text Repeater"
        description="Repeat text multiple times with a custom separator."
        url="https://toolsite.ink/text-repeater"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Text Repeater" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">Text Repeater</h1>
        <p className="mt-3 text-lg text-slate-700">
          Repeat text multiple times with a custom separator..
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Number of repeats
              </label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Separator
              </label>
              <input
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                placeholder="For example: , or \\n"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Result
            </label>

            <textarea
              value={repeatedText}
              readOnly
              className="min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none"
            />

            <button
              onClick={handleCopy}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Copy
            </button>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Text Repeater"
          aboutParagraphs={[
            "This text repeater allows you to repeat text multiple times automatically.",
            "It is useful for testing, placeholders, and repeated text generation.",
          ]}
          howToUseSteps={[
            "Enter the text you want to repeat.",
            "Set the number of repetitions.",
            "Copy the generated result.",
          ]}
          faqItems={[
            {
              question: "Can I repeat text many times?",
              answer: "Yes, you can repeat text any number of times.",
            },
            {
              question: "Can I use separators?",
              answer: "Yes, you can specify custom separators between repetitions.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="text-repeater"
          category="tools"
          title="Related tools"
        />

      </main>
      <Footer />
    </div>
  );
}