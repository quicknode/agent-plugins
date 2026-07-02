# Add Quicknode MCP to Zed

## Recommended: stdio bridge via `mcp-remote`

Zed's native OAuth-over-Streamable-HTTP support is currently flaky for servers using Dynamic Client Registration ([zed#43162](https://github.com/zed-industries/zed/issues/43162)). The reliable path is to wrap the remote server with the `mcp-remote` stdio bridge.

In Zed's settings (Command Palette → "zed: open settings"), add to `context_servers`:

```json
{
  "context_servers": {
    "quicknode": {
      "command": {
        "path": "npx",
        "args": ["-y", "mcp-remote", "https://mcp.quicknode.com/mcp"]
      }
    }
  }
}
```

`mcp-remote` handles the OAuth + DCR handshake locally and proxies it over stdio into Zed.

## Native remote

```json
{
  "context_servers": {
    "quicknode": {
      "url": "https://mcp.quicknode.com/mcp"
    }
  }
}
```

If the OAuth flow doesn't trigger ("Authenticate" button never appears or gets stuck), fall back to the stdio bridge above.

Note: Zed uses `context_servers` (not `mcpServers`).

## What you get

Manage your blockchain infrastructure from your AI assistant: endpoints, rate limits, security, metrics, logs, and billing. See the [plugin README](../../plugins/quicknode/README.md) for capabilities.

## Requirements

- Zed with the AI assistant enabled.
- Node.js installed (for `npx` to fetch `mcp-remote`), only needed for the stdio bridge.
- A Quicknode account. Sign up at [quicknode.com](https://www.quicknode.com).
