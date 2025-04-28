import express from "express";
import dotenv from "dotenv";
import { createLogger } from "./utils/logger";
import gitRouter from "./routes/git";
import mcpRouter from "./routes/mcp";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 7777;
const logger = createLogger();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/git", gitRouter);
app.use("/mcp", mcpRouter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "MCP Server is running" });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
