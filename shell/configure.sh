#!/bin/bash
# =====================================
# Script: JWT Configurations for Ubuntu OS
# Author: MR Gh0st
# =====================================

echo "Starting JWT Configuration for Ubuntu OS"
echo "Author - MR Gh0st"
echo "----------------------------------------"

# Update and upgrade the system
echo "Updating and upgrading the system..."
sudo apt update && sudo apt upgrade -y

# Install necessary tools
echo "Installing essential tools..."
sudo apt install -y curl wget git build-essential

# Install Python and pip (if needed for JWT libraries)
echo "Installing Python and pip..."
sudo apt install -y python3 python3-pip

# Install Node.js and npm (if needed for JWT in Node.js)
echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

# Install JWT library for Python
echo "Installing PyJWT for Python..."
pip3 install PyJWT

# Install JWT library for Node.js
echo "Installing jsonwebtoken for Node.js..."
npm install jsonwebtoken

# Setup a directory for JWT usage
echo "Setting up a directory for JWT..."
mkdir -p ~/jwt_project && cd ~/jwt_project

# Example JWT token generation script
echo "Creating a sample JWT Python script..."
cat <<EOL > generate_jwt.py
import jwt
import datetime

# Replace with your secret key
SECRET_KEY = "your-secret-key"

def generate_token():
    payload = {
        "user_id": 1,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    print("Generated JWT Token:", token)

if __name__ == "__main__":
    generate_token()
EOL

# Display completion message
echo "JWT Configuration complete! You can start using the sample Python script 'generate_jwt.py' in the '~/jwt_project' directory."

# End script
exit 0
