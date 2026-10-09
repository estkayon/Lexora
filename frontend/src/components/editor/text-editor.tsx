"use client";

import { useId, useState } from "react";
import { Check, Copy, Download } from "lucide-react";

import { countWords, downloadText } from "@/lib/text";

type TextEditorProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  maxWords?: number;
};

export function TextEditor({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  minHeight = 320,
  maxWords,
}: TextEditorProps) {
  const editorId = useId();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const wordCount = countWords(value);
  const overLimit = maxWords !== undefined && wordCount > maxWords;
  const hasContent = value.length > 0;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setError("");
    } catch {
      setError("Could not copy text. Check browser permissions.");
    }
  }

  function handleDownload() {
    downloadText(
      value,
      readOnly ? "lexora-refined.txt" : "lexora-original.txt"
    );
  }

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <label
          htmlFor={editorId}
          className="text-sm font-semibold text-foreground"
        >
          {label}
        </label>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs ${
              overLimit ? "text-red-500" : "text-muted-foreground"
            }`}
          >
            {wordCount.toLocaleString()}
            {maxWords !== undefined
              ? ` / ${maxWords.toLocaleString()}`
              : ""}{" "}
            words
          </span>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!hasContent}
            aria-label={`Copy ${label}`}
            title={copied ? "Copied" : "Copy text"}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!hasContent}
            aria-label={`Download ${label}`}
            title="Download text"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-surface-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      <textarea
        id={editorId}
        value={value}
        onChange={(event) => {
          setCopied(false);
          setError("");
          onChange?.(event.target.value);
        }}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={!readOnly}
        style={{ minHeight }}
        aria-invalid={overLimit}
        className="w-full flex-1 resize-y bg-transparent px-5 py-5 text-sm leading-7 text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
      />

      <div className="border-t border-border px-5 py-3">
        {error ? (
          <p role="alert" className="text-xs text-red-500">
            {error}
          </p>
        ) : overLimit ? (
          <p role="alert" className="text-xs text-red-500">
            Input exceeds the {maxWords?.toLocaleString()} word limit.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            {readOnly ? "Generated output" : "English text input"}
          </p>
        )}
      </div>
    </section>
  );
}