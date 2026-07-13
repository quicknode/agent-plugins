#!/usr/bin/env node
// Generates per-client install deeplinks from the plugin's mcp.json and
// rewrites them into docs/install/*.md between sentinel markers.
// Idempotent. Safe to re-run.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

// The plugin directory is "build-web3", but the MCP server identity (its key in
// .mcp.json, and the deeplink name used for OAuth/DCR) stays "quicknode".
const PLUGIN_DIR = "build-web3";
const SERVER_NAME = "quicknode";
const PLUGIN_DISPLAY = "Quicknode MCP";
const WINDSURF_REGISTRY_NAME = "quicknode-mcp";

const mcpJson = JSON.parse(
  readFileSync(resolve(repoRoot, `plugins/${PLUGIN_DIR}/.mcp.json`), "utf8")
);
const serverConfig = mcpJson.mcpServers[SERVER_NAME];
if (!serverConfig) {
  throw new Error(`No server named "${SERVER_NAME}" in plugins/${PLUGIN_DIR}/.mcp.json`);
}

// --- Cursor deeplink (encodes the full config in base64) ---
// Format: cursor://anysphere.cursor-deeplink/mcp/install?name=NAME&config=BASE64
const cursorConfigB64 = Buffer.from(JSON.stringify(serverConfig)).toString("base64");
const cursorDeeplink = `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(
  SERVER_NAME
)}&config=${cursorConfigB64}`;

// --- Windsurf deeplink (references a server by name in Windsurf's own registry) ---
// Format: windsurf://windsurf-mcp-registry?serverName=NAME
// NOTE: Only works after the server is listed in Windsurf's MCP registry.
const windsurfDeeplink = `windsurf://windsurf-mcp-registry?serverName=${encodeURIComponent(
  WINDSURF_REGISTRY_NAME
)}`;

// --- Rewrite docs between sentinel markers ---
const BEGIN = "<!-- BEGIN: generated-deeplink -->";
const END = "<!-- END: generated-deeplink -->";

function replaceBlock(filePath, replacement) {
  const text = readFileSync(filePath, "utf8");
  const beginIdx = text.indexOf(BEGIN);
  const endIdx = text.indexOf(END);
  if (beginIdx === -1 || endIdx === -1) {
    throw new Error(`Missing sentinel markers in ${filePath}`);
  }
  const before = text.slice(0, beginIdx + BEGIN.length);
  const after = text.slice(endIdx);
  const out = `${before}\n${replacement}\n${after}`;
  writeFileSync(filePath, out);
  console.log(`Updated ${filePath}`);
}

replaceBlock(
  resolve(repoRoot, "docs/install/cursor.md"),
  `[![Add ${PLUGIN_DISPLAY} to Cursor](https://img.shields.io/badge/Add_to_Cursor-black?style=for-the-badge&logo=cursor)](${cursorDeeplink})

\`\`\`
${cursorDeeplink}
\`\`\``
);

replaceBlock(
  resolve(repoRoot, "docs/install/windsurf.md"),
  `[![Add ${PLUGIN_DISPLAY} to Windsurf](https://img.shields.io/badge/Add_to_Windsurf-black?style=for-the-badge&logo=windsurf)](${windsurfDeeplink})

\`\`\`
${windsurfDeeplink}
\`\`\`

> Requires the Quicknode MCP server to be listed in Windsurf's MCP registry first. Until then, use the manual config below.`
);

console.log("\nDone.");
