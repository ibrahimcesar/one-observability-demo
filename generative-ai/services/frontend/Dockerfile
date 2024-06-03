ARG PORT=8080
ARG ENDPOINT="<urL>"

FROM python:3.10-slim

WORKDIR /app

COPY assets/. .

COPY app.py .
COPY index.html ./templates/index.html
COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE ${PORT}

ENTRYPOINT ["python"]
CMD ["export APIGATEWAY_ENDPOINT=${ENDPOINT}", "app.py"]
