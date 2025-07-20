# User Registration API Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. The endpoint validates the request body and creates a user with hashed password. On success, returns an authentication token and user data.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstName` (string, required): Minimum 3 characters.
- `fullname.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
      // more errors
    ]
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

## Notes

- Passwords are securely hashed before storing.
- The returned token can be



---

## Endpoint: Login

`POST /users/login`

### Description

Authenticates an existing user. Validates the request body, checks credentials, and returns a JWT token and user data on success.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.


## Responses

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<USER_ID>",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Error Responses

- **Invalid Email**
  - **Status Code:** `401 Unauthorized`
  - **Body:**
    ```json
    {
      "messsage": "Invaild email "
    }
    ```

- **Invalid Password**
  - **Status Code:** `401 Unauthorized`
  - **Body:**
    ```json
    {
      "messsage": "Invaild  password"
    }
    ```

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
        // more errors
      ]
    }
    ```

---

## Example Login Request

```sh
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

## Notes

- Passwords are securely hashed before storing.
- The returned token can be used for authenticated requests.


## Endpoint: Profile

`GET /users/profile`

### Description

Returns the authenticated user's profile information. This endpoint requires a valid JWT token to be sent in the request cookies or Authorization header.

### Authentication

- Send the JWT token in the `Authorization` header as `Bearer <token>`, or as a cookie named `token`.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<USER_ID>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields
  }
  ```

### Error Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

## Endpoint: Logout

`GET /users/logout`

### Description

Logs out the authenticated user by clearing the JWT token cookie and blacklisting the token. Requires the token to be sent in cookies or Authorization header.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "messsage": "User successfully logout"
  }
  ```

### Error Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---
### Authentication

- require  the JWT token in the `Authorization` header as `Bearer <token>`, or as a cookie named `token` to login  and access the profile


...existing code...