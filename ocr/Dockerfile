FROM python:3.8-slim-buster
RUN apt-get update -y
RUN apt-get -y install tesseract-ocr-deu
WORKDIR /usr/src/app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD ["flask", "run", "--host=0.0.0.0", "--port", "5000"]