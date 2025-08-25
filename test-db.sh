#!/bin/bash

echo "Testing database connection..."
echo "Waiting for server to be ready..."
sleep 3

echo "Making request to test endpoint..."
response=$(curl -s -w "%{http_code}" -o response.json http://localhost:3001/api/test-db)

echo "HTTP Status Code: $response"

if [ -f response.json ]; then
    echo "Response body:"
    cat response.json | python3 -m json.tool 2>/dev/null || cat response.json
    rm response.json
fi
