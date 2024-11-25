- --

# **JWT Integration Testing with IRedMail**

**Author**: MR Gh0st  
**Description**: This project demonstrates JWT integration with IRedMail, including testing and sample code for login, signup, and auto-login functionalities.

---

## **Project Overview**

This project provides a framework to integrate and test JWT authentication in an IRedMail environment. It includes:
- Signup and Login workflows using JWT.
- Two distinct login forms for flexibility.
- Debugging tools for error tracking.
- Auto-login functionality using stored tokens.

---

## **Folder Structure**

```plaintext
project/
│
├── backend/                   # Backend for JWT and API logic
│   ├── app.py                 # Flask server with JWT integration
│   └── requirements.txt       # Python dependencies
│
├── frontend/                  # Frontend for user interactions
│   ├── css/
│   │   └── styles.css         # Form styling
│   ├── js/
│   │   ├── app.js             # Form logic and API calls
│   │   ├── debug.js           # Debugging bar for error tracking
│   │   └── jwtHandler.js      # Token management
│   ├── signup.html            # Signup form
│   ├── login1.html            # Login form 1
│   └── login2.html            # Login form 2
│
└── shell/                     # Shell scripts
    └── start_server.sh        # Script to start the backend server
```

---

## **Prerequisites**

### **System Requirements**
- Python 3.8+
- Node.js and npm (for advanced front-end management)
- IRedMail environment (installed and configured)
- Browser with local server access (e.g., Google Chrome)

### **Dependencies**

#### **Backend**
Install Python dependencies from `requirements.txt`:

```bash
pip install -r backend/requirements.txt
```

#### **Frontend**
No additional dependencies for vanilla JS, but can be extended with npm.

---

## **Setup Instructions**

### **1. Backend Setup**
1. Navigate to the `backend` folder.
2. Set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```

### **2. Frontend Setup**
1. Open the `frontend` folder.
2. Use a live server (e.g., VS Code's Live Server extension) or serve files locally.

---

## **How to Run**

To run the project, follow these steps:

1. **Backend**:  
   - Ensure the backend is set up as per the instructions above.
   - Start the Flask server by running:
     ```bash
     python app.py
     ```

2. **Frontend**:  
   - Open `signup.html`, `login1.html`, or `login2.html` in your browser.
   - These forms will interact with the backend to handle user registration and login.

---

## **How to Use**

### **1. Signing Up**
1. Open `signup.html` in your browser.
2. Fill in the required fields (username and password) and click the "Sign Up" button.
   - A successful signup will store the user in the backend, but the JWT token will only be created once the user logs in.

### **2. Logging In**
1. Navigate to `login1.html` or `login2.html`.
2. Enter your credentials (username and password) and click the "Login" button.
   - On successful login, the JWT token will be generated and stored locally (in `localStorage`).

### **3. Auto-login**
- After the first successful login, the token is saved in `localStorage`.
- On subsequent visits to the site, the page will automatically check for the stored token and log you in without having to click the login form again.

---

## **How to Use Postman**

### **1. Sending Signup Request**
- Open **Postman** and make sure the server is running.
- Set the request method to `POST` and enter the following URL:
  ```plaintext
  http://127.0.0.1:5000/signup
  ```
- In the **Body** section, select `raw` and `JSON`, and enter the following JSON payload:

  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

- Click **Send** to register the user.

### **2. Sending Login Request**
- In Postman, set the request method to `POST` and enter the following URL:
  ```plaintext
  http://127.0.0.1:5000/login
  ```
- In the **Body** section, select `raw` and `JSON`, and enter the following JSON payload (replace `user1` and `password123` with actual credentials):

  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```

- Click **Send**.
  - On success, you should receive a response containing a JWT token:
  
    ```json
    {
      "token": "your_jwt_token_here"
    }
    ```

### **3. Accessing Protected Routes**
- After obtaining the JWT token, you can test protected routes.
- Set the request method to `GET` and enter the following URL:
  ```plaintext
  http://127.0.0.1:5000/protected
  ```
- In the **Headers** section, add a new header with the key `Authorization` and the value:
  ```plaintext
  Bearer your_jwt_token_here
  ```
  - Replace `your_jwt_token_here` with the actual token received from the login endpoint.
- Click **Send** to access the protected route. If the token is valid, you should get a response like:
  ```json
  {
    "message": "You have accessed a protected route"
  }
  ```

---

## **Sample Code**

### **Python: JWT Authentication**

```python
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    if username in users:
        return jsonify({"message": "User already exists"}), 400
    users[username] = password
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    if users.get(username) != password:
        return jsonify({"message": "Invalid credentials"}), 401
    token = create_access_token(identity=username)
    return jsonify({"token": token})

if __name__ == '__main__':
    app.run(debug=True)
```

### **JavaScript: Token Handling**

```javascript
async function saveTokenAndLogin(username, password) {
  const response = await fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('jwt', data.token);
    alert('Login successful!');
  } else {
    alert(data.message);
  }
}
```

---

## **Debugging Tool**

Include `debug.js` for tracking errors:

```javascript
window.onerror = function (message, source, lineno, colno, error) {
  console.error(`Error: ${message} at ${source}:${lineno}:${colno}`, error);
  const debugBar = document.createElement('div');
  debugBar.style = '...'; // Styling for error bar
  debugBar.innerText = `Error: ${message}`;
  document.body.appendChild(debugBar);
};
```

---

## **Testing JWT with IRedMail**

1. Deploy the backend to a server environment integrated with IRedMail.
2. Test API endpoints using Postman or curl:
   ```bash
   curl -X POST http://127.0.0.1:5000/login -d '{"username":"user","password":"pass"}'
   ```
3. Validate the token:
   - Decode it using [jwt.io](https://jwt.io) or similar tools.
   - Use the token to access protected routes.

---

## **Future Enhancements**
- Integration with IRedMail's LDAP/SMTP for real-world user data.
- Replace Flask with FastAPI for better scalability.
- Enhance the frontend with modern frameworks like React or Vue.js.

---

## **Author Notes**

This project serves as a quick-start guide for integrating JWT authentication with IRedMail environments. It demonstrates how to handle tokens, secure user data, and create a seamless authentication experience.

**Author**: MR Gh0st  
Feel free to contribute to the project on GitHub!

---

