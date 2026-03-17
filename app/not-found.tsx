import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <div className="rounded-3xl border border-slate-300 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Error 404
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Page not found
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            The page you are looking for does not exist or may have been moved.
            Go back to the homepage or browse our tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
            >
              Go home
            </Link>

            <Link
              href="/tools"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-50"
            >
              Browse tools
            </Link>

            <Link
              href="/calculators"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-50"
            >
              Browse calculators
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}