// debugLog.js

// A list to store log entries
let logEntries = [];

// Function to get the current date and time in a readable format
function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString(); // Example: "11/25/2024, 3:45:30 PM"
}

// Function to create a log entry
function createLogEntry(level, message) {
  const timestamp = getCurrentTimestamp();
  const logEntry = { timestamp, level, message };
  logEntries.push(logEntry);

  // Display logs dynamically in real time
  displayLogs();
}

// Function to display logs in the table
function displayLogs() {
  const logTableBody = document.querySelector("#log-table tbody");
  const filterLevel = document.getElementById("filter-level").value.toLowerCase();
  const searchKeyword = document.getElementById("search-keyword").value.toLowerCase();

  // Clear current table rows
  logTableBody.innerHTML = "";

  // Filter and search logs before displaying
  logEntries
    .filter((entry) =>
      (filterLevel === "all" || entry.level.toLowerCase() === filterLevel) &&
      (searchKeyword === "" || entry.message.toLowerCase().includes(searchKeyword))
    )
    .forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.timestamp}</td>
        <td>${entry.level}</td>
        <td>${entry.message}</td>
      `;
      logTableBody.appendChild(row);
    });
}

// Function to log an error message
function logError(message) {
  createLogEntry("Error", message);
}

// Function to log a warning message
function logWarning(message) {
  createLogEntry("Warning", message);
}

// Function to log a general message
function logMessage(message) {
  createLogEntry("Info", message);
}

// Function to clear all logs
function clearLogs() {
  logEntries = [];
  displayLogs();
}

// Function to simulate real-time log updates (optional for testing)
function simulateRealTimeLogs() {
  setInterval(() => {
    const logTypes = ["Info", "Warning", "Error"];
    const randomLogType = logTypes[Math.floor(Math.random() * logTypes.length)];
    const randomMessage = `Simulated ${randomLogType} log at ${getCurrentTimestamp()}`;
    createLogEntry(randomLogType, randomMessage);
  }, 5000); // Add a new log every 5 seconds
}

// Add event listeners for filters and search
document.getElementById("filter-level")?.addEventListener("change", displayLogs);
document.getElementById("search-keyword")?.addEventListener("input", displayLogs);

// Start simulating logs (optional, remove if not needed)
simulateRealTimeLogs();

// Example logs to simulate activity
logMessage("Page loaded successfully");
logWarning("API response time is high");
logError("Failed to authenticate user");


const logTableBody = document.querySelector('#log-table tbody');
const detailTimestamp = document.getElementById('detail-timestamp');
const detailLevel = document.getElementById('detail-level');
const detailMessage = document.getElementById('detail-message');

// Mock log data
const logs = [
  { timestamp: '2024-11-25 14:32:10', level: 'info', message: 'System started successfully.' },
  { timestamp: '2024-11-25 14:35:00', level: 'warning', message: 'High memory usage detected.' },
  { timestamp: '2024-11-25 14:37:45', level: 'error', message: 'Unable to connect to the database.' },
];

// Function to render logs
function renderLogs(logs) {
  logTableBody.innerHTML = '';
  logs.forEach((log, index) => {
    const row = document.createElement('tr');
    row.classList.add(`log-${log.level}`); // Apply color based on log level
    row.setAttribute('data-index', index); // Store log index for detail view
    row.innerHTML = `
      <td>${log.timestamp}</td>
      <td>${log.level.toUpperCase()}</td>
      <td>${log.message}</td>
    `;
    row.addEventListener('click', () => showLogDetails(index)); // Add click event to row
    logTableBody.appendChild(row);
  });
}

// Function to show log details
function showLogDetails(index) {
  const log = logs[index];
  detailTimestamp.textContent = log.timestamp;
  detailLevel.textContent = log.level.toUpperCase();
  detailMessage.textContent = log.message;
}

// Clear logs
function clearLogs() {
  logTableBody.innerHTML = '';
}

// Initial render
renderLogs(logs);
