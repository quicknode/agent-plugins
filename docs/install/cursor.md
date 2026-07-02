# Add Quicknode MCP to Cursor

One-click install via deeplink:

<!-- BEGIN: generated-deeplink -->
[![Add Quicknode MCP to Cursor](https://img.shields.io/badge/Add_to_Cursor-black?style=for-the-badge&logo=cursor)](cursor://anysphere.cursor-deeplink/mcp/install?name=quicknode&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLnF1aWNrbm9kZS5jb20vbWNwIn0=)

```
cursor://anysphere.cursor-deeplink/mcp/install?name=quicknode&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLnF1aWNrbm9kZS5jb20vbWNwIn0=
```
<!-- END: generated-deeplink -->

Cursor will show an approval dialog, then write the server into your `~/.cursor/mcp.json`.

## Manual install

Edit `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project) and add:

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

No `auth` block needed. The Quicknode MCP server uses OAuth 2.1 with **Dynamic Client Registration** (RFC 7591). Cursor will register itself automatically against `https://mcp.quicknode.com/register` and walk you through OAuth in your browser on first connect.

## What you get

Manage your blockchain infrastructure from your AI assistant: endpoints, rate limits, security, metrics, logs, and billing. See the [plugin README](../../plugins/quicknode/README.md) for capabilities.

## Troubleshooting

- **First connection hangs**: confirm your browser opened the OAuth consent page. If your popup blocker swallowed it, copy the URL from Cursor's logs.
- **"Insufficient scope" errors**: try removing the server and re-adding it. The DCR client may have been registered with stale scopes.
- **Cursor keeps re-registering**: known upstream issue ([cursor forum](https://forum.cursor.com/t/mcp-oauth-persist-dcr-client-id-across-reconnects-avoid-as-side-registration-spam/158226)). Doesn't affect functionality.

## Requirements

A Quicknode account. Sign up at [quicknode.com](https://www.quicknode.com).
