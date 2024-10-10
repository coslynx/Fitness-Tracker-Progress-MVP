## Fitness Tracker MVP - API Documentation

This document outlines the API endpoints for the Fitness Tracker MVP. This API serves as the central communication point between the frontend web application and the backend database. 

### 1. API Endpoints

#### 1.1 User Authentication (`/api/auth`)

This endpoint is responsible for handling user authentication using NextAuth.js. 

- **POST `/api/auth/register`**
  - Description: Registers a new user with an email and password.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - Response: 
    - On Success: `{ "id": "user123", "email": "user@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`
    - On Failure: `{ "message": "Error registering user" }`
- **POST `/api/auth/signin`**
  - Description: Authenticates an existing user with an email and password.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - Response: 
    - On Success: `{ "id": "user123", "email": "user@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`
    - On Failure: `{ "message": "Error logging in" }`
- **POST `/api/auth/signout`**
  - Description: Logs out the current user.
  - Response: 
    - On Success: `{ "message": "Logged out successfully" }`
    - On Failure: `{ "message": "Error logging out" }`
- **GET `/api/auth/session`**
  - Description: Fetches the current user session information, including the user's email and authentication token.
  - Response: 
    - On Success: `{ "user": { "id": "user123", "email": "user@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } }`
    - On Failure: `{ "user": null }`


#### 1.2 Goals (`/api/goals`)

This endpoint manages user goals. All requests require authentication (JWT token in the Authorization header).

- **GET `/api/goals`**
  - Description: Retrieves a list of all goals for the current user.
  - Response: 
    - On Success: `{ "goals": [{ "id": 1, "name": "Lose 10 pounds", "targetDate": "2024-06-01", "progress": 3, "target": 10, "userId": 1 }] }`
    - On Failure: `{ "message": "Error fetching goals" }`
- **POST `/api/goals`**
  - Description: Creates a new goal for the current user.
  - Request Body:
    ```json
    {
      "name": "Lose 10 pounds",
      "targetDate": "2024-06-01",
      "target": 10 
    }
    ```
  - Response:
    - On Success: `{ "id": 1, "name": "Lose 10 pounds", "targetDate": "2024-06-01", "progress": 0, "target": 10, "userId": 1 }`
    - On Failure: `{ "message": "Error creating goal" }`
- **GET `/api/goals/:id`**
  - Description: Retrieves a specific goal by its ID.
  - Response: 
    - On Success: `{ "id": 1, "name": "Lose 10 pounds", "targetDate": "2024-06-01", "progress": 3, "target": 10, "userId": 1 }`
    - On Failure: `{ "message": "Goal not found" }`
- **PUT `/api/goals/:id`**
  - Description: Updates a specific goal by its ID.
  - Request Body:
    ```json
    {
      "name": "Lose 10 pounds",
      "targetDate": "2024-06-01",
      "target": 10
    }
    ```
  - Response:
    - On Success: `{ "id": 1, "name": "Lose 10 pounds", "targetDate": "2024-06-01", "progress": 3, "target": 10, "userId": 1 }`
    - On Failure: `{ "message": "Error updating goal" }`
- **DELETE `/api/goals/:id`**
  - Description: Deletes a specific goal by its ID.
  - Response:
    - On Success: (Empty response with status 204)
    - On Failure: `{ "message": "Error deleting goal" }`

#### 1.3 Progress Entries (`/api/progress`)

This endpoint manages user progress entries, representing workouts, weight, and other activity data. All requests require authentication.

- **GET `/api/progress`**
  - Description: Retrieves a list of progress entries for the current user.
  - Response:
    - On Success: `{ "progressEntries": [{ "id": 1, "value": 175, "date": "2024-04-01", "goalId": 1, "userId": 1 }] }`
    - On Failure: `{ "message": "Error fetching progress entries" }`
- **POST `/api/progress`**
  - Description: Creates a new progress entry for the current user.
  - Request Body:
    ```json
    {
      "goalId": 1,
      "value": 175,
      "date": "2024-04-01"
    }
    ```
  - Response:
    - On Success: `{ "id": 1, "value": 175, "date": "2024-04-01", "goalId": 1, "userId": 1 }`
    - On Failure: `{ "message": "Error creating progress entry" }`
