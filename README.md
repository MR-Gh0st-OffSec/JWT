---

# **Flask and JWT Setup Guide**

## **2. Set Up Python and Flask**

Parrot OS typically comes with Python pre-installed. You can verify and install Flask and `flask-jwt-extended` using the following steps:

### **A. Check Python Version**
```bash
python3 --version
```

---

### **B. Install `pip` (Python Package Manager)**

If `pip` is not already installed:
```bash
sudo apt install python3-pip
```

---

### **C. Set Up Virtual Environment**

It’s a good practice to use a virtual environment for your Flask projects:
```bash
sudo apt install python3-venv
python3 -m venv myenv
source myenv/bin/activate
```

---

### **D. Install Flask and Flask-JWT-Extended**
```bash
pip install flask flask-jwt-extended
```

---

## **3. Create a Flask Application with JWT**

Below is an example of a Flask application using JWT:

### **Flask App (`app.py`)**
```python
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this to a strong secret key
jwt = JWTManager(app)

# In-memory user store
users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in users:
        return jsonify({"message": "User already exists"}), 400

    users[username] = password
    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users.get(username) != password:
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=username)
    return jsonify({"token": token})

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"message": "This is a protected route!"})

if __name__ == '__main__':
    app.run(debug=True)
```

---

## **4. Run the Flask Application**

Start the Flask application on Parrot OS:

### **A. Activate Virtual Environment**
```bash
source myenv/bin/activate
```

---

### **B. Run Flask App**
```bash
python app.py
```

By default, the app will run on `http://127.0.0.1:5000`.

---

## **5. Test JWT Endpoints**

### **Tools to Use:**
- `curl`
- REST API clients like Postman or Insomnia

### **Example Requests:**

#### **Sign Up**
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpass"}' \
http://127.0.0.1:5000/signup
```

---

#### **Login**
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "testpass"}' \
http://127.0.0.1:5000/login
```

---

#### **Access Protected Route**

Use the token received from the login response:
```bash
curl -H "Authorization: Bearer <your_token_here>" \
http://127.0.0.1:5000/protected
```

---

## **6. Automate with Shell Script (Optional)**

Create a script to start the Flask app easily:

### **`start_app.sh`**
```bash
#!/bin/bash
source myenv/bin/activate
python app.py
```

Make the script executable:
```bash
chmod +x start_app.sh
./start_app.sh
```

---