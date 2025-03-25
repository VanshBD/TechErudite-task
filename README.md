# Tech Erudite Project

## Description
This project consists of a client-side application built with React and a server-side application built with Node.js and Express. The client interacts with the server to provide a seamless user experience.

## Installation Instructions

### Client
1. Navigate to the `client` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

### Server
1. Navigate to the `server` directory.
2. Create a `.env` file and configure your environment variables.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the server.

## Usage
- The client application can be accessed at `http://localhost:3000` (or the port specified in your Vite configuration).
- The server API can be accessed at `http://localhost:5000/api/auth`.

## Client Application Details
- **Framework**: React
- **Entry Point**: `client/src/main.jsx`
- **Dependencies**:
  - React, React Router, Redux, Axios, Material-UI
- **Scripts**:
  - `dev`: Runs the application in development mode.
  - `build`: Builds the application for production.
  - `lint`: Runs ESLint for code quality checks.

## Server Application Details
- **Framework**: Node.js with Express
- **Entry Point**: `server/index.js`
- **Dependencies**:
  - Express, Mongoose, CORS, dotenv
- **Routes**:
  - `GET /`: Returns a message indicating the API is running.
  - Authentication routes are available under `/api/auth`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the ISC License.
