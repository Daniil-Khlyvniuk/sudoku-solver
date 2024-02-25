import os
from dotenv import load_dotenv
import logging
import uvicorn
import sys
# from app import app

sys.path.append(os.path.abspath('src'))

logging.basicConfig(level=logging.INFO)
load_dotenv()

APP_PORT = os.getenv("APP_PORT", 8080)
DEVELOP_MODE = os.getenv("DEVELOP_MODE", False)


def main():
    # uvicorn.run(app, port=int(APP_PORT), reload=True)
    uvicorn.run("app:app", host="0.0.0.0", port=int(APP_PORT), reload=DEVELOP_MODE)


if __name__ == "__main__":
    main()
