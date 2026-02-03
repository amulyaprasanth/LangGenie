# LangGenie API Reference

## Overview

The LangGenie backend provides a RESTful API built with FastAPI that enables document processing, question-answering, and research tool integration.

**Base URL**: `http://localhost:8000` (development)

## Authentication

Currently, no authentication is required. The API uses GROQ API key configured server-side.

## Rate Limiting

No rate limiting is currently implemented. Consider implementing rate limiting for production use.

## Content Types

- **Request**: `application/json` or `multipart/form-data`
- **Response**: `application/json`

---

## Endpoints

### Health Check

Check if the server is running and healthy.

```http
GET /health
```

#### Response

```json
{
  "message": "The server is healthy..."
}
```

**Status Codes:**
- `200 OK`: Server is healthy

---

### Upload PDF Document

Upload a PDF document for processing and indexing.

```http
POST /upload
Content-Type: multipart/form-data
```

#### Request

**Form Data:**
- `file` (required): PDF file to upload

#### Response

**Success:**
```json
{
  "message": "Upload successful"
}
```

**Error:**
```json
{
  "detail": "Error message describing the issue"
}
```

**Status Codes:**
- `200 OK`: Upload successful
- `400 Bad Request`: Invalid file or upload error

#### Example

```bash
curl -X POST "http://localhost:8000/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@document.pdf"
```

---

### Query Document

Ask questions about the uploaded PDF document using RAG.

```http
POST /query
Content-Type: application/json
```

#### Request

```json
{
  "question": "string"
}
```

**Parameters:**
- `question` (required): The question to ask about the document

#### Response

**Success:**
```json
{
  "answer": "The answer based on document content...",
  "source_documents": [
    {
      "page_content": "Relevant text from document...",
      "metadata": {
        "page": 1
      }
    }
  ]
}
```

**Error:**
```json
{
  "detail": "Please upload a file first"
}
```

**Status Codes:**
- `200 OK`: Query successful
- `400 Bad Request`: No document uploaded or invalid query

#### Example

```bash
curl -X POST "http://localhost:8000/query" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the main topic of this document?"}'
```

---

### Query Research Tools

Search Wikipedia and ArXiv using AI-powered tool agents.

```http
POST /query_tool
Content-Type: application/json
```

#### Request

```json
{
  "question": "string"
}
```

**Parameters:**
- `question` (required): The research question or topic to search

#### Response

**Success:**
```json
{
  "response": "Based on Wikipedia and ArXiv sources, quantum computing is..."
}
```

**Error:**
```json
{
  "detail": "Error processing tool query"
}
```

**Status Codes:**
- `200 OK`: Query successful
- `400 Bad Request`: Invalid query
- `500 Internal Server Error`: Tool execution error

#### Example

```bash
curl -X POST "http://localhost:8000/query_tool" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is quantum computing?"}'
```

---

## Data Models

### Message

Used for chat-style interactions.

```json
{
  "message": "string"
}
```

### Query

Used for document and tool queries.

```json
{
  "question": "string"
}
```

### Upload Response

Response from successful file upload.

```json
{
  "message": "Upload successful"
}
```

### Query Response

Response from document query with RAG.

```json
{
  "answer": "string",
  "source_documents": [
    {
      "page_content": "string",
      "metadata": {
        "page": "number"
      }
    }
  ]
}
```

### Tool Query Response

Response from research tool query.

```json
{
  "response": "string"
}
```

---

## Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "detail": "Error description"
}
```

### Common Error Codes

| Status Code | Description | Common Causes |
|-------------|-------------|---------------|
| `400 Bad Request` | Invalid request | Missing file, invalid JSON, no document uploaded |
| `422 Unprocessable Entity` | Validation error | Invalid request body format |
| `500 Internal Server Error` | Server error | LLM API issues, processing errors |

### Error Examples

**No document uploaded:**
```json
{
  "detail": "Please upload a file first"
}
```

**Invalid file format:**
```json
{
  "detail": "Invalid file format. Please upload a PDF file."
}
```

**LLM API error:**
```json
{
  "detail": "Error communicating with language model API"
}
```

---

## Usage Examples

### Complete Workflow Example

```python
import requests
import json

