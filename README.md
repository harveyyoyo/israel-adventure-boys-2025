# Israel Adventure Boys 2025 - Camp Sdei Chemed

## Project Overview

This is the official itinerary and schedule management system for Camp Sdei Chemed International's 2025 summer program "Off the Beaten Path".

## Features

- **Interactive Calendar View**: Browse activities by date with Google Calendar integration
- **Timeline View**: See the complete trip timeline with all activities
- **Activity Details**: View detailed information about each activity including locations, times, and descriptions
- **Search & Filter**: Find specific activities quickly with real-time search and type filtering
- **Export Options**: Export to calendar (.ics), CSV, or print-friendly format
- **Emoji System**: Comprehensive emoji mappings for all camp activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Static Version**: No-build deployment option available

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server (optional)
- **TypeScript** - Type-safe JavaScript
- **React** - Modern UI framework
- **shadcn-ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Google Calendar API** - Real-time schedule integration

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Option 1: Full React Development (with Vite)

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd israel-adventure-boys-2025

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080/`

### Option 2: Static Deployment (No Vite Required)

For simple deployment without build tools:

```sh
# Build static version
npm run build:static

# Serve static files locally
npm run serve:static
```

Or simply open `public-static/index.html` in any web browser!

## Deployment Options

### 1. GitHub Pages (Recommended)
This project is deployed on GitHub Pages. The live site is automatically updated when changes are pushed to the `gh-pages` branch.

### 2. Static Web Server
Deploy the `public-static/` folder to any web server:
- Apache
- Nginx
- Netlify
- Vercel
- Any static hosting service

### 3. Local File System
Simply open `public-static/index.html` in a web browser for offline viewing.

## New Usability Features

### Search & Filter
- **Real-time Search**: Type to instantly filter activities
- **Type Filtering**: Filter by activity type (spiritual, adventure, educational, etc.)
- **Results Counter**: See how many activities match your criteria
- **Clear Filters**: One-click reset for search and filters

### Export & Share
- **Calendar Export**: Download .ics file for Google Calendar, Outlook, etc.
- **CSV Export**: Export data for spreadsheet analysis
- **Print Version**: Clean, print-friendly layout
- **Share Link**: Copy URL to share with others

### Mobile Improvements
- **Touch-Friendly**: Larger buttons and better touch targets
- **Responsive Layout**: Optimized for all screen sizes
- **Offline Capable**: Static version works without internet
- **Fast Loading**: No build process required

## Project Structure

- `src/components/` - React components
- `src/pages/` - Main page components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `public/` - Static assets
- `public-static/` - Static HTML version (no build required)

## Contributing

This project is maintained by the Camp Sdei Chemed team. For questions or issues, please contact the development team.

## Troubleshooting

### Static Version Issues
- If the static version doesn't load, check that your browser supports ES6 modules
- For older browsers, use the React version instead

### Google Calendar Issues
- Ensure the Google Calendar API key is valid
- Check that the calendar ID is correct and publicly accessible
- Verify the date range is within the calendar's scope

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`
- Check Node.js version compatibility
