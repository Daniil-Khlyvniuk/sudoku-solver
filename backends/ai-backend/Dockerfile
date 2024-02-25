FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx libglib2.0-0

WORKDIR /ai-backend
COPY ./requirements.txt /ai-backend

RUN pip install --no-cache-dir --upgrade -r /ai-backend/requirements.txt

COPY . /ai-backend

CMD python3 run.py

#=====================================
# build
# docker build . -t ai-backend
# run
# docker run --rm -it -p 8000:8000/tcp ai-backend