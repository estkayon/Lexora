"use client";

import type {
  HumanizerSettings as Settings,
  RewriteIntensity,
  WritingTone,
} from "../types";

interface HumanizerSettingsProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
}

const toneOptions: {
  value: WritingTone;
  label: string;
}[] = [
  { value: "natural", label: "Natural" },
  { value: "academic", label: "Academic" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "creative", label: "Creative" },
];

const intensityOptions: {
  value: RewriteIntensity;
  label: string;
  description: string;
}[] = [
  {
    value: "light",
    label: "Light",
    description: "Minimal changes",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Natural refinement",
  },
  {
    value: "deep",
    label: "Deep",
    description: "Extensive rewriting",
  },
];

export function HumanizerSettings({
  settings,
  onChange,
}: HumanizerSettingsProps) {
  function updateSettings<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <section
      aria-labelledby="humanizer-settings-title"
      className="space-y-6 rounded-2xl border border-border bg-surface p-5 md:p-6"
    >
      <div>
        <h3
          id="humanizer-settings-title"
          className="text-base font-semibold"
        >
          Humanizer Settings
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Customize how Lexora refines your writing.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="humanizer-model"
            className="text-sm font-medium"
          >
            AI Model
          </label>

          <select
            id="humanizer-model"
            value={settings.model}
            onChange={(event) =>
              updateSettings(
                "model",
                event.target.value as Settings["model"]
              )
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="writing-tone"
            className="text-sm font-medium"
          >
            Writing Tone
          </label>

          <select
            id="writing-tone"
            value={settings.tone}
            onChange={(event) =>
              updateSettings(
                "tone",
                event.target.value as WritingTone
              )
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {toneOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">
          Rewriting Intensity
        </legend>

        <div className="grid gap-3 sm:grid-cols-3">
          {intensityOptions.map(
            ({ value, label, description }) => {
              const isSelected =
                settings.intensity === value;

              return (
                <label
                  key={value}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-surface-secondary"
                  }`}
                >
                  <input
                    type="radio"
                    name="rewrite-intensity"
                    value={value}
                    checked={isSelected}
                    onChange={() =>
                      updateSettings("intensity", value)
                    }
                    className="mt-1 accent-primary"
                  />

                  <span className="space-y-1">
                    <span className="block text-sm font-medium">
                      {label}
                    </span>

                    <span className="block text-xs text-muted-foreground">
                      {description}
                    </span>
                  </span>
                </label>
              );
            }
          )}
        </div>
      </fieldset>

      <p className="text-xs text-muted-foreground">
        Settings will be applied when the AI rewriting
        engine is connected.
      </p>
    </section>
  );
}