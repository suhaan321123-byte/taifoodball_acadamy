import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-pitch px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl uppercase text-neon">404</h1>
        <h2 className="mt-4 font-display text-xl uppercase">Page not found</h2>
        <Link href="/" className="btn-neon mt-6">
          Go home
        </Link>
      </div>
    </main>
  );
}