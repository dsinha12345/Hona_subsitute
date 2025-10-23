# SLF Clients Backend API Documentation

## Base URL
- Development: `http://localhost:3000`
- Production: `TBD`

## Authentication
This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Authentication

#### POST `/api/auth/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "client@demo.com",
  "password": "client123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "68fa459627d32ce5530386cb",
    "email": "client@demo.com",
    "name": "John Doe",
    "role": "client",
    "caseNumber": "CASE-2024-001",
    "currentPhase": 8,
    "language": "en",
    "lastWatchedVideo": {}
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

### 2. User

#### GET `/api/user/me`
Get current authenticated user information.

**Headers Required:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "id": "68fa459627d32ce5530386cb",
  "email": "client@demo.com",
  "name": "John Doe",
  "role": "client",
  "currentPhase": 8,
  "caseNumber": "CASE-2024-001"
}
```

### 3. Progress

#### GET `/api/progress/phase/:phaseNumber`
Get video progress for a specific phase.

**Headers Required:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `phaseNumber` - Phase number (1-15)

**Success Response (200):**
```json
[
  {
    "videoId": "phase1-video1",
    "watched": true,
    "watchedAt": "2024-10-23T15:30:00Z"
  }
]
```

#### POST `/api/progress/video/:videoId/watched`
Mark a video as watched.

**Headers Required:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `videoId` - Video identifier (e.g., "phase1-video1")

**Request Body:**
```json
{
  "phaseNumber": 1
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

## Demo Accounts

### Client Account
- Email: `client@demo.com`
- Password: `client123`
- Role: Client
- Access: Phase navigation and video content

### Admin Account
- Email: `admin@demo.com`
- Password: `admin123`
- Role: Admin
- Access: Admin dashboard (future implementation)

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid credentials or token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Something went wrong |

## Database Models

### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: "client" | "admin",
  caseNumber: String (unique, optional),
  currentPhase: Number (1-15),
  language: "en" | "es",
  lastWatchedVideo: {
    phaseNumber: Number,
    videoId: String,
    timestamp: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### VideoProgress Schema
```javascript
{
  userId: ObjectId (ref: User),
  phaseNumber: Number (1-15),
  videoId: String,
  watched: Boolean,
  watchedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Create a `.env` file in the root directory with:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_minimum_32_chars
PORT=3000
NODE_ENV=development
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`

3. Seed the database:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev    # Development with auto-reload
npm start      # Production
```

## Testing with curl

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"client@demo.com","password":"client123"}'
```

### Get User (with token)
```bash
curl -X GET http://localhost:3000/api/user/me   -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Future Endpoints (Planned)

- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `PATCH /api/user/me` - Update user profile
- `PATCH /api/user/phase` - Update current phase
- `GET /api/progress/all` - Get all progress for user
- `GET /api/admin/clients` - Admin: List all clients
- `GET /api/admin/analytics` - Admin: View analytics

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Always use HTTPS in production
- Never commit `.env` file to version control
- Rate limiting should be implemented in production

---

**Version:** 1.0.0  
**Last Updated:** October 2024  
**Maintained by:** Development Team
