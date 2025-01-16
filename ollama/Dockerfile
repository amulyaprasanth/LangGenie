FROM ollama/ollama

ENV APP_HOME=/home

WORKDIR $APP_HOME

RUN ollama serve & sleep 5 && ollama pull llama3.1

COPY . .

