# Backend1 Express.js API

## Setup

1. Copy `.env.example` to `.env`
2. Update `MONGO_URL` and `JWT_SECRET`
3. Run:
   ```bash
   npm install
   npm run dev
   ```

## Available APIs

### Hello test API
- URL: `GET http://localhost:5000/api/hello`
- Response: `{ "message": "Hello World" }`

### Register API
- URL: `POST http://localhost:5000/api/users/register`
- Body (JSON):
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```

### Login API
- URL: `POST http://localhost:5000/api/users/login`
- Body (JSON):
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```

### Protected profile API
- URL: `GET http://localhost:5000/api/myself`
- Headers:
  - `Authorization: Bearer <token>`
- Response contains the logged in user profile excluding password.
