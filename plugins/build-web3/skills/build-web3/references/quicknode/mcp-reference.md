# Quicknode MCP Reference

The Quicknode MCP server exposes live blockchain reads and Quicknode Admin API capabilities to AI assistants and coding tools via the Model Context Protocol (MCP). Quicknode is available as a native connector in Claude, ChatGPT, and Codex, and it can also be configured in generic MCP clients that support Streamable HTTP.


**Docs:** https://www.quicknode.com/docs/build-with-ai/quicknode-mcp

## Overview

| Property | Value |
|----------|-------|
| **Protocol** | Model Context Protocol (MCP) |
| **Transport** | HTTP (Streamable HTTP) |
| **Auth** | OAuth 2.1 for interactive setup; bearer API key for CI/non-interactive setup |
| **Directory** | Native Claude connector; native OpenAI app/plugin surface for ChatGPT and Codex |
| **Capabilities** | Read-only blockchain RPC across every supported network, endpoint management, usage monitoring, rate limits, security rules, billing |

## Client Setup

### Claude (Web, Desktop, and Claude Code)

Quicknode is listed in Claude's built-in Anthropic connector directory.

**Claude Web / Desktop:**
1. Open Claude settings → **Customize** → **Connectors**
2. Find **Quicknode** in the directory listing
3. Click **Connect**
4. Log in to Quicknode in the browser window, select **Admin** or **Viewer**, and approve access

**Claude Code (CLI):**

```bash
claude mcp add --transport http quicknode https://mcp.quicknode.com/mcp
```

By default, Claude Code installs in local scope for the current project. Use `--scope project` to share via project MCP config, or `--scope user` to make it available across your projects:

```bash
claude mcp add --transport http --scope user quicknode https://mcp.quicknode.com/mcp
```

### OpenAI (ChatGPT / Codex)

Install Quicknode directly from the ChatGPT Apps catalog or via `/plugin` in Codex when available. The interactive flow opens a Quicknode OAuth browser window where the user selects **Admin** or **Viewer** before approving access.

### Cursor / VS Code / Windsurf / Zed / Generic MCP Clients

For any MCP-compatible client that supports HTTP transport, configure:

```text
https://mcp.quicknode.com/mcp
```

If a client does not support native OAuth or HTTP transport, use `mcp-remote` as a bridge:

```json
{
  "mcpServers": {
    "quicknode": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.quicknode.com/mcp"]
    }
  }
}
```

## Authentication and Roles

Interactive setup uses OAuth 2.1. The user logs in to Quicknode, chooses the account to connect, then selects an API key role:

| Role | Access |
|------|--------|
| **Viewer** | Read-only access to endpoints, metrics, logs, usage, billing, and chains, plus `call-rpc` blockchain reads |
| **Admin** | Viewer access plus create/delete endpoints, security changes, rate-limit updates, and enabling or disabling Tooling Access |

Use **Viewer** for inspection-only workflows. Use **Admin** only when the assistant needs to make Quicknode account changes.

## Non-Interactive / CI Setup

For CI, remote machines, or clients where browser OAuth is unavailable, pass a Quicknode API key as a bearer token. The key's Quicknode role controls MCP permissions.

### Claude Code

```bash
claude mcp add quicknode --transport http https://mcp.quicknode.com/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

### Codex

```bash
codex mcp add quicknode \
  --url https://mcp.quicknode.com/mcp \
  --bearer-token-env-var QUICKNODE_API_KEY
