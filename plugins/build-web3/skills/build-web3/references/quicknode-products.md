# Quicknode Products

Use this reference when a user needs a specific Quicknode product or when a generic app need maps cleanly to a Quicknode capability. Product names, categories, and URLs are based on Quicknode's upstream product catalog and skill quick reference. Avoid plan tiers, prices, and rate limits.

## Public Product Page Groups

The marketing product page groups the top-level public catalog this way:

| Group | Products shown |
|---|---|
| Core Infrastructure | Core RPC API, Streams, Webhooks, IPFS, Clusters |
| Data & Finance | Solana gRPC/Yellowstone gRPC, Validator as a Service, Solana Validator, Monad Validator |
| Platform | Builder's Guide, Admin API, Agents |

Use those group names when matching public-site navigation or marketing copy. Use the more specific agent-facing categories below when choosing what an AI agent should read or invoke.

## Agent-Facing Categories

| Category | Products |
|---|---|
| Infrastructure | Core RPC API, Dedicated Clusters, IPFS, Validator as a Service |
| Real-Time Data | Streams, Webhooks, Solana gRPC, Blazar WSS, HyperCore gRPC |
| Indexed Data | SQL Explorer, HyperCore for Hyperliquid, Agent Identity, Blockbook, Metaplex DAS API, Ordinals & Runes API |
| Trading & DeFi | Swap API, Solana Validator, Monad Validator |
| Platform | Admin API, ChainKit, Key-Value Store, Quicknode SDK |
| Agent Surface | x402, MPP, Agent Subscriptions, Quicknode CLI, Quicknode MCP |
| Endpoint Add-ons | Solana Priority Fee API, Jito Bundles, Single Flight RPC, Multi-region Transaction Broadcast, Risk Assessment API, Block Timestamp Lookup, Multi-chain Stablecoin Balance API, GoldRush Multichain Data APIs |

## Product Index

Each row's **Deep Reference** links to the full method tables, setup code, and API details in `references/quicknode/`. Rows without a deep reference are human/operator-provisioned; use the Docs/Public URL columns instead.

