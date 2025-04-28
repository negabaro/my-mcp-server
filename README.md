# MCP Server

A Master Control Program (MCP) server built with Node.js and TypeScript.

## Features

- Express.js server
- TypeScript support
- Winston logger
- Environment configuration
- ESLint and Prettier for code quality
- Jest for testing

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

## Verification

You can verify that the server is running correctly by checking the following:

1. The terminal should display:
```
Server is running on port 7777
```

2. When you access `http://localhost:7777` in your web browser, you should receive the following JSON response:
```json
{
  "message": "MCP Server is running"
}
```

If you can confirm both of these, your server is running successfully.


## Testing

Run tests:
```bash
make test
```

## Code Quality

Run linter:
```bash
make lint
```

Format code:
```bash
make format
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── index.ts        # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=7777
NODE_ENV=development
```

## License

MIT 