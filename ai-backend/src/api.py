from fastapi import APIRouter
import os
from sudokuSlover.views import router as meta_router

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

api_router = APIRouter()

# api_router.include_router(training_router, prefix="/training")
# api_router.include_router(session_router, prefix="/session")
api_router.include_router(meta_router, prefix="/sudoku/solve")

api_router_root = APIRouter()


@api_router_root.get("/api/", status_code=200)
def read_root():
    return "Solving sudoku api"
