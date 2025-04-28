import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const execAsync = promisify(exec);

export class TestGitRepo {
  private repoPath: string;

  constructor() {
    this.repoPath = path.join(os.tmpdir(), `test-git-repo-${Date.now()}`);
  }

  async setup(): Promise<void> {
    // Create temporary directory
    await fs.promises.mkdir(this.repoPath, { recursive: true });

    // Initialize git repository
    await execAsync("git init", { cwd: this.repoPath });
    await execAsync('git config user.email "test@example.com"', {
      cwd: this.repoPath,
    });
    await execAsync('git config user.name "Test User"', { cwd: this.repoPath });
  }

  async createTestFile(filename: string, content: string): Promise<void> {
    const filePath = path.join(this.repoPath, filename);
    await fs.promises.writeFile(filePath, content);
  }

  getRepoPath(): string {
    return this.repoPath;
  }

  async cleanup(): Promise<void> {
    await fs.promises.rm(this.repoPath, { recursive: true, force: true });
  }
}