| Product | Category | Use when the user needs | Deep Reference | Docs | Public URL |
|---|---|---|---|---|---|
| Core RPC API | Infrastructure | HTTP/WebSocket RPC across EVM, Solana, Bitcoin, Hyperliquid, and other chains | [rpc-reference.md](quicknode/rpc-reference.md) | https://www.quicknode.com/docs | https://www.quicknode.com/core-api |
| Dedicated Clusters | Infrastructure | Private node clusters for high-throughput production or compliance isolation | — | https://www.quicknode.com/docs/custom-rpc-options | https://www.quicknode.com/clusters |
| IPFS | Infrastructure | NFT metadata, content-addressed assets, or decentralized file storage | [ipfs-reference.md](quicknode/ipfs-reference.md) | https://www.quicknode.com/docs/ipfs | https://www.quicknode.com/ipfs |
| Validator as a Service | Infrastructure | Human/operator-managed validator infrastructure | — | https://www.quicknode.com/docs | https://www.quicknode.com/validator-as-a-service |
| Streams | Real-Time Data | Real-time and historical blockchain data pipelines with filtering and delivery | [streams-reference.md](quicknode/streams-reference.md) | https://www.quicknode.com/docs/streams | https://www.quicknode.com/streams |
| Webhooks | Real-Time Data | Event-driven notifications to an HTTP endpoint | [webhooks-reference.md](quicknode/webhooks-reference.md) | https://www.quicknode.com/docs/webhooks | https://www.quicknode.com/webhooks |
| Solana gRPC | Real-Time Data | Solana Geyser streaming for account, transaction, slot, and block data | [solana-grpc-reference.md](quicknode/solana-grpc-reference.md) | https://www.quicknode.com/docs/solana/solana-grpc/overview | https://www.quicknode.com/solana-grpc |
| Blazar WSS | Real-Time Data | Quicknode-built Solana WebSocket subscriptions for blocks, accounts, transactions, and slots | — | https://www.quicknode.com/docs | https://www.quicknode.com/solana-grpc |
| HyperCore gRPC | Real-Time Data | gRPC streams for Hyperliquid L1 trades, order book diffs, events, and blocks | [hypercore-hyperliquid-reference.md](quicknode/hypercore-hyperliquid-reference.md) | https://www.quicknode.com/docs/hyperliquid | https://www.quicknode.com/chains/hyperliquid |
| SQL Explorer | Indexed Data | SQL over indexed blockchain data for dashboards, reports, and market analytics | [sql-explorer.md](quicknode/sql-explorer.md) | https://www.quicknode.com/docs/sql-explorer | https://www.quicknode.com/sql-explorer |
| HyperCore for Hyperliquid | Indexed Data | Hyperliquid L1 and HyperEVM infrastructure, market data, analytics, and trading apps | [hypercore-hyperliquid-reference.md](quicknode/hypercore-hyperliquid-reference.md) | https://www.quicknode.com/docs/hyperliquid | https://www.quicknode.com/chains/hyperliquid |
| Agent Identity (ERC-8004) | Indexed Data | On-chain agent discovery, capability advertising, and reputation records | [agent-identity-reference.md](quicknode/agent-identity-reference.md) | https://erc-8004.quicknode.com | https://erc-8004.quicknode.com |
| Blockbook | Indexed Data | Wallet-centric blockchain data via JSON-RPC, including balances, UTXOs, and transaction history | [blockbook-reference.md](quicknode/blockbook-reference.md) | https://www.quicknode.com/docs/bitcoin/blockbook/overview | https://www.quicknode.com/blockbook |
| Metaplex DAS API | Indexed Data | Solana Digital Asset Standard queries for NFTs, cNFTs, fungible tokens, and MPL Core assets | [metaplex-das-reference.md](quicknode/metaplex-das-reference.md) | https://www.quicknode.com/docs/solana/solana-das-api | https://www.quicknode.com/metaplex-das-api |
| Ordinals & Runes API | Indexed Data | Bitcoin inscriptions, satoshi data, Runes, collections, and UTXO tracking | [ordinals-runes-reference.md](quicknode/ordinals-runes-reference.md) | https://www.quicknode.com/docs/bitcoin/ord_getInscription | https://www.quicknode.com/ordinals-runes |
| Swap API | Trading & DeFi | Aggregated token swaps across Solana and EVM liquidity providers | [swap-api-reference.md](quicknode/swap-api-reference.md) | https://www.quicknode.com/docs/solana/metis-overview | https://www.quicknode.com/swap-api |
| Admin API | Platform | REST account and endpoint management, usage monitoring, and billing workflows | [admin-api-reference.md](quicknode/admin-api-reference.md) | https://www.quicknode.com/docs/admin-api | https://www.quicknode.com/admin-api |
| ChainKit | Platform | Chain launch or rollup infrastructure work led by operators | — | https://www.quicknode.com/docs | https://www.quicknode.com/chainkit |
| Key-Value Store | Platform | Serverless key-value and list storage for Streams, scripts, and dynamic address lists | [kv-reference.md](quicknode/kv-reference.md) | https://www.quicknode.com/docs/key-value-store | https://www.quicknode.com/docs/key-value-store |
| Quicknode SDK | Platform | Official SDK for Quicknode product APIs, plus RPC via Tooling Access or x402/MPP payments | [sdk-reference.md](quicknode/sdk-reference.md) | https://www.quicknode.com/docs/sdk | https://www.quicknode.com/sdk |
| x402 | Agent Surface | Stablecoin pay-per-request access for keyless RPC and AI agents | [x402-reference.md](quicknode/x402-reference.md) | https://www.quicknode.com/docs/build-with-ai/x402-payments | https://www.quicknode.com/agents |
| MPP | Agent Surface | IETF Payment Authentication based paid API access and high-volume agent sessions | [mpp-reference.md](quicknode/mpp-reference.md) | https://www.quicknode.com/docs/build-with-ai/mpp-payments | https://www.quicknode.com/agents |
| Agent Subscriptions | Agent Surface | Wallet-paid Quicknode account creation and full platform access for autonomous agents | [agent-subscriptions-reference.md](quicknode/agent-subscriptions-reference.md) | https://www.quicknode.com/docs/build-with-ai/agent-subscriptions | https://www.quicknode.com/agents |
| Quicknode CLI | Agent Surface | Terminal automation for endpoints, Streams, Webhooks, KV, and SQL, plus RPC via Tooling Access or x402/MPP payments | [cli-reference.md](quicknode/cli-reference.md) | https://www.quicknode.com/docs/cli | https://www.quicknode.com/cli |
| Quicknode MCP | Agent Surface | Native Claude/OpenAI connector and generic MCP server for read-only blockchain RPC and Quicknode Admin API workflows | [mcp-reference.md](quicknode/mcp-reference.md) | https://www.quicknode.com/docs/build-with-ai/quicknode-mcp | https://www.quicknode.com/mcp |
| Solana Validator | Trading & DeFi | Human/operator-managed Solana validator infrastructure | — | https://www.quicknode.com/docs | https://www.quicknode.com/chains/solana/validator |
| Monad Validator | Trading & DeFi | Human/operator-managed Monad validator infrastructure | — | https://www.quicknode.com/docs | https://www.quicknode.com/chains/monad/validator |

## Selection Guidance

### Core RPC API

Use Core RPC API for normal chain reads, transaction submission, gas/fee estimation, and library connections. See [rpc-reference.md](quicknode/rpc-reference.md) for method tables, WebSocket patterns, and batch examples.

