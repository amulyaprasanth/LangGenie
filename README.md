# LangGenie - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Installation & Setup](#installation--setup)
5. [API Documentation](#api-documentation)
6. [Frontend Components](#frontend-components)
7. [Backend Services](#backend-services)
8. [Deployment](#deployment)
9. [Development Guide](#development-guide)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**LangGenie** is an AI-powered research and knowledge exploration platform that combines Retrieval-Augmented Generation (RAG) with intelligent tool agents. The application enables users to interact with PDF documents and search academic resources through a modern web interface.

### Key Features

- **DocQnA**: Upload PDF documents and ask questions about their content using RAG
- **WikiArXiv Explore**: Search Wikipedia and ArXiv research papers using AI agents
- **Real-time Chat Interface**: Interactive Q&A with streaming responses
- **Vector Search**: Semantic similarity search on document content
- **Multi-source Integration**: Access to academic papers and general knowledge

### Target Users
- Researchers and academics
- Students working with academic papers
- Knowledge workers needing document analysis
- Anyone requiring intelligent document search and Q&A

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Home Page    │  │ DocQnA       │  │ WikiArXiv    │      │
│  │ (Landing)    │  │ (RAG Chain)  │  │ (Tool Agent) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                  │              │
│         └─────────────────┼──────────────────┘              │
│                           │ Axios HTTP                      │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  FastAPI Server│
                    │  (Port 8000)   │
                    └───────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐      ┌──────▼──────┐    ┌──────▼──────┐
   │ RAG      │      │ Tool Agent  │    │ Health      │
   │ Pipeline │      │ (Wikipedia/ │    │ Check       │
   │ (PDF QA) │      │  ArXiv)     │    │             │
   └────┬─────┘      └──────┬──────┘    └─────────────┘
        │                   │
   ┌────▼─────────┐    ┌────▼──────────┐
   │ FAISS Vector │    │ LangChain     │
   │ Store + LLaMA│    │ Tool Calling  │
   │ 3.1 (GROQ)   │    │ Agent + LLaMA │
   └──────────────┘    └───────────────┘
```

### Data Flow

#### DocQnA Flow
1. User uploads PDF → `/upload` endpoint
2. PDF extracted to text pages using PyMuPDF
3. Text split into chunks using RecursiveCharacterTextSplitter
4. Chunks embedded using FastEmbed
5. Embeddings stored in FAISS vector store
6. User query → `/query` endpoint
7. Query embedded and matched against stored vectors
8. Top matches retrieved and passed to LLaMA 3.1
9. Response returned to frontend

#### WikiArXiv Flow
1. User query → `/query_tool` endpoint
2. Tool agent receives query
3. Agent decides to use Wikipedia or ArXiv tool
4. Tool retrieves top-1 result (200 chars max)
5. LLaMA 3.1 generates response using tool output
6. Response returned to frontend

---

## Technology Stack

### Backend Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | FastAPI | 0.115.11 | REST API server |
| **LLM** | LLaMA 3.1 8B | - | Language model via GROQ API |
| **RAG Framework** | LangChain | 0.3.21+ | RAG pipeline orchestration |
| **Embeddings** | FastEmbed | 0.6.0 | Document embeddings (BAAI/bge-base-en-v1.5) |
| **Vector Store** | FAISS | 1.10.0 | Similarity search |
| **PDF Processing** | PyMuPDF | 1.25.4 | PDF text extraction |
| **Server** | Uvicorn | 0.34.0 | ASGI server |
| **Python** | Python | 3.10-3.12 | Runtime environment |

### Frontend Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Framework** | React | 18.3.1 | UI framework |
| **Build Tool** | Vite | 6.0.5 | Build tool and dev server |
| **Styling** | Tailwind CSS | 3.4.17 | Utility-first CSS |
| **Routing** | React Router DOM | 7.1.3 | Client-side routing |
| **HTTP Client** | Axios | 1.7.9 | API communication |
| **Animations** | Animate.css | 4.1.1 | CSS animations |
| **Markdown** | React-Markdown | 9.0.3 | Markdown rendering |
| **TypeScript** | TypeScript | 5.6.2 | Type safety |

---

## Installation & Setup

### Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.10-3.12 (for backend)
- **Poetry** (Python dependency management)
- **GROQ API Key** (for LLM access)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Poetry** (if not installed)
   ```bash
   pip install poetry
   ```

3. **Install dependencies**
   ```bash
   poetry install
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file
   echo "GROQ_API_KEY=your_groq_api_key_here" > .env
   ```

5. **Run the backend server**
   ```bash
   poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL** (edit `src/Constants.ts`)
   ```typescript
   export const config = {
     url: {
       BASE_URL: "http://localhost:8000" // For local development
     }
   };
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

### Docker Setup

1. **Backend Docker**
   ```bash
   cd backend
   docker build -t langgenie-backend .
   docker run -p 8000:8000 -e GROQ_API_KEY=your_key langgenie-backend
   ```

2. **Frontend Docker**
   ```bash
   cd frontend
   docker build -t langgenie-frontend .
   docker run -p 80:80 langgenie-frontend
   ```

3. **Docker Compose** (from root directory)
   ```bash
   docker-compose up -d
   ```

---

## API Documentation

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://langgenie-backend.onrender.com` (currently unavailable)

### Endpoints

#### Health Check
```http
GET /health
```
**Response:**
```json
{
  "message": "The server is healthy..."
}
```

#### Upload PDF
```http
POST /upload
Content-Type: multipart/form-data
```
**Request Body:**
- `file`: PDF file (multipart/form-data)

**Response:**
```json
{
  "message": "Upload successful"
}
```

#### Query Document
```http
POST /query
Content-Type: application/json
```
**Request Body:**
```json
{
  "question": "What is the main topic of this document?"
}
```

**Response:**
```json
{
  "answer": "The document discusses...",
  "source_documents": [...]
}
```

#### Query Tools (Wikipedia/ArXiv)
```http
POST /query_tool
Content-Type: application/json
```
**Request Body:**
```json
{
  "question": "What is quantum computing?"
}
```

**Response:**
```json
{
  "response": "Quantum computing is a type of computation..."
}
```

### Error Responses

```json
{
  "detail": "Error message description"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing file, invalid input)
- `500`: Internal Server Error

---

## Frontend Components

### Page Components

#### Home.tsx
- **Purpose**: Landing page with feature overview
- **Features**: Service cards, navigation, hero section
- **Route**: `/`

#### RagChain.tsx
- **Purpose**: DocQnA interface for PDF document Q&A
- **Features**: File upload, chat interface, message history
- **Route**: `/rag`
- **State Management**:
  - `query`: Current user input
  - `messages`: Chat message history
  - `isFileUploaded`: Upload status
  - `isThinking`: Loading state

#### ToolAgent.tsx
- **Purpose**: WikiArXiv Explore interface
- **Features**: Research query interface, tool agent responses
- **Route**: `/tool`
- **State Management**:
  - `query`: Current user input
  - `messages`: Chat message history
  - `isThinking`: Loading state

### Shared Components

#### Navbar.tsx
- **Purpose**: Navigation header
- **Features**: Logo, navigation links, responsive design

#### Footer.tsx
- **Purpose**: Footer section
- **Features**: Copyright, links, branding

#### Upload.tsx
- **Purpose**: PDF file upload component
- **Features**: Drag & drop, file validation, upload progress
- **Props**:
  - `onFileUpload`: Callback for successful upload
  - `isUploaded`: Upload status

#### ChatContainer.tsx
- **Purpose**: Message display for RAG queries
- **Features**: Message bubbles, timestamps, auto-scroll
- **Props**:
  - `messages`: Array of Message objects
  - `isThinking`: Loading indicator

#### ToolChat.tsx
- **Purpose**: Message display for tool agent queries
- **Features**: Similar to ChatContainer but optimized for tool responses
- **Props**:
  - `messages`: Array of Message objects
  - `isThinking`: Loading indicator

### Message Interface

```typescript
export interface Message {
  role: "user" | "bot";
  message: string;
  time: string;
}
```

### Styling

- **Framework**: Tailwind CSS
- **Theme**: Custom color scheme with gradients
- **Responsive**: Mobile-first design
- **Animations**: CSS animations for smooth interactions

---

## Backend Services

### RAG Service (rag.py)

#### RagPdf Class

**Purpose**: Handles PDF processing and retrieval-augmented generation

**Key Methods:**

```python
def __init__(self) -> None:
    """Initialize RAG components"""
    
def load_file(self, file_stream: bytes) -> List[str]:
    """Load PDF and extract text pages"""
    
def split_and_store_documents(self, pages: List[str]) -> VectorStoreRetriever:
    """Split text and create vector store"""
    
def create_chain(self, retriever: VectorStoreRetriever) -> RetrievalQA:
    """Create RAG chain with custom prompt"""
```

**Configuration:**
- **Chunk Size**: 1000 characters
- **Chunk Overlap**: 200 characters
- **Embedding Model**: BAAI/bge-base-en-v1.5
- **LLM**: LLaMA 3.1 8B Instant (GROQ)
- **Vector Store**: FAISS

**Custom Prompt Template:**
```python
template = """
Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.

{context}

Question: {question}
Helpful Answer:
"""
```

### Tool Agent Service (tool_agent.py)

#### ToolAgent Class

**Purpose**: Provides access to Wikipedia and ArXiv through LangChain tools

**Key Methods:**

```python
def __init__(self) -> None:
    """Initialize tools and agent"""
    
def invoke_agent(self, query: str) -> dict:
    """Execute agent with query"""
```

**Tools Configuration:**
- **Wikipedia**: Top 1 result, 200 char limit
- **ArXiv**: Top 1 result, 200 char limit, error handling enabled

**Agent Configuration:**
- **Type**: Tool-calling agent
- **LLM**: LLaMA 3.1 8B Instant (GROQ)
- **Prompt**: System message for concise responses (3-4 sentences)

### Main Application (main.py)

#### FastAPI Configuration

```python
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### Shared State Management

```python
shared_variable: dict[str, Optional[VectorStoreRetriever]] = {
    "retriever": None
}
```

**Purpose**: Maintains vector store state across requests for document queries

---

## Deployment

### Environment Variables

#### Backend (.env)
```bash
GROQ_API_KEY=your_groq_api_key_here
```

#### Frontend (Constants.ts)
```typescript
export const config = {
  url: {
    BASE_URL: process.env.NODE_ENV === 'production' 
      ? "https://your-backend-url.com"
      : "http://localhost:8000"
  }
};
```

### Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY . /app
RUN pip install poetry
RUN poetry install --without dev
EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Production Deployment

#### Backend (Render.com)
1. Connect GitHub repository
2. Set environment variables (GROQ_API_KEY)
3. Configure build command: `poetry install`
4. Configure start command: `poetry run uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables if needed

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    image: amulyaprasanth/langgenie_backend
    ports:
      - "8000:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

## Development Guide

### Project Structure

```
LangGenie/
├── backend/
│   ├── langgenie_backend/
│   │   ├── __init__.py
│   │   ├── rag.py              # RAG pipeline
│   │   └── tool_agent.py       # Tool agent
│   ├── research/               # Jupyter notebooks
│   │   ├── RAG_trails.ipynb
│   │   └── Wiki_ArxivAgent.ipynb
│   ├── main.py                 # FastAPI application
│   ├── pyproject.toml          # Python dependencies
│   ├── Dockerfile
│   └── docker-compose.yml
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/             # Page components
│   │   ├── assets/            # Static assets
│   │   ├── App.tsx            # Main app component
│   │   ├── Constants.ts       # Configuration
│   │   └── main.tsx           # Entry point
│   ├── public/                # Public assets
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── vite.config.ts         # Vite configuration
│   └── Dockerfile
├── README.md
├── LICENSE
└── pyproject.toml             # Root Python config
```

### Development Workflow

#### Backend Development

1. **Set up virtual environment**
   ```bash
   cd backend
   poetry shell
   poetry install
   ```

2. **Run in development mode**
   ```bash
   poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Testing**
   ```bash
   poetry run pytest
   ```

4. **Code formatting**
   ```bash
   poetry run black .
   poetry run isort .
   ```

#### Frontend Development

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Linting**
   ```bash
   npm run lint
   ```

### Adding New Features

#### Backend: Adding New Endpoints

1. **Define Pydantic models** (if needed)
   ```python
   class NewRequest(BaseModel):
       field: str
   ```

2. **Create endpoint**
   ```python
   @app.post('/new-endpoint')
   async def new_endpoint(request: NewRequest):
       # Implementation
       return {"result": "success"}
   ```

3. **Update CORS if needed**

#### Frontend: Adding New Pages

1. **Create page component**
   ```typescript
   // src/pages/NewPage.tsx
   export const NewPage = () => {
       return <div>New Page Content</div>;
   };
   ```

2. **Add route**
   ```typescript
   // App.tsx
   <Route path="/new" element={<NewPage/>}/>
   ```

3. **Update navigation**
   ```typescript
   // components/Navbar.tsx
   <Link to="/new">New Page</Link>
   ```

### Code Style Guidelines

#### Backend (Python)
- Follow PEP 8 style guide
- Use type hints for all functions
- Document classes and methods with docstrings
- Use Poetry for dependency management
- Implement error handling with appropriate HTTP status codes

#### Frontend (TypeScript/React)
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow React best practices (useEffect, useState)
- Use Tailwind CSS for styling
- Implement proper error boundaries

---

## Troubleshooting

### Common Issues

#### Backend Issues

**1. GROQ API Key Not Working**
```bash
# Check if environment variable is set
echo $GROQ_API_KEY

# Verify .env file exists and contains key
cat .env
```

**2. Poetry Installation Issues**
```bash
# Clear poetry cache
poetry cache clear pypi --all

# Reinstall dependencies
poetry install --no-cache
```

**3. PDF Upload Fails**
- Check file size limits
- Verify PDF is not corrupted
- Ensure sufficient disk space

**4. Vector Store Memory Issues**
- Reduce chunk size in RecursiveCharacterTextSplitter
- Implement pagination for large documents
- Monitor memory usage

#### Frontend Issues

**1. API Connection Failed**
```typescript
// Check Constants.ts configuration
export const config = {
  url: {
    BASE_URL: "http://localhost:8000" // Verify URL
  }
};
```

**2. Build Failures**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

**3. CORS Issues**
- Verify backend CORS configuration
- Check if frontend URL is allowed
- Ensure proper headers are set

#### Docker Issues

**1. Container Won't Start**
```bash
# Check logs
docker logs container_name

# Verify environment variables
docker exec -it container_name env
```

**2. Port Conflicts**
```bash
# Check if ports are in use
netstat -tulpn | grep :8000
netstat -tulpn | grep :80

# Use different ports if needed
docker run -p 8001:8000 langgenie-backend
```

### Performance Optimization

#### Backend Optimization

1. **Vector Store Optimization**
   - Use appropriate embedding dimensions
   - Implement index optimization for FAISS
   - Consider using GPU acceleration

2. **LLM Response Optimization**
   - Implement response caching
   - Use streaming responses for long outputs
   - Optimize prompt templates

3. **Memory Management**
   - Implement document chunking strategies
   - Use lazy loading for large files
   - Monitor memory usage patterns

#### Frontend Optimization

1. **Bundle Size Optimization**
   ```bash
   # Analyze bundle size
   npm run build -- --analyze
   
   # Implement code splitting
   const LazyComponent = lazy(() => import('./Component'));
   ```

2. **Performance Monitoring**
   - Implement React.memo for expensive components
   - Use useCallback and useMemo appropriately
   - Optimize re-renders

3. **Network Optimization**
   - Implement request debouncing
   - Use proper loading states
   - Implement error retry logic

### Debugging

#### Backend Debugging

1. **Enable Debug Logging**
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

2. **Use FastAPI Debug Mode**
   ```bash
   poetry run uvicorn main:app --reload --log-level debug
   ```

3. **Profile Performance**
   ```python
   import cProfile
   cProfile.run('your_function()')
   ```

#### Frontend Debugging

1. **React Developer Tools**
   - Install React DevTools browser extension
   - Monitor component state and props
   - Profile component performance

2. **Network Debugging**
   ```typescript
   // Add request/response interceptors
   axios.interceptors.request.use(request => {
     console.log('Starting Request', request);
     return request;
   });
   ```

3. **Console Debugging**
   ```typescript
   // Use proper console methods
   console.log('Info:', data);
   console.error('Error:', error);
   console.warn('Warning:', warning);
   ```

---

## Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Set up development environment
4. Make changes following code style guidelines
5. Test thoroughly
6. Submit pull request

### Code Review Process

1. Ensure all tests pass
2. Follow coding standards
3. Update documentation if needed
4. Get approval from maintainers

### Reporting Issues

1. Use GitHub Issues
2. Provide detailed reproduction steps
3. Include environment information
4. Add relevant logs and screenshots

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

For support and questions:
- GitHub Issues: [Create an issue](https://github.com/amulyaprasanth/LangGenie/issues)
- Documentation: This file
- Research Notebooks: `/backend/research/` directory

---

*Last updated: February 2026*
