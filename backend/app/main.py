from fastapi import FastAPI

from app.api.routes.health import router as health_router
from app.api.routes.humanizer import router as humanizer_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    debug=settings.debug,
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(humanizer_router, prefix="/api/v1")