```

### Generic HTTP MCP Config

```json
{
  "mcpServers": {
    "quicknode": {
      "url": "https://mcp.quicknode.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

## Blockchain RPC (Tooling Access)

`call-rpc` sends a read-only JSON-RPC request to the account's Tooling Access endpoint: one shared, multichain endpoint Quicknode provisions per account. No endpoint provisioning, URL, or token handling. The server mints and refreshes the short-lived credential per call. This is the same account setting behind `qn rpc call` in the CLI and the `rpc` client in the SDK, so enabling it once covers all three.

### Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `method` | Yes | JSON-RPC method name, e.g. `eth_blockNumber`, `getSlot`, `getblockcount` |
| `network` | Yes | Tooling Access network slug, e.g. `ethereum-mainnet`, `solana-mainnet`, `btc` |
| `params` | No | JSON-RPC params as JSON text, e.g. `["0xabc...", "latest"]` |

One tool covers every chain family: `eth_getBalance` on `base-mainnet`, `getSlot` on `solana-mainnet`, and `getblockcount` on `btc` all route through `call-rpc`.

### Network Slugs

Tooling Access slugs do not always match the network slugs `list-chains` returns. Two known differences: Ethereum mainnet is `ethereum-mainnet` (not `mainnet`), and Polygon mainnet is `polygon` (not `matic`). When the server rejects a slug it returns an error listing every slug the endpoint accepts; read the accepted list from that error rather than guessing. `qn rpc list-networks` prints the same list from the CLI.

### Read-Only Enforcement

Only registered read-only methods are allowed. A write method is rejected before it reaches the chain:

```text
RPC method eth_sendRawTransaction is not allowed. Only registered read-only methods may be called.
```

To send transactions, provision a dedicated endpoint (`create-endpoint`) and sign and broadcast from application code.

### Enabling And Disabling

`enable-tooling-access` provisions the endpoint and caches the credential. `disable-tooling-access` turns the setting off. Both take no arguments and are idempotent, and both require the **Admin** role. A Viewer connection can call `call-rpc` once Tooling Access is on, but cannot turn it on; if `call-rpc` fails because the setting is off, ask the user to reconnect with Admin or enable it from another interface.

`disable-tooling-access` is account-wide: it cuts off RPC access for every Quicknode developer tool on the account, including the CLI and the SDK, not just the current assistant. Confirm with the user before calling it.

The same setting is readable and writable over REST at `/v0/tooling-access`. See [admin-api-reference.md](admin-api-reference.md) for status, enable/disable, and token-minting details.

## Tool Surface

The Quicknode MCP server exposes tools for blockchain RPC and the Admin API surface:

### Blockchain RPC

| Tool | Description |
|------|-------------|
| `call-rpc` | Call a read-only JSON-RPC method on any supported network via Tooling Access |
| `enable-tooling-access` | Enable account-level Tooling Access and provision the shared multichain endpoint |
| `disable-tooling-access` | Disable account-level Tooling Access (account-wide; confirm first) |

### Endpoint Management

| Tool | Description |
|------|-------------|
| `list-endpoints` | List all RPC endpoints in your account |
| `get-endpoint` | Retrieve details for a specific endpoint |
| `create-endpoint` | Create a new RPC endpoint |
| `delete-endpoint` | Delete an endpoint |
| `update-endpoint-rate-limits` | Configure global request rate limits for an endpoint |

### Per-Method Rate Limits

| Tool | Description |
|------|-------------|
| `list-endpoint-method-rate-limits` | List per-method rate limits for an endpoint |
| `create-endpoint-method-rate-limit` | Set a rate limit for a specific RPC method |
| `update-endpoint-method-rate-limit` | Update an existing method-level rate limit |
| `delete-endpoint-method-rate-limit` | Remove a method rate limit |

### Security

| Tool | Description |
|------|-------------|
| `list-endpoint-security` | List all security rules for an endpoint |
| `create-security-rule` | Add a security rule (allowlist, JWT auth, etc.) |
| `update-endpoint-security-options` | Update endpoint-level security settings |
| `delete-security-rule` | Remove a security rule |

### Usage & Monitoring

| Tool | Description |
|------|-------------|
| `get-endpoint-metrics` | Retrieve performance metrics for an endpoint |
| `list-endpoint-logs` | List request logs for an endpoint |
| `get-endpoint-log-details` | Get details for a specific log entry |
| `get-rpc-usage` | View RPC usage statistics across your account |

### Account & Billing

| Tool | Description |
|------|-------------|
| `list-chains` | List all supported blockchain networks |
| `get-billing` | Retrieve billing information |

## MCP Resources

Quicknode MCP also exposes endpoint details as MCP resources in clients that support resource browsing. Reference `@quicknode` in the client UI to attach endpoint context such as `quicknode://endpoints/<endpoint-id>` without first calling a tool.

## Example Prompts

- "What is the current block number on Base?"
- "Get the balance of this Solana address"
- "Compare the latest block timestamp on Ethereum and Arbitrum"
- "List all my Quicknode endpoints"
- "Create a new Ethereum mainnet endpoint"
- "What's my RPC usage for this month?"
- "Add an IP allowlist rule to my endpoint"
- "Show me the per-method rate limits on my endpoint"
- "Connect my Quicknode workspace to Claude via MCP"

## When to Use MCP vs. CLI vs. SDK vs. Admin API

| Interface | Best For |
|-----------|----------|
| **MCP** | Conversational blockchain reads and account management inside Claude, Cursor, or other AI tools |
| **CLI (`qn`)** | Shell scripts, CI/CD pipelines, direct terminal workflows |
| **SDK** | Application or agent code that coordinates Quicknode product APIs |
| **Admin API** | Programmatic infrastructure-as-code from application code |

## Documentation

- **MCP Docs**: https://www.quicknode.com/docs/build-with-ai/quicknode-mcp
- **Blockchain RPC Calls**: https://www.quicknode.com/docs/build-with-ai/quicknode-mcp#blockchain-rpc-calls
- **Tooling Access API**: https://www.quicknode.com/docs/admin-api/tooling-access/v0-tooling-access
- **Build with AI Overview**: https://www.quicknode.com/docs/build-with-ai
- **SDK Docs**: https://www.quicknode.com/docs/sdk
