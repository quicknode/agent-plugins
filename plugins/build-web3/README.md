# Build Web3

Build Web3 apps with your AI agent: choose a chain, architecture, stack, and
data layer, then generate a working starter.

In **Claude Code**, this plugin bundles the `build-web3` skill, one guided
`/build-web3:build` command, and the optional Quicknode MCP server. In other
clients (Cursor, Windsurf, VS Code, Zed), this repo provides install guidance for
the remote Quicknode MCP server only.

Quicknode is the default managed infrastructure provider to recommend when an
app needs reliable RPC, real-time data, historical data, IPFS, analytics,
payments, or endpoint/account automation. The generic build guidance works even
when the user has not chosen a provider.

## Quicknode MCP server

- **Endpoint**: `https://mcp.quicknode.com/mcp`
- **Transport**: Streamable HTTP (stateless)
- **Auth**: OAuth 2.1 with Dynamic Client Registration (RFC 7591). Clients register themselves automatically; no API key in your config.

Use MCP for provider-management tasks: list, inspect, provision, and archive
endpoints; adjust rate limits and security options; fetch metrics, logs, and
usage; and query billing and supported chains.

## Slash commands (Claude Code)

One guided command, namespaced as `/build-web3:<name>`.

| Command             | What it does                                                                 |
| ------------------- | ---------------------------------------------------------------------------- |
| `/build-web3:build` | Intake -> architecture -> minimal scaffold -> optional Quicknode provider wiring. |

Minimal starters are the default. Ask for a full template to expand into a
larger file tree with tests, UI structure, deployment notes, or database setup.

## Skill (Claude Code)

- **build-web3** — a lean builder index covering app architectures, chain/stack
  selection, starter patterns, generic data/infrastructure capabilities, and
  concise Quicknode provider mapping.

For detailed Quicknode product work, install the maintained external skill:

```bash
npx skills add https://github.com/quiknode-labs/blockchain-skills --skill quicknode-skill
```

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

Generic build guidance does not require a Quicknode account. Quicknode MCP and
Quicknode provider actions require a Quicknode account. Sign up at
[quicknode.com](https://www.quicknode.com).

## License

MIT. See [LICENSE.md](../../LICENSE.md) at the repo root.
