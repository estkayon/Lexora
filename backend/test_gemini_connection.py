from google import genai

from app.core.config import get_settings


def main() -> None:
    settings = get_settings()

    if not settings.gemini_api_key:
        raise RuntimeError("GEMINI_API_KEY is missing.")

    client = genai.Client(api_key=settings.gemini_api_key)

    try:
        response = client.models.generate_content(
            model=settings.gemini_model,
            contents="Write one short, natural English sentence about reading.",
        )

        if not response.text:
            raise RuntimeError("Gemini returned an empty response.")

        print("Gemini API connection successful!")
        print("Model:", settings.gemini_model)
        print("Response:", response.text)

    finally:
        client.close()


if __name__ == "__main__":
    main()
