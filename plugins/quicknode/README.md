# Quicknode

Build on Quicknode blockchain infrastructure from your AI agent.

In **Claude Code**, this plugin bundles the Quicknode MCP server, outcome-focused slash commands, an RPC troubleshooting subagent, and a continuously-synced blockchain skill. In other clients (Cursor, Windsurf, VS Code, Zed), it provides the remote MCP server.

## MCP server

- **Endpoint**: `https://mcp.quicknode.com/mcp`
- **Transport**: Streamable HTTP (stateless)
- **Auth**: OAuth 2.1 with Dynamic Client Registration (RFC 7591). Clients register themselves automatically; no API key in your config.

Manage your blockchain infrastructure: list, inspect, provision, and archive endpoints across supported chains; adjust rate limits; manage security options and rules; fetch metrics, logs, and usage; and query billing and supported chains.

## Slash commands (Claude Code)

Outcome-focused commands that route you to the right Quicknode product. Namespaced as `/quicknode:<name>`.

| Command                 | What it does                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `/quicknode:build-web3`   | Scaffold a working Web3 starter app wired to the right Quicknode product for your use case. |
| `/quicknode:new-endpoint` | Provision a Quicknode RPC endpoint (chain/network/name) via MCP.                            |
| `/quicknode:monitor`      | Set up real-time on-chain event monitoring — picks Webhooks vs Streams for your needs.      |
| `/quicknode:backfill`     | Configure a Streams Dataset job to retrieve historical blockchain data over a range.        |
| `/quicknode:query-data`   | Write and run SQL against Quicknode SQL Explorer.                                            |
| `/quicknode:swap`         | Get a quote or execute a token swap on Solana or EVM via the Swap API.                       |
| `/quicknode:agent-access` | Add wallet-paid blockchain access to an AI agent via x402 or MPP.                            |

## Subagent (Claude Code)

- **rpc-troubleshooter** — a Quicknode RPC diagnostics specialist. Triggers on RPC errors (reverts, 429s, timeouts, missing methods, chain mismatches, archive/trie-node errors) and returns a root-cause diagnosis, a corrected snippet, and any relevant add-on/plan recommendation.

## Skill (Claude Code)

- **quicknode-skill** — accurate API knowledge across 80+ chains: RPC, Streams, Webhooks, SQL Explorer, IPFS, Solana DAS, Yellowstone gRPC, HyperCore, KV Store, Admin API, x402, MPP, and Agent Subscriptions. Synced automatically from [`quiknode-labs/blockchain-skills`](https://github.com/quiknode-labs/blockchain-skills) via a weekly GitHub workflow, so its API details stay current.

## Install

**Claude Code** — add the marketplace, then install the `quicknode` plugin:

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

A Quicknode account. Sign up at [quicknode.com](https://www.quicknode.com).

## License

MIT. See [LICENSE.md](../../LICENSE.md) at the repo root.
