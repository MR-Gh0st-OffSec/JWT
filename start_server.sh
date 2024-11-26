#!/bin/bash
echo "JWT Server Start On Local"
echo "-------------------------"
echo "Author - MR Gh0st"
echo "##################"

python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
python backend/app.py
