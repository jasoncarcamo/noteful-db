# Noteful API

### `npm install`

Install the project's dependencies

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:(choice of PORT)](http://localhost:(choice of PORT)) to view it in the browser in development mode.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

# API url: `https://noteful-db.herokuapp.com`

## Summary
A full-stack app created for organizing my own notes by folders.

## /folders - Folders endpoint
- GET /folders - Returns all folders in database
- GET /folders/:folderId - Returns specific folder by id
- POST /folders - Creates a new folder
- DELETE /folders/:folderId - Deletes a specific folder by id

## /notes - Notes endpoint
- GET /notes - Returns all notess in database
- GET /notess/:noteId - Returns specific note by id
- POST /notes - Creates a new folder
- DELETE /notes/:noteId - Deletes a specific note by id

## Built with
- PostgreSQL
- Knex
- Helmet
- nodemon
- Cors
- RESTful principles
- TDD with mocha, Jest, and Enzyme
