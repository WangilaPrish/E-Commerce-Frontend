export default function Testimonials() {
  const items = [
    { id: 1, quote: "Love the quality — my go-to brand now.", author: "— Alex R" },
    { id: 2, quote: "Fast shipping and great support.", author: "— Jamie L" },
    { id: 3, quote: "The fit is perfect. Highly recommend!", author: "— Priya K" },
  ];

  return (
    <section className="my-12">
      <h3 className="mb-4 text-2xl font-semibold">What customers say</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((t) => (
          <blockquote key={t.id} className="rounded-lg border p-6">
            <p className="mb-4 text-sm">"{t.quote}"</p>
            <cite className="text-xs font-medium text-zinc-600">{t.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
