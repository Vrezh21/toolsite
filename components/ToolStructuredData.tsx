type ToolStructuredDataProps = {
  name: string;
  description: string;
  url: string;
};

export default function ToolStructuredData({
  name,
  description,
  url,
}: ToolStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}