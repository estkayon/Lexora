import { ScanText } from "lucide-react";

export default function DetectorPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <ScanText className="text-primary" size={28} />

        <h2 className="text-3xl font-semibold tracking-tight">
          AI Detector
        </h2>
      </div>

      <p className="max-w-2xl text-muted-foreground">
        Analyze English writing and review indicators
        associated with AI-generated content.
      </p>

      <div className="rounded-2xl border border-border bg-surface p-8">
        <p className="text-sm text-muted-foreground">
          Detection functionality will be integrated later.
        </p>
      </div>
    </section>
  );
}