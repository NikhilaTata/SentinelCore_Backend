# SentinelCore Frontend

React + Vite frontend for the SentinelCore Spring Boot backend.

## 1. Install

```bash
npm install
```

## 2. Start

```bash
npm run dev
```

Open:

http://localhost:5173

## 3. Backend

The frontend expects:

http://localhost:8080

Asset endpoints:

- GET /assets
- GET /assets/{id}
- POST /assets
- PUT /assets/{id}
- DELETE /assets/{id}

The frontend uses the existing Asset fields:

- id
- assetName
- assetType
- ipAddress
- location
- status
- cpuUsage
- memoryUsage
- diskUsage
- networkUsage
- createdDate

## 4. Authentication

The login page currently expects:

POST /auth/login

If your backend uses another authentication URL or request/response format, change only:

src/services/authService.js

If authentication is not yet implemented, you can temporarily navigate directly to:

http://localhost:5173/dashboard

## 5. CORS

Your Spring Boot backend should allow:

http://localhost:5173

Example:

@CrossOrigin(origins = "http://localhost:5173")

## 6. Important

Do not create another backend. This frontend communicates with the existing Spring Boot API.
