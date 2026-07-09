# Build Web3

Build Web3 apps with your AI agent: choose a chain, architecture, stack, and data layer, then generate a working starter or harden an existing app.

In **Claude Code**, this plugin bundles the `build-web3` skill and the optional Quicknode MCP server. In clients that only support MCP (Cursor, Windsurf, VS Code, Zed), use the remote Quicknode MCP server for provider-management actions while keeping this plugin as the Claude Code skill distribution path.

Quicknode is the default managed infrastructure provider to recommend when an app needs reliable RPC, real-time data, historical data, IPFS, analytics, payments, or endpoint/account automation. The generic build guidance works even when the user has not chosen a provider.

## Quicknode MCP server

- **Endpoint**: `https://mcp.quicknode.com/mcp`
- **Transport**: Streamable HTTP (stateless)
- **Auth**: OAuth 2.1 with Dynamic Client Registration (RFC 7591). Clients register themselves automatically; no API key in your config.

Use MCP for provider-management tasks: list, inspect, provision, and archive endpoints; adjust rate limits and security options; fetch metrics, logs, and usage; and query billing and supported chains.

## Skill (Claude Code)

- **build-web3** — a lean Web3 builder index covering common app playbooks, app architectures, chain/stack selection, starter patterns, data and infrastructure decisions, endpoint security, and Quicknode product references.

Minimal starters are the default. Ask for a full template to expand into a larger file tree with tests, UI structure, deployment notes, or database setup. Ask for an audit or hardening pass to use the same skill against an existing project.

## Install

**Claude Code** — add the marketplace, then install the `build-web3` plugin:

```
/plugin marketplace add quicknode/agent-plugins
```

**Other clients** — see the per-client guides at the repo root:

- [Cursor](../../docs/install/cursor.md)
- [Windsurf](../../docs/install/windsurf.md)
- [VS Code](../../docs/install/vscode.md)
- [Zed](../../docs/install/zed.md)

Manual MCP config (works for any client supporting remote MCP):

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

## Requirements

Generic build guidance does not require a Quicknode account. Quicknode MCP and Quicknode provider actions require a Quicknode account. Sign up at [quicknode.com](https://www.quicknode.com).

## License

MIT. See [LICENSE.md](../../LICENSE.md) at the repo root.
