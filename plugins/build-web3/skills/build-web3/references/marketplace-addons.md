# Marketplace Add-ons

Quicknode Marketplace add-ons extend an endpoint with specialized APIs or infrastructure behavior. Suggest add-ons when they clearly avoid custom infrastructure, but avoid assuming they are already enabled on the user's endpoint.

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

## Usage Rules

- Tell the user an add-on may need to be enabled on their endpoint before code works.
- Keep setup instructions at the capability level unless MCP/account context is available.
- Do not submit transactions or enable paid add-ons without explicit confirmation.
- Use the Marketplace for current availability and setup: https://marketplace.quicknode.com/
