@echo off
echo.
echo ========================================
echo   LangGenie - AI Content Generator
echo ========================================
echo.

echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo Docker found! Checking Docker Compose...
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Compose is not installed or not in PATH
    echo Please ensure Docker Desktop is properly installed
    pause
    exit /b 1
)

echo Docker Compose found!
echo.

echo Checking for NVIDIA GPU...
nvidia-smi >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: nvidia-smi not found. GPU acceleration may not be available.
    echo If you have an NVIDIA GPU, please install the latest drivers.
) else (
    echo NVIDIA GPU detected! GPU acceleration will be available.
)

echo.
echo Starting LangGenie services...
echo This may take a few minutes on first run...
echo.

docker-compose down >nul 2>&1
docker-compose build --no-cache
if %errorlevel% neq 0 (
    echo ERROR: Failed to build containers
    pause
    exit /b 1
)

docker-compose up -d
if %errorlevel% neq 0 (
    echo ERROR: Failed to start services
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo LangGenie is now running:
echo.
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   Ollama:   http://localhost:11434
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:3000

echo.
echo To stop LangGenie: docker-compose down
echo To view logs: docker-compose logs -f
echo.
pause
