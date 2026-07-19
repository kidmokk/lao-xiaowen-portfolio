import { access, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = join(projectRoot, "dist", "client");
const vinextEntry = fileURLToPath(import.meta.resolve("vinext"));
const vinextCli = join(dirname(vinextEntry), "cli.js");

await rm(join(projectRoot, "dist"), { recursive: true, force: true });

const child = spawn(process.execPath, [vinextCli, "build"], {
  cwd: projectRoot,
  env: process.env,
  stdio: "inherit",
});

const exitCode = await new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", resolve);
});

const requiredOutput = [
  "index.html",
  "ui-app.html",
  "poster-ip.html",
  "aigc-comic.html",
  "f3fb743e18bdf117520d59380de634d8.txt",
];

let outputComplete = true;
for (const file of requiredOutput) {
  try {
    await access(join(outputRoot, file));
  } catch {
    outputComplete = false;
    break;
  }
}

if (exitCode === 0 && outputComplete) {
  process.exitCode = 0;
} else if (process.platform === "win32" && outputComplete) {
  // vinext 0.0.50 can finish static export successfully and then hit a known
  // libuv shutdown assertion on Windows. Fresh output is verified above.
  console.warn("Static export completed; ignoring vinext's Windows shutdown assertion.");
  process.exitCode = 0;
} else {
  console.error("Cloudflare Pages output is incomplete.");
  process.exitCode = typeof exitCode === "number" ? exitCode : 1;
}
