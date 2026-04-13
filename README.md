# 🚕 Nexa – Ride Dispatch System Performance and Stress Testing
Nexa is a backend-focused Uber-like ride dispatch system built using a **monolithic architecture**. It simulates core functionalities such as user management, driver allocation, and ride booking within a single service.

The project is designed to analyze how monolithic systems behave under **high traffic and concurrent ride requests** using load testing tools.

## 🔗 Tech Stack & Resources

### 🚀 Backend
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red)

### 🎨 Frontend
![React.js](https://img.shields.io/badge/React.js-Frontend-blue)
![React Router](https://img.shields.io/badge/React_Router-Routing-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC)

### 🔐 Authentication & Security
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-yellow)
![express-validator](https://img.shields.io/badge/express--validator-Validation-lightgrey)
![cookie-parser](https://img.shields.io/badge/cookie--parser-Cookies-blueviolet)

### 🌐 API & Testing
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4)
![Postman](https://img.shields.io/badge/Postman-API_Testing-FF6C37)

### 📊 Performance & Logging
![Autocannon](https://img.shields.io/badge/Autocannon-Load_Testing-critical)
![Morgan](https://img.shields.io/badge/Morgan-Logging-informational)
### 🗺️ Real-Time & Maps

![Google Maps](https://img.shields.io/badge/Google_Maps-Maps-4285F4)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-black)

### 💻 Version Control
![Git](https://img.shields.io/badge/Git-Version_Control-F05032)
![GitHub](https://img.shields.io/badge/GitHub-Hosting-181717)

---

## 📌 Features

- 🚖 Ride booking simulation
- 🧑‍🤝‍🧑 User & driver (captain) management
- ⚡ High concurrency load testing
- 📊 Performance benchmarking
- 🔍 Bottleneck detection in monolithic systems

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **Autocannon** (for load testing)
- **Morgan** (HTTP request logger)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nexa.git
cd nexa
```

### 2. Install backend dependencies
```bash
cd Backend
npm install
```

### 3. Run the backend server
```bash
npm run dev
```

By default, the backend API is available at:

`http://localhost:3000`

---

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