# Base URL
base_url = "http://localhost:8000"

# 1. Check health
health_response = requests.get(f"{base_url}/health")
print(health_response.json())

# 2. Upload PDF
with open("document.pdf", "rb") as file:
    upload_response = requests.post(
        f"{base_url}/upload",
        files={"file": file}
    )
print(upload_response.json())

# 3. Query document
query_data = {"question": "What is the main topic?"}
doc_response = requests.post(
    f"{base_url}/query",
    json=query_data
)
print(doc_response.json())

# 4. Query research tools
tool_query = {"question": "What is machine learning?"}
tool_response = requests.post(
    f"{base_url}/query_tool",
    json=tool_query
)
print(tool_response.json())
```

### JavaScript/Axios Example

```javascript
import axios from 'axios';

const baseURL = 'http://localhost:8000';

// Upload file
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(`${baseURL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error.response.data);
  }
};

// Query document
const queryDocument = async (question) => {
  try {
    const response = await axios.post(`${baseURL}/query`, {
      question: question
    });
    return response.data;
  } catch (error) {
    console.error('Query error:', error.response.data);
  }
};

// Query tools
const queryTools = async (question) => {
  try {
    const response = await axios.post(`${baseURL}/query_tool`, {
      question: question
    });
    return response.data;
  } catch (error) {
    console.error('Tool query error:', error.response.data);
  }
};
```

---

## Performance Considerations

### Request Limits

- **File Size**: No explicit limit set (consider implementing for production)
- **Query Length**: No explicit limit (LLM context window applies)
- **Concurrent Requests**: No limit (consider implementing rate limiting)

### Response Times

- **Health Check**: < 100ms
- **File Upload**: 1-5 seconds (depends on file size)
- **Document Query**: 2-10 seconds (depends on document size and query complexity)
- **Tool Query**: 3-15 seconds (depends on external API response times)

### Optimization Tips

1. **File Upload**: Use smaller PDF files for faster processing
2. **Document Query**: Ask specific questions for better performance
3. **Tool Query**: Use clear, focused questions for better results
4. **Caching**: Consider implementing response caching for repeated queries

---

## Security Considerations

### Current Security Status

- **CORS**: Configured to allow all origins (change for production)
- **Authentication**: None implemented
- **File Validation**: Basic PDF validation
- **Input Sanitization**: Basic validation through Pydantic models

### Production Recommendations

1. **Implement Authentication**: Add API key or JWT authentication
2. **Restrict CORS**: Limit allowed origins to your frontend domain
3. **File Validation**: Add comprehensive file type and size validation
4. **Rate Limiting**: Implement request rate limiting
5. **Input Sanitization**: Add comprehensive input validation
6. **HTTPS**: Use HTTPS in production
7. **API Versioning**: Consider implementing API versioning

---

## Monitoring and Logging

### Health Monitoring

Use the `/health` endpoint for:
- Load balancer health checks
- Monitoring system integration
- Service availability verification

### Logging

Current logging is minimal. Consider adding:
- Request/response logging
- Error tracking
- Performance metrics
- User activity logging

### Metrics to Track

- Request count per endpoint
- Response times
- Error rates
- File upload sizes
- Query complexity metrics

---

## API Changelog

### Version 1.0.0 (Current)
- Initial API implementation
- Basic CRUD operations for document processing
- RAG-based document querying
- Wikipedia and ArXiv tool integration
- Health check endpoint

### Future Versions (Planned)
- Authentication system
- Rate limiting
- API versioning
- Enhanced error handling
- Batch processing endpoints
- WebSocket support for real-time responses

---

*Last updated: February 2026*