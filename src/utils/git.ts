import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class GitManager {
  static async addFiles(files: string[]): Promise<string> {
    try {
      const { stdout } = await execAsync(`git add ${files.join(" ")}`);
      return stdout;
    } catch (error: any) {
      throw new Error(
        `Failed to add files: ${error?.message || "Unknown error"}`
      );
    }
  }

  static async commit(message: string): Promise<string> {
    try {
      const { stdout } = await execAsync(`git commit -m "${message}"`);
      return stdout;
    } catch (error: any) {
      throw new Error(`Failed to commit: ${error?.message || "Unknown error"}`);
    }
  }

  static async getStatus(): Promise<string> {
    try {
      const { stdout } = await execAsync("git status --porcelain");
      return stdout;
    } catch (error: any) {
      throw new Error(
        `Failed to get status: ${error?.message || "Unknown error"}`
      );
    }
  }
}
