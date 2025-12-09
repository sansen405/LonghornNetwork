# Longhorn Network React Frontend - Setup Instructions

**IMPORTANT: These instructions are for macOS only.**

## System Requirements

**Tested and Verified On:**
- Operating System: macOS Ventura 13.x or later
- Node.js: Version 18.x or 20.x (LTS recommended)
- npm: Version 9.x or 10.x (comes with Node.js)
- RAM: Minimum 4GB
- Disk Space: At least 500MB free

## Prerequisites

Before starting, ensure you have Node.js and npm installed on your system.

### Why Node.js is Required for a React Application

While React code runs in the web browser, Node.js is essential for development:

**Node.js provides:**
1. **npm (Node Package Manager)** - Installs and manages all React libraries and dependencies
2. **Development Server** - Runs the application locally during development (npm start)
3. **Build Tools** - Compiles and optimizes React code for production (npm run build)
4. **Code Transformation** - Converts modern JavaScript/React syntax into browser-compatible code

**Important Note:** The final built application is pure HTML, CSS, and JavaScript that runs entirely in the browser. Node.js is only needed during development and building, not for running the final application.

### Installing Node.js and npm on macOS

1. Visit https://nodejs.org/
2. Download the macOS Installer (.pkg) for the LTS version
3. Run the installer and follow the prompts (use default settings)
4. Open Terminal (Applications > Utilities > Terminal) and verify installation:
   ```
   node --version
   npm --version
   ```
   You should see version numbers displayed (e.g., v18.17.0 and 9.6.7)


## Project Structure

```
LonghornNetwork/
├── frontend/                    # React application directory
│   ├── public/
│   │   ├── data/               # Test case JSON files
│   │   │   ├── testCase1.json
│   │   │   ├── testCase2.json
│   │   │   └── ... (7 total test cases)
│   │   └── index.html          # Main HTML file
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── FriendRequestsView.js
│   │   │   ├── GraphVisualization.js
│   │   │   ├── MessagesView.js
│   │   │   ├── PodsView.js
│   │   │   ├── ReferralPathFinder.js
│   │   │   ├── RoommatesView.js
│   │   │   └── StudentDetails.js
│   │   ├── utils/
│   │   │   └── dataLoader.js   # Data processing utilities
│   │   ├── App.js              # Main application component
│   │   ├── App.css             # Main application styles
│   │   ├── index.js            # Application entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Project dependencies
│   └── package-lock.json       # Locked dependency versions
└── README.md                   # Main project README
```

## Step-by-Step Installation

### Step 1: Extract the Project

1. Locate the LonghornNetwork.zip file
2. Extract it to a location of your choice (e.g., Desktop or Documents folder)
3. Note the full path to the extracted folder

### Step 2: Navigate to the Frontend Directory

Open Terminal and navigate to the frontend folder:

```bash
cd /path/to/LonghornNetwork/frontend
```

Replace `/path/to/LonghornNetwork` with the actual path where you extracted the project.

Example:
```bash
cd ~/Desktop/LonghornNetwork/frontend
```

### Step 3: Install Dependencies

Run the following command in the frontend directory:

```bash
npm install
```

This command will:
- Read the package.json file
- Download all required dependencies
- Install them in a node_modules folder
- Create or update package-lock.json

**Expected Duration:** 1-3 minutes depending on internet speed

**What You Should See:**
- Progress indicators showing packages being downloaded
- A final summary showing the number of packages installed
- No error messages (warnings are acceptable)

### Step 4: Start the Development Server

After installation completes successfully, run:

```bash
npm start
```

**What Happens:**
- The development server starts on port 3000
- Your default web browser will automatically open
- The application loads at http://localhost:3000

**Expected Duration:** 10-30 seconds for the server to start

