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
curl -X POST ${import.meta.env.VITE_BASE_URL}/users/register \
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
curl -X POST ${import.meta.env.VITE_BASE_URL}/users/login \
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


## Captain Registration API

### Endpoint

`POST /captain/register`

### Description

Registers a new captain (driver) in the system. Validates the request body and creates a captain with hashed password and vehicle details. On success, returns an authentication token and captain data.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullname.firstName` (string, required): Minimum 3 characters.
- `fullname.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (number, required): Minimum 1.
- `vehicle.vehicleType` (string, required): Must be one of `"car"`, `"motorcycle"`, `"auto"`.

### Success Response

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "_id": "<CAPTAIN_ID>",
      "fullname": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

### Error Responses

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
- **Captain Already Exists**
  - **Status Code:** `401 Unauthorized`
  - **Body:**
    ```json
    {
      "message": "Captain already exist"
    }
    ```

### Example Request

```sh
curl -X POST ${import.meta.env.VITE_BASE_URL}/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstName": "Jane", "lastName": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---
## Captain Login API

### Endpoint

`POST /captain/login`

### Description

Authenticates an existing captain. Validates the request body, checks credentials, and returns a JWT token and captain data on success.

### Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "_id": "<CAPTAIN_ID>",
      "fullname": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

### Error Response

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "invaild email or password "
  }
  ```

---

## Captain Profile API

### Endpoint

`GET /captain/profile`

### Description

Returns the authenticated captain's profile information. Requires a valid JWT token in the request cookies or Authorization header.

### Authentication

- Send the JWT token in the `Authorization` header as `Bearer <token>`, or as a cookie named `token`.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "Message": "Captain profile"
    // or full captain profile object if implemented
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

## Captain Logout API

### Endpoint

`GET /captain/logout`

### Description

Logs out the authenticated captain by clearing the JWT token cookie and blacklisting the token. Requires the token to be sent in cookies or Authorization header.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "Message": "logout Captain Successfully"
  }
  ```

### Error Response

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
    }
}

---

# Maps API Documentation

## 1. Get Coordinates

### Endpoint

`GET /maps/get-coordinate`

### Description

Converts an address into geographical coordinates (latitude and longitude).

### Query Parameters

- `address` (string, required): The address to geocode. Minimum 5 characters.

### Authentication

Requires user authentication token.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "coordinate": {
      "lat": 12.9715987,
      "lng": 77.5945627
    }
  }
  ```

### Error Response

- **Status Code:** `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Address is required",
        "param": "address",
        "location": "query"
      }
    ]
  }
  ```

- **Status Code:** `500 Internal Server Error`
  ```json
  {
    "message": "Server Error"
  }
  ```

## 2. Get Distance and Time

### Endpoint

`GET /maps/get-distance-time`

### Description

Calculates the distance and estimated travel time between two locations for different modes of transport.

### Query Parameters

- `origin` (string, required): Starting location. Minimum 5 characters.
- `destination` (string, required): End location. Minimum 5 characters.
- `modes` (string, required): Vehicle type ("car", "auto", "moto", "bike", "walk")

### Authentication

Requires user authentication token.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "result": {
      "distance": "5.2 km",
      "distanceValue": 5200,
      "duration": "15 mins",
      "durationValue": 15,
      "mode": "drive",
      "origin": "MG Road, Bangalore",
      "destination": "Indiranagar, Bangalore"
    }
  }
  ```

### Error Response

- **Status Code:** `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Invalid input",
        "param": "origin/destination/modes",
        "location": "query"
      }
    ]
  }
  ```

## 3. Get Address Suggestions

### Endpoint

`GET /maps/get-suggestions`

### Description

Provides address autocompletion suggestions based on user input.

### Query Parameters

- `input` (string, required): Search text. Minimum 2 characters.

### Authentication

Requires user authentication token.

### Success Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "result": {
      "results": [
        {
          "name": "Location Name",
          "formatted": "Full formatted address",
          "address_line1": "Street address",
          "address_line2": "Area details",
          "city": "City name",
          "state": "State name",
          "postcode": "Postal code",
          "country": "Country name",
          "lat": 12.9715987,
          "lon": 77.5945627
        }
      ]
    }
  }
  ```

