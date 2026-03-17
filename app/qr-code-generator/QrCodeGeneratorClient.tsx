"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import ToolStructuredData from "@/components/ToolStructuredData";

export default function QrCodeGeneratorClient() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("256");

  const qrUrl = useMemo(() => {
    const trimmed = text.trim();
    const sizeValue = Math.min(Math.max(Number(size) || 256, 128), 1024);

    if (!trimmed) return "";

    return `https://api.qrserver.com/v1/create-qr-code/?size=${sizeValue}x${sizeValue}&data=${encodeURIComponent(
      trimmed
    )}`;
  }, [text, size]);

  const handleDownload = async () => {
    if (!qrUrl) return;

    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qr-code.png";
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(qrUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ToolStructuredData
        name="QR Code Generator"
        description="Generate QR codes online instantly for links, text, and more."
        url="https://toolsite.ink/qr-code-generator"
      />

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "QR Code Generator" },
          ]}
        />

        <h1 className="text-4xl font-bold text-slate-900">
          QR Code Generator
        </h1>
        <p className="mt-3 text-lg text-slate-700">
          Generate QR codes online for links, text, contact info, and more.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Text or URL
            </label>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, email, or anything else..."
              className="min-h-[220px] w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
            />

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Size (px)
              </label>
              <input
                type="number"
                min="128"
                max="1024"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-500">QR code preview</div>

            <div className="mt-4 flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="Generated QR code"
                  className="max-h-[280px] max-w-full"
                />
              ) : (
                <div className="text-slate-500">QR code will appear here</div>
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={handleDownload}
                disabled={!qrUrl}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>

        <SeoContent
          aboutTitle="About this QR Code Generator"
          aboutParagraphs={[
            "This QR code generator helps you create QR codes for URLs, text, emails, and other content instantly.",
            "It is useful for marketing, product packaging, business cards, event materials, and everyday sharing.",
          ]}
          howToUseSteps={[
            "Enter the text, link, or content you want to encode.",
            "Choose the QR code size.",
            "Download the generated QR code as a PNG image.",
          ]}
          faqItems={[
            {
              question: "Can I generate a QR code for a website link?",
              answer:
                "Yes, you can paste any website URL and generate a QR code for it.",
            },
            {
              question: "Can I download the QR code?",
              answer:
                "Yes, you can download the generated QR code as a PNG file.",
            },
          ]}
        />

        <RelatedTools
          currentSlug="qr-code-generator"
          category="tools"
          title="Related tools"
        />
      </main>

      <Footer />
    </div>
  );
}