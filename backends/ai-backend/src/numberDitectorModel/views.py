from fastapi import APIRouter
from .services import train

router = APIRouter()


@router.get("/number-detector-model")
async def train_model():
    model = train()
    model.to_json()

    return model.to_json()
