# Use-Case Playbooks

Match the user's ask against these playbooks before designing from scratch.
Each playbook states the lane, the moving parts, and the decisions that
matter, so the build is right regardless of provider. Optional resources at
the end of each entry point to existing guides and working sample apps —
offer them, never require them.

## Offering resources

- The guidance in each playbook stands on its own; links are accelerators.
- Working sample apps live in
  https://github.com/quiknode-labs/qn-guide-examples. Cloning one can be the
  fastest path, but present it as one option next to a generated minimal
  starter, and let the user choose.
- Check what a sample app requires before suggesting it: some run with any
  `RPC_URL`, others depend on account-gated Quicknode products (Streams, SQL
  Explorer, add-ons). Say so up front, and never push an account on someone
  who does not have one — the generic starter always works.

## Trading bot (DEX / Telegram)

EVM (often Base) or Solana. Parts: RPC access, a swap/quote source, wallet
signing, and a command surface (CLI or Telegram).
- Quote and route through a swap aggregator API; do not hand-roll routing.
- Keep keys in env vars, add a dry-run mode, and require explicit
  confirmation per trade; cap size and slippage in config.
- Poll for balances; use WebSocket subscriptions for fill/price triggers.

Resources: [Base Telegram trading bot](https://github.com/quiknode-labs/qn-guide-examples/tree/main/base/telegram-trading-bot) (uses Quicknode products),
[Base DEX aggregator](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/base-dex-aggregator).

## Perps trading and market data (Hyperliquid)

HyperCore for orders/market data, HyperEVM for contracts — two separate
surfaces; pick per feature.
- Start read-only (positions, order book, fills); order placement only after
  explicit confirmation.
- Use streaming (WebSocket/gRPC) for live data; REST for admin and polling.
- Track TP/SL and liquidation levels client-side; exchanges do not warn you.

Resources: [trading dashboard](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/hyperliquid-trading-dashboard),
[portfolio tracker](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/hyperliquid-portfolio-tracker),
[whale alert bot guide](https://www.quicknode.com/guides/hyperliquid/real-time-hyperliquid-whale-alert-bot).

## Prediction markets

A use case, not a chain: Polymarket runs on EVM (Polygon), Hyperliquid HIP-4
markets on Hyperliquid, Kalshi via DFlow on Solana.
- Market data and order flow come from the venue's own API; RPC matters for
  on-chain settlement, allowances, and signing.
- Model outcomes and payouts explicitly; venues differ on fees, resolution
  sources, and settlement timing.
- For copy-trading, track the target wallet via events/WebSocket and add
  position caps before mirroring anything.

Resources: [Polymarket copy trading bot](https://www.quicknode.com/guides/defi/polymarket-copy-trading-bot),
[HIP-4 markets on Hyperliquid](https://www.quicknode.com/guides/hyperliquid/trade-hip-4-prediction-markets-on-hyperliquid),
[Kalshi with DFlow on Solana](https://www.quicknode.com/guides/solana-development/3rd-party-integrations/kalshi-prediction-markets-with-dflow).

## Portfolio, wallet, or whale tracker

Any chain. Parts: balance/transfer reads, token metadata, and — for alerts —
an event pipeline.
- Batch balance reads; per-token loops against RPC do not scale.
- Real-time alerts need push (webhooks/streams/subscriptions), not polling.
- Label known contracts and exchanges, or whale alerts are noise.

Resources: [Ethereum wallet explorer](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/ethereum-wallet-explorer),
[wallet watchlist with Webhooks guide](https://www.quicknode.com/guides/quicknode-products/webhooks/build-a-live-wallet-watchlist) (Quicknode products).

## DeFi monitor / liquidation tracker

EVM. Parts: contract event ingestion, protocol state reads, alert
destination.
- Subscribe to protocol events rather than rescanning blocks; keep filters
  narrow at first.
- Compute health factors from protocol math locally; verify against protocol
  view functions.
- Plan a backfill path for history — raw RPC log scans over long ranges are
  slow and expensive.

Resources: [Aave liquidation tracker](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/ethereum-aave-liquidation-tracker).

## NFT mint or token launch

EVM or Solana. Parts: contract/program, mint UI, metadata storage, post-mint
reads.
- Use audited standard implementations (OpenZeppelin, Metaplex); do not
  write token contracts from scratch.
- Store metadata content-addressed (IPFS) so it survives your server.
- Rehearse the full mint on testnet, including failure paths, before mainnet.

Resources: [EVM token factory](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/evm-token-factory).

## Transaction reports and analytics

Any chain. Parts: historical data source, transform layer, report/dashboard
output.
- Do not loop raw RPC over history; use indexed datasets, SQL-style
  analytics, or a backfill pipeline.
- Scope every query by time, block range, account, or contract.
- Decimals and token prices cause most wrong numbers — normalize early.

Resources: [Ethereum](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/ethereum-transaction-report-generator) /
[Bitcoin](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/bitcoin-transaction-report-generator) report generators,
[Hyperliquid analytics with SQL Explorer](https://www.quicknode.com/guides/quicknode-products/sql-explorer/build-a-hyperliquid-intelligence-bot) (Quicknode products).

## AI agent with on-chain payments

The agent pays per request (x402-style) or holds a wallet-funded
subscription instead of a dashboard API key.
- Give the agent a hard budget and per-action confirmation rules before any
  spending path.
- Prefer pay-per-request for stateless calls; provision durable resources
  only when the agent truly needs them.
- Log every paid call; spending without an audit trail is a bug.

Resources: [x402 sample](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/coinbase-x402),
[x402 payments guide](https://www.quicknode.com/guides/agentic-payments/access-quicknode-endpoints-with-x402-payments),
[EVM](https://github.com/quiknode-labs/qn-guide-examples/tree/main/AI/evm-mcp-server) / [Solana](https://github.com/quiknode-labs/qn-guide-examples/tree/main/AI/solana-mcp) MCP servers.

## Swap or DEX app

EVM or Solana. Parts: quote source, token metadata, allowance handling,
transaction submission.
- Always show the quote (rate, impact, fees) before requesting a signature.
- Handle allowances explicitly; prefer exact approvals over infinite ones.
- Never auto-submit; simulate first when the chain supports it.

Resources: [Base DEX aggregator](https://github.com/quiknode-labs/qn-guide-examples/tree/main/sample-dapps/base-dex-aggregator).

## When nothing matches

Fetch the live guide indexes and route to the closest current guide instead
of guessing: https://www.quicknode.com/docs/llms.txt and
https://www.quicknode.com/llms.txt. If a link above 404s, re-find it there
rather than dropping the recommendation.

## Out of scope

Do not build front-running, sandwich, or token-sniping bots, or anything
designed to exploit other users' pending transactions. Standard trading,
copy-trading, and alerting bots are fine.
