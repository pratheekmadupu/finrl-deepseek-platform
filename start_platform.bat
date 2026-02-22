@echo off
echo Starting FINRL-DEEPSEEK Intelligence Platform...
echo [1/2] Launching Backend on Port 5001 (In-Memory Mode)
start cmd /k "cd backend && node index.js"
echo [2/2] Launching Frontend on Port 3000
start cmd /k "cd frontend && npm run dev"
echo Success! Please go to http://localhost:3000 in your browser.
echo Admin Login: admin@finrl.ai / admin123
pause
