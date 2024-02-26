import os

from fastapi import APIRouter
from .services import train

router = APIRouter()


@router.get("/number-detector-model")
async def train_model():
    model, model_name = train()
    API_HOST = os.getenv("API_HOST", None)

    return {
        "model_name": model_name,
        "link_to_model": f"{API_HOST}/static/trained_models/{model_name}",
        "model": model.to_json()
    }
