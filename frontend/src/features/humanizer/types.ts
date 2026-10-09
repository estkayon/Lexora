export type HumanizerModel = "gemini";

export type WritingTone =
  | "natural"
  | "academic"
  | "professional"
  | "casual"
  | "creative";

export type RewriteIntensity = "light" | "balanced" | "deep";

export interface HumanizerSettings {
  model: HumanizerModel;
  tone: WritingTone;
  intensity: RewriteIntensity;
}