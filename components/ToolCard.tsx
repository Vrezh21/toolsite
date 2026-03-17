import Link from "next/link";

type ToolCardProps = {
  slug: string;
  name: string;
  description: string;
};

export default function ToolCard({
  slug,
  name,
  description,
}: ToolCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  );
}