#!/bin/bash

# Start the server in the background
node server.js &

# Wait for the server to start (adjusted for readiness)
sleep 10

# Keep the container running
wait