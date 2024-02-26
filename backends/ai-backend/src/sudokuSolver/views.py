import time

import numpy as np
from fastapi import APIRouter, status
from pydantic import BaseModel
from .services import solve_solution
from .helpers.initializePredictionModel import *
from .helpers.encodeImage import *
import os

router = APIRouter()


class RequestBody(BaseModel):
    init_img: str


@router.post("/solve", status_code=status.HTTP_201_CREATED)
async def solve(body: RequestBody):
    start_time = time.time()
    MODEL_NAME = "dijit_detector_model.keras"
    PATH_TO_STATIC_FILES = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../static"))
    PATH_TO_SAVED_MODELS = PATH_TO_STATIC_FILES + "/trained_models"
    PATH_TO_SAVED_DIJIT_DETECTOR_MODEL = PATH_TO_SAVED_MODELS + "/" + MODEL_NAME
    API_HOST = os.getenv("AI_API_HOST", None)

    model = initialize_prediction_model(PATH_TO_SAVED_DIJIT_DETECTOR_MODEL)
    _, inv_perspective, board, solved_numbers = solve_solution(body.init_img, model)
    result_img = encode_image(inv_perspective)

    end_time = time.time()
    elapsed_time = end_time - start_time

    return {
        "initial_image": body.init_img,
        "inv_perspective": result_img,
        "board": np.array(board).tolist(),
        "solved_numbers": solved_numbers.tolist(),
        "elapsed_time": elapsed_time,
        "model_name": MODEL_NAME,
        "link_to_model": f"{API_HOST}/static/trained_models/{MODEL_NAME}"
    }
