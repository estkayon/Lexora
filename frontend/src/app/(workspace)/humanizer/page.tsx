import { WandSparkles } from "lucide-react";

export default function HumanizerPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <WandSparkles className="text-primary" size={28} />

        <h2 className="text-3xl font-semibold tracking-tight">
          AI Humanizer
        </h2>
      </div>

      <p className="max-w-2xl text-muted-foreground">
        Rewrite English text with natural flow, clarity,
        and meaning preservation.
      </p>

      <div className="rounded-2xl border border-border bg-surface p-8">
        <p className="text-sm text-muted-foreground">
          Humanizer workspace will be implemented in the next step.
        </p>
      </div>
    </section>
  );
}