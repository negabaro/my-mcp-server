import express from "express";
import { createLogger } from "../utils/logger";

const router = express.Router();
const logger = createLogger();

// Core MCP metadata endpoint
router.get("/v1/metadata", (req, res) => {
  console.log("[MCP] /v1/metadata 호출됨");
  logger.info(`[MCP] /v1/metadata 호출됨`);
  res.json({
    name: "MCP Core",
    description: "Core MCP functionality",
    version: "1.0.0",
    commands: [
      // Add core MCP commands here
    ],
  });
});

// Core MCP execute endpoint
router.post("/v1/execute", async (req, res) => {
  console.log("[MCP] Executing command", req.body);
  logger.info(`[MCP] /v1/execute 호출됨`);
  try {
    const { command, parameters } = req.body;

    // Add core MCP command handling here
    res
      .status(400)
      .json({ success: false, error: "No core commands implemented yet" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
