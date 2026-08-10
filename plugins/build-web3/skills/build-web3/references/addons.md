# Add-ons

Quicknode add-ons extend an endpoint with specialized APIs or infrastructure behavior. Enable add-ons from the endpoint's **Add-ons** tab in the Quicknode dashboard, and browse the current catalog at https://www.quicknode.com/add-ons. Suggest add-ons when they clearly avoid custom infrastructure, but avoid assuming they are already enabled on the user's endpoint.

Several capabilities have their own deep reference in `references/quicknode/` — some are standalone Quicknode products, others are enabled per endpoint:

- [Metaplex DAS API](quicknode/metaplex-das-reference.md)
- [Swap API](quicknode/swap-api-reference.md)
- [Solana gRPC](quicknode/solana-grpc-reference.md)
- [Blockbook](quicknode/blockbook-reference.md)
- [Ordinals & Runes API](quicknode/ordinals-runes-reference.md)

## Common Add-ons

| Add-on | Use when |
|---|---|
| Solana Priority Fee API | The app needs current fee estimates for Solana transaction landing |
| Jito Bundles | The app needs Solana bundle submission or MEV-aware transaction delivery |
| Single Flight RPC | Many identical in-flight RPC reads should be deduplicated |
| Multi-region Transaction Broadcast | Latency-sensitive transaction propagation matters |
| Scorechain Risk Assessment API | Wallet or transaction risk scoring is required |
| Block Timestamp Lookup | The app needs timestamp-to-block range conversion |
| Multi-chain Stablecoin Balance API | Treasury, payment, or portfolio workflows need stablecoin balances across chains |
| Covalent GoldRush APIs | The app needs multi-chain wallet, token, or NFT summaries |

## Solana Add-ons

### Priority Fee API

Use `qn_estimatePriorityFees` to estimate Solana priority fees from recent blocks and, optionally, account-specific activity.

**Docs:** https://www.quicknode.com/docs/solana/qn_estimatePriorityFees

**Add-on page:** https://www.quicknode.com/add-ons/solana-priority-fee

```typescript
import { createSolanaRpc } from "@solana/kit";

const rpc = createSolanaRpc(process.env.QUICKNODE_RPC_URL!);

const response = await rpc.request("qn_estimatePriorityFees", {
  last_n_blocks: 100,
  account: "YourAccountPubkey...",
}).send();

console.log(response.result.per_compute_unit);
```

### Jito Bundles

Use Jito bundle methods for MEV-aware Solana transaction submission when the add-on is enabled.

**Docs:** https://www.quicknode.com/docs/solana/sendBundle

**Add-on page:** https://www.quicknode.com/add-ons/lil-jit-jito-bundles-and-transactions

```typescript
const result = await rpc.request("sendBundle", {
  transactions: [
    "Base64EncodedTx1...",
    "Base64EncodedTx2...",
  ],
}).send();

const status = await rpc.request("getBundleStatuses", {
  bundleIds: [result.bundleId],
}).send();
```

## Transaction Delivery Add-ons

### Single Flight RPC

Single Flight RPC deduplicates identical in-flight RPC requests so high-concurrency applications do not repeatedly send the same expensive request while the first one is still resolving.

**Add-on page:** https://www.quicknode.com/add-ons/single-flight-rpc

Use this when an application has request bursts for identical reads, for example many users loading the same token, NFT, or block state at once.

### Multi-region Transaction Broadcast

Multi-region Transaction Broadcast improves transaction propagation by broadcasting signed transactions across multiple regions.

**Add-on page:** https://www.quicknode.com/add-ons/multi-region-transaction-broadcast

Use this for latency-sensitive transaction submission. For EVM endpoints, prefer Quicknode custom broadcast methods documented in [rpc-reference.md](quicknode/rpc-reference.md) when available.

## Data and Risk Add-ons

### Scorechain Risk Assessment API

Scorechain Risk Assessment API provides wallet or transaction risk data for compliance, monitoring, and fraud analysis workflows.

**Add-on page:** https://www.quicknode.com/add-ons/risk-assessment-api

Use it when the user explicitly needs risk scoring or compliance context. Do not substitute it for standard wallet balance or transaction-history APIs.

### Block Timestamp Lookup

Block Timestamp Lookup maps timestamps to nearby block heights and can help agents translate human time windows into block ranges.

**Add-on page:** https://www.quicknode.com/add-ons/block-timestamp-lookup

For common EVM and Bitcoin timestamp-to-block workflows, also check Core RPC custom methods such as `qn_getBlockFromTimestamp` and `qn_getBlocksInTimestampRange`.

### Multi-chain Stablecoin Balance API

Multi-chain Stablecoin Balance API returns stablecoin balances across supported chains for portfolio, treasury, and payments workflows.

**Add-on page:** https://www.quicknode.com/add-ons/multi-chain-stablecoin-balance-api

Use it when the desired output is specifically stablecoin exposure across chains.

### Covalent GoldRush Wallet/Data APIs

Covalent GoldRush APIs provide wallet and token/NFT portfolio data across many chains.

**Add-on page:** https://www.quicknode.com/add-ons/covalent-wallet-api

Use it for multi-chain wallet summaries, portfolio views, token balances, or transaction histories when the endpoint has the GoldRush add-on enabled.

## Usage Rules

- Tell the user an add-on may need to be enabled on their endpoint before code works.
- Keep setup instructions at the capability level unless MCP/account context is available.
- Do not submit transactions or enable paid add-ons without explicit confirmation.
- Use the add-on catalog for current availability and setup: https://www.quicknode.com/add-ons
