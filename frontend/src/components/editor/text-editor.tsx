"use client";

import { useId } from "react";

type TextEditorProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
};

export function TextEditor({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  minHeight = 320,
}: TextEditorProps) {
  const editorId = useId();

  const wordCount = value.trim()
    ? value.trim().split(/\s+/).length
    : 0;

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <label
          htmlFor={editorId}
          className="text-sm font-semibold text-foreground"
        >
          {label}
        </label>

        <span className="text-xs text-muted-foreground">
          {wordCount.toLocaleString()} words
        </span>
      </div>

      <textarea
        id={editorId}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={!readOnly}
        style={{ minHeight }}
        className="w-full flex-1 resize-y bg-transparent px-5 py-5 text-sm leading-7 text-foreground outline-none placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
      />

      <div className="border-t border-border px-5 py-3">
        <p className="text-xs text-muted-foreground">
          {readOnly ? "Generated output" : "English text input"}
        </p>
      </div>
    </section>
  );
}