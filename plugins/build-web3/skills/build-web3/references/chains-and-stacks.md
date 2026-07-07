# Chains And Stacks

Use this reference to choose the chain, network, and starter stack. Default to a
testnet/devnet unless the user explicitly asks for mainnet.

## EVM

Good for Solidity contracts, wallets, NFTs, token tools, DeFi, and broad
ecosystem compatibility.

- Common chains: Ethereum, Base, Arbitrum, Optimism, Polygon, BNB Chain,
  Avalanche.
- Common testnets: Sepolia, Base Sepolia, Arbitrum Sepolia, Optimism Sepolia,
  Polygon Amoy.
- Default libraries: `viem` for reads/writes, `wagmi` for React wallet UX,
  `ethers` v6 only when requested or when a project already uses it.
- Default UI stack: Next.js + TypeScript for dApps; Node + TypeScript for bots
  and scripts.

## Solana

Good for high-throughput apps, low fees, payments, NFTs at scale, consumer apps,
and programs that use Solana's account model.

- Default network: devnet for prototypes.
- Default library: `@solana/kit`.
- Use wallet adapters in browser apps; never move wallet private keys into the
  backend.
- Add specialized asset or Geyser-style data access only when the app needs rich
  NFT/token queries or low-latency account/transaction streams.

## Hyperliquid

Good for trading bots, market data tools, strategy analytics, and apps that need
HyperCore or HyperEVM access.

- Treat HyperCore trading/data APIs and HyperEVM smart contract RPC as separate
  surfaces.
- Use TypeScript for app integrations and Python when the user is building
  research, analytics, or trading scripts.
- Prefer read-only market/account data until the user explicitly confirms order
  placement or wallet-funded actions.

## Decision shortcuts

- Existing Solidity contracts: choose an EVM chain.
- Consumer app with low fees: Base, Polygon, or Solana depending on ecosystem.
- Solana assets, payments, or high-throughput UX: Solana.
- Perps, market data, or strategy analytics: Hyperliquid.
- Unsure and prototyping: use the ecosystem the user already knows on testnet.
