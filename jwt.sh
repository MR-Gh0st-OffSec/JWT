#!/bin/bash

# Dependencies: jq, openssl, base64
secret="your_secret_key"

# Create JWT header
header='{"alg":"HS256","typ":"JWT"}'
header_base64=$(echo -n "$header" | base64 | tr -d '=' | tr '/+' '_-' )

# Create JWT payload
payload='{"sub":"1234567890","name":"John Doe","iat":'"$(date +%s)"'}'
payload_base64=$(echo -n "$payload" | base64 | tr -d '=' | tr '/+' '_-' )

# Sign JWT
signature=$(echo -n "$header_base64.$payload_base64" | openssl dgst -sha256 -hmac "$secret" -binary | base64 | tr -d '=' | tr '/+' '_-' )

# Combine to form JWT
jwt="$header_base64.$payload_base64.$signature"
echo "Generated JWT: $jwt"

# Verify JWT
IFS='.' read -r header_base64 payload_base64 signature <<< "$jwt"
recreated_signature=$(echo -n "$header_base64.$payload_base64" | openssl dgst -sha256 -hmac "$secret" -binary | base64 | tr -d '=' | tr '/+' '_-' )

if [ "$signature" = "$recreated_signature" ]; then
    echo "JWT is valid."
else
    echo "Invalid JWT."
fi

