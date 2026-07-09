# Quicknode Agent Plugins

Agent plugins from Quicknode for building Web3 apps with AI agents.

## Available plugins

| Plugin                              | Description                                                                                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`build-web3`](./plugins/build-web3/) | Build Web3 apps with your AI agent: choose a chain, architecture, stack, data layer, and production posture. Powered by optional Quicknode infrastructure integration. |

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

Plugin skills and references in this repo should stay stable and useful:

- No perishable facts — no plan tiers, pricing, rate-limit numbers, or RPC method tables. Link to the live docs (https://www.quicknode.com/docs/) for those details.
- Stable concepts, product categories, capability names, and decision guidance belong in this repo so the plugin is self-contained.

## License

MIT. See [LICENSE.md](./LICENSE.md).