**What You Should See in Terminal:**
```
Compiled successfully!

You can now view longhorn-network-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**If Port 3000 is Already in Use:**
The terminal will ask: "Would you like to run the app on another port instead?"
- Type `y` and press Enter
- The app will start on port 3001 instead

## Dependencies Explained

The application uses the following key dependencies:

### Core Libraries

**react (v18.2.0)**
- The main React library for building the user interface
- Provides component-based architecture
- Handles state management and UI updates

**react-dom (v18.2.0)**
- Renders React components to the browser DOM
- Required for all React web applications

**react-scripts (v5.0.1)**
- Development tooling from Create React App
- Includes webpack, Babel, ESLint configurations
- Provides npm start, npm build, npm test commands

### Visualization Library

**vis-network (v9.1.9)**
- Network graph visualization library
- Renders the student connection graph
- Handles node positioning and edge rendering
- Provides interactive graph capabilities

### Font Library

**Google Fonts (Inter)**
- Modern, clean typeface loaded from Google Fonts CDN
- Provides professional typography throughout the application

## Running the Application

### First-Time Startup

1. Open your web browser to http://localhost:3000 (or the port shown in your terminal)
2. You should see the Longhorn Network interface with a purple gradient header
3. The default view shows "Test Case 1 (from Main)" loaded

### Application Features

**Navigation Tabs:**
- Graph: Visual network of student connections
- Roommates: Gale-Shapley algorithm results
- Pods: Prim's MST algorithm groupings
- Referral Path: Dijkstra's algorithm path finding
- Messages: Chat history between students
- Friend Requests: Request history and status

**Test Cases:**
Use the dropdown at the top to switch between 7 different test cases:
- Test Case 1-3: Original test cases from Main.java
- Test Case 4-7: Additional test cases with extended data

**Sidebar:**
Select students to view their detailed profiles, including:
- Basic information
- GPA and major
- Internship history
- Roommate preferences
- Friend requests

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Node.js is not installed. Follow the Prerequisites section above.

### Issue: Port 3000 is already in use
**Solution:** 
- Option 1: Stop the other application using port 3000
- Option 2: When prompted, type 'y' to use a different port

### Issue: Module not found errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Application won't compile
**Solution:**
1. Make sure you're in the correct directory (frontend/)
2. Check Node.js version with `node --version` (should be 18.x or 20.x)
3. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Issue: Blank page or errors in browser console
**Solution:**
1. Clear browser cache (Cmd+Shift+Delete)
2. Hard refresh the page (Cmd+Shift+R)
3. Check the terminal for error messages
4. Stop the server (Cmd+C) and restart with `npm start`

### Issue: Changes not appearing
**Solution:**
- The application auto-reloads on file changes
- If changes don't appear, hard refresh your browser
- Check that the development server is still running

## Stopping the Application

To stop the development server:
1. Go to the Terminal window where the server is running
2. Press `Cmd + C`
3. Wait for the process to terminate

## Quick Start Summary

**For someone who already has Node.js installed:**

```bash
cd LonghornNetwork/frontend
npm install
npm start
```


## FOLLOW-UP QUESTIONS

### 1. Did you use AI to code the UI? If so, what were the sources that the AI used, what was the AI good at and what was it not so good at? What did you do to fill in the gaps.

Yes, I used AI assistance the UI implementation. The AI used several sources including the React official documentation (react.dev) and vis-network library documentation for graph visualization. The AI was good at building out the overall structure and implementing common react patterns. The AI was not good at understanding specific visual design preferences without clear direction. For the graph, I had to fill in the gaps by manually fixing much of the formatting. I also had to make minor tweaks to the formatting here and there but the overall structure generated by the model was pretty solid.

### 2. If you did not use AI, what sources did you use to learn React, and what were the hardest things to learn?

N/A - AI assistance was used as described above

### 3. We are planning to cover React next semester for this class, in what unit do you think this would be appropriate to teach?

I think that React should be taught right after SwingUI because I think the transition between multiple UI tools should be the smoothest. Another option could be during the OOP section in the beginnning because the idea of reusable components is pretty similar to the concepts of creating multiple instances of objects. However, it may be a little early to teach React in the first couple weeks of the semester so this might not be the best option.