from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from datetime import timedelta
import json
import os
import logging

app = Flask(__name__)

# Secret key to encode the JWT token
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change this to a more secure value
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)  # Access token expiry set to 1 hour
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)  # Refresh token expiry set to 7 days

jwt = JWTManager(app)

# Dummy users data (this should be replaced with a real database)
users = {
    "user1": {"password": "password123", "sessions": []},  # Store user's password and their active sessions
    "user2": {"password": "password456", "sessions": []}
}

# In-memory store for JWT tokens (representing active sessions per user)
user_tokens = {}

# Set up logging for activities and logout actions
log_folder = os.path.join(os.getcwd(), 'logs')
if not os.path.exists(log_folder):
    os.makedirs(log_folder)

logging.basicConfig(filename=os.path.join(log_folder, 'activity.logs'), level=logging.INFO)


# Function to log activities
def log_activity(activity):
    logging.info(activity)


# Endpoint for user registration (Sign-up)
@app.route('/signup', methods=['POST'])
def signup():
    """User registration endpoint where new users can create an account."""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if username already exists
    if username in users:
        return jsonify({"message": "User already exists"}), 400

    # Register the new user with a password and an empty session list
    users[username] = {"password": password, "sessions": []}
    log_activity(f"User '{username}' registered successfully")
    return jsonify({"message": "User registered successfully"}), 201


# Endpoint for user login (Authentication)
@app.route('/login', methods=['POST'])
def login():
    """Login endpoint for users to authenticate and generate JWT tokens."""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Validate if user exists and the password matches
    if username not in users or users[username]["password"] != password:
        return jsonify({"message": "Invalid credentials"}), 401

    # Generate an access token (short-lived)
    access_token = create_access_token(identity=username)

    # Generate a refresh token (long-lived)
    refresh_token = create_refresh_token(identity=username)

    # Store the tokens in the user's session list and user_tokens
    if username not in user_tokens:
        user_tokens[username] = []
    user_tokens[username].append({"access_token": access_token, "refresh_token": refresh_token})

    # Add the access token to the user sessions in the user dictionary
    users[username]["sessions"].append({"access_token": access_token, "refresh_token": refresh_token})

    log_activity(f"User '{username}' logged in successfully. Tokens generated.")

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "refresh_token": refresh_token
    })


# Endpoint for logging out a specific session (token invalidation)
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout a specific session by invalidating a given token."""
    current_user = get_jwt_identity()
    data = request.json
    token_to_logout = data.get("token")

    if token_to_logout is None:
        log_activity(f"Failed logout attempt for user '{current_user}': No token provided.")
        return jsonify({"message": "No token provided for logout"}), 400

    # Find and remove the session from the user's sessions list and the global token store
    sessions = users[current_user]["sessions"]
    session_found = False
    for session in sessions:
        if session.get("access_token") == token_to_logout:
            sessions.remove(session)  # Remove the session
            user_tokens[current_user] = [session for session in user_tokens[current_user] if
                                         session["access_token"] != token_to_logout]  # Remove from global store
            session_found = True
            log_activity(f"User '{current_user}' logged out successfully. Token invalidated.")
            return jsonify({"message": "Logout successful"}), 200

    if not session_found:
        log_activity(f"Failed logout attempt for user '{current_user}': Session not found.")
        return jsonify({"message": "Session not found"}), 404


# Endpoint for accessing a protected resource (JWT required)
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """A protected route that requires a valid JWT token to access."""
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}. You have successfully accessed the protected route."})


# Endpoint to refresh an expired JWT token (longer session management)
@app.route('/refresh_token', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    """Refresh the JWT access token using a valid refresh token."""
    current_user = get_jwt_identity()

    # Generate a new access token
    new_access_token = create_access_token(identity=current_user)

    # Add the new access token to the user's sessions and global store
    for session in users[current_user]["sessions"]:
        if session["refresh_token"] in request.json.get("refresh_token"):
            session["access_token"] = new_access_token  # Update the access token in session

    user_tokens[current_user].append({"access_token": new_access_token, "refresh_token": session["refresh_token"]})

    log_activity(f"User '{current_user}' refreshed their token successfully.")

    return jsonify({"message": "Token refreshed", "new_access_token": new_access_token})


# Endpoint to retrieve active sessions (tokens) for a user
@app.route('/get_active_sessions', methods=['GET'])
@jwt_required()
def get_active_sessions():
    """Fetch all active sessions (JWT tokens) for the currently logged-in user."""
    current_user = get_jwt_identity()
    active_sessions = users.get(current_user, {}).get("sessions", [])

    # Only return session details (tokens) without the password
    session_info = [{"access_token": session["access_token"], "refresh_token": session["refresh_token"]} for session in
                    active_sessions]

    return jsonify({"active_sessions": session_info})


if __name__ == '__main__':
    app.run(debug=True)
