# Architecture Documentation

## Overview

The project consists of three main components:

1. Next.js Frontend - User interface and client-side logic
2. Next.js API - Backend proxy and session management

## Component Architecture

```
└── src/                    # Next.js Frontend & API
    ├── pages/
    │   ├── api/           # Next.js API Routes
    │   │   ├── apps/      # OIDC Client management
    │   │   └── auth/      # Authentication
    │   └── apps/          # Frontend pages
    ├── components/        # React components
    └── lib/              # Shared utilities
```

## Next.js Frontend

### Core Features

- React-based UI with @codegouvfr/react-dsfr
- Client-side state management
- Form handling and validation
- Compile-time Markdown rendering of files in `src/pages/docs`

### State Management

- Per-page React state
- No global state store
- Optimistic updates
- Debounced saves

## Next.js API

### Responsibilities

- Session management with NextAuth.js
- Request authentication
- Proxy to PCDBAPI
- Error handling

### Routes

- `/api/apps/*` - OIDC client management
- `/api/auth/*` - Authentication endpoints

### Security

- Server-side sessions
- Protected routes
- Request validation
- Error boundaries

## PCDBAPI Service

### Core Features

- MongoDB access layer
- Simple, auditable code with 100% test coverage

### Data Model

The data model is strictly enforced by Pydantic models, see `pcdbapi/main.py`.

### Security

- HMAC-SHA256 request signing
- Email-based access control
- Timestamp validation (5-min window)

### API Endpoints

- `GET /api/oidc_clients` - List clients
- `GET /api/oidc_clients/{id}` - Get client
- `POST /api/oidc_clients` - Create client
- `PATCH /api/oidc_clients/{id}` - Update client

## Authentication Flow

1. User -> Next.js Frontend
   - Magic link authentication via email
   - No password required
   - Secure token in email link

2. Next.js Frontend -> Next.js API
   - NextAuth.js session management
   - HTTP-only session cookie
   - Protected routes

3. Next.js API -> PCDBAPI
   - Request signing with HMAC-SHA256
   - Timestamp validation (5-min window)
   - Email ownership validation
   - Data validation
