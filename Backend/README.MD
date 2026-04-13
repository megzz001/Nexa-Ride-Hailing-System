
## API Docs

### Register User

- **Endpoint:** `POST /api/users/register`
- **Description:** Creates a new user account (rider, driver, or admin), hashes the password, and returns a JWT token.

#### Required Request Data

Content-Type: `application/json`

```json
{
	"fullname": {
		"firstName": "John",
		"lastName": "Doe"
	},
	"email": "john.doe@example.com",
	"password": "secret123",
	"role": "rider"
}
```

#### Field Requirements

- `fullname.firstName` (string, required, minimum 3 characters)
- `fullname.lastName` (string, optional, minimum 2 characters if provided)
- `email` (string, required, valid email)
- `password` (string, required, minimum 6 characters)
- `role` (string, required, allowed: `rider`, `driver`, `admin`)

#### Status Codes

- `201 Created`
	- User registration succeeded.
	- Example response:

```json
{
	"message": "User registered successfully",
	"token": "<jwt_token>",
	"user": {
		"_id": "...",
		"fullname": {
			"firstName": "John",
			"lastName": "Doe"
		},
		"email": "john.doe@example.com",
		"role": "rider"
	}
}
```

- `400 Bad Request`
	- Validation failed (invalid/missing input), or email is already in use.
	- Example response (validation error):

```json
{
	"errors": [
		{
			"msg": "Password must be at least 6 characters long"
		}
	]
}
```

	- Example response (duplicate email):

```json
{
	"message": "Email already in use"
}
```

- `500 Internal Server Error`
	- Unexpected server-side failure.
	- Example response:

```json
{
	"message": "Server error"
}
```

#### Response Examples

Success (201):

```json
{
	"message": "User registered successfully",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"_id": "67f3dcb4c20d2f5b3af00123",
		"fullname": {
			"firstName": "John",
			"lastName": "Doe"
		},
		"email": "john.doe@example.com",
		"role": "rider",
		"createdAt": "2026-04-08T10:00:00.000Z"
	}
}
```

Validation error (400):

```json
{
	"errors": [
		{
			"msg": "Password must be at least 6 characters long"
		}
	]
}
```

Duplicate email (400):

```json
{
	"message": "Email already in use"
}
```

### Register Captain

- **Endpoint:** `POST /api/captains/register`
- **Description:** Creates a new captain account, hashes the password, and returns a JWT token with the created captain profile.

#### Required Request Data

Content-Type: `application/json`

```json
{
	"fullname": {
		"firstName": "Megha",
		"lastName": "Gusain"
	},
	"email": "megha.gusain@gmail.com",
	"password": "password123",
	"phone": "9876543210",
	"status": "active",
	"vehicle": {
		"color": "red",
		"plateNumber": "MH12AB1234",
		"capacity": 5,
		"vehicleType": "car"
	}
}
```

#### Field Requirements

- `fullname.firstName` (string, required, minimum 3 characters)
- `fullname.lastName` (string, required, minimum 2 characters)
- `email` (string, required, valid email)
- `password` (string, required, minimum 6 characters)
- `phone` (string, required, 10 to 15 characters)
- `status` (string, optional, allowed: `active`, `inactive`)
- `vehicle.color` (string, required, minimum 3 characters)
- `vehicle.plateNumber` (string, required, minimum 3 characters)
- `vehicle.capacity` (number, required, minimum 1)
- `vehicle.vehicleType` (string, required, allowed: `car`, `auto`, `bike`)

#### Status Codes

- `201 Created`
	- Captain registration succeeded.
	- Example response:

```json
{
	"message": "Captain registered successfully",
	"token": "<jwt_token>",
	"captain": {
		"_id": "...",
		"fullname": {
			"firstName": "Megha",
			"lastName": "Gusain"
		},
		"email": "megha.gusain@gmail.com",
		"phone": "9876543210",
		"status": "active",
		"vehicle": {
			"color": "red",
			"plateNumber": "MH12AB1234",
			"capacity": 5,
			"vehicleType": "car"
		}
	}
}
```

- `400 Bad Request`
	- Validation failed, or a captain with the same email already exists.
	- Example response:

```json
{
	"errors": [
		{
			"msg": "Vehicle type must be car, auto, or bike"
		}
	]
}
```

#### Response Example

Success (201):

```json
{
	"message": "Captain registered successfully",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"captain": {
		"_id": "67f3dcb4c20d2f5b3af00999",
		"fullname": {
			"firstName": "Megha",
			"lastName": "Gusain"
		},
		"email": "megha.gusain@gmail.com",
		"phone": "9876543210",
		"status": "active",
		"vehicle": {
			"color": "red",
			"plateNumber": "MH12AB1234",
			"capacity": 5,
			"vehicleType": "car"
		},
		"createdAt": "2026-04-13T10:00:00.000Z"
	}
}
```

### Login User

- **Endpoint:** `POST /api/users/login`
- **Description:** Authenticates a user using email and password, then returns a JWT token with user data.

#### Required Request Data

Content-Type: `application/json`

```json
{
	"email": "john.doe@example.com",
	"password": "secret123"
}
```

#### Field Requirements

- `email` (string, required, valid email)
- `password` (string, required, minimum 6 characters)

#### Status Codes

- `200 OK`
	- Login succeeded.

- `400 Bad Request`
	- Validation failed for request input.

- `401 Unauthorized`
	- Invalid email or password.

- `500 Internal Server Error`
	- Unexpected server-side failure.

#### Response Examples

Success (200):

```json
{
	"message": "Login successful",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"user": {
		"_id": "67f3dcb4c20d2f5b3af00123",
		"fullname": {
			"firstName": "John",
			"lastName": "Doe"
		},
		"email": "john.doe@example.com",
		"role": "rider",
		"createdAt": "2026-04-08T10:00:00.000Z"
	}
}
```

Validation error (400):

```json
{
	"errors": [
		{
			"msg": "Please enter a valid email address"
		}
	]
}
```

Invalid credentials (401):

```json
{
	"message": "Invalid email or password"
}
```

Server error (500):

```json
{
	"message": "Server error"
}
```

### Get User Profile

- **Endpoint:** `GET /api/users/profile`
- **Description:** Returns the currently authenticated user's profile.

#### Authentication

This is a protected route. Send JWT using either:

- `Authorization: Bearer <jwt_token>` header
- `token` cookie

#### Status Codes

- `200 OK`
	- User profile fetched successfully.

- `401 Unauthorized`
	- No token provided, token is invalid, or token is blacklisted.

#### Response Examples

Success (200):

```json
{
	"user": {
		"_id": "67f3dcb4c20d2f5b3af00123",
		"fullname": {
			"firstName": "John",
			"lastName": "Doe"
		},
		"email": "john.doe@example.com",
		"role": "rider"
	}
}
```

Unauthorized (401):

```json
{
	"message": "Invalid token"
}
```

### Logout User

- **Endpoint:** `GET /api/users/logout`
- **Description:** Logs out the authenticated user by clearing the auth cookie.

#### Authentication

This is a protected route. Send JWT using either:

- `Authorization: Bearer <jwt_token>` header
- `token` cookie

#### Status Codes

- `200 OK`
	- Logout completed successfully.

- `401 Unauthorized`
	- No token provided, token is invalid, or token is blacklisted.

#### Response Examples

Success (200):

```json
{
	"message": "Logout successful"
}
```

Unauthorized (401):

```json
{
	"message": "Invalid token"
}
```
