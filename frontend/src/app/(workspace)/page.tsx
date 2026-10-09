import { ArrowRight, ScanText, WandSparkles } from "lucide-react";

const features = [
  {
    title: "AI Humanizer",
    description:
      "Refine AI-generated content into natural, polished English while preserving the original meaning.",
    icon: WandSparkles,
  },
  {
    title: "AI Detector",
    description:
      "Analyze English writing and review indicators associated with AI-generated content.",
    icon: ScanText,
  },
];

export default function HomePage() {
  return (
      <div className="space-y-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <WandSparkles size={14} />
            AI Writing Intelligence
          </div>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Your writing, refined.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            Welcome to Lexora, your personal workspace for
            intelligent writing improvement and AI text analysis.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={23} />
              </div>

              <h3 className="text-lg font-semibold">{title}</h3>

              <p className="mt-2 min-h-18 text-sm leading-6 text-muted-foreground">
                {description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                Coming soon
                <ArrowRight size={16} />
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-base font-semibold">
            Workspace Overview
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your humanization and detection tools will appear
            here as we build and integrate each feature.
          </p>
        </div>
      </div>
   
  );
}