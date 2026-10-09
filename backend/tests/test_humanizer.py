import pytest
from fastapi.testclient import TestClient

from app.api.routes.humanizer import get_humanizer_service
from app.main import app
from app.schemas.humanizer import HumanizeRequest, HumanizeResponse


class FakeHumanizerService:
    def humanize(self, request: HumanizeRequest) -> HumanizeResponse:
        return HumanizeResponse(
            original_text=request.text,
            humanized_text="This is a clearer, more natural sentence.",
            model="test-model",
            tone=request.tone,
            intensity=request.intensity,
        )


@pytest.fixture
def client():
    app.dependency_overrides[get_humanizer_service] = lambda: FakeHumanizerService()

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.pop(get_humanizer_service, None)


def test_humanize_success(client: TestClient) -> None:
    response = client.post(
        "/api/v1/humanize",
        json={
            "text": "Artificial intelligence improves writing.",
            "tone": "natural",
            "intensity": "balanced",
        },
    )

    assert response.status_code == 200
    assert response.json()["model"] == "test-model"
    assert (
        response.json()["humanized_text"] == "This is a clearer, more natural sentence."
    )


def test_humanize_rejects_empty_text(client: TestClient) -> None:
    response = client.post(
        "/api/v1/humanize",
        json={"text": "   "},
    )

    assert response.status_code == 422


def test_humanize_rejects_invalid_tone(client: TestClient) -> None:
    response = client.post(
        "/api/v1/humanize",
        json={
            "text": "Some example text.",
            "tone": "invalid",
        },
    )

    assert response.status_code == 422
