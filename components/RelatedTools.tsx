import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";

type RelatedToolsProps = {
  currentSlug: string;
  category: "tools" | "calculators";
  title?: string;
};

export default function RelatedTools({
  currentSlug,
  category,
  title = "Related tools",
}: RelatedToolsProps) {
  const related = tools
    .filter((tool) => tool.category === category && tool.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-slate-600">
          Explore more useful {category === "calculators" ? "calculators" : "tools"}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <ToolCard
            key={tool.slug}
            slug={tool.slug}
            name={tool.name}
            description={tool.description}
          />
        ))}
      </div>
    </section>
  );
}