import logging

from fastapi import FastAPI
from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

app = FastAPI()


@app.get("/")
async def index():
    return RedirectResponse(url="/index.html")

app.mount("/", StaticFiles(directory="../frontend/dist"), name="ui")
