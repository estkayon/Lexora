
"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  LoaderCircle,
  RotateCcw,
  WandSparkles,
} from "lucide-react";

import { TextEditor } from "@/components/editor/text-editor";
import { MAX_INPUT_WORDS, countWords } from "@/lib/text";
import { humanizeText } from "@/services/humanizer";
import { HumanizerSettings } from "./components/humanizer-settings";
import type { HumanizerSettings as Settings } from "./types";

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestController = useRef<AbortController | null>(null);

  const wordCount = countWords(inputText);
  const hasInput = inputText.trim().length > 0;
  const exceedsWordLimit = wordCount > MAX_INPUT_WORDS;

  const canHumanize =
    hasInput && !exceedsWordLimit && !isLoading;

  function cancelPendingRequest() {
    requestController.current?.abort();
    requestController.current = null;
    setIsLoading(false);
  }

  function handleInputChange(value: string) {
    cancelPendingRequest();
    setInputText(value);
    setOutputText("");
    setError(null);
  }

  function handleSettingsChange(value: Settings) {
    cancelPendingRequest();
    setSettings(value);
    setOutputText("");
    setError(null);
  }

  function handleClear() {
    cancelPendingRequest();
    setInputText("");
    setOutputText("");
    setError(null);
  }

  async function handleHumanize() {
    if (!canHumanize) return;

    const controller = new AbortController();
    requestController.current = controller;

    setIsLoading(true);
    setError(null);
    setOutputText("");

    try {
      const result = await humanizeText(
        inputText.trim(),
        settings,
        controller.signal
      );

      if (requestController.current !== controller) return;

      setOutputText(result.humanized_text);
    } catch (caughtError) {
      if (requestController.current !== controller) return;

      if (controller.signal.aborted) return;

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
        setIsLoading(false);
      }
    }
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
          disabled={!hasInput && !outputText && !isLoading}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw size={16} />
          Clear All
        </button>
      </div>

      <HumanizerSettings
        settings={settings}
        onChange={handleSettingsChange}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <TextEditor
          label="Original Text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Paste or write your English text here..."
          maxWords={MAX_INPUT_WORDS}
        />

        <TextEditor
          label="Humanized Text"
          value={outputText}
          readOnly
          placeholder={
            isLoading
              ? "Gemini is refining your writing..."
              : "Your refined writing will appear here..."
          }
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Model: Google Gemini · Tone: {settings.tone} ·
            Intensity: {settings.intensity}
          </p>

          {exceedsWordLimit && (
            <p className="text-xs font-medium text-red-500">
              Please reduce the input to {MAX_INPUT_WORDS} words.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleHumanize}
          disabled={!canHumanize}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:text-background"
        >
          {isLoading ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
              Humanizing...
            </>
          ) : (
            <>
              <WandSparkles size={17} />
              Humanize Text
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
