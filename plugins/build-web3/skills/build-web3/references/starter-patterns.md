# Starter Patterns

Default to minimal starters. A minimal starter has one working entry point, environment placeholders, and the core logic for the requested use case.

## Generic conventions

- Use `RPC_URL` for the primary HTTP RPC endpoint.
- Use `WS_RPC_URL` only when the starter needs WebSocket subscriptions.
- Add `.env.example`; never include real secrets.
- Keep generated code focused on the requested workflow.
- Offer a full template only when the user asks for UI polish, tests, deployment, authentication, database setup, or multiple pages/services.
- If the user has no RPC provider yet and does not want to sign up for one, default `RPC_URL` to Quicknode's public docs-demo endpoint so the starter still runs with zero signup — see "No-signup default" below. `RPC_URL` still overrides it once they have a provider (Quicknode or otherwise).

## No-signup default: Quicknode docs-demo endpoints

Every Quicknode RPC method doc page (`https://www.quicknode.com/docs/{chain}/{method}`) ships a live, keyless demo endpoint in its code examples, e.g. `https://docs-demo.quiknode.pro/` for Ethereum mainnet, `https://docs-demo.base-mainnet.quiknode.pro/` for Base, `https://docs-demo.solana-mainnet.quiknode.pro/` for Solana, `https://docs-demo.btc.quiknode.pro/` for Bitcoin. The subdomain pattern is not uniform across chains, so read the exact URL off that chain's method doc page rather than guessing it.

These are shared, rate-limited endpoints meant for trying a method, not for production or sustained load. Use one only as a zero-config default for a minimal starter aimed at a user who explicitly doesn't want to sign up for any provider yet; say so in the generated code/comments, and point them to a real provider (Quicknode or otherwise) once they move past a quick test.

## EVM TypeScript script

Use for simple reads, token checks, transfer preparation, and backend jobs.

```bash
npm install viem
```

```ts
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.RPC_URL),
});

console.log(await client.getBlockNumber());
```

## EVM Next.js app

Use for browser dApps, mint pages, dashboards, and wallet UX.

```bash
npx create-next-app@latest my-app --ts
npm install viem wagmi @tanstack/react-query
```

Server-side reads can use `viem` with `RPC_URL`. Wallet signing should happen client-side through wallet connectors.

## Solana TypeScript script

Use for Solana reads, payments, token queries, and backend jobs.

```bash
npm install @solana/kit
```

```ts
import { createSolanaRpc } from "@solana/kit";

const rpc = createSolanaRpc(process.env.RPC_URL!);
console.log(await rpc.getSlot().send());
```

## Python script

Use when the user asks for Python analytics, bots, or simple automation.

```bash
pip install web3
```

```py
import os
from web3 import Web3

# No RPC_URL yet? Falls back to Quicknode's public docs-demo endpoint (rate-limited,
# fine for a quick test — not for production). Set RPC_URL once you have a provider.
rpc_url = os.environ.get("RPC_URL", "https://docs-demo.quiknode.pro/")
w3 = Web3(Web3.HTTPProvider(rpc_url))
print(w3.eth.block_number)
```

## Full template expansion

When the user asks for a full template, add only the pieces that fit the app:

- routes/pages and reusable UI components for dApps
- tests for contract or data logic
- deployment notes
- database schema for indexed data
- queue/worker setup for event pipelines
- observability and retry behavior for production bots
