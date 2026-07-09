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

Use x402 or MPP for wallet-paid or pay-per-request access patterns.

- Require explicit confirmation before spending real funds or enabling paid mainnet requests.
- Use testnet or capped flows first when the user is experimenting.
- Do not ask for private keys. Use wallet connectors, delegated payment flows, or placeholders.
- Docs: https://www.quicknode.com/docs/build-with-ai

## Agent Subscriptions

Use Agent Subscriptions when an autonomous agent needs persistent Quicknode platform access instead of one-off pay-per-request access.

- Confirm the funding wallet, intended cap, and account/resource scope before creating anything.
- Treat returned platform API keys as secrets; never print them in full.
- Docs: https://www.quicknode.com/docs/build-with-ai/agent-subscriptions

## Admin API, SDK, CLI, And MCP

Use these for provider automation after the user has chosen Quicknode.

- Admin API: account and endpoint automation over REST.
- Quicknode SDK: typed product API access from TypeScript.
- Quicknode CLI: terminal automation for endpoints, Streams, Webhooks, KV, and SQL.
- Quicknode MCP: assistant-native inspection and management of endpoints, usage, billing, logs, metrics, and security options when the client supports the available tools.

Prefer generic starter code until provider automation is actually required. Ask for confirmation before provisioning, archiving, changing endpoint security, changing rate limits, or starting paid usage.
