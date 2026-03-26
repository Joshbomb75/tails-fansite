#!/bin/bash

# Quick server startup script for Tails Fansite

echo "🦊 Starting Tails Fansite Server..."
echo ""
echo "Local access:   http://localhost:8000"
echo "Mobile access:  http://$(ipconfig getifaddr en0):8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8000
