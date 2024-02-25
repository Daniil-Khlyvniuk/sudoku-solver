from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from src.api import api_router_root, api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    startup()
    yield
    shutdown()


app = FastAPI(lifespan=lifespan)
api_root = FastAPI(title="Solve sudoku backends")

# CORS
origins = [
    "*",
]

# Include middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_root.include_router(api_router_root)
api_root.include_router(api_router)

app.mount("/api", app=api_root)


def startup():
    pass


def shutdown():
    pass
