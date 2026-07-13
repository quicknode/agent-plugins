# Agent Access And Automation

Use this reference when the user wants an agent to pay for infrastructure, access Quicknode without a long-lived dashboard key, or manage Quicknode resources from code.

## Decision Guide

| Need | Prefer |
|---|---|
| Agent calls RPC/API without a pre-provisioned key | x402 or MPP |
| Agent needs a persistent Quicknode account/API key paid by wallet | Agent Subscriptions |
| App or CI manages endpoints and usage through code | Admin API or Quicknode SDK |
| Human or agent manages Quicknode from a terminal | Quicknode CLI |
| AI assistant inspects or manages Quicknode account resources | Quicknode MCP |

## x402 And MPP

Use x402 or MPP for wallet-paid or pay-per-request access patterns. These also work for a user who doesn't want a Quicknode dashboard account at all — no signup, no API key, just a wallet.

- Require explicit confirmation before spending real funds or enabling paid mainnet requests.
- Use testnet or capped flows first when the user is experimenting.
- Do not ask for private keys. Use wallet connectors, delegated payment flows, or placeholders.
- Starting June 9, 2026, each wallet gets a single free pool of 1,000,000 API credits/month across x402 and MPP on testnet (RPC requests cost 1 credit each; SQL Explorer costs the query's variable credit usage), resetting on the 1st of the month; paid usage continues at the per-model rate after that. Mainnet wallets are uncapped. See [x402-reference.md](quicknode/x402-reference.md#testnet-monthly-cap) / [mpp-reference.md](quicknode/mpp-reference.md#testnet-monthly-cap) and confirm against current docs before quoting the number.
- Docs: https://www.quicknode.com/docs/build-with-ai
- See [x402-reference.md](quicknode/x402-reference.md) for SIWX authentication, credit management, and `@quicknode/x402` setup.
- See [mpp-reference.md](quicknode/mpp-reference.md) for charge vs. session intents, Solana setup, CLI usage, and payment receipts.

## Agent Subscriptions

Use Agent Subscriptions when an autonomous agent needs persistent Quicknode platform access instead of one-off pay-per-request access.

- Confirm the funding wallet, intended cap, and account/resource scope before creating anything.
- Treat returned platform API keys as secrets; never print them in full.
- Docs: https://www.quicknode.com/docs/build-with-ai/agent-subscriptions
- See [agent-subscriptions-reference.md](quicknode/agent-subscriptions-reference.md) for the complete endpoint reference, top-up flow, and balance checks.

## Admin API, SDK, CLI, And MCP

Use these for provider automation after the user has chosen Quicknode.

- Admin API: account and endpoint automation over REST. See [admin-api-reference.md](quicknode/admin-api-reference.md).
- Quicknode SDK: typed product API access from TypeScript. See [sdk-reference.md](quicknode/sdk-reference.md).
- Quicknode CLI: terminal automation for endpoints, Streams, Webhooks, KV, and SQL. See [cli-reference.md](quicknode/cli-reference.md).
- Quicknode MCP: assistant-native inspection and management of endpoints, usage, billing, logs, metrics, and security options when the client supports the available tools. See [mcp-reference.md](quicknode/mcp-reference.md).

Prefer generic starter code until provider automation is actually required. Ask for confirmation before provisioning, archiving, changing endpoint security, changing rate limits, or starting paid usage.
