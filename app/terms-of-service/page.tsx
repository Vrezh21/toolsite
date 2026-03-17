import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>

        <div className="mt-8 space-y-4 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <p className="leading-7 text-slate-700">
            By using ToolSite, you agree to use the website only for lawful
            purposes.
          </p>

          <p className="leading-7 text-slate-700">
            All tools are provided “as is” without guarantees of absolute
            accuracy or uninterrupted availability.
          </p>

          <p className="leading-7 text-slate-700">
            We reserve the right to update, modify, or remove tools and website
            content at any time.
          </p>

          <p className="leading-7 text-slate-700">
            Continued use of the website means you agree to the current version
            of these terms.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}