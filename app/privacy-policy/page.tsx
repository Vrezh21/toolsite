import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-900">Contact</h1>
        <p className="mt-4 text-lg text-slate-700">
          If you have any questions, suggestions, or feedback, feel free to
          contact us.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <p className="text-slate-700">
            Email:{" "}
            <a
              href="mailto:contact@toolsite.com"
              className="font-medium text-slate-900 underline"
            >
              contact@toolsite.com
            </a>
          </p>

          <p className="mt-4 text-slate-700">
            We do our best to respond as quickly as possible.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}