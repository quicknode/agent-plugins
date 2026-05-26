# Add QuickNode Remote MCP to Windsurf

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

Note: Windsurf uses `serverUrl` (not `url`). Then **fully quit and reopen Windsurf** — closing the window alone doesn't reload MCP servers.

On first connection, Windsurf performs OAuth 2.1 + Dynamic Client Registration against `https://mcp.quicknode.com/register` and prompts you to authorize in the browser. No pre-shared credentials needed.

## One-click install (coming soon)

<!-- BEGIN: generated-deeplink -->
[![Add QuickNode Remote MCP to Windsurf](https://img.shields.io/badge/Add_to_Windsurf-black?style=for-the-badge&logo=windsurf)](windsurf://windsurf-mcp-registry?serverName=quicknode-remote-mcp)

```
windsurf://windsurf-mcp-registry?serverName=quicknode-remote-mcp
```

> Requires the QuickNode MCP server to be listed in Windsurf's MCP registry first. Until then, use the manual config below.
<!-- END: generated-deeplink -->

## What you get

Tools for managing QuickNode endpoints, rate limits, security rules, metrics, billing, RPC usage, and supported chains. See the [plugin README](../../plugins/remote-mcp/README.md) for the full tool list.

## Requirements

A QuickNode account — sign up at [quicknode.com](https://www.quicknode.com). MCP access must be enabled by your Windsurf team admin.
