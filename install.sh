#!/bin/bash

echo ""
echo "========================================"
echo "   LangGenie - AI Content Generator"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker installation
echo "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}ERROR: Docker is not installed${NC}"
    echo "Please install Docker from: https://www.docker.com/get-started"
    exit 1
fi

echo -e "${GREEN}Docker found!${NC} Checking Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}ERROR: Docker Compose is not installed${NC}"
    echo "Please install Docker Compose or ensure Docker Desktop is properly installed"
    exit 1
fi

echo -e "${GREEN}Docker Compose found!${NC}"
echo ""

# Check for NVIDIA GPU
echo "Checking for NVIDIA GPU..."
if command -v nvidia-smi &> /dev/null; then
    echo -e "${GREEN}NVIDIA GPU detected! GPU acceleration will be available.${NC}"
else
    echo -e "${YELLOW}WARNING: nvidia-smi not found. GPU acceleration may not be available.${NC}"
    echo "If you have an NVIDIA GPU, please install the latest drivers."
fi

echo ""
echo "Starting LangGenie services..."
echo "This may take a few minutes on first run..."
echo ""

# Stop existing containers
docker-compose down &> /dev/null

# Build containers
echo "Building containers..."
if ! docker-compose build --no-cache; then
    echo -e "${RED}ERROR: Failed to build containers${NC}"
    exit 1
fi

# Start services
echo "Starting services..."
if ! docker-compose up -d; then
    echo -e "${RED}ERROR: Failed to start services${NC}"
    exit 1
fi

echo ""
echo "========================================"
echo "   Installation Complete!"
echo "========================================"
echo ""
echo -e "${GREEN}LangGenie is now running:${NC}"
echo ""
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   Ollama:   http://localhost:11434"
echo ""

# Try to open browser (works on most systems)
echo "Opening browser in 5 seconds..."
sleep 5

if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
elif command -v open &> /dev/null; then
    open http://localhost:3000
else
    echo "Please open http://localhost:3000 in your browser"
fi

echo ""
echo "To stop LangGenie: docker-compose down"
echo "To view logs: docker-compose logs -f"
echo ""
