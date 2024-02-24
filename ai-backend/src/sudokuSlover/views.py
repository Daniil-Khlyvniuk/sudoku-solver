import os
import yaml
import logging
from fastapi import APIRouter, status
from .models import ModelParam, ModelParamsResponse, DatabasesResponse, ModelsResponse
from ..database import DATABASES
from ..training.ml_models import MODELS_DICT
from typing import Dict, List
router = APIRouter()


@router.get("/params", status_code=status.HTTP_200_OK)
async def get_params() -> ModelParamsResponse:
    """
    Enpoint to get the parameters for all models.
    :return ModelParamsResponse: a response containing the parameters for all models
    """
    with open("src/meta/hyperparams.yaml","r") as fp:
        try:
            config = yaml.safe_load(fp)
        except yaml.YAMLError as exc:
            print(exc)
    logging.info(f"Loaded hyperparams: {config}")
    params = {model_name:[ModelParam(**param) for param in model_params.values()] for model_name, model_params in config.items()}
    return ModelParamsResponse(model_params=params)


@router.get("/databases", status_code=status.HTTP_200_OK)
async def get_databases() -> DatabasesResponse:
    """Endpoint to get a list of databases that are supported.

    :return DatabasesResponse: a response containing a list of databases
    """
    return DatabasesResponse(databases=list(DATABASES.keys()))


@router.get("/models", status_code=status.HTTP_200_OK)
async def get_models() -> ModelsResponse:
    """Endpoint to get a list of models that are supported.

    :return ModelsResponse: a response containing a list of models
    """
    return ModelsResponse(models=list(MODELS_DICT.keys()))