- Generic starters should use `RPC_URL` and `WS_RPC_URL`.
- Use `QUICKNODE_RPC_URL` only when the instructions are Quicknode-specific.
- For browser dApps, read [security-and-production.md](security-and-production.md) before shipping a client-visible endpoint.

### Streams And Webhooks

Use Streams when the app needs a push pipeline instead of polling RPC. Use Webhooks for simpler event notifications to one HTTP destination. See [streams-reference.md](quicknode/streams-reference.md), [streams-backfills-reference.md](quicknode/streams-backfills-reference.md), and [webhooks-reference.md](quicknode/webhooks-reference.md).

- Choose Streams for custom JavaScript filtering, transforms, high volume, multiple destinations, replay, or historical backfill. Streams can also be used for simple event notifications, but Webhooks are easier to set up and maintain for single-destination alerts.
- Good Webhooks fit: wallet watchlists, transaction status alerts, balance movement alerts, and lightweight notifications.
- Streams and Webhooks datasets are confirmed, post-block data only. For mempool/pending-transaction visibility (e.g. MEV-aware alerting), use Core RPC API's WebSocket subscriptions instead — see [rpc-reference.md](quicknode/rpc-reference.md#websocket-patterns).

### Solana gRPC And Blazar WSS

Use Solana gRPC for low-latency Solana account, transaction, slot, and block streams. Use Blazar WSS for Quicknode-built Solana WebSocket subscriptions when the app needs fast block, account, transaction, or slot updates without a full gRPC integration. See [solana-grpc-reference.md](quicknode/solana-grpc-reference.md).

- It is acceptable to mention Yellowstone client package names when the ecosystem uses them.
- Prefer Solana gRPC when the user needs richer Geyser-style streaming or gRPC client semantics.

### HyperCore For Hyperliquid And HyperCore gRPC

Use HyperCore for Hyperliquid when building trading bots, orderbook displays, portfolio trackers, market analytics, or HyperEVM apps. Use HyperCore gRPC for real-time Hyperliquid L1 streams such as trades, order book diffs, events, and blocks. See [hypercore-hyperliquid-reference.md](quicknode/hypercore-hyperliquid-reference.md).

- Distinguish Hyperliquid L1/HyperCore data from HyperEVM JSON-RPC needs.
- Keep order placement behind explicit user confirmation and dry-run paths.
- Use SQL Explorer or Streams for analytics and downstream processing when appropriate.

### SQL Explorer And Indexed APIs

Use SQL Explorer for historical analytics, dashboards, reports, leaderboards, backtests, and market intelligence. Use specialized indexed APIs when raw RPC would require building an indexer. See [sql-explorer.md](quicknode/sql-explorer.md) for table schemas and pre-built queries.

- Metaplex DAS API: Solana NFTs, cNFTs, fungible tokens, MPL Core, ownership, and asset search. See [metaplex-das-reference.md](quicknode/metaplex-das-reference.md).
- Blockbook: wallet-centric Bitcoin/UTXO balances and transaction history. See [blockbook-reference.md](quicknode/blockbook-reference.md).
- Ordinals & Runes API: inscriptions, satoshi data, Runes, and collection data. See [ordinals-runes-reference.md](quicknode/ordinals-runes-reference.md).
- Agent Identity: ERC-8004 identity, discovery, and reputation records. See [agent-identity-reference.md](quicknode/agent-identity-reference.md).
- Scope SQL queries by time, block range, account, market, contract, or chain before writing SQL.

### Swap API

Use Swap API when the app needs token quotes, route selection, or swap transactions through supported Solana and EVM liquidity providers. See [swap-api-reference.md](quicknode/swap-api-reference.md).

- Treat generated swap transactions as writes; require explicit confirmation before submitting or spending funds.
- Surface slippage, token addresses, chain, amount, and recipient before any transaction is signed.

### Agent Surface And Automation

Use [agent-access-and-automation.md](agent-access-and-automation.md) for x402, MPP, Agent Subscriptions, Admin API, Quicknode SDK, Quicknode CLI, and Quicknode MCP.

### Human-Operated Products

Dedicated Clusters, Validator as a Service, ChainKit, Solana Validator, and Monad Validator are usually operator or sales-assisted infrastructure choices. Mention them when relevant, but do not present them as an agent-provisioned default unless the user's account tooling clearly supports that action.

## Scope Defaults

- Prefer full guidance for products an agent can directly use in an app, script, or infrastructure workflow.
- Keep human/operator-heavy products as catalog entries with links unless the user explicitly asks for planning or sales-engineering style guidance.
- For endpoint add-ons, explain enablement at the capability level and link to the add-on catalog (https://www.quicknode.com/add-ons) or docs rather than inventing account-specific setup steps.
