# SkillBridge

SkillBridge is a modern Skill Exchange Platform that connects users looking to share and acquire new skills. The application consists of a Django REST Framework (DRF) backend API and a React/Vite frontend.

---

## Project Overview

SkillBridge enables users to build a community-driven skill-sharing ecosystem. Users can register profiles, specify skills they teach (offers) or want to learn (requests), connect with other members, log exchange interactions, and rate their experiences.

---

## Features

- **User Authentication**: Secure registration, JWT-based login, and profile tracking.
- **Skill Directory**: Categorized skills and user-skill association.
- **Offers & Requests**: Create and manage listings for teaching (offers) or learning (requests).
- **Reviews & Ratings**: Review exchanges to establish trust.
- **Activity Dashboard**: Aggregated user stats, latest requests, offers, and reviews.
- **API Documentation**: Automated OpenAPI 3.0 schema and interactive Swagger UI.

---

## Tech Stack

### Backend
- **Framework**: Django 6.0.5 & Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Caching & Session Broker**: Redis
- **Auth**: SimpleJWT (JSON Web Tokens)
- **API Docs**: drf-spectacular (OpenAPI 3.0)

### Frontend
- **Framework**: React (Vite-based build system)
- **HTTP Client**: Axios

---

## Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- Redis Server

### 1. Backend Setup
Navigate to the root directory:
```bash
# Create and activate a virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

### 2. Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## API Documentation

The API automatically generates OpenAPI 3.0 schemas and is viewable using the interactive Swagger UI:
- **Interactive Swagger Docs**: `http://localhost:8000/api/docs/`
- **Raw OpenAPI Schema**: `http://localhost:8000/api/schema/`

---

## Authentication

Authentication is handled via JSON Web Tokens (SimpleJWT). Add the JWT token to the `Authorization` header for protected endpoints:
```http
Authorization: Bearer <access_token>
```

### Authentication Endpoints
- **Register**: `POST /api/v1/auth/register/`
- **Login (Obtain Token)**: `POST /api/v1/auth/login/`
- **Refresh Token**: `POST /api/v1/auth/refresh/`
- **Current User Profile**: `GET /api/v1/auth/me/`

---

## Caching

SkillBridge uses Redis for caching to improve performance and support session/broker features.
- **Cache Backend**: `django_redis.cache.RedisCache`
- **Default Location**: `redis://127.0.0.1:6379/1`

---

## Logging

A file-based logger captures application activities and errors.
- **Log Level**: `INFO`
- **Log File Destination**: `skillbridge.log` in the project root.

---

## Rate Limiting

To prevent API abuse and ensure reliability, endpoints are throttled using DRF's built-in throttle classes.
- **Throttle Class**: `rest_framework.throttling.UserRateThrottle`
- **Rate Limit**: `100 requests / hour` per user.