### Error Response

- **Status Code:** `400 Bad Request`
  ```json
  {
    "errors": [
      {
        "msg": "Input too short",
        "param": "input",
        "location": "query"
      }
    ]
  }
  ```

---

# Ride API Documentation

## Create Ride

### Endpoint

`POST /ride/create`

### Description

Creates a new ride request with fare calculation based on distance and duration.

### Request Body

```json
{
  "pickup": "MG Road, Bangalore",
  "destination": "Indiranagar, Bangalore",
  "vehicleType": "car"
}
```

### Field Requirements

- `pickup` (string, required): Pickup location address
- `destination` (string, required): Drop-off location address
- `vehicleType` (string, required): Type of vehicle ("car", "auto", "moto")

### Authentication

Requires user authentication token.

### Success Response

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "ride": {
      "_id": "<RIDE_ID>",
      "userId": "<USER_ID>",
      "pickup": "MG Road, Bangalore",
      "destination": "Indiranagar, Bangalore",
      "otp": "123456",
      "vehicleType": "car",
      "fare": 150
    },
    "distance": "5.2 km",
    "duration": "15 mins",
    "fare": 150,
    "allFares": {
      "auto": 100,
      "car": 150,
      "moto": 80
    }
  }
  ```

### Error Responses

- **Status Code:** `400 Bad Request`
  ```json
  {
    "error": [
      {
        "msg": "All fields are required",
        "param": "pickup/destination/vehicleType",
        "location": "body"
      }
    ]
  }
  ```

- **Status Code:** `500 Internal Server Error`
  ```json
  {
    "message": "Error message details"
  }
  ```

### Fare Calculation

The fare is calculated based on:
- Base fare (varies by vehicle type)
- Per kilometer rate
- Per minute rate

Base fares:
- Auto: ₹30
- Car: ₹50
- Motorcycle: ₹20

Per km rates:
- Auto: ₹10/km
- Car: ₹15/km
- Motorcycle: ₹8/km

Per minute rates:
- Auto: ₹2/min
- Car: ₹3/min
- Motorcycle: ₹1.5/min

---

## Get Fare Estimate

### Endpoint

`GET /ride/get-fare`

### Description

Calculates estimated fares for all vehicle types between given pickup and destination locations. The fare calculation includes base fare, distance-based charge, and time-based charge.

### Query Parameters

- `pickup` (string, required): Pickup location address. Minimum 3 characters.
- `destination` (string, required): Drop-off location address. Minimum 3 characters.

### Authentication

Requires user authentication token.

### Success Response

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "response": {
      "pickup": "MG Road, Bangalore",
      "destination": "Indiranagar, Bangalore",
      "distance": "5.2 km",
      "duration": "15 mins",
      "distanceValue": 5200,
      "durationValue": 15,
      "fare": {
        "auto": 100,
        "car": 150,
        "moto": 80
      }
    }
  }
  ```

### Error Responses

- **Status Code:** `400 Bad Request`
  ```json
  {
    "error": [
      {
        "msg": "Pickup address required",
        "param": "pickup",
        "location": "query"
      }
    ]
  }
  ```

- **Status Code:** `500 Internal Server Error`
  ```json
  {
    "message": "Error message details"
  }
  ```

### Notes

The fare estimation is calculated using:
1. Base fare for each vehicle type:
   - Auto: ₹30
   - Car: ₹50
   - Motorcycle: ₹20

2. Per kilometer rates:
   - Auto: ₹10/km
   - Car: ₹15/km
   - Motorcycle: ₹8/km

3. Per minute rates:
   - Auto: ₹2/min
   - Car: ₹3/min
   - Motorcycle: ₹1.5/min

Final fare is rounded to the nearest whole number.