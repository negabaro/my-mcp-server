import express from "express";
import { GitManager } from "../utils/git";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { files } = req.body;
    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: "Files array is required" });
    }

    const result = await GitManager.addFiles(files);
    res.json({ message: "Files added successfully", result });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Unknown error occurred" });
  }
});

router.post("/commit", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Commit message is required" });
    }

    const result = await GitManager.commit(message);
    res.json({ message: "Commit successful", result });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Unknown error occurred" });
  }
});

router.get("/status", async (req, res) => {
  try {
    const status = await GitManager.getStatus();
    res.json({ status });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Unknown error occurred" });
  }
});

export default router;
