import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Contact Us</h1>
        <p className="mb-6 text-sm text-zinc-600">Have a question or need help? Send us a message and we'll get back to you within 1-2 business days.</p>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-semibold">Send a message</h2>
            <ContactForm />
          </div>

          <aside className="rounded-md border p-4">
            <h3 className="mb-2 text-lg font-semibold">Contact details</h3>
            <p className="text-sm text-zinc-700">Email: <a className="text-blue-600" href="mailto:hello@example.com">hello@example.com</a></p>
            <p className="mt-2 text-sm text-zinc-700">Phone: <a className="text-blue-600" href="tel:+1234567890">+1 (234) 567-890</a></p>
            <p className="mt-4 text-sm text-zinc-600">Or reach out on social media:</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a className="text-blue-600" href="#">Twitter</a></li>
              <li><a className="text-blue-600" href="#">Instagram</a></li>
              <li><a className="text-blue-600" href="#">Facebook</a></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
