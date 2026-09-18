# Event Management API Documentation

## Base URL

```text
http://localhost:5000/api/v1
```

## Request Flow

```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

---

# Authentication

Authentication uses **JWT (JSON Web Token)**.

Protected endpoints require:

```http
Authorization: Bearer <token>
```

The JWT is returned after a successful login.

---

# Authentication APIs

## 1. Register User

### Request

```http
POST /auth/register
```

### Body

```json
{
  "name": "Aryan",
  "email": "aryan@example.com",
  "password": "password123"
}
```

### Success

```text
201 Created
```

### Possible Responses

```text
400 Bad Request
409 Conflict
```

A `409 Conflict` is returned when the email is already registered.

---

## 2. Login

### Request

```http
POST /auth/login
```

### Body

```json
{
  "email": "aryan@example.com",
  "password": "password123"
}
```

### Success

```text
200 OK
```

Example:

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "Aryan",
      "email": "aryan@example.com"
    }
  }
}
```

### Invalid Credentials

```text
401 Unauthorized
```

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 3. Get Current User

### Request

```http
GET /auth/me
```

### Authentication

Required.

```http
Authorization: Bearer <token>
```

### Success

```text
200 OK
```

### Without Authentication

```text
401 Unauthorized
```

---

## 4. Logout

### Request

```http
POST /auth/logout
```

### Authentication

Required.

```http
Authorization: Bearer <token>
```

### Success

```text
200 OK
```

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# Event APIs

Base endpoint:

```text
/api/v1/events
```

## Authentication Policy

| Endpoint | Authentication |
|---|---|
| `GET /events` | Public |
| `GET /events/:id` | Public |
| `POST /events` | Required |
| `PUT /events/:id` | Required |
| `DELETE /events/:id` | Required |
| `POST /events/:id/register` | Required |

---

## 5. Create Event

### Request

```http
POST /events
```

### Authentication

Required.

```http
Authorization: Bearer <token>
```

### Body

```json
{
  "name": "Backend Workshop",
  "description": "Node.js backend development workshop",
  "startTime": "2026-09-25T10:00:00.000Z",
  "endTime": "2026-09-25T12:00:00.000Z",
  "venue": "Main Auditorium",
  "capacity": 100
}
```

### Success

```text
201 Created
```

---

## 6. Get All Events

### Request

```http
GET /events
```

No authentication required.

### Search

```http
GET /events?search=tech
```

Searches by event name and description.

### Filter by Venue

```http
GET /events?venue=auditorium
```

### Filter by Status

```http
GET /events?status=UPCOMING
```

### Pagination

```http
GET /events?page=1&limit=10
```

### Sorting

```http
GET /events?sortBy=capacity&order=desc
```

### Combined Query

```http
GET /events?search=tech&status=UPCOMING&page=1&limit=10&sortBy=startTime&order=asc
```

### Success

```text
200 OK
```

The response includes the events and pagination information.

---

## 7. Get Event by ID

### Request

```http
GET /events/:id
```

### Example

```http
GET /events/EVENT_ID
```

### Possible Responses

```text
200 OK
400 Bad Request
404 Not Found
```

Invalid MongoDB IDs return `400 Bad Request`.

---

## 8. Update Event

### Request

```http
PUT /events/:id
```

### Authentication

Required.

```http
Authorization: Bearer <token>
```

### Body

```json
{
  "name": "Updated Workshop",
  "capacity": 150
}
```

### Success

```text
200 OK
```

### Business Rules

- Started events cannot be freely updated.
- Completed events cannot be updated.
- Start time must remain in the future.
- End time must be after start time.
- Status is managed automatically.
- `CANCELLED` can be set manually.

---

## 9. Delete Event

### Request

```http
DELETE /events/:id
```

### Authentication

Required.

```http
Authorization: Bearer <token>
```

### Success

```text
200 OK
```

### Business Rule

Completed events cannot be deleted.

Possible responses:

```text
400 Bad Request
404 Not Found
```

---

## 10. Register for an Event

### Request

```http
POST /events/:id/register
```

### Authentication

Required.

```http
Authorization: Bearer <token>
```

### Success

```text
201 Created
```

Example:

```json
{
  "success": true,
  "data": {
    "userId": "USER_ID",
    "eventId": "EVENT_ID"
  }
}
```

### Business Rules

- A user cannot register for the same event twice.
- Completed events cannot accept registrations.
- Cancelled events cannot accept registrations.
- Registration is rejected when event capacity is full.

Duplicate registration returns:

```text
409 Conflict
```

---

# Validation

The API validates:

- Required user fields.
- User email.
- Minimum password length.
- Duplicate email.
- Required event fields.
- Event name length.
- Description length.
- Positive event capacity.
- Valid event dates.
- Future event start time.
- End time after start time.
- Valid MongoDB IDs.

---

# Event Status

Events use:

```text
UPCOMING
ONGOING
COMPLETED
CANCELLED
```

Normal event progression:

```text
UPCOMING → ONGOING → COMPLETED
```

An event may also be cancelled.

---

# HTTP Status Codes

| Status Code | Meaning |
|---|---|
| `200` | Successful request |
| `201` | Resource created |
| `400` | Invalid request / validation / business rule |
| `401` | Authentication required or invalid |
| `404` | Resource not found |
| `409` | Conflict / duplicate resource |
| `500` | Internal server error |

---

# Error Response

Errors use a consistent format.

Example:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

Validation errors may include additional details:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Capacity must be at least 1"
  ]
}
```

Raw database errors and sensitive information are not returned to clients.

---

# Security

- Passwords are hashed using `bcryptjs`.
- Passwords are never returned in authentication responses.
- JWT authentication is used for protected routes.
- JWT secret is stored in an environment variable.
- `.env` is excluded from Git.
- JWT expiration is configured through an environment variable.

---

# Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

Do not commit `.env` to GitHub.

---

# API Testing

The API was tested using **Insomnia**.

The collection demonstrates:

- User registration
- Duplicate registration
- Login
- Invalid login
- Current user
- Logout
- Protected routes without authentication
- Protected routes with valid authentication
- Invalid authentication
- Event CRUD
- Event registration
- Duplicate registration
- Validation failures
- Invalid IDs
- Search
- Filtering
- Pagination
- Sorting

---

# Project Structure

```text
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── auth.controller.ts
│   └── event.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── models/
│   ├── event.model.ts
│   ├── registration.model.ts
│   └── user.model.ts
├── routes/
│   ├── auth.routes.ts
│   └── event.routes.ts
├── services/
│   ├── auth.service.ts
│   ├── event.service.ts
│   └── registration.service.ts
├── app.ts
└── server.ts
```

---

# Setup

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Type check:

```bash
pnpm typecheck
```
