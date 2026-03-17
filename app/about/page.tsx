import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-900">About</h1>
        <p className="mt-4 text-lg text-slate-700">
          ToolSite is a website with useful online tools and calculators that
          work directly in your browser.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <p className="leading-7 text-slate-700">
            We build simple and convenient tools for everyday tasks including
            text utilities, JSON formatting, conversions, calculators, and other
            helpful browser-based tools.
          </p>

          <p className="mt-4 leading-7 text-slate-700">
            Our goal is to create a fast, clear, and user-friendly website where
            people can open the right tool and get results immediately without
            complicated registration or unnecessary steps.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}