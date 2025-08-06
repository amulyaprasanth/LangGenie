#!/bin/bash

# Start ollama server in background
echo "Starting Ollama server..."
/bin/ollama serve &

pid=$!

# Wait for server to be ready
echo "Waiting for Ollama server to start..."
for i in {1..30}; do
  if /bin/ollama list >/dev/null 2>&1; then
    echo "Ollama server is ready!"
    break
  fi
  echo "Waiting for server... ($i/30)"
  sleep 2
done

# Pull the llama3.1 model
echo "Pulling llama3.1 model..."
/bin/ollama pull llama3.1

echo "Ollama server ready with llama3.1 model"

# Keep the server running
wait $pid
