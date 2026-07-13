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
| Codex    | [docs/install/codex.md](./docs/install/codex.md)       |

For Claude Code, add this marketplace and install the `build-web3` plugin:

```
/plugin marketplace add quicknode/agent-plugins
```

For Codex, see the [Codex install guide](./docs/install/codex.md). Codex discovers this
repository's plugin through `.agents/plugins/marketplace.json` and uses
`plugins/build-web3/.codex-plugin/plugin.json` to load the bundled skill and MCP server.

For ChatGPT, use the existing listing on its marketplace.

## Content rules

Plugin skills and references in this repo should stay stable, useful, and self-contained:

- Stable concepts, product categories, capability names, and decision guidance belong in this repo so the plugin works without a network round-trip.
- Perishable facts — plan tiers, pricing, rate-limit numbers, RPC method tables, schemas — are allowed when the repo needs to be self-sufficient for a product, but every such table must carry a dated snapshot note (e.g. "As of 2026-02-02.") and a link to the live docs (https://www.quicknode.com/docs/) so a reader knows it can drift and where to check.
- Keep dated content current using `plugins/build-web3/skills/build-web3/PRODUCT_CATALOG.md`'s sync runbook — it's the maintenance source of truth for which product references exist, where they live, and how to refresh them.

## License

MIT. See [LICENSE.md](./LICENSE.md).
