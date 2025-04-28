import express from "express";
import dotenv from "dotenv";
import { createLogger } from "./utils/logger";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const logger = createLogger();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "MCP Server is running" });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
