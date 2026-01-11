# Render.com Deployment Guide

## Deploy Backend to Render (Free)

1. Go to https://render.com and sign up/login with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `MpMadhukumar/invitiq-compilier`
4. Configure:
   - **Name**: invitiq-compiler-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn api_server:app`
   - **Plan**: Free
5. Add Environment Variable:
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyD5GrkrH6Owl9RpoV7FNolTGbzhhS-yQ2E`
6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Copy the URL (example: `https://invitiq-compiler-backend.onrender.com`)

## Update Frontend

After getting the Render URL, update script.js:
- Replace `http://localhost:5000` with your Render URL
- Push changes to GitHub

Your app will then work on mobile from anywhere!
