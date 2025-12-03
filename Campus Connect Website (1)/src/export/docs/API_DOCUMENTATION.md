# Campus Connect - API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### POST /auth/signup
Register a new user

**Request:**
```json
{
  "email": "student@campus.com",
  "password": "securepassword",
  "name": "John Doe",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "student@campus.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

### POST /auth/login
Login user

**Request:**
```json
{
  "email": "student@campus.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "student@campus.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

### POST /auth/logout
Logout user

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Users

### GET /users
Get all users

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@campus.com",
      "role": "student",
      "bio": "Computer Science student"
    }
  ]
}
```

### GET /users/:id
Get user by ID

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@campus.com",
    "role": "student",
    "bio": "Computer Science student",
    "achievements": [
      {
        "id": 1,
        "title": "Hackathon Winner",
        "date_earned": "2024-01-15"
      }
    ]
  }
}
```

### PUT /users/:id
Update user profile

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "John Updated",
  "bio": "Updated bio"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Updated",
    "bio": "Updated bio"
  }
}
```

## Posts

### GET /posts
Get all posts

**Query Parameters:**
- `limit` (optional): Number of posts (default: 20)
- `offset` (optional): Offset for pagination (default: 0)

**Response:**
```json
{
  "success": true,
  "posts": [
    {
      "id": 1,
      "user_id": 1,
      "author": "John Doe",
      "content": "Hello Campus!",
      "image_url": "https://example.com/image.jpg",
      "likes_count": 5,
      "comments_count": 3,
      "created_at": "2025-01-01T10:00:00Z"
    }
  ]
}
```

### POST /posts
Create a new post

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "content": "My first post!",
  "image_url": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "post": {
    "id": 1,
    "user_id": 1,
    "content": "My first post!",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2025-01-01T10:00:00Z"
  }
}
```

### DELETE /posts/:id
Delete a post

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

### POST /posts/:id/like
Like/unlike a post

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "liked": true,
  "likes_count": 6
}
```

### POST /posts/:id/comment
Add comment to post

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "content": "Great post!"
}
```

**Response:**
```json
{
  "success": true,
  "comment": {
    "id": 1,
    "post_id": 1,
    "user_id": 1,
    "author": "John Doe",
    "content": "Great post!",
    "created_at": "2025-01-01T10:00:00Z"
  }
}
```

## Messages

### GET /messages
Get user's messages

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `with` (optional): User ID to get conversation with

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "sender_id": 1,
      "receiver_id": 2,
      "sender_name": "John Doe",
      "receiver_name": "Jane Smith",
      "content": "Hello!",
      "is_read": false,
      "created_at": "2025-01-01T10:00:00Z"
    }
  ]
}
```

### POST /messages
Send a message

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "receiver_id": 2,
  "content": "Hello there!"
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "id": 1,
    "sender_id": 1,
    "receiver_id": 2,
    "content": "Hello there!",
    "created_at": "2025-01-01T10:00:00Z"
  }
}
```

## Events

### GET /events
Get all events

**Response:**
```json
{
  "success": true,
  "events": [
    {
      "id": 1,
      "name": "Tech Fest 2025",
      "description": "Annual tech festival",
      "date": "2025-01-15",
      "time": "10:00 AM",
      "venue": "Main Auditorium",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ]
}
```

### POST /events
Create a new event

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "Coding Workshop",
  "description": "Learn Python basics",
  "date": "2025-01-20",
  "time": "2:00 PM",
  "venue": "Computer Lab A"
}
```

**Response:**
```json
{
  "success": true,
  "event": {
    "id": 1,
    "name": "Coding Workshop",
    "date": "2025-01-20",
    "time": "2:00 PM",
    "venue": "Computer Lab A"
  }
}
```

## Marketplace

### GET /marketplace
Get marketplace items

**Query Parameters:**
- `category` (optional): Filter by category
- `sold` (optional): Filter by sold status (true/false)

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "id": 1,
      "seller_id": 1,
      "seller_name": "John Doe",
      "title": "Calculus Textbook",
      "description": "Barely used",
      "price": 500,
      "category": "Books",
      "condition": "Good",
      "is_sold": false,
      "created_at": "2025-01-01T10:00:00Z"
    }
  ]
}
```

### POST /marketplace
List a new item

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "title": "Scientific Calculator",
  "description": "Like new condition",
  "price": 800,
  "category": "Electronics",
  "condition": "Like New"
}
```

**Response:**
```json
{
  "success": true,
  "item": {
    "id": 1,
    "title": "Scientific Calculator",
    "price": 800
  }
}
```

## Jobs

### GET /jobs
Get job listings

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "id": 1,
      "company": "Google",
      "role": "Software Engineer",
      "location": "Bangalore",
      "salary": "₹15-20 LPA",
      "type": "Full-time",
      "description": "Join our team"
    }
  ]
}
```

### POST /jobs/:id/apply
Apply for a job

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common status codes:
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
