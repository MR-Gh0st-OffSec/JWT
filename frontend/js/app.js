const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

// File paths
const logFilePath = path.join(__dirname, "log.txt");
const tokenFilePath = path.join(__dirname, "token.txt");

// JWT secret
const JWT_SECRET = "your_secret_key"; // Replace with a secure key

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Users mock database
const users = {};

// Utility function to log messages
function logMessage(message) {
  const timestamp = new Date().toISOString();
  const log = `[INFO] [${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, log);
  console.log(log.trim());
}

// Utility function to log errors
function logError(error) {
  const timestamp = new Date().toISOString();
  const log = `[ERROR] [${timestamp}] ${error}\n`;
  fs.appendFileSync(logFilePath, log);
  console.error(log.trim());
}

// Save token to file
function saveTokenToFile(token) {
  fs.writeFileSync(tokenFilePath, token, "utf8");
  logMessage("Token saved to token.txt.");
}

// JWT utilities
const jwtServices = {
  generateToken: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }),
  verifyToken: (token) => jwt.verify(token, JWT_SECRET),
};

// Sign-up API
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logError("Sign-Up failed: Username or password is missing.");
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (users[username]) {
    logError(`Sign-Up failed: Username '${username}' already exists.`);
    return res.status(409).json({ message: "User already exists." });
  }

  users[username] = { username, password };
  logMessage(`User '${username}' signed up successfully.`);
  res.status(201).json({ message: "Sign-Up successful." });
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logError("Login failed: Username or password is missing.");
    return res.status(400).json({ message: "Username and password are required." });
  }

  const user = users[username];
  if (!user || user.password !== password) {
    logError(`Login failed: Invalid credentials for username '${username}'.`);
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwtServices.generateToken({ username });
  saveTokenToFile(token);

  logMessage(`User '${username}' logged in successfully.`);
  res.status(200).json({ message: "Login successful.", token });
});

// Serve HTML files (Simulating the forms and logs)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "debug-log.html"));
});

// Start server
app.listen(PORT, () => {
  logMessage(`Server running on http://127.0.0.1:${PORT}`);
});

// Simulate log generation
function simulateApiCall() {
  logMessage("Simulating an API call...");
  setTimeout(() => {
    logMessage("Simulated API call successful.");
    logError("Simulated API call encountered an error.");
  }, 3000);
}

simulateApiCall();

// Frontend scripts (browser-side integration)
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const login1Form = document.getElementById("login1-form");
  const login2Form = document.getElementById("login2-form");

  async function handleFormSubmission(formType, username, password) {
    try {
      const endpoint = formType === "signup" ? "/signup" : "/login";
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (formType === "signup") {
          window.location.href = "signup-success.html";
        } else {
          localStorage.setItem("jwt", data.token);
          window.location.href = "login-success.html";
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      logError(`Error in ${formType} form: ${error.message}`);
    }
  }

  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    handleFormSubmission("signup", username, password);
  });

  login1Form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    handleFormSubmission("login", username, password);
  });

  login2Form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    handleFormSubmission("login", username, password);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login1-form');

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('jwt', data.token);
        window.location.href = 'login-success.html';  // Redirect to success page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });
});
