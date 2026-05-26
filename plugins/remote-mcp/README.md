# QuickNode Remote MCP

OAuth-secured remote MCP server for managing your QuickNode blockchain infrastructure from any MCP-compatible AI assistant.

- **Endpoint**: `https://mcp.quicknode.com/mcp`
- **Transport**: Streamable HTTP (stateless)
- **Auth**: OAuth 2.1 with Dynamic Client Registration (RFC 7591) — clients register themselves automatically; no API key in your config

## Install

See per-client guides at the repo root:

- [Cursor](../../docs/install/cursor.md)
- [Windsurf](../../docs/install/windsurf.md)
- [VS Code](../../docs/install/vscode.md)
- [Zed](../../docs/install/zed.md)

Manual config (works for any client supporting remote MCP):

```json
{
  "mcpServers": {
    "quicknode": {
      "url": "https://mcp.quicknode.com/mcp"
    }
  }
}
```

On first connection, the client performs DCR against `https://mcp.quicknode.com/register`, then walks you through OAuth in your browser. No pre-shared `CLIENT_ID` / `CLIENT_SECRET` needed.

## Available tools

| Tool | Purpose |
|---|---|
| `list-endpoints` | List your QuickNode endpoints |
| `get-endpoint` | Get details for one endpoint |
| `create-endpoint` | Provision a new endpoint |
| `delete-endpoint` | Decommission an endpoint |
| `update-endpoint-security-options` | Update endpoint security configuration |
| `update-endpoint-rate-limits` | Adjust per-method rate limits |
| `get-endpoint-rate-limit-by-method` | Inspect a single method's rate limit |
| `get-rate-limit-details` | Get rate-limit configuration details |
| `list-endpoint-method-rate-limits` | List all method-level limits for an endpoint |
| `create-security-rule` | Add a security rule |
| `delete-security-rule` | Remove a security rule |
| `list-endpoint-security` | List active security rules |
| `get-endpoint-metrics` | Fetch endpoint metrics |
| `list-endpoint-logs` | List endpoint request logs |
| `get-endpoint-log-details` | Inspect one log entry |
| `get-rpc-usage` | RPC usage stats |
| `get-billing` | Account billing summary |
| `list-chains` | List supported chains |

## Requirements

A QuickNode account. Sign up at [quicknode.com](https://www.quicknode.com).

## License

MIT — see [LICENSE.md](../../LICENSE.md) at the repo root.
