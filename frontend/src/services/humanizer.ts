
import type { HumanizerSettings } from "@/features/humanizer/types";

export interface HumanizeResponse {
  original_text: string;
  humanized_text: string;
  model: string;
  tone: string;
  intensity: string;
}

export async function humanizeText(
  text: string,
  settings: HumanizerSettings,
  signal?: AbortSignal
): Promise<HumanizeResponse> {
  const response = await fetch("/api/humanize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      tone: settings.tone,
      intensity: settings.intensity,
    }),
    signal,
  });

  if (!response.ok) {
    let message = "Unable to humanize text. Please try again.";

    try {
      const error: unknown = await response.json();

      if (
        typeof error === "object" &&
        error !== null &&
        "detail" in error &&
        typeof error.detail === "string"
      ) {
        message = error.detail;
      }
    } catch {
      // Keep the fallback error message.
    }

    throw new Error(message);
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("humanized_text" in data) ||
    typeof data.humanized_text !== "string" ||
    !data.humanized_text.trim()
  ) {
    throw new Error("The AI returned an invalid response.");
  }

  return data as HumanizeResponse;
}
