export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-pitch px-6 text-foreground" aria-live="polite">
      <div className="text-center">
        <span className="mx-auto block size-10 animate-spin rounded-full border-2 border-neon/25 border-t-neon" aria-hidden="true" />
        <p className="eyebrow mt-5">Tai Football Academy</p>
        <p className="mt-2 text-sm text-foreground/55">Loading academy content…</p>
      </div>
    </main>
  );
}