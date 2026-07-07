# Quicknode Agent Plugins

Agent plugins from Quicknode. MCP servers, skills, and more.

## Available plugins

| Plugin                              | Description                                                                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`build-web3`](./plugins/build-web3/) | Build Web3 apps with your AI agent: choose a chain, architecture, stack, and data layer, then generate a working starter. Includes optional Quicknode infrastructure integration. |

## Install

| Client   | Guide                                                  |
| -------- | ------------------------------------------------------ |
| Cursor   | [docs/install/cursor.md](./docs/install/cursor.md)     |
| Windsurf | [docs/install/windsurf.md](./docs/install/windsurf.md) |
| VS Code  | [docs/install/vscode.md](./docs/install/vscode.md)     |
| Zed      | [docs/install/zed.md](./docs/install/zed.md)           |

For Claude Code, add this marketplace and install the `build-web3` plugin:

```
/plugin marketplace add quicknode/agent-plugins
```

For ChatGPT, use the existing listing on its marketplace.

## Content rules

Plugin skills and references in this repo must stay maintenance-free:

- No perishable facts — no plan tiers, pricing, rate-limit numbers, or RPC
  method tables. Link to the live docs (https://www.quicknode.com/docs/) or
  the external `quicknode-skill` instead.
- Stable concepts, capability names, and decision guidance only.

## License

MIT. See [LICENSE.md](./LICENSE.md).
