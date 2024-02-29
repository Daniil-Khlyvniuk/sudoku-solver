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
    MODEL_NAME = "3_digit_classifier.keras"
    PATH_TO_STATIC_FILES = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../static"))
    PATH_TO_SAVED_MODELS = PATH_TO_STATIC_FILES + "/trained_models"
    PATH_TO_SAVED_DIJIT_DETECTOR_MODEL = PATH_TO_SAVED_MODELS + "/" + MODEL_NAME

    model = initialize_prediction_model(PATH_TO_SAVED_DIJIT_DETECTOR_MODEL)
    complete_image, board = solve_solution(body.init_img, model)
    result_img = encode_image(complete_image)

    end_time = time.time()
    elapsed_time = end_time - start_time

    return {
        "initial_image": body.init_img,
        "result_img": result_img,
        "solved_board": np.array(board).tolist(),
        "elapsed_time": elapsed_time,
        "model_name": MODEL_NAME,
    }
