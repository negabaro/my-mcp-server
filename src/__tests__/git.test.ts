import { GitManager } from "../utils/git";
import { TestGitRepo } from "../utils/test-utils";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

describe("Git Operations", () => {
  let testRepo: TestGitRepo;
  const originalCwd = process.cwd();

  beforeAll(async () => {
    testRepo = new TestGitRepo();
    await testRepo.setup();
    process.chdir(testRepo.getRepoPath());
  });

  afterAll(async () => {
    process.chdir(originalCwd);
    await testRepo.cleanup();
  });

  beforeEach(async () => {
    // Create a test file
    await testRepo.createTestFile("test.txt", "Hello, World!");
  });

  it("should add files to git", async () => {
    const files = ["test.txt"];
    const result = await GitManager.addFiles(files);

    // Verify the file is staged
    const { stdout } = await execAsync("git status --porcelain");
    expect(stdout.trim()).toContain("A  test.txt");
  });

  it("should commit changes", async () => {
    // First add the file
    await GitManager.addFiles(["test.txt"]);

    // Then commit
    const message = "Test commit";
    const result = await GitManager.commit(message);

    // Verify the commit
    const { stdout } = await execAsync("git log -1 --pretty=%B");
    expect(stdout.trim()).toBe(message);
  });

  it("should get git status", async () => {
    // Get status using GitManager
    const status = await GitManager.getStatus();

    // The status should show the untracked file
    expect(status.trim()).toContain("?? test.txt");
  });
});
