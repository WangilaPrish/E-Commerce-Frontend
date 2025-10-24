import AboutHero from "../../components/AboutHero";
import Team from "../../components/Team";
import Newsletter from "../../components/Newsletter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <AboutHero />

        <section className="my-8">
          <h2 className="text-2xl font-semibold">Our mission</h2>
          <p className="mt-3 max-w-3xl text-lg">We exist to create thoughtful clothing that blends longevity with modern design. Sustainability, transparency and user-focused design guide every decision we make — from fabric choices to packaging.</p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold">Design philosophy</h2>
          <p className="mt-3 max-w-3xl text-lg">We believe less is more. Our pieces are designed to be versatile, timeless and easy to style. Durability and comfort are prioritized so you can wear our pieces season after season.</p>
        </section>

        <Team />

        <Newsletter />
      </div>
    </div>
  );
}
