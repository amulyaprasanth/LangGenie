# LangGenie Developer Guide

## Overview

This guide provides comprehensive information for developers working on the LangGenie project, including setup, architecture, coding standards, and contribution guidelines.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Architecture](#project-architecture)
3. [Code Organization](#code-organization)
4. [Development Workflow](#development-workflow)
5. [Testing Strategy](#testing-strategy)
6. [Code Style and Standards](#code-style-and-standards)
7. [Adding New Features](#adding-new-features)
8. [Performance Guidelines](#performance-guidelines)
9. [Security Considerations](#security-considerations)
10. [Debugging and Troubleshooting](#debugging-and-troubleshooting)

---

## Development Environment Setup

### Prerequisites

- **Python 3.10-3.12** with Poetry
- **Node.js 18+** with npm
- **Git** for version control
- **Docker** (optional, for containerized development)
- **VS Code** or preferred IDE

### Initial Setup

1. **Clone and setup the repository**
   ```bash
   git clone https://github.com/amulyaprasanth/LangGenie.git
   cd LangGenie
   ```

2. **Backend development setup**
   ```bash
   cd backend
   
   # Install Poetry if not installed
   curl -sSL https://install.python-poetry.org | python3 -
   
   # Install dependencies
   poetry install
   
   # Activate virtual environment
   poetry shell
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your GROQ_API_KEY
   ```

3. **Frontend development setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env.local
   # Edit with your configuration
   ```

### IDE Configuration

#### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "python.defaultInterpreterPath": "./backend/.venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "python.sortImports.args": ["--profile", "black"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "eslint.workingDirectories": ["frontend"]
}
```

#### Recommended Extensions

- **Python**: Python, Pylance, Black Formatter
- **JavaScript/TypeScript**: ES7+ React/Redux/React-Native snippets, Prettier
- **General**: GitLens, Docker, Thunder Client (API testing)

---

## Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LangGenie Architecture                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    HTTP/REST    ┌─────────────────┐   │
│  │   Frontend      │◄──────────────►│    Backend      │   │
│  │   (React)       │                 │   (FastAPI)     │   │
│  └─────────────────┘                 └─────────────────┘   │
│           │                                   │             │
│           │                                   │             │
│  ┌─────────────────┐                 ┌─────────────────┐   │
│  │   Components    │                 │   RAG Pipeline  │   │
│  │   - Home        │                 │   - PDF Loader  │   │
│  │   - RagChain    │                 │   - Embeddings  │   │
│  │   - ToolAgent   │                 │   - Vector Store│   │
│  └─────────────────┘                 └─────────────────┘   │
│                                               │             │
│                                      ┌─────────────────┐   │
│                                      │   Tool Agent    │   │
│                                      │   - Wikipedia   │   │
│                                      │   - ArXiv       │   │
│                                      └─────────────────┘   │
│                                               │             │
│                                      ┌─────────────────┐   │
│                                      │   External APIs │   │
│                                      │   - GROQ LLM    │   │
│                                      │   - Wikipedia   │   │
│                                      │   - ArXiv       │   │
│                                      └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Backend Architecture

#### Core Components

1. **FastAPI Application** (`main.py`)
   - HTTP server and routing
   - CORS middleware
   - Request/response handling
   - Shared state management

2. **RAG Pipeline** (`langgenie_backend/rag.py`)
   - PDF document processing
   - Text chunking and embedding
   - Vector store management
   - Question-answering chain

3. **Tool Agent** (`langgenie_backend/tool_agent.py`)
   - Wikipedia integration
   - ArXiv integration
   - LangChain agent orchestration

#### Data Flow

```python
# RAG Pipeline Flow
PDF Upload → Text Extraction → Chunking → Embedding → Vector Store → Query → LLM → Response

# Tool Agent Flow
User Query → Agent → Tool Selection → External API → LLM Processing → Response
```

### Frontend Architecture

#### Component Hierarchy

```
App
├── Navbar
├── Router
│   ├── Home
│   │   ├── Hero Section
│   │   ├── CardList
│   │   │   └── Card (multiple)
│   │   └── Footer
│   ├── RagChain
│   │   ├── Upload
│   │   ├── ChatContainer
│   │   └── Input Controls
│   └── ToolAgent
│       ├── ToolChat
│       └── Input Controls
└── Footer
```

#### State Management

- **Local State**: React hooks (useState, useEffect)
- **Props**: Component communication
- **Context**: Shared configuration (Constants.ts)

---

## Code Organization

### Backend Structure

```
backend/
├── langgenie_backend/          # Main package
│   ├── __init__.py
│   ├── rag.py                  # RAG pipeline implementation
│   └── tool_agent.py           # Tool agent implementation
├── research/                   # Research notebooks
│   ├── RAG_trails.ipynb
│   └── Wiki_ArxivAgent.ipynb
├── tests/                      # Test files (to be added)
├── main.py                     # FastAPI application
├── pyproject.toml              # Dependencies and config
├── Dockerfile                  # Container configuration
└── docker-compose.yml          # Multi-container setup
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/             # Reusable components
│   │   ├── Card.tsx
│   │   ├── CardList.tsx
│   │   ├── ChatContainer.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ToolChat.tsx
│   │   └── Upload.tsx
│   ├── pages/                  # Page components
│   │   ├── Home.tsx
│   │   ├── RagChain.tsx
│   │   └── ToolAgent.tsx
│   ├── assets/                 # Static assets
│   ├── App.tsx                 # Main application
│   ├── Constants.ts            # Configuration
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── public/                     # Public assets
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.ts              # Vite configuration
└── Dockerfile                  # Container configuration
```

### Naming Conventions

#### Backend (Python)

- **Files**: `snake_case.py`
- **Classes**: `PascalCase`
- **Functions/Methods**: `snake_case`
- **Variables**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`

```python
# Good examples
class RagPdf:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter()
        
    def load_file(self, file_stream: bytes) -> List[str]:
        pages = []
        return pages

API_BASE_URL = "https://api.groq.com"
```

#### Frontend (TypeScript/React)

- **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces**: `PascalCase` with `I` prefix (optional)

```typescript
// Good examples
interface Message {
  role: "user" | "bot";
  message: string;
  time: string;
}

const ChatContainer = ({ messages, isThinking }: ChatContainerProps) => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  
  const handleSubmit = () => {
    // Implementation
  };
  
  return <div>{/* JSX */}</div>;
};

const API_BASE_URL = "http://localhost:8000";
```

---

## Development Workflow

### Git Workflow

1. **Branch Naming Convention**
   ```bash
   feature/add-authentication
   bugfix/fix-upload-error
   hotfix/security-patch
   refactor/improve-rag-pipeline
   ```

2. **Commit Message Format**
   ```
   type(scope): description
   
   [optional body]
   
   [optional footer]
   ```
   
   Examples:
   ```
   feat(rag): add support for multiple file formats
   fix(frontend): resolve chat scroll issue
   docs(api): update endpoint documentation
   refactor(backend): optimize vector store operations
   ```

3. **Development Process**
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes and commit
   git add .
   git commit -m "feat(component): add new functionality"
   
   # Push and create PR
   git push origin feature/new-feature
   ```

### Code Review Process

1. **Before Creating PR**
   - Run all tests
   - Check code formatting
   - Update documentation
   - Test manually

2. **PR Requirements**
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes
   - Test coverage maintained

3. **Review Checklist**
   - Code follows style guidelines
   - Tests are comprehensive
   - Documentation is updated
   - No security vulnerabilities
   - Performance considerations addressed

---

## Testing Strategy

### Backend Testing

#### Unit Tests

```python
# tests/test_rag.py
import pytest
from langgenie_backend.rag import RagPdf

class TestRagPdf:
    def setup_method(self):
        self.rag_pdf = RagPdf()
    
    def test_load_file_valid_pdf(self):
        # Test with valid PDF bytes
        with open("test_files/sample.pdf", "rb") as f:
            pdf_bytes = f.read()
        
        pages = self.rag_pdf.load_file(pdf_bytes)
        assert len(pages) > 0
        assert isinstance(pages[0], str)
    
    def test_load_file_invalid_input(self):
        # Test with invalid input
        with pytest.raises(Exception):
            self.rag_pdf.load_file(b"invalid pdf content")
```

#### Integration Tests

```python
# tests/test_api.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert "message" in response.json()

def test_upload_endpoint():
    with open("test_files/sample.pdf", "rb") as f:
        response = client.post(
            "/upload",
            files={"file": ("test.pdf", f, "application/pdf")}
        )
    assert response.status_code == 200
```

#### Running Backend Tests

```bash
cd backend

# Install test dependencies
poetry install --with dev

# Run tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=langgenie_backend

# Run specific test file
poetry run pytest tests/test_rag.py -v
```

### Frontend Testing

#### Component Tests

```typescript
// src/components/__tests__/ChatContainer.test.tsx
import { render, screen } from '@testing-library/react';
import { ChatContainer } from '../ChatContainer';

const mockMessages = [
  { role: 'user', message: 'Hello', time: '10:00' },
  { role: 'bot', message: 'Hi there!', time: '10:01' }
];

describe('ChatContainer', () => {
  test('renders messages correctly', () => {
    render(<ChatContainer messages={mockMessages} isThinking={false} />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });
  
  test('shows thinking indicator', () => {
    render(<ChatContainer messages={[]} isThinking={true} />);
    
    expect(screen.getByText(/thinking/i)).toBeInTheDocument();
  });
});
```

#### E2E Tests

```typescript
// e2e/upload-flow.spec.ts
import { test, expect } from '@playwright/test';

test('PDF upload and query flow', async ({ page }) => {
  await page.goto('/rag');
  
  // Upload file
  await page.setInputFiles('input[type="file"]', 'test-files/sample.pdf');
  await expect(page.locator('.upload-success')).toBeVisible();
  
  // Ask question
  await page.fill('input[placeholder*="question"]', 'What is this document about?');
  await page.click('button[type="submit"]');
  
  // Check response
  await expect(page.locator('.bot-message')).toBeVisible();
});
```

#### Running Frontend Tests

```bash
cd frontend

# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## Code Style and Standards

### Backend Standards

#### Python Code Style

```python
# Use type hints
def process_document(file_content: bytes, chunk_size: int = 1000) -> List[str]:
    """Process document and return text chunks.
    
    Args:
        file_content: Raw file bytes
        chunk_size: Size of text chunks
        
    Returns:
        List of text chunks
        
    Raises:
        ValueError: If file_content is invalid
    """
    if not file_content:
        raise ValueError("File content cannot be empty")
    
    # Implementation here
    return chunks

# Use dataclasses for structured data
from dataclasses import dataclass
from typing import Optional

@dataclass
class QueryResult:
    answer: str
    confidence: float
    sources: List[str]
    metadata: Optional[dict] = None
```

#### Error Handling

```python
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

@app.post("/query")
async def query_document(query: Query):
    try:
        result = process_query(query.question)
        return result
    except ValueError as e:
        logger.error(f"Invalid query: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
```

### Frontend Standards

#### React Component Structure

```typescript
// Component with proper TypeScript interfaces
interface ChatContainerProps {
  messages: Message[];
  isThinking: boolean;
  onMessageSend?: (message: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isThinking,
  onMessageSend
}) => {
  // Hooks at the top
  const [inputValue, setInputValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Effects
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Event handlers
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onMessageSend) {
      onMessageSend(inputValue);
      setInputValue("");
    }
  }, [inputValue, onMessageSend]);
  
  // Render
  return (
    <div className="chat-container" ref={containerRef}>
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      {isThinking && <ThinkingIndicator />}
    </div>
  );
};
```

#### CSS/Tailwind Standards

```typescript
// Use consistent spacing and naming
const styles = {
  container: "flex flex-col h-full bg-gray-50 dark:bg-gray-900",
  header: "px-4 py-3 border-b border-gray-200 dark:border-gray-700",
  content: "flex-1 overflow-y-auto p-4 space-y-4",
  input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
};

// Use semantic class names
<div className={styles.container}>
  <header className={styles.header}>
    <h1>Chat</h1>
  </header>
  <main className={styles.content}>
    {/* Content */}
  </main>
</div>
```

### Code Formatting

#### Backend (Python)

```bash
# Install formatting tools
poetry add --group dev black isort flake8 mypy

# Format code
poetry run black .
poetry run isort .

# Check style
poetry run flake8
poetry run mypy .
```

#### Frontend (TypeScript)

```bash
# Install formatting tools
npm install --save-dev prettier eslint @typescript-eslint/parser

# Format code
npm run format

# Check style
npm run lint
```

---

## Adding New Features

### Backend Feature Development

#### 1. Planning Phase

- Define API endpoints
- Design data models
- Plan database schema (if needed)
- Consider security implications

#### 2. Implementation Steps

```python
# 1. Create Pydantic models
class NewFeatureRequest(BaseModel):
    input_data: str
    options: Optional[dict] = None

class NewFeatureResponse(BaseModel):
    result: str
    metadata: dict

# 2. Implement business logic
class NewFeatureService:
    def __init__(self):
        self.processor = SomeProcessor()
    
    def process(self, request: NewFeatureRequest) -> NewFeatureResponse:
        # Implementation
        result = self.processor.process(request.input_data)
        return NewFeatureResponse(result=result, metadata={})

# 3. Add API endpoint
@app.post("/new-feature", response_model=NewFeatureResponse)
async def new_feature_endpoint(request: NewFeatureRequest):
    service = NewFeatureService()
    return service.process(request)

# 4. Add tests
def test_new_feature():
    request = NewFeatureRequest(input_data="test")
    service = NewFeatureService()
    response = service.process(request)
    assert response.result is not None
```

### Frontend Feature Development

#### 1. Component Creation

```typescript
// 1. Create component interface
interface NewFeatureProps {
  data: FeatureData[];
  onAction: (action: string) => void;
}

// 2. Implement component
export const NewFeature: React.FC<NewFeatureProps> = ({ data, onAction }) => {
  const [state, setState] = useState<FeatureState>({});
  
  // Component logic
  
  return (
    <div className="new-feature">
      {/* Component JSX */}
    </div>
  );
};

// 3. Add to routing
// In App.tsx
<Route path="/new-feature" element={<NewFeature />} />
```

#### 2. API Integration

```typescript
// 1. Add API functions
export const newFeatureAPI = {
  async getData(): Promise<FeatureData[]> {
    const response = await axios.get(`${API_BASE_URL}/new-feature`);
    return response.data;
  },
  
  async submitData(data: SubmitData): Promise<FeatureResponse> {
    const response = await axios.post(`${API_BASE_URL}/new-feature`, data);
    return response.data;
  }
};

// 2. Use in component
const NewFeaturePage = () => {
  const [data, setData] = useState<FeatureData[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await newFeatureAPI.getData();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      {loading ? <LoadingSpinner /> : <NewFeature data={data} />}
    </div>
  );
};
```

---

## Performance Guidelines

### Backend Performance

#### 1. Database Optimization

```python
# Use connection pooling
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20
)

# Use async operations
import asyncio
import aiofiles

async def process_large_file(file_path: str):
    async with aiofiles.open(file_path, 'rb') as f:
        content = await f.read()
    return await process_content_async(content)
```

#### 2. Caching

```python
from functools import lru_cache
import redis

# In-memory caching
@lru_cache(maxsize=100)
def expensive_computation(input_data: str) -> str:
    # Expensive operation
    return result

# Redis caching
redis_client = redis.Redis(host='localhost', port=6379, db=0)

def cached_embedding(text: str) -> List[float]:
    cache_key = f"embedding:{hash(text)}"
    cached = redis_client.get(cache_key)
    
    if cached:
        return json.loads(cached)
    
    embedding = compute_embedding(text)
    redis_client.setex(cache_key, 3600, json.dumps(embedding))
    return embedding
```

#### 3. Async Processing

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def process_multiple_documents(documents: List[bytes]):
    loop = asyncio.get_event_loop()
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        tasks = [
            loop.run_in_executor(executor, process_document, doc)
            for doc in documents
        ]
        results = await asyncio.gather(*tasks)
    
    return results
```

### Frontend Performance

#### 1. Component Optimization

```typescript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  // Expensive rendering logic
  return <div>{/* Complex JSX */}</div>;
});

// Use useMemo for expensive calculations
const ProcessedData = ({ rawData }: { rawData: RawData[] }) => {
  const processedData = useMemo(() => {
    return rawData.map(item => expensiveTransformation(item));
  }, [rawData]);
  
  return <DataDisplay data={processedData} />;
};

// Use useCallback for event handlers
const ChatInput = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  }, [message, onSend]);
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
    </form>
  );
};
```

#### 2. Code Splitting

```typescript
// Lazy load components
import { lazy, Suspense } from 'react';

const LazyRagChain = lazy(() => import('./pages/RagChain'));
const LazyToolAgent = lazy(() => import('./pages/ToolAgent'));

// Use in routing
<Routes>
  <Route 
    path="/rag" 
    element={
      <Suspense fallback={<LoadingSpinner />}>
        <LazyRagChain />
      </Suspense>
    } 
  />
</Routes>
```

#### 3. Request Optimization

```typescript
// Debounce API calls
import { debounce } from 'lodash';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const debouncedSearch = useMemo(
    () => debounce(async (searchQuery: string) => {
      if (searchQuery) {
        const results = await searchAPI(searchQuery);
        setResults(results);
      }
    }, 300),
    []
  );
  
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search..."
      />
      <ResultsList results={results} />
    </div>
  );
};
```

---

## Security Considerations

### Backend Security

#### 1. Input Validation

```python
from pydantic import BaseModel, validator
import re

class SecureQuery(BaseModel):
    question: str
    
    @validator('question')
    def validate_question(cls, v):
        if len(v) > 1000:
            raise ValueError('Question too long')
        
        # Remove potentially dangerous characters
        cleaned = re.sub(r'[<>"\']', '', v)
        return cleaned.strip()

# File upload validation
def validate_pdf_file(file_content: bytes) -> bool:
    # Check file signature
    pdf_signature = b'%PDF-'
    if not file_content.startswith(pdf_signature):
        raise ValueError("Invalid PDF file")
    
    # Check file size (10MB limit)
    if len(file_content) > 10 * 1024 * 1024:
        raise ValueError("File too large")
    
    return True
```

#### 2. API Security

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    # Verify JWT token
    if not verify_jwt_token(token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    return token

@app.post("/secure-endpoint")
async def secure_endpoint(token: str = Depends(verify_token)):
    # Protected endpoint logic
    pass
```

#### 3. Environment Security

```python
import os
from typing import Optional

class Settings:
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    cors_origins: list = os.getenv("CORS_ORIGINS", "").split(",")
    
    def __post_init__(self):
        if not self.groq_api_key:
            raise ValueError("GROQ_API_KEY environment variable is required")

settings = Settings()
```

### Frontend Security

#### 1. XSS Prevention

```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const SafeHTML = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

// Validate input
const validateInput = (input: string): boolean => {
  const maxLength = 1000;
  const forbiddenPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
  
  if (input.length > maxLength) return false;
  
  return !forbiddenPatterns.some(pattern => pattern.test(input));
};
```

#### 2. API Security

```typescript
// Secure API configuration
const apiClient = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## Debugging and Troubleshooting

### Backend Debugging

#### 1. Logging Setup

```python
import logging
import sys
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

# Use structured logging
def log_request(request_id: str, endpoint: str, duration: float):
    logger.info(
        "Request processed",
        extra={
            "request_id": request_id,
            "endpoint": endpoint,
            "duration": duration,
            "timestamp": datetime.utcnow().isoformat()
        }
    )
```

#### 2. Error Tracking

```python
import traceback
from typing import Any, Dict

class ErrorTracker:
    def __init__(self):
        self.errors = []
    
    def log_error(self, error: Exception, context: Dict[str, Any] = None):
        error_info = {
            "error_type": type(error).__name__,
            "error_message": str(error),
            "traceback": traceback.format_exc(),
            "context": context or {},
            "timestamp": datetime.utcnow().isoformat()
        }
        
        self.errors.append(error_info)
        logger.error("Error occurred", extra=error_info)
        
        # Send to external service (Sentry, etc.)
        # sentry_sdk.capture_exception(error)

error_tracker = ErrorTracker()

# Usage in endpoints
@app.post("/query")
async def query_endpoint(query: Query):
    try:
        result = process_query(query.question)
        return result
    except Exception as e:
        error_tracker.log_error(e, {"query": query.question})
        raise HTTPException(status_code=500, detail="Internal server error")
```

#### 3. Performance Profiling

```python
import cProfile
import pstats
from functools import wraps

def profile_function(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        profiler = cProfile.Profile()
        profiler.enable()
        
        try:
            result = func(*args, **kwargs)
        finally:
            profiler.disable()
            
            # Save profile stats
            stats = pstats.Stats(profiler)
            stats.sort_stats('cumulative')
            stats.dump_stats(f'{func.__name__}_profile.prof')
            
        return result
    return wrapper

# Usage
@profile_function
def expensive_operation(data):
    # Implementation
    pass
```

### Frontend Debugging

#### 1. Error Boundaries

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Send to error reporting service
    // errorReportingService.captureException(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

#### 2. Debug Utilities

```typescript
// Debug hook
const useDebug = (value: any, label?: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${label || 'Value'}:`, value);
    }
  }, [value, label]);
};

// Performance monitoring
const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`[PERF] ${componentName} render time: ${endTime - startTime}ms`);
    };
  });
};

