#!/bin/bash

# Camp Sdei Chemed Itinerary - Static Deployment Script
# This script builds the project and creates a static version for easy deployment

echo "🚀 Camp Sdei Chemed Itinerary - Static Deployment"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "📁 Creating static directory..."
mkdir -p public-static

echo "📋 Copying static files..."
cp -r dist/* public-static/

if [ $? -ne 0 ]; then
    echo "❌ Failed to copy static files"
    exit 1
fi

echo "✅ Static deployment ready!"
echo ""
echo "📂 Static files are in: public-static/"
echo "🌐 You can now deploy this folder to any web server:"
echo "   - GitHub Pages"
echo "   - Netlify"
echo "   - Vercel"
echo "   - Apache/Nginx"
echo "   - Or simply open public-static/index.html in a browser"
echo ""
echo "🚀 To serve locally, run: npm run serve:static"
echo "📖 For more options, see README.md" 