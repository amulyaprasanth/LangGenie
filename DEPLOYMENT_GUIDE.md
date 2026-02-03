# LangGenie Deployment Guide

## Overview

This guide covers various deployment strategies for the LangGenie application, from local development to production environments.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Cloud Deployment](#cloud-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Production Considerations](#production-considerations)
6. [Monitoring and Maintenance](#monitoring-and-maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

- **Node.js** 18+ with npm
- **Python** 3.10-3.12
- **Poetry** for Python dependency management
- **GROQ API Key**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/amulyaprasanth/LangGenie.git
   cd LangGenie
   ```

2. **Backend setup**
   ```bash
   cd backend
   poetry install
   echo "GROQ_API_KEY=your_key_here" > .env
   poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Frontend setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

---

## Docker Deployment

### Single Container Deployment

#### Backend Container

```bash
cd backend
docker build -t langgenie-backend .
docker run -d \
  --name langgenie-backend \
  -p 8000:8000 \
  -e GROQ_API_KEY=your_key_here \
  langgenie-backend
```

#### Frontend Container

```bash
cd frontend
docker build -t langgenie-frontend .
docker run -d \
  --name langgenie-frontend \
  -p 80:80 \
  langgenie-frontend
```

### Docker Compose Deployment

#### Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    container_name: langgenie-backend
    ports:
      - "8000:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    volumes:
      - ./logs:/app/logs
    networks:
      - langgenie-network

  frontend:
    build: ./frontend
    container_name: langgenie-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - langgenie-network

  nginx:
    image: nginx:alpine
    container_name: langgenie-nginx
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
    networks:
      - langgenie-network

networks:
  langgenie-network:
    driver: bridge

volumes:
  logs:
```

#### Environment File

Create `.env`:

```bash
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=production
```

#### Deploy with Docker Compose

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Nginx Configuration

Create `nginx.conf` for reverse proxy:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:8000;
    }

    upstream frontend {
        server frontend:80;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Backend API
        location /api/ {
            proxy_pass http://backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Handle file uploads
            client_max_body_size 50M;
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
        }
    }
}
```

---

## Cloud Deployment

### AWS Deployment

#### Using AWS ECS (Elastic Container Service)

1. **Create ECR repositories**
   ```bash
   aws ecr create-repository --repository-name langgenie-backend
   aws ecr create-repository --repository-name langgenie-frontend
   ```

2. **Build and push images**
   ```bash
   # Get login token
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

   # Build and tag backend
   cd backend
   docker build -t langgenie-backend .
   docker tag langgenie-backend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/langgenie-backend:latest
   docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/langgenie-backend:latest

   # Build and tag frontend
   cd ../frontend
   docker build -t langgenie-frontend .
   docker tag langgenie-frontend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/langgenie-frontend:latest
   docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/langgenie-frontend:latest
   ```

3. **Create ECS task definition**

Create `task-definition.json`:

```json
{
  "family": "langgenie-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/langgenie-backend:latest",
      "portMappings": [
        {
          "containerPort": 8000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "GROQ_API_KEY",
          "value": "your_key_here"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/langgenie",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "backend"
        }
      }
    },
    {
      "name": "frontend",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/langgenie-frontend:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/langgenie",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "frontend"
        }
      }
    }
  ]
}
```

4. **Deploy to ECS**
   ```bash
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   aws ecs create-service --cluster langgenie-cluster --service-name langgenie-service --task-definition langgenie-task --desired-count 1
   ```

#### Using AWS App Runner

1. **Create apprunner.yaml** for backend:
   ```yaml
   version: 1.0
   runtime: python3
   build:
     commands:
       build:
         - pip install poetry
         - poetry install --without dev
   run:
     runtime-version: 3.12
     command: poetry run uvicorn main:app --host 0.0.0.0 --port 8000
     network:
       port: 8000
       env: PORT
     env:
       - name: GROQ_API_KEY
         value: your_key_here
   ```

### Google Cloud Platform (GCP)

#### Using Cloud Run

1. **Build and push to Container Registry**
   ```bash
   # Configure Docker for GCP
   gcloud auth configure-docker

   # Build and push backend
   cd backend
   docker build -t gcr.io/your-project-id/langgenie-backend .
   docker push gcr.io/your-project-id/langgenie-backend

   # Build and push frontend
   cd ../frontend
   docker build -t gcr.io/your-project-id/langgenie-frontend .
   docker push gcr.io/your-project-id/langgenie-frontend
   ```

2. **Deploy to Cloud Run**
   ```bash
   # Deploy backend
   gcloud run deploy langgenie-backend \
     --image gcr.io/your-project-id/langgenie-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GROQ_API_KEY=your_key_here

   # Deploy frontend
   gcloud run deploy langgenie-frontend \
     --image gcr.io/your-project-id/langgenie-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Render.com Deployment

#### Backend Deployment

1. **Connect GitHub repository**
2. **Configure service settings**:
   - **Build Command**: `poetry install`
   - **Start Command**: `poetry run uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.12

3. **Set environment variables**:
   ```
   GROQ_API_KEY=your_key_here
   PYTHON_VERSION=3.12
   ```

#### Frontend Deployment

1. **Connect GitHub repository**
2. **Configure service settings**:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Node.js 18

### Vercel Deployment (Frontend)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Netlify Deployment (Frontend)

1. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

2. **Environment variables**:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

---

## Environment Configuration

### Backend Environment Variables

```bash
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
PORT=8000
HOST=0.0.0.0
LOG_LEVEL=info
CORS_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]

# Production
ENVIRONMENT=production
DEBUG=false
```

### Frontend Environment Variables

```bash
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true

# Production
NODE_ENV=production
```

### Docker Environment Files

Create `.env.production`:

```bash
# Backend
GROQ_API_KEY=your_production_key
ENVIRONMENT=production
LOG_LEVEL=warning
CORS_ORIGINS=["https://yourdomain.com"]

# Database (if added)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Monitoring
SENTRY_DSN=your_sentry_dsn
```

---

## Production Considerations

### Security

1. **API Keys Management**
   ```bash
   # Use secrets management
   # AWS Secrets Manager
   aws secretsmanager create-secret --name "langgenie/groq-api-key" --secret-string "your_key"
   
   # Google Secret Manager
   gcloud secrets create groq-api-key --data-file=-
   ```

2. **CORS Configuration**
   ```python
   # backend/main.py - Production CORS
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://yourdomain.com"],  # Specific domains only
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

3. **HTTPS Configuration**
   - Use SSL certificates (Let's Encrypt recommended)
   - Configure HSTS headers
   - Implement proper CSP headers

### Performance Optimization

1. **Backend Optimization**
   ```python
   # Add caching
   from functools import lru_cache
   
   @lru_cache(maxsize=100)
   def cached_embedding(text: str):
       return embeddings.embed_query(text)
   ```

2. **Frontend Optimization**
   ```typescript
   // Code splitting
   const LazyComponent = lazy(() => import('./Component'));
   
   // Service worker for caching
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

3. **Database Optimization** (if added)
   - Use connection pooling
   - Implement proper indexing
   - Add query optimization

### Scaling

1. **Horizontal Scaling**
   ```yaml
   # Kubernetes deployment
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: langgenie-backend
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: langgenie-backend
     template:
       metadata:
         labels:
           app: langgenie-backend
       spec:
         containers:
         - name: backend
           image: langgenie-backend:latest
           ports:
           - containerPort: 8000
   ```

2. **Load Balancing**
   - Use Application Load Balancer (AWS)
   - Configure health checks
   - Implement session affinity if needed

3. **Auto-scaling**
   ```yaml
   # Kubernetes HPA
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: langgenie-hpa
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: langgenie-backend
     minReplicas: 2
     maxReplicas: 10
     metrics:
     - type: Resource
       resource:
         name: cpu
         target:
           type: Utilization
           averageUtilization: 70
   ```

---

## Monitoring and Maintenance

### Health Checks

1. **Application Health**
   ```python
   # Enhanced health check
   @app.get("/health")
   async def health_check():
       return {
           "status": "healthy",
           "timestamp": datetime.utcnow().isoformat(),
           "version": "1.0.0",
           "dependencies": {
               "groq_api": "connected",
               "vector_store": "ready"
           }
       }
   ```

2. **Infrastructure Monitoring**
   ```bash
   # Docker health check
   HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
     CMD curl -f http://localhost:8000/health || exit 1
   ```

### Logging

1. **Structured Logging**
   ```python
   import structlog
   
   logger = structlog.get_logger()
   
   @app.middleware("http")
   async def log_requests(request: Request, call_next):
       start_time = time.time()
       response = await call_next(request)
       process_time = time.time() - start_time
       
       logger.info(
           "request_processed",
           method=request.method,
           url=str(request.url),
           status_code=response.status_code,
           process_time=process_time
       )
       return response
   ```

2. **Log Aggregation**
   ```yaml
   # ELK Stack with Docker Compose
   version: '3.8'
   services:
     elasticsearch:
       image: docker.elastic.co/elasticsearch/elasticsearch:7.14.0
       environment:
         - discovery.type=single-node
     
     logstash:
       image: docker.elastic.co/logstash/logstash:7.14.0
       volumes:
         - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
     
     kibana:
       image: docker.elastic.co/kibana/kibana:7.14.0
       ports:
         - "5601:5601"
   ```

### Metrics and Alerting

1. **Prometheus Metrics**
   ```python
   from prometheus_client import Counter, Histogram, generate_latest
   
   REQUEST_COUNT = Counter('requests_total', 'Total requests', ['method', 'endpoint'])
   REQUEST_LATENCY = Histogram('request_duration_seconds', 'Request latency')
   
   @app.get("/metrics")
   async def metrics():
       return Response(generate_latest(), media_type="text/plain")
   ```

2. **Grafana Dashboard**
   ```json
   {
     "dashboard": {
       "title": "LangGenie Metrics",
       "panels": [
         {
           "title": "Request Rate",
           "type": "graph",
           "targets": [
             {
               "expr": "rate(requests_total[5m])"
             }
           ]
         }
       ]
     }
   }
   ```

### Backup and Recovery

1. **Data Backup**
   ```bash
   # Backup vector stores
   docker exec langgenie-backend tar -czf /backup/vectors-$(date +%Y%m%d).tar.gz /app/vectors
   
   # Upload to S3
   aws s3 cp /backup/vectors-$(date +%Y%m%d).tar.gz s3://langgenie-backups/
   ```

2. **Disaster Recovery**
   ```bash
   # Automated backup script
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   
   # Create backup
   docker exec langgenie-backend pg_dump -U postgres langgenie > backup_$DATE.sql
   
   # Upload to cloud storage
   aws s3 cp backup_$DATE.sql s3://langgenie-backups/
   
   # Clean old backups (keep last 7 days)
   find /backups -name "backup_*.sql" -mtime +7 -delete
   ```

---

## Troubleshooting

### Common Deployment Issues

1. **Container Won't Start**
   ```bash
   # Check logs
   docker logs langgenie-backend
   
   # Check resource usage
   docker stats
   
   # Inspect container
   docker inspect langgenie-backend
   ```

2. **API Connection Issues**
   ```bash
   # Test connectivity
   curl -f http://localhost:8000/health
   
   # Check network
   docker network ls
   docker network inspect langgenie-network
   ```

3. **Performance Issues**
   ```bash
   # Monitor resource usage
   htop
   
   # Check memory usage
   free -h
   
   # Monitor disk I/O
   iotop
   ```

### Debugging Production Issues

1. **Enable Debug Logging**
   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

2. **Performance Profiling**
   ```python
   import cProfile
   import pstats
   
   profiler = cProfile.Profile()
   profiler.enable()
   # Your code here
   profiler.disable()
   stats = pstats.Stats(profiler)
   stats.sort_stats('cumulative').print_stats(10)
   ```

3. **Memory Debugging**
   ```python
   import tracemalloc
   
   tracemalloc.start()
   # Your code here
   current, peak = tracemalloc.get_traced_memory()
   print(f"Current memory usage: {current / 1024 / 1024:.1f} MB")
   print(f"Peak memory usage: {peak / 1024 / 1024:.1f} MB")
   ```

### Recovery Procedures

1. **Service Recovery**
   ```bash
   # Restart services
   docker-compose restart
   
   # Rollback deployment
   docker-compose down
   git checkout previous-stable-commit
   docker-compose up -d
   ```

2. **Data Recovery**
   ```bash
   # Restore from backup
   aws s3 cp s3://langgenie-backups/latest-backup.sql .
   docker exec -i langgenie-db psql -U postgres langgenie < latest-backup.sql
   ```

---

## Maintenance Tasks

### Regular Maintenance

1. **Weekly Tasks**
   - Review application logs
   - Check system resource usage
   - Update dependencies (security patches)
   - Verify backup integrity

2. **Monthly Tasks**
   - Performance optimization review
   - Security audit
   - Capacity planning review
   - Update documentation

3. **Quarterly Tasks**
   - Major dependency updates
   - Architecture review
   - Disaster recovery testing
   - Security penetration testing

### Automated Maintenance

```bash
#!/bin/bash
# maintenance.sh - Weekly maintenance script

# Update system packages
apt update && apt upgrade -y

# Clean Docker resources
docker system prune -f

# Rotate logs
logrotate /etc/logrotate.conf

# Check disk space
df -h | awk '$5 > 80 {print "Warning: " $1 " is " $5 " full"}'

# Restart services if needed
if [ -f /tmp/restart-required ]; then
    docker-compose restart
    rm /tmp/restart-required
fi
```

---

*Last updated: February 2026*