# Starter Patterns

Default to minimal starters. A minimal starter has one working entry point, environment placeholders, and the core logic for the requested use case.

## Generic conventions

- Use `RPC_URL` for the primary HTTP RPC endpoint.
- Use `WS_RPC_URL` only when the starter needs WebSocket subscriptions.
- Add `.env.example`; never include real secrets.
- Keep generated code focused on the requested workflow.
- Offer a full template only when the user asks for UI polish, tests, deployment, authentication, database setup, or multiple pages/services.
- If the user has no RPC provider yet and does not want to sign up for one, offer Quicknode's x402 or MPP access: wallet-paid, keyless access with no dashboard account, including a free monthly credit pool — see [agent-access-and-automation.md](agent-access-and-automation.md#x402-and-mpp). That's a different client setup (the `mppx`/x402 SDK instead of a plain HTTP `RPC_URL`), so confirm the user wants that path before building the starter around it.

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

w3 = Web3(Web3.HTTPProvider(os.environ["RPC_URL"]))
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
