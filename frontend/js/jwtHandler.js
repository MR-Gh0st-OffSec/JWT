// jwtHandler.js
class JwtServices {
  constructor() {
    this.apiBaseUrl = 'http://127.0.0.1:5000'; // Backend API base URL
    this.tokenFile = 'token.txt';  // Simulate saving token to a file (using localStorage in this example)
  }

  // Handle SignUp
  async signUp(username, password) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User signed up successfully', data);
        return true;
      } else {
        console.error('Error during sign up:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  }

  // Handle Login
  async login(username, password) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        this.saveToken(data.token);
        console.log('Login successful');
        return true;
      } else {
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  }

  // Save the JWT token (simulated as saving to a "file" using localStorage)
  saveToken(token) {
    try {
      localStorage.setItem(this.tokenFile, token);  // Simulating file save with localStorage
      console.log('Token saved to file:', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  // Retrieve JWT token from "file" (localStorage)
  getToken() {
    try {
      const token = localStorage.getItem(this.tokenFile);
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  // Auto login if token exists
  autoLogin() {
    const token = this.getToken();
    if (token) {
      console.log('Auto-login successful!');
      // Here you can implement fetching protected data, redirecting, or showing protected content
      return true;
    } else {
      console.log('No token found for auto-login.');
      return false;
    }
  }
}

// Instantiate and use JwtServices class
const jwtServices = new JwtServices();

// Signup form handler
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');
  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const signupSuccess = await jwtServices.signUp(username, password);
    if (signupSuccess) {
      alert('User successfully signed up!');
    } else {
      alert('Error signing up!');
    }
  });

  // Auto-login logic
  jwtServices.autoLogin();
});

// Login form handler (for both login1.html and login2.html)
document.addEventListener('DOMContentLoaded', () => {
  const loginForms = ['login1-form', 'login2-form'];
  loginForms.forEach(formId => {
    const loginForm = document.getElementById(formId);
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const loginSuccess = await jwtServices.login(username, password);
      if (loginSuccess) {
        alert('Login successful!');
      } else {
        alert('Login failed!');
      }
    });
  });
});
