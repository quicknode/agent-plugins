# Add Quicknode MCP to Windsurf

## Manual install (recommended for now)

Edit `~/.codeium/windsurf/mcp_config.json` and add:

```json
{
  "mcpServers": {
    "quicknode": {
      "serverUrl": "https://mcp.quicknode.com/mcp"
    }
  }
}
```

Note: Windsurf uses `serverUrl` (not `url`). Then **fully quit and reopen Windsurf**. Closing the window alone doesn't reload MCP servers.

On first connection, Windsurf performs OAuth 2.1 + Dynamic Client Registration against `https://mcp.quicknode.com/register` and prompts you to authorize in the browser. No pre-shared credentials needed.

## One-click install (coming soon)

<!-- BEGIN: generated-deeplink -->
[![Add Quicknode MCP to Windsurf](https://img.shields.io/badge/Add_to_Windsurf-black?style=for-the-badge&logo=windsurf)](windsurf://windsurf-mcp-registry?serverName=quicknode-mcp)

```
windsurf://windsurf-mcp-registry?serverName=quicknode-mcp
```

> Requires the Quicknode MCP server to be listed in Windsurf's MCP registry first. Until then, use the manual config below.
<!-- END: generated-deeplink -->

## What you get

Manage Quicknode blockchain infrastructure from your AI assistant: endpoints,
rate limits, security, metrics, logs, and billing. See the
[plugin README](../../plugins/build-web3/README.md) for how MCP fits into the
broader `build-web3` Claude Code plugin.

## Requirements

A Quicknode account is required for MCP provider-management actions. Sign up at
[quicknode.com](https://www.quicknode.com). MCP access must be enabled by your
Windsurf team admin.
