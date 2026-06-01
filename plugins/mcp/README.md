# Quicknode MCP

Give your AI agents the best blockchain infrastructure.

- **Endpoint**: `https://mcp.quicknode.com/mcp`
- **Transport**: Streamable HTTP (stateless)
- **Auth**: OAuth 2.1 with Dynamic Client Registration (RFC 7591). Clients register themselves automatically; no API key in your config.

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
      "type": "http",
      "url": "https://mcp.quicknode.com/mcp"
    }
  }
}
```

On first connection, the client performs DCR against `https://mcp.quicknode.com/register`, then walks you through OAuth in your browser. No pre-shared `CLIENT_ID` / `CLIENT_SECRET` needed.

## What you can do

- **Endpoint management**: list, inspect, provision, and archive Quicknode endpoints across supported chains.
- **Rate limits**: adjust general (RPS/RPM/RPD) limits and configure per-method rate limiters.
- **Security**: manage endpoint security options (CORS, JWT, IPs, etc.) and rules (IP, JWT, referrer, domain mask, token).
- **Observability**: fetch endpoint metrics, request/response logs, and account-level RPC usage breakdowns.
- **Account**: query billing and discover supported chains.

Once connected, your MCP client will display the live tool list from the server.

## Requirements

A Quicknode account. Sign up at [quicknode.com](https://www.quicknode.com).

## License

MIT. See [LICENSE.md](../../LICENSE.md) at the repo root.