- **GET `/api/progress/:id`**
  - Description: Retrieves a specific progress entry by its ID.
  - Response: 
    - On Success: `{ "id": 1, "value": 175, "date": "2024-04-01", "goalId": 1, "userId": 1 }`
    - On Failure: `{ "message": "Progress entry not found" }`
- **PUT `/api/progress/:id`**
  - Description: Updates a specific progress entry by its ID.
  - Request Body:
    ```json
    {
      "value": 175,
      "date": "2024-04-01",
      "goalId": 1 
    }
    ```
  - Response:
    - On Success: `{ "id": 1, "value": 175, "date": "2024-04-01", "goalId": 1, "userId": 1 }`
    - On Failure: `{ "message": "Error updating progress entry" }`
- **DELETE `/api/progress/:id`**
  - Description: Deletes a specific progress entry by its ID.
  - Response:
    - On Success: (Empty response with status 204)
    - On Failure: `{ "message": "Error deleting progress entry" }`

#### 1.4 Users (`/api/users`)

This endpoint manages user profiles (primarily for administrative purposes). All requests require authentication.

- **GET `/api/users`**
  - Description: Retrieves a list of all users (for administrative purposes).
  - Response: 
    - On Success: `{ "users": [{ "id": 1, "email": "user1@example.com", "password": "hashed_password", "goals": [] }] }`
    - On Failure: `{ "message": "Error fetching users" }`
- **GET `/api/users/me`**
  - Description: Retrieves the current user's profile information.
  - Response: 
    - On Success: `{ "id": 1, "email": "user1@example.com", "password": "hashed_password", "goals": [] }`
    - On Failure: `{ "message": "Error fetching user profile" }`
- **PUT `/api/users/:id`**
  - Description: Updates a specific user's profile information (email and password).
  - Request Body:
    ```json
    {
      "email": "updated@example.com",
      "password": "newpassword"
    }
    ```
  - Response:
    - On Success: `{ "id": 1, "email": "updated@example.com", "password": "hashed_password", "goals": [] }`
    - On Failure: `{ "message": "Error updating user profile" }`

#### 1.5 Stripe Webhooks (`/api/webhooks`)

This endpoint handles Stripe webhooks for future payment integrations.

- **POST `/api/webhooks/stripe`**
  - Description: Receives and processes Stripe webhooks for subscription management and payments.
  - Response: 
    - On Success: (Empty response with status 200)
    - On Failure: `{ "message": "Error processing Stripe webhook" }`

### 2. Authentication

- All requests to protected endpoints (`/api/goals`, `/api/progress`, `/api/users`) require a valid JWT token in the `Authorization` header.
- The token is generated upon successful user registration or login using `pages/api/auth/[...nextauth].ts`.
- The token contains user ID and other necessary data.

### 3. Error Handling

- All API endpoints implement robust error handling:
  - Invalid requests (e.g., missing required fields, invalid data formats) result in a 400 Bad Request response with an error message.
  - Unauthorized requests (no or invalid JWT token) result in a 401 Unauthorized response.
  - Resource not found (e.g., goal not found) result in a 404 Not Found response.
  - Server-side errors (e.g., database errors) result in a 500 Internal Server Error response.
- Error messages provide informative details to help debug issues.

### 4. API Versioning

- For future expansion, API versioning is implemented through URL prefixes (e.g., `/api/v2/goals`).
- Backwards compatibility is maintained for existing endpoints.

### 5. Security

- **Authentication:** The API uses JWT for secure authentication, preventing unauthorized access.
- **Input Validation:** All incoming data is validated to prevent malicious inputs and ensure data integrity.
- **Data Encryption:** Sensitive data (e.g., passwords) is encrypted at rest and in transit.

### 6. Performance Optimization

- **Caching:**  API responses are cached to reduce server load and improve response times.
- **Database Optimization:**  Database queries are optimized for performance.

### Conclusion

This API documentation provides a comprehensive overview of the Fitness Tracker MVP's API structure and functionality. This well-documented and secure API forms the foundation for communication between the frontend application and backend database, ensuring a seamless and robust user experience.