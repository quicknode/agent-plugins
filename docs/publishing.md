# Publishing a release

This repo publishes the `mcp` plugin to the [official MCP Registry](https://registry.modelcontextprotocol.io) automatically on git tag.

## Cut a release

1. Bump `version` in:
   - [`plugins/mcp/server.json`](../plugins/mcp/server.json)
   - [`plugins/mcp/.cursor-plugin/plugin.json`](../plugins/mcp/.cursor-plugin/plugin.json)
   - [`.cursor-plugin/marketplace.json`](../.cursor-plugin/marketplace.json) (`metadata.version`)
   - [`.claude-plugin/marketplace.json`](../.claude-plugin/marketplace.json) (`metadata.version`)
2. Re-run the deeplink generator if any URL changed:
   ```bash
   node scripts/gen-install-links.mjs
   ```
3. Commit, push to `main`.
4. Tag and push:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
5. The [`publish-mcp-registry`](../.github/workflows/publish-mcp-registry.yml) workflow runs on the tag and publishes `server.json` to the MCP Registry via GitHub OIDC.

## Verify the publish

```bash
curl -s "https://registry.modelcontextprotocol.io/v0/servers?search=quicknode" | jq
```

The entry should appear within a few seconds of the workflow completing. Downstream marketplaces (VS Code `@mcp` gallery, Glama, mcp.so, PulseMCP) auto-ingest from the Registry — typically visible within ~24h.

## Other marketplaces (manual, one-time)

- **cursor.directory**: paste the repo URL at [`cursor.directory/plugins/new`](https://cursor.directory/plugins/new). Their crawler scans `.mcp.json` automatically.
- **Cursor Marketplace** (official, separate from cursor.directory): contact the Cursor team via Slack or email `kniparko@anysphere.com` with the repo URL once you're ready.
- **Windsurf**: separate registry submission required — TBD.
- **Smithery**: follow-up — web form at `smithery.ai/build/publish`.
