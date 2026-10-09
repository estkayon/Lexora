from enum import Enum

from pydantic import BaseModel, Field, field_validator


class WritingTone(str, Enum):
    natural = "natural"
    academic = "academic"
    professional = "professional"
    casual = "casual"
    creative = "creative"


class RewriteIntensity(str, Enum):
    light = "light"
    balanced = "balanced"
    deep = "deep"


class HumanizeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=30000)
    tone: WritingTone = WritingTone.natural
    intensity: RewriteIntensity = RewriteIntensity.balanced

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        cleaned = value.strip()

        if not cleaned:
            raise ValueError("Text must not be empty.")

        if len(cleaned.split()) > 3000:
            raise ValueError("Maximum 3000 words allowed.")

        return cleaned


class HumanizeResponse(BaseModel):
    original_text: str
    humanized_text: str
    model: str
    tone: WritingTone
    intensity: RewriteIntensity
