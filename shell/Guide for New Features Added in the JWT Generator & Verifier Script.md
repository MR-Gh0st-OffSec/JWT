### **Guide for New Features Added in the JWT Generator & Verifier Script**

Below is a detailed explanation of how to use and run each of the **20 new features** added to the JWT script.

---

### 1. **Clear Screen Option Before Token Generation**

- **Purpose**: Allows you to clear the terminal screen before generating the JWT token.
- **How to Use**: 
  - When prompted, type `Yes` or `No` to decide if you want to clear the screen before generating the token.
  
  **Example**:  
  ```
  Do you want to clear the screen before generating the token? (Yes/No):
  ```

---

### 2. **Support for RSA or EC Signature Algorithms (Currently Set Up for RSA)**

- **Purpose**: Allows you to choose between different cryptographic signature algorithms such as **RSA** (currently available) or **EC** (Elliptic Curve).
- **How to Use**: 
  - When prompted, you can choose either **RSA** or **HMAC** as the signature method. RSA is pre-configured, and the user can enter RSA-specific settings if needed.
  
  **Example**:  
  ```
  Choose signature method (HMAC or RSA):
  ```

---

### 3. **Expiration Time Modification After Token Generation**

- **Purpose**: Allows you to modify the token expiration time after it's generated.
- **How to Use**: 
  - After generating the token, you'll be prompted to modify the expiration time if desired.
  
  **Example**:  
  ```
  Do you want to modify the expiration time? (Yes/No):
  ```

---

### 4. **JWT Saving to File, Including Encryption Options**

- **Purpose**: Enables you to save the generated JWT token to a file and optionally encrypt the file for added security.
- **How to Use**: 
  - You’ll be asked if you want to save the JWT to a file. Then you can specify a filename. 
  - Optionally, you can choose to encrypt the file using AES-256-CBC encryption.
  
  **Example**:  
  ```
  Do you want to save the JWT to a file? (Yes/No):
  Enter filename to save the token (default: jwt_token.txt):
  Do you want to encrypt the saved file? (yes/no):
  ```

---

### 5. **Random Secret Generation Option**

- **Purpose**: Generates a random secret key for signing the JWT.
- **How to Use**: 
  - You can choose to use a random secret key by selecting the random secret generation option.
  
  **Example**:  
  ```
  Generated random secret key: <random_secret>
  ```

---

### 6. **Custom Header Claims (e.g., kid, jku)**

- **Purpose**: Allows you to add custom claims to the JWT header (e.g., `kid` or `jku`).
- **How to Use**: 
  - When prompted, enter a custom claim for the JWT header.
  
  **Example**:  
  ```
  Enter custom claim for header (e.g., 'kid', 'jku', etc.):
  ```

---

### 7. **Customizable JWT Type (e.g., JWT)**

- **Purpose**: Customizes the type of JWT, for example, setting the type to `JWT`.
- **How to Use**: 
  - You can customize the JWT type when generating the token.
  
  **Example**:  
  ```
  Enter custom JWT type (default: JWT):
  ```

---

### 8. **JWT Validation Log**

- **Purpose**: Logs validation activities, including the success or failure of token verification.
- **How to Use**: 
  - Logs are saved to a file named `jwt_validation.log`.
  
  **Example**:  
  ```
  JWT validation logs saved to jwt_validation.log.
  ```

---

### 9. **JWT Expiration Alert Feature with Custom Time**

- **Purpose**: Sends an alert for token expiration after a custom time.
- **How to Use**: 
  - When the token is about to expire, you can set an alert to notify you a certain number of minutes before expiration.
  
  **Example**:  
  ```
  Expiration alert is set for 30 minutes before expiration.
  ```

---

### 10. **JWT Expiration Check Based on Current Time**

- **Purpose**: Checks if the JWT has expired based on the current time.
- **How to Use**: 
  - The script checks if the token’s expiration time has passed, and it will notify you if the token has expired.
  
  **Example**:  
  ```
  Warning: The JWT has expired.
  ```

