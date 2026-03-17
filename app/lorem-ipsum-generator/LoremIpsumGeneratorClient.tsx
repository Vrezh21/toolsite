"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
];

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence(wordCount: number) {
  const words: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    words.push(randomWord());
  }

  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(sentenceCount: number) {
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    const wordsInSentence = 6 + Math.floor(Math.random() * 10);
    sentences.push(generateSentence(wordsInSentence));
  }

  return sentences.join(" ");
}

export default function LoremIpsumGeneratorPage() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">(
    "paragraphs"
  );
  const [count, setCount] = useState("3");
  const [refreshKey, setRefreshKey] = useState(0);

  const result = useMemo(() => {
    const countValue = Number(count);

    if (!countValue || countValue < 1) return "";

    if (type === "words") {
      return Array.from({ length: countValue }, () => randomWord()).join(" ");
    }

    if (type === "sentences") {
      return Array.from({ length: countValue }, () =>
        generateSentence(6 + Math.floor(Math.random() * 10))
      ).join(" ");
    }

    return Array.from({ length: countValue }, () =>
      generateParagraph(3 + Math.floor(Math.random() * 3))
    ).join("\n\n");
  }, [type, count, refreshKey]);

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="Lorem Ipsum Generator"
        description="Generate lorem ipsum text as words, sentences, or paragraphs."
        url="https://toolsite.ink/lorem-ipsum-generator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Lorem Ipsum Generator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          Lorem Ipsum Generator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Generate lorem ipsum text as words, sentences, or paragraphs.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Generation type
              </label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "paragraphs" | "sentences" | "words")
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Count
              </label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">Result</div>

            <textarea
              value={result}
              readOnly
              className="mt-3 min-h-[320px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
              >
                Generate New
              </button>

              <button
                onClick={handleCopy}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-50"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this Lorem Ipsum Generator"
          aboutParagraphs={[
            "This lorem ipsum generator creates placeholder text for design and development.",
            "It can generate words, sentences, or paragraphs.",
          ]}
          howToUseSteps={[
            "Choose generation type.",
            "Select the number of items.",
            "Generate and copy the text.",
          ]}
          faqItems={[
            {
              question: "What is lorem ipsum used for?",
              answer: "It is placeholder text used in design and publishing.",
            },
            {
              question: "Can I generate paragraphs?",
              answer: "Yes, the tool supports words, sentences, and paragraphs.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="lorem-ipsum-generator"
          category="tools"
          title="Related tools"
        />

      </main>

      <Footer />
    </div>
  );
}