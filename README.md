# Langgenie: WikiArxiv Explorer and DocQnA for PDFs

Langgenie is a web application that allows users to explore the vast amount of information available on arXiv and ask questions about PDFs using DocQnA. It is built using Langchain, a powerful library for natural language processing tasks.

**Features**

* **WikiArxiv Explorer:** Navigate and search through arXiv papers using a user-friendly interface.
* **DocQnA for PDFs:** Ask questions in natural language about the content of uploaded PDFs and get relevant answers.

**Deployment**

A live demo of Langgenie is available at [https://langgenie.netlify.app/](https://langgenie.netlify.app/).

**Prerequisites**

* Node.js and npm (or yarn)
* Python and pip

**Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/amulyaprasanth/LangGenie.git
   ```

2. Navigate to the project directory:

   ```bash
   cd langgenie
   ```

3. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

**Running the Application**

1. **Start the frontend:**

   ```bash
   npm run dev
   ```

   This will start the frontend development server on http://localhost:5173 by default.

2. **Start the backend:**

   ```bash
   cd backend
   pip install -r prod_requirements.txt 
   uvicorn main:app 
   ```

   This will start the FastAPI backend server.

**Extra Information**

* **Ollama Branch:** The `ollama` branch contains the code to run the docker container with Ollama for the project. This allows for more efficient and customizable LLM processing on your local machine. 

    * **To use Ollama:**
        1. Checkout the `ollama` branch:
           ```bash
           git checkout ollama
           ```
        2. Follow the Ollama installation and setup instructions.
        3. Run the Ollama docker container according to the instructions in the `ollama` branch.
        4. Adjust the backend code to use the Ollama model instead of the default LLM.

* **Project Structure:**
    * **frontend:** This directory contains the React application built as an npm vite package. It handles the user interface, interactions, and communication with the backend API endpoints.
    * **backend:** This directory contains the backend logic implemented using FastAPI. It handles data processing, interaction with external services (like arXiv), and provides API endpoints for the frontend to consume.

**Contributing**

We welcome contributions to Langgenie! If you have any bug fixes, improvements, or new features, please feel free to submit a pull request.

**License**

Langgenie is licensed under the MIT License. See the LICENSE file for more details.

