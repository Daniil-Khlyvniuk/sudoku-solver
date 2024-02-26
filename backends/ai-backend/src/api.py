from fastapi import APIRouter
from .sudokuSolver.views import router as sudoku_router
from .numberDitectorModel.views import router as train_router

api_router = APIRouter()

api_router.include_router(sudoku_router, prefix="/sudoku")
api_router.include_router(train_router, prefix="/train")

api_router_root = APIRouter()


@api_router_root.get("/api", status_code=200)
def read_root():
    return "Solving sudoku backends"
