# App Architectures

Use this reference to turn a rough Web3 idea into a concrete build shape before writing code.

## Wallet or dApp frontend

- User connects a wallet, reads chain state, and submits signed transactions.
- Typical stack: Next.js or React, wallet connector, chain client, RPC provider.
- Keep signing in the wallet. The backend should not receive private keys.
- Add an indexer or event pipeline only when the UI needs searchable history or real-time updates beyond direct RPC reads.

## NFT mint or collection app

- Needs a contract/program, mint UI, metadata/assets, and post-mint ownership or transfer reads.
- Use testnet/devnet until the mint flow has been rehearsed.
- Store metadata through an IPFS-capable provider when assets must remain content-addressed.
- Use event ingestion or indexed APIs for holder pages, activity feeds, and alerts.

## Token, DeFi, or swap app

- Needs wallet signing, token metadata, balances, allowances, quotes, and transaction submission.
- Use chain-native libraries for reads/writes and a swap/quote API only when the app routes trades.
- Add priority-fee or simulation support when transaction inclusion matters.
- Never auto-submit swaps without explicit user confirmation.

## Indexer or data pipeline

- Ingests chain events into a database, warehouse, queue, or webhook endpoint.
- Needs an RPC/event source, filters, retry behavior, destination schema, and a historical catch-up plan.
- Use real-time event pipelines for live ingestion and indexed/historical data services for replay or analytics.
- Start with narrow filters and expand after validating volume.

## Trading bot or analytics script

- Needs market data, account state, risk controls, execution, and logs.
- For Hyperliquid, separate market data, account/info reads, and order actions.
- Use WebSocket or gRPC-style streams when latency matters; use REST/RPC for simple polling or admin tasks.
- Keep keys outside the generated code and add explicit dry-run modes.

## AI agent with paid access

- Needs a budget, payment rail, provider access, and strict confirmation rules.
- Use pay-per-request access for short-lived stateless calls.
- Use account/API-key provisioning only when the agent needs persistent infrastructure such as endpoints, webhooks, streams, or stored data.
