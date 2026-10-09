import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from google.genai.errors import APIError

from app.schemas.humanizer import HumanizeRequest, HumanizeResponse
from app.services.humanizer import HumanizerService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/humanize", tags=["Humanizer"])


def get_humanizer_service() -> HumanizerService:
    return HumanizerService()


@router.post("", response_model=HumanizeResponse)
def humanize_text(
    request: HumanizeRequest,
    service: Annotated[
        HumanizerService,
        Depends(get_humanizer_service),
    ],
) -> HumanizeResponse:
    try:
        return service.humanize(request)

    except APIError as exc:
        logger.warning(
            "Gemini API error | status=%s | message=%s",
            exc.code,
            str(exc),
        )

        status_code = 503 if exc.code in (429, 500, 502, 503, 504) else 502

        raise HTTPException(
            status_code=status_code,
            detail="AI service is temporarily unavailable.",
        ) from exc

    except RuntimeError as exc:
        logger.error("Humanizer response error: %s", exc)

        raise HTTPException(
            status_code=502,
            detail="AI service returned an invalid response.",
        ) from exc
