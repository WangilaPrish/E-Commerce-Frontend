export default function Team() {
  const members = [
    { id: 1, name: "Asha Mwangi", role: "Founder & Designer", image: "https://source.unsplash.com/400x400/?woman,portrait" },
    { id: 2, name: "Liam Carter", role: "Operations", image: "https://source.unsplash.com/400x400/?man,portrait" },
    { id: 3, name: "Maya Patel", role: "Product Lead", image: "https://source.unsplash.com/400x400/?portrait,woman" },
  ];

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold">Meet the team</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {members.map((m) => (
          <div key={m.id} className="rounded-lg border p-4 text-center">
            <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-gray-100">
              <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
            </div>
            <div className="text-lg font-medium">{m.name}</div>
            <div className="mt-1 text-sm text-zinc-600">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
