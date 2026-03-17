import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-xl font-bold text-slate-900">ToolSite</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Useful online tools and calculators that work directly in your
              browser.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Navigation
            </div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <Link href="/tools" className="hover:text-slate-900">
                Tools
              </Link>
              <Link href="/calculators" className="hover:text-slate-900">
                Calculators
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Information
            </div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link href="/contact" className="hover:text-slate-900">
                Contact
              </Link>
              <Link href="/privacy-policy" className="hover:text-slate-900">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-slate-900">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2026 ToolSite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}