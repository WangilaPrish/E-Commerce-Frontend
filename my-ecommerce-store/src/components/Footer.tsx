import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm">&copy; {new Date().getFullYear()} NovaThreads</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
