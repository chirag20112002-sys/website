@echo off
echo ===================================
echo    AirX Solution - Starting Servers
echo ===================================
echo.

echo [1/2] Starting Backend (Port 5000)...
start "AirX Backend" cmd /k "cd /d "%~dp0backend" && node src/server.js"

timeout /t 2 /nobreak > nul

echo [2/2] Starting Frontend (Port 3000)...
start "AirX Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ===================================
echo    Servers Starting...
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    Admin:    http://localhost:3000/admin
echo ===================================
echo.
echo Admin Login:
echo   Email:    admin@airxsolution.com
echo   Password: admin123
echo.
