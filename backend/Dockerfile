# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install Poetry
RUN pip install poetry

# Install the dependencies
RUN poetry install --without dev

# Make port 8000 available to the world outside this container
EXPOSE 8000


# Run app.py when the container launches
CMD  ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]