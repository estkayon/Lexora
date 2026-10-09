"use client";

import { useState } from "react";
import {
  ArrowRight,
  RotateCcw,
  WandSparkles,
} from "lucide-react";

import { TextEditor } from "@/components/editor/text-editor";
import { HumanizerSettings } from "./components/humanizer-settings";
import type { HumanizerSettings as Settings } from "./types";

import {
  MAX_INPUT_WORDS,
  countWords,
} from "@/lib/text";

const defaultSettings: Settings = {
  model: "gemini",
  tone: "natural",
  intensity: "balanced",
};

export function HumanizerWorkspace() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [settings, setSettings] =
    useState<Settings>(defaultSettings);

  const hasInput = inputText.trim().length > 0;

    const inputWordCount = countWords(inputText);
    const exceedsWordLimit = inputWordCount > MAX_INPUT_WORDS;
    const canHumanize = hasInput && !exceedsWordLimit;

  function handleClear() {
    setInputText("");
    setOutputText("");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <WandSparkles size={14} />
            AI Writing Assistant
          </div>

          <h2 className="text-3xl font-semibold tracking-tight">
            AI Humanizer
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Refine your English writing with natural flow,
            clarity, and meaning preservation.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClear}
          disabled={!hasInput && !outputText}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={16} />
          Clear All
        </button>
      </div>

      <HumanizerSettings
        settings={settings}
        onChange={setSettings}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <TextEditor
            label="Original Text"
            value={inputText}
            onChange={(value) => {
                setInputText(value);
                setOutputText("");
            }}
            placeholder="Paste or write your English text here..."
            maxWords={MAX_INPUT_WORDS}
        />

        <TextEditor
          label="Humanized Text"
          value={outputText}
          readOnly
          placeholder="Your refined writing will appear here..."
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4">
        <p className="text-xs text-muted-foreground">
          Selected: {settings.model.toUpperCase()} ·{" "}
          {settings.tone} · {settings.intensity}
        </p>

        <button
          type="button"
          disabled
          title="AI model integration is coming in a later step"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white opacity-50 dark:text-background"
        >
          <WandSparkles size={17} />
          Humanize Text
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}