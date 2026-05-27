# Add Quicknode MCP to VS Code

## Via the `@mcp` gallery

In VS Code's Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`), search:

```
@mcp quicknode
```

The Quicknode MCP listing is ingested automatically from the [official MCP Registry](https://registry.modelcontextprotocol.io/). Click **Install**.

## Via CLI

```bash
code --add-mcp '{"name":"quicknode","type":"http","url":"https://mcp.quicknode.com/mcp"}'
```

## Manual install

Edit your VS Code `mcp.json` (Command Palette → "MCP: Open User Configuration") and add:

```json
{
  "servers": {
    "quicknode": {
      "type": "http",
      "url": "https://mcp.quicknode.com/mcp"
    }
  }
}
```

VS Code uses `servers` (not `mcpServers`) and requires `"type": "http"` for remote MCP servers.

On first connection, VS Code performs OAuth 2.1 + Dynamic Client Registration against `https://mcp.quicknode.com/register` and opens the authorization page in your browser. No pre-shared credentials needed.

## What you get

Tools for managing Quicknode endpoints, rate limits, security rules, metrics, billing, RPC usage, and supported chains. See the [plugin README](../../plugins/mcp/README.md) for the full tool list.

## Requirements

- VS Code 1.99+ (native MCP support).
- GitHub Copilot or another MCP-aware AI assistant inside VS Code.
- A Quicknode account — sign up at [quicknode.com](https://www.quicknode.com).