---

### 11. **Token Verification and Decoding Functionality**

- **Purpose**: Verifies if the JWT is valid and decodes the token for inspection.
- **How to Use**: 
  - After generating the token, you can choose to decode and verify it.
  
  **Example**:  
  ```
  Do you want to decode the JWT token? (Yes/No):
  Do you want to verify the JWT token? (Yes/No):
  ```

---

### 12. **Custom Payload Claims (e.g., role, email)**

- **Purpose**: Adds custom claims to the JWT payload (e.g., `role`, `email`).
- **How to Use**: 
  - You can input custom values for claims in the payload.
  
  **Example**:  
  ```
  Enter custom claim for payload (e.g., 'role', 'email'):
  ```

---

### 13. **Custom Signature Method Selection (HMAC or RSA)**

- **Purpose**: Selects the signature method used to sign the JWT, either **HMAC** or **RSA**.
- **How to Use**: 
  - You can choose the signature method when generating the token, defaulting to **HMAC** but also allowing RSA.
  
  **Example**:  
  ```
  Choose signature method (HMAC or RSA):
  ```

---

### 14. **JWT Validation Logs Saved in a Separate Log File**

- **Purpose**: Saves validation logs in a dedicated log file (`jwt_validation.log`).
- **How to Use**: 
  - Logs are automatically saved after each validation attempt.
  
  **Example**:  
  ```
  Activity logged in jwt_validation.log
  ```

---

### 15. **Expiration Notification Before Token Expiry**

- **Purpose**: Sends a notification before the token expires to remind you to refresh or regenerate it.
- **How to Use**: 
  - This feature notifies you when the expiration time is nearing, based on your settings.
  
  **Example**:  
  ```
  Expiration warning: JWT will expire in 30 minutes.
  ```

---

### 16. **Custom Claim for Header**

- **Purpose**: Adds a custom claim to the JWT header (such as `kid` or `jku`).
- **How to Use**: 
  - When prompted, add your custom claim for the header.
  
  **Example**:  
  ```
  Custom claim added to header: 'kid'
  ```

---

### 17. **Custom Claim for Payload**

- **Purpose**: Adds a custom claim to the JWT payload (such as `role` or `email`).
- **How to Use**: 
  - When prompted, input the custom claim you want to add to the payload.
  
  **Example**:  
  ```
  Custom claim added to payload: 'role'
  ```

---

### 18. **Dynamic JWT Generation from User Input**

- **Purpose**: Dynamically generates the JWT based on user input for payload and header fields.
- **How to Use**: 
  - Customize the header and payload fields by entering values when prompted.
  
  **Example**:  
  ```
  Enter custom subject (sub) [default: 1234567890]: JohnDoe123
  ```

---

### 19. **Validation of JWT Expiration**

- **Purpose**: Checks the expiration of the JWT before processing further.
- **How to Use**: 
  - When prompted, the script will validate if the JWT has expired or is still valid.
  
  **Example**:  
  ```
  JWT is valid.
  ```

---

### 20. **Enhanced Logging for All Activities**

- **Purpose**: Logs all activities performed, including token generation, verification, and validation in a log file (`jwt_activity.log`).
- **How to Use**: 
  - The script logs every major action to a log file for better tracking of actions.
  
  **Example**:  
  ```
  $(date) - Activity: JWT generation process started.
  ```

---

### **How to Run the Script**

1. **Prepare Environment**: Ensure you have the necessary dependencies: `jq`, `openssl`, `base64`.
2. **Make Script Executable**:  
   ```
   chmod +x jwt_script.sh
   ```
3. **Run the Script**:  
   ```
   ./jwt_script.sh
   ```
4. **Follow Prompts**: The script will guide you through the various options, and you can select features based on your needs.

This guide helps you leverage all the new features and enhances flexibility in JWT management using the script.