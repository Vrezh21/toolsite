"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const getLinkClass = (href: string) => {
    const baseClass = "rounded-lg px-3 py-2 transition";
    const activeClass = "bg-slate-900 text-white";
    const inactiveClass =
      "text-slate-700 hover:bg-slate-100 hover:text-slate-900";

    return `${baseClass} ${isActive(href) ? activeClass : inactiveClass}`;
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          ToolSite
        </Link>

        <nav className="flex gap-2 text-sm font-medium">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/tools" className={getLinkClass("/tools")}>
            Tools
          </Link>
          <Link href="/calculators" className={getLinkClass("/calculators")}>
            Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}