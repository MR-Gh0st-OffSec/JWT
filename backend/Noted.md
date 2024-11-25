
### Usage Documentation for CURL and Postman

This document provides instructions for testing the API endpoints in `app.py` using **CURL** and **Postman**. The API uses **JWT tokens** for managing multiple logins, ensuring **Single Sign-On (SSO)** and **multiple active sessions**.

---

### 1. **Sign Up (`/signup`)**
**Endpoint**: `/signup`  
**Method**: `POST`  
**Description**: Registers a new user.

#### **CURL**:
```bash
curl -X POST http://localhost:5000/signup \
-H "Content-Type: application/json" \
-d '{"username": "user1", "password": "password123"}'
```

#### **Postman**:
- **Method**: POST
- **URL**: `http://localhost:5000/signup`
- **Headers**: 
  - Content-Type: `application/json`
- **Body** (raw, JSON):
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

---

### 2. **Login (`/login`)**
**Endpoint**: `/login`  
**Method**: `POST`  
**Description**: Authenticates the user and generates access and refresh tokens.

#### **CURL**:
```bash
curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{"username": "user1", "password": "password123"}'
```

#### **Postman**:
- **Method**: POST
- **URL**: `http://localhost:5000/login`
- **Headers**: 
  - Content-Type: `application/json`
- **Body** (raw, JSON):
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

**Response**:
```json
{
  "message": "Login successful",
  "access_token": "<access_token>",
  "refresh_token": "<refresh_token>"
}
```

---

### 3. **Access Protected Resource (`/protected`)**
**Endpoint**: `/protected`  
**Method**: `GET`  
**Description**: Access a protected resource using the JWT access token.

#### **CURL**:
```bash
curl -X GET http://localhost:5000/protected \
-H "Authorization: Bearer <access_token>"
```

#### **Postman**:
- **Method**: GET
- **URL**: `http://localhost:5000/protected`
- **Headers**:
  - Authorization: `Bearer <access_token>`

**Response**:
```json
{
  "message": "Hello, user1. You have successfully accessed the protected route."
}
```

---

### 4. **Logout Specific Session (`/logout`)**
**Endpoint**: `/logout`  
**Method**: `POST`  
**Description**: Logs out a specific session by invalidating a given token.

#### **CURL**:
```bash
curl -X POST http://localhost:5000/logout \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <access_token>" \
-d '{"token": "<access_token>"}'
```

#### **Postman**:
- **Method**: POST
- **URL**: `http://localhost:5000/logout`
- **Headers**: 
  - Content-Type: `application/json`
  - Authorization: `Bearer <access_token>`
- **Body** (raw, JSON):
  ```json
  {
    "token": "<access_token>"
  }
  ```

**Response**:
```json
{
  "message": "Logout successful"
}
```

---

### 5. **Refresh Token (`/refresh_token`)**
**Endpoint**: `/refresh_token`  
**Method**: `POST`  
**Description**: Refreshes an expired access token using a valid refresh token.

#### **CURL**:
```bash
curl -X POST http://localhost:5000/refresh_token \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <refresh_token>" \
-d '{"refresh_token": "<refresh_token>"}'
```

#### **Postman**:
- **Method**: POST
- **URL**: `http://localhost:5000/refresh_token`
- **Headers**:
  - Content-Type: `application/json`
  - Authorization: `Bearer <refresh_token>`
- **Body** (raw, JSON):
  ```json
  {
    "refresh_token": "<refresh_token>"
  }
  ```

**Response**:
```json
{
  "message": "Token refreshed",
  "new_access_token": "<new_access_token>"
}
```

---

### 6. **Get Active Sessions (`/get_active_sessions`)**
**Endpoint**: `/get_active_sessions`  
**Method**: `GET`  
**Description**: Fetches all active sessions (JWT tokens) for the currently logged-in user.

#### **CURL**:
```bash
curl -X GET http://localhost:5000/get_active_sessions \
-H "Authorization: Bearer <access_token>"
```

#### **Postman**:
- **Method**: GET
- **URL**: `http://localhost:5000/get_active_sessions`
- **Headers**:
  - Authorization: `Bearer <access_token>`

**Response**:
```json
{
  "active_sessions": [
    {
      "access_token": "<access_token>",
      "refresh_token": "<refresh_token>"
    },
    {
      "access_token": "<another_access_token>",
      "refresh_token": "<another_refresh_token>"
    }
  ]
}
```

---

###  JWT Token Flow

- **Login**: After successful login, the server returns an **access token** and a **refresh token**.
- **Access Protected Resource**: Use the access token in the `Authorization` header to access protected endpoints.
- **Logout**: Specify the token to log out a specific session.
- **Refresh Token**: Use the refresh token to get a new access token when the old one expires.
- **Active Sessions**: Retrieve all active sessions (tokens) for the user.

This documentation provides all the necessary steps to interact with the API using **CURL** and **Postman** for testing JWT-based authentication and session management.


### How to Run the Project

This section explains the steps to set up and run the **Flask application** for managing **JWT tokens**, including **sign-up**, **login**, **protected routes**, and **session management**.

---

### Prerequisites

1. **Python 3.7+**: Make sure Python is installed on your system. You can check the version by running:
   ```bash
   python --version
   ```

2. **Virtual Environment (optional)**: It is highly recommended to create a virtual environment to manage dependencies.

   To install `virtualenv`:
   ```bash
   pip install virtualenv
   ```

---

### 1. **Clone the Repository or Set Up Project**

If you have the project as a Git repository, clone it to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

Or, if you have the project files, place them in a directory on your local machine.

---

### 2. **Set Up the Virtual Environment (Optional)**

Run the following commands to create a virtual environment (optional but recommended):

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment (on macOS/Linux)
source venv/bin/activate

# Activate the virtual environment (on Windows)
.\venv\Scripts\activate
```

---

### 3. **Install Dependencies**

Install the required dependencies by running the following command in the project folder:

```bash
pip install -r requirements.txt
```

If you don't have a `requirements.txt` file, you can manually install the necessary packages, such as:

```bash
pip install Flask PyJWT
```

---

### 4. **Set Up Environment Variables (if needed)**

You might need to set environment variables for configuration like the **secret key** for JWT, **database credentials**, etc.

You can either set these directly in your terminal session or create a `.env` file (if using libraries like `python-dotenv`):

Example `.env` file:
```
SECRET_KEY=your_secret_key
```

---

### 5. **Run the Flask Application**

To run the Flask app, execute the following command:

```bash
python app.py
```

If everything is set up correctly, you should see the following message indicating that the server is running:

```
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

---

### 6. **Testing the API Endpoints**

Once the application is running, you can test the API endpoints using **cURL** or **Postman** as detailed in the previous usage documentation.

1. **Sign Up** (POST request to `/signup`)
2. **Login** (POST request to `/login`)
3. **Access Protected Resource** (GET request to `/protected` with `Authorization: Bearer <access_token>`)
4. **Logout** (POST request to `/logout` with the token)
5. **Refresh Token** (POST request to `/refresh_token`)
6. **Get Active Sessions** (GET request to `/get_active_sessions`)

---

### 7. **Stopping the Flask Application**

To stop the Flask application, press `CTRL + C` in the terminal where the application is running.

---

### Common Issues

- **Missing dependencies**: Ensure all required dependencies are installed by running `pip install -r requirements.txt` or installing packages manually.
- **Port already in use**: If the default port 5000 is occupied, you can change the port when running the app by using:
  ```bash
  python app.py run --port 5001
  ```
- **Invalid token**: Ensure that you are providing the correct token in the `Authorization` header for protected routes.

---