// Usage in components
const MyComponent = ({ data }: Props) => {
  useDebug(data, 'Component data');
  usePerformanceMonitor('MyComponent');
  
  return <div>{/* Component content */}</div>;
};
```

#### 3. Network Debugging

```typescript
// API call wrapper with debugging
const debugAPI = {
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const startTime = performance.now();
    
    console.log('[API] Request:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    
    try {
      const response = await axios(config);
      const endTime = performance.now();
      
      console.log('[API] Response:', {
        status: response.status,
        data: response.data,
        duration: `${endTime - startTime}ms`
      });
      
      return response.data;
    } catch (error) {
      console.error('[API] Error:', error);
      throw error;
    }
  }
};
```

### Common Issues and Solutions

#### Backend Issues

1. **Memory Issues with Large PDFs**
   ```python
   # Solution: Stream processing
   def process_large_pdf(file_stream: BytesIO):
       chunk_size = 1024 * 1024  # 1MB chunks
       while True:
           chunk = file_stream.read(chunk_size)
           if not chunk:
               break
           yield process_chunk(chunk)
   ```

2. **GROQ API Rate Limiting**
   ```python
   import time
   from functools import wraps
   
   def rate_limit(calls_per_minute: int):
       def decorator(func):
           last_called = [0.0]
           
           @wraps(func)
           def wrapper(*args, **kwargs):
               elapsed = time.time() - last_called[0]
               left_to_wait = 60.0 / calls_per_minute - elapsed
               
               if left_to_wait > 0:
                   time.sleep(left_to_wait)
               
               ret = func(*args, **kwargs)
               last_called[0] = time.time()
               return ret
           
           return wrapper
       return decorator
   
   @rate_limit(30)  # 30 calls per minute
   def call_groq_api(prompt: str):
       # API call implementation
       pass
   ```

#### Frontend Issues

1. **Memory Leaks in Chat Components**
   ```typescript
   // Solution: Proper cleanup
   const ChatComponent = () => {
     const [messages, setMessages] = useState<Message[]>([]);
     
     useEffect(() => {
       // Limit message history
       if (messages.length > 100) {
         setMessages(prev => prev.slice(-50));
       }
     }, [messages]);
     
     // Cleanup on unmount
     useEffect(() => {
       return () => {
         setMessages([]);
       };
     }, []);
   };
   ```

2. **Infinite Re-renders**
   ```typescript
   // Problem: Object/array in dependency array
   const BadComponent = ({ config }: { config: Config }) => {
     useEffect(() => {
       // This will cause infinite re-renders
       fetchData(config);
     }, [config]); // config is an object
   };
   
   // Solution: Use useMemo or specific properties
   const GoodComponent = ({ config }: { config: Config }) => {
     const configKey = useMemo(() => 
       JSON.stringify(config), [config]
     );
     
     useEffect(() => {
       fetchData(config);
     }, [configKey]);
   };
   ```

---

*Last updated: February 2026*