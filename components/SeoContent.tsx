type FaqItem = {
  question: string;
  answer: string;
};

type SeoContentProps = {
  aboutTitle: string;
  aboutParagraphs: string[];
  howToUseSteps: string[];
  faqItems: FaqItem[];
};

export default function SeoContent({
  aboutTitle,
  aboutParagraphs,
  howToUseSteps,
  faqItems,
}: SeoContentProps) {
  return (
    <section className="mt-12 space-y-6">
      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">{aboutTitle}</h2>

        {aboutParagraphs.map((paragraph, index) => (
          <p key={index} className="mt-4 leading-7 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">How to use</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
          {howToUseSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>

        <div className="mt-4 space-y-4">
          {faqItems.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.question}
              </h3>
              <p className="mt-1 text-slate-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}