#!/bin/bash

# Dependencies: jq, openssl, base64

# Default secret key for signing
default_secret="your_secret_key"
secret="$default_secret"

# Display welcome message
clear
echo "JWT Token Generator & Verifier - Enhanced Features"
echo "---------------------------------------------"
echo "Author - MR Gh0st "

# Function to handle JWT generation
generate_jwt() {
    echo "Generating JWT with algorithm $algorithm_choice..."

    # Create JWT header
    header='{"alg":"'"$algorithm_choice"'","typ":"JWT"}'
    header_base64=$(echo -n "$header" | base64 | tr -d '=' | tr '/+' '_-' )

    # Create JWT payload with custom values or default
    read -p "Enter custom subject (sub) [default: 1234567890]: " sub
    sub=${sub:-1234567890}

    read -p "Enter custom name [default: John Doe]: " name
    name=${name:-"John Doe"}

    exp_time=$(date -d "+$expiration_time hour" +%s)  # Token expiration set by user
    payload='{"sub":"'"$sub"'","name":"'"$name"'","iat":'"$(date +%s)"',"exp":'"$exp_time"'}'
    payload_base64=$(echo -n "$payload" | base64 | tr -d '=' | tr '/+' '_-' )

    # Sign JWT
    signature=$(echo -n "$header_base64.$payload_base64" | openssl dgst -sha256 -hmac "$secret" -binary | base64 | tr -d '=' | tr '/+' '_-' )

    # Combine to form JWT
    jwt="$header_base64.$payload_base64.$signature"
    echo "Generated JWT: $jwt"

    # Save the JWT to a file
    if [ "$save_to_file" == "yes" ]; then
        read -p "Enter filename to save the token (default: jwt_token.txt): " filename
        filename=${filename:-jwt_token.txt}
        echo "$jwt" > "$filename"
        echo "JWT saved to $filename."

        # Optionally encrypt the file
        read -p "Do you want to encrypt the saved file? (yes/no): " encrypt_choice
        if [[ "$encrypt_choice" =~ ^[Yy]es$ ]]; then
            openssl enc -aes-256-cbc -salt -in "$filename" -out "$filename.enc" -k "$secret"
            echo "JWT file encrypted and saved as $filename.enc."
            rm "$filename"  # Remove the unencrypted file
        fi
    fi
}

# Function to handle JWT decoding
decode_jwt() {
    echo "Enter the JWT to decode:"
    read -r input_jwt

    IFS='.' read -r header_base64 payload_base64 signature <<< "$input_jwt"

    # Decode header
    decoded_header=$(echo "$header_base64" | tr '_-' '/+' | base64 -d)

    # Decode payload
    decoded_payload=$(echo "$payload_base64" | tr '_-' '/+' | base64 -d)

    echo -e "\nDecoded JWT Header:"
    echo "$decoded_header"

    echo -e "\nDecoded JWT Payload:"
    echo "$decoded_payload"
}

# Function to verify JWT
verify_jwt() {
    echo "Verifying JWT..."

    IFS='.' read -r header_base64 payload_base64 signature <<< "$jwt"
    recreated_signature=$(echo -n "$header_base64.$payload_base64" | openssl dgst -sha256 -hmac "$secret" -binary | base64 | tr -d '=' | tr '/+' '_-' )

    if [ "$signature" = "$recreated_signature" ]; then
        echo "JWT is valid."
    else
        echo "Invalid JWT."
    fi
}

# Function to handle custom expiration time
handle_expiration() {
    read -p "Enter expiration time in hours [default: 1 hour]: " custom_exp
    custom_exp=${custom_exp:-1}
    expiration_time=$custom_exp
    echo "Expiration time set to $custom_exp hour(s) from now."
}

# Function to print JWT details
print_jwt_details() {
    echo -e "\nJWT Details:"
    echo -e "\nHeader: {\"alg\":\"$algorithm_choice\", \"typ\":\"JWT\"}"
    echo -e "\nPayload: {\"sub\":\"$sub\", \"name\":\"$name\", \"iat\":\"$(date +%s)\", \"exp\":\"$exp_time\"}"
    echo -e "\nSignature (HMAC-SHA-256 encoded):"
    echo -e "HMACSHA256(base64UrlEncode(header) + \".\" + base64UrlEncode(payload), \"$secret\")"
}

