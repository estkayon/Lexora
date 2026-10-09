import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <History className="text-primary" size={28} />

        <h2 className="text-3xl font-semibold tracking-tight">
          History
        </h2>
      </div>

      <p className="text-muted-foreground">
        Review your previous writing sessions.
      </p>

      <div className="rounded-2xl border border-border bg-surface p-8">
        <p className="text-sm text-muted-foreground">
          Local history storage will be added in a later step.
        </p>
      </div>
    </section>
  );
}