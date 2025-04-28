import express from "express";
import { GitManager } from "../utils/git";
import { createLogger } from "../utils/logger";

const router = express.Router();
const logger = createLogger();

// Command mapping for natural language
type CommandKey =
  | "git status"
  | "git add"
  | "git commit"
  | "status"
  | "add"
  | "commit";
const commandMapping: Record<CommandKey, string> = {
  "git status": "git_status",
  "git add": "git_add",
  "git commit": "git_commit",
  status: "git_status",
  add: "git_add",
  commit: "git_commit",
};

// Git-specific metadata endpoint
router.get("/v1/metadata", (req, res) => {
  console.log("[Git MCP] /v1/metadata 호출됨");
  logger.info(`[Git MCP] /v1/metadata 호출됨`);
  res.json({
    name: "Git MCP",
    description: "Git operations through MCP",
    version: "1.0.0",
    commands: [
      {
        name: "git_add",
        description: "Add files to git",
        parameters: {
          files: {
            type: "array",
            description: "Files to add",
            required: true,
          },
        },
        aliases: ["add", "git add"],
      },
      {
        name: "git_commit",
        description: "Commit changes",
        parameters: {
          message: {
            type: "string",
            description: "Commit message",
            required: true,
          },
        },
        aliases: ["commit", "git commit"],
      },
      {
        name: "git_status",
        description: "Get git status",
        parameters: {},
        aliases: ["status", "git status"],
      },
    ],
  });
});

// Git-specific execute endpoint
router.post("/v1/execute", async (req, res) => {
  console.log("[Git MCP] Executing command", req.body);
  logger.info(`[Git MCP] /v1/execute 호출됨`);
  try {
    const { command, parameters, naturalCommand } = req.body;

    // If natural command is provided, try to map it
    const actualCommand = naturalCommand
      ? commandMapping[naturalCommand.toLowerCase() as CommandKey]
      : command;

    if (!actualCommand) {
      return res.status(400).json({
        success: false,
        error: "Unknown command",
        suggestions: Object.keys(commandMapping),
      });
    }

    switch (actualCommand) {
      case "git_add":
        const result = await GitManager.addFiles(parameters.files);
        res.json({ success: true, result });
        break;
      case "git_commit":
        const commitResult = await GitManager.commit(parameters.message);
        res.json({ success: true, result: commitResult });
        break;
      case "git_status":
        const status = await GitManager.getStatus();
        res.json({ success: true, result: status });
        break;
      default:
        res.status(400).json({ success: false, error: "Unknown command" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
