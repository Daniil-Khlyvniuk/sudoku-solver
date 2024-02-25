import numpy as np
from fastapi import APIRouter, status
from pydantic import BaseModel
from .services import solve_solution
from .helpers.initializePredictionModel import *
import os

router = APIRouter()


class RequestBody(BaseModel):
    init_img: str


@router.post("/solve", status_code=status.HTTP_201_CREATED)
async def solve(body: RequestBody):
    resources_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'Resources'))
    model_path = os.path.join(resources_dir, 'model.h5')
    model = initialize_prediction_model(model_path)

    initial_image, inv_perspective, board, solvedNumbers = solve_solution(body.init_img, model)

    # board = board.tolist()  # Convert board to a list
    # solvedNumbers = solvedNumbers.to

    # json_compatible_item_data =

    return {
        "initial_image": body.init_img,
        # "inv_perspective": inv_perspective.tolist(),
        "board": np.array(board).tolist()
        # "solvedNumbers": solvedNumbers,
    }
