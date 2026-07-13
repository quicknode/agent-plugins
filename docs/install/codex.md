# Install Build Web3 in Codex

The Codex plugin packages the `build-web3` skill and the optional Quicknode MCP server. The
skill provides architecture and security guidance locally; the MCP server adds authenticated
Quicknode account and endpoint management.

## Install from a local checkout

From this repository's root, add its Codex marketplace and install the plugin:

```bash
codex plugin marketplace add "$(pwd)"
codex plugin add build-web3@quicknode-agent-plugins
```

Use a fresh Codex thread after installation so it loads the plugin's skill and MCP tools.

## Install from GitHub

Once the Codex marketplace file is merged to the default branch, install directly from GitHub:

```bash
codex plugin marketplace add https://github.com/quicknode/agent-plugins.git
codex plugin add build-web3@quicknode-agent-plugins
```

## Verify

```bash
codex plugin list
```

Then, in a new thread, try:

```text
I want to build a simple DeFi dapp on Solana. I'm not sure what stack to use.
```

For an MCP check, ask: `List my Quicknode endpoints.` Codex should guide you through the
Quicknode OAuth flow on first use. A Quicknode account is only required for account and endpoint
management; the skill itself works without one.

## Update a local install

After editing the plugin, refresh its Codex cachebuster and reinstall it:

```bash
python3 ~/.codex/skills/.system/plugin-creator/scripts/update_plugin_cachebuster.py plugins/build-web3
codex plugin add build-web3@quicknode-agent-plugins
```

Start a new thread after reinstalling.