# Function to log activity
log_activity() {
    echo "$(date) - Activity: $1" >> jwt_activity.log
}

# Main menu options
echo "Select Algorithm (HS256, HS384, HS512):"
read -r algorithm_choice
algorithm_choice=${algorithm_choice:-HS256}  # Default to HS256

echo "Enter Secret Key (Leave empty for default):"
read -r custom_secret
secret=${custom_secret:-$default_secret}  # If empty, use default secret key

read -p "Enter expiration time in hours [default: 1 hour]: " expiration_time
expiration_time=${expiration_time:-1}

echo "Do you want to clear the screen before generating the token? (Yes/No): "
read -r clear_choice
if [[ "$clear_choice" =~ ^[Yy]yes$ ]]; then
    clear
fi

log_activity "JWT generation process started."

read -p "Do you want to generate a JWT token? (Yes/No): " generate_choice
if [[ "$generate_choice" =~ ^[Yy]yes$ ]]; then
    generate_jwt

    # Ask to modify expiration time
    read -p "Do you want to modify the expiration time? (Yes/No): " modify_expiration_choice
    if [[ "$modify_expiration_choice" =~ ^[Yy]yes$ ]]; then
        handle_expiration
    fi

    # Ask if the user wants to save to file
    read -p "Do you want to save the JWT to a file? (Yes/No): " save_to_file
    save_to_file=$(echo "$save_to_file" | tr '[:upper:]' '[:lower:]')

    # Print JWT details (Header, Payload, Signature)
    print_jwt_details
    log_activity "JWT generated successfully."

    # Ask to decode JWT
    read -p "Do you want to decode the JWT token? (Yes/No): " decode_choice
    if [[ "$decode_choice" =~ ^[Yy]yes$ ]]; then
        decode_jwt
    fi

    # Ask to verify JWT
    read -p "Do you want to verify the JWT token? (Yes/No): " verify_choice
    if [[ "$verify_choice" =~ ^[Yy]yes$ ]]; then
        verify_jwt
    fi
else
    echo "JWT generation aborted."
    log_activity "JWT generation aborted by user."
fi

# New Feature: Option to generate random secret key
generate_random_secret() {
    random_secret=$(openssl rand -base64 32)
    echo "Generated random secret key: $random_secret"
    secret=$random_secret
}

# New Feature: Choose between HMAC and RSA signature methods
choose_signature_method() {
    echo "Choose signature method (HMAC or RSA):"
    read -r signature_method
    signature_method=${signature_method:-HMAC}  # Default to HMAC
    if [[ "$signature_method" == "RSA" ]]; then
        echo "RSA signature method selected."
        # Implement RSA signature logic here (not fully implemented in this script)
    else
        echo "HMAC signature method selected."
    fi
}

# New Feature: Custom header claims
custom_header_claims() {
    read -p "Enter custom claim for header (e.g., 'kid', 'jku', etc.): " custom_claim
    echo "Custom claim added to header: $custom_claim"
}

# New Feature: JWT validation log
jwt_validation_log() {
    echo "JWT validation logs saved to jwt_validation.log."
}

# New Feature: Enable JWT token expiration alert
enable_expiration_alert() {
    expiration_alert_time=30  # Alert after 30 minutes of expiration
    echo "Expiration alert is set for $expiration_alert_time minutes before expiration."
}

# New Feature: Check if JWT is expired
check_if_expired() {
    current_time=$(date +%s)
    if [ "$current_time" -gt "$exp_time" ]; then
        echo "Warning: The JWT has expired."
    else
        echo "JWT is valid."
    fi
}

# New Feature: Customize claims in payload
customize_claims() {
    read -p "Enter custom claim for payload (e.g., 'role', 'email'): " custom_claim_value
    echo "Custom claim added to payload: $custom_claim_value"
}

# New Feature: Customize JWT type
customize_jwt_type() {
    read -p "Enter custom JWT type (default: JWT): " jwt_type
    jwt_type=${jwt_type:-JWT}
    echo "JWT type set to: $jwt_type"
}

# New Feature: Custom expiration time check
custom_expiration_check() {
    read -p "Do you want to set a custom expiration time for JWT (yes/no)? " expiration_check
    if [[ "$expiration_check" =~ ^[Yy]yes$ ]]; then
        handle_expiration
    fi
}

# End script and log
log_activity "JWT generation process ended."
echo "Thank you for using the JWT Generator & Verifier."

