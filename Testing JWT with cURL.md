
---

## **Testing JWT with cURL**

### **1. Testing User Signup**
To test the user signup endpoint, use the following cURL command:

```bash
curl -X POST http://127.0.0.1:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "password123"}'
```

- **Explanation**:
  - **-X POST**: Specifies the HTTP method (POST).
  - **-H "Content-Type: application/json"**: Indicates that the request body will be in JSON format.
  - **-d**: The request body containing the user information (`username` and `password`).

- **Response** (Successful signup):
  ```json
  {
    "message": "User registered successfully"
  }
  ```

- **Response (Failure)**:  
  If the user already exists, the response will be
  ```json
  {
    "message": "User already exists"
  }
  ```

### **2. Testing User Login**
To test the login functionality and obtain the JWT token, use the following cURL command:

```bash
curl -X POST http://127.0.0.1:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "password": "password123"}'
```

- **Explanation**:
  - **-X POST**: Specifies the HTTP method (POST).
  - **-H "Content-Type: application/json"**: Indicates that the request body will be in JSON format.
  - **-d**: The request body containing the user credentials (`username` and `password`).

- **Response** (Successful login):
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

  - The response will contain the JWT token, which you can use to access protected routes.

- **Response (Failure)**:  
  If the credentials are incorrect, the response will be
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

### **3. Testing JWT Token Authorization on Protected Routes**
Once you have the JWT token, use it to access protected routes. Here's an example using the protected route:

```bash
curl -X GET http://127.0.0.1:5000/protected \
  -H "Authorization: Bearer your_jwt_token_here"
```

- **Explanation**
  - **-X GET**: Specifies the HTTP method (GET).
  - **-H "Authorization: Bearer your_jwt_token_here"**: Adds the `Authorization` header with the value `Bearer` followed by the JWT token you obtained from the login response.

- **Response** (Successful access to protected route):
  ```json
  {
    "message": "You have accessed a protected route"
  }
  ```

  - The protected route is successfully accessed because the JWT token is valid.

- **Response (Failure)**:  
  If the token is invalid or expired, the response will be:
  ```json
  {
    "message": "Token is invalid or expired"
  }
  ```

### **4. Testing Token Expiration**
JWT tokens have an expiration time. To test how the server handles an expired token, you can manually alter the token's expiration time or wait until it expires. After the expiration, attempt to access the protected route:

```bash
curl -X GET http://127.0.0.1:5000/protected \
  -H "Authorization: Bearer expired_jwt_token_here"
```

- **Response** (Expired token):
  ```json
  {
    "message": "Token has expired"
  }
  ```

### **5. Refreshing the Token (Optional)**
If your backend supports token refresh functionality, you can test it as follows (assuming you have a `refresh` endpoint):

```bash
curl -X POST http://127.0.0.1:5000/refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer expired_jwt_token_here"
```

- **Response** (Successful token refresh):
  ```json
  {
    "new_token": "new_jwt_token_here"
  }
  ```

  - The response will include a new JWT token, allowing continued access to protected routes.

### **6. Test Invalid Token Format**
To test what happens when an invalid token is sent (e.g., a malformed JWT), use the following cURL command:

```bash
curl -X GET http://127.0.0.1:5000/protected \
  -H "Authorization: Bearer invalid_token_format"
```

- **Response** (Malformed token):
  ```json
  {
    "message": "Invalid token format"
  }
  ```

### **7. Test Missing Token**
If you attempt to access a protected route without sending a token, use this cURL command:

```bash
curl -X GET http://127.0.0.1:5000/protected
```

- **Response** (Missing token):
  ```json
  {
    "message": "Authorization token is missing"
  }
  ```

---

## **Common cURL Flags Explanation**

- **-X**: Specifies the HTTP method (GET, POST, PUT, DELETE, etc.).
- **-H**: Adds headers to the request. For example, `-H "Content-Type: application/json"` specifies that the request body will be in JSON format.
- **-d**: Sends data in the request body, typically for POST and PUT requests.
- **-i**: Includes the HTTP response headers in the output.
- **-v**: Provides verbose output to help debug the request.
- **-u**: Sends HTTP basic authentication credentials.

---

This expanded cURL testing version provides a comprehensive guide for testing JWT authentication with IRedMail, including sign-up, login, token validation, and error handling scenarios.