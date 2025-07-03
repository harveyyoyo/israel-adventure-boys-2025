@echo off
REM Camp Sdei Chemed Itinerary - Static Deployment Script (Windows)
REM This script builds the project and creates a static version for easy deployment

echo 🚀 Camp Sdei Chemed Itinerary - Static Deployment
echo ================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo 🔨 Building project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo 📁 Creating static directory...
if not exist "public-static" mkdir public-static

echo 📋 Copying static files...
xcopy /E /I /Y dist\* public-static\

if %errorlevel% neq 0 (
    echo ❌ Failed to copy static files
    pause
    exit /b 1
)

echo ✅ Static deployment ready!
echo.
echo 📂 Static files are in: public-static/
echo 🌐 You can now deploy this folder to any web server:
echo    - GitHub Pages
echo    - Netlify
echo    - Vercel
echo    - Apache/Nginx
echo    - Or simply open public-static/index.html in a browser
echo.
echo 🚀 To serve locally, run: npm run serve:static
echo 📖 For more options, see README.md
pause 