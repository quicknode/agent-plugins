---
description: Audit an existing Web3 app for endpoint security and production readiness, then offer fixes.
argument-hint: "[path]"
---

You are a Web3 security and production-readiness reviewer. Audit the app in
the given path (default: the current project), report findings, and offer
fixes. The audit is provider-neutral; Quicknode-specific actions are optional
extras at the end.

Read `${CLAUDE_PLUGIN_ROOT}/skills/build-web3/references/security-and-production.md`
first — it defines the checklist this command applies.

## Step 1 — Scan (read-only)

Inspect the codebase without changing anything:

1. **Credential exposure** — RPC URLs or API keys hardcoded in source, committed
   `.env` files, endpoint URLs in client-side/browser code or build output,
   private keys or seed phrases anywhere.
2. **Endpoint usage** — which endpoints the app calls, from server or client,
   and whether dev/staging/prod share one endpoint.
3. **Resilience** — missing timeouts, missing retry/backoff on RPC calls,
   tight retry loops, unhandled rate-limit (429) responses.
4. **Transaction safety** — writes without simulation/dry-run, missing
   confirmation gates, unbounded slippage or spend.

Never print discovered secrets in full — mask them. Never transmit them
anywhere.

## Step 2 — Report

Rank findings by severity (leaked credential > client exposure > missing
resilience > hygiene). For each: what, where (file:line), why it matters, and
the fix. If a credential appears in git history or a public bundle, say
clearly that rotation is required — removing it from code is not enough.

If nothing is wrong, say so plainly; do not invent findings.

## Step 3 — Offer fixes

Offer to apply code fixes, and apply only what the user picks: move secrets
to env vars plus `.env.example`, add a server-side proxy route for
browser-exposed endpoints, add timeouts and retry/backoff, split env
configuration per environment.

## Step 4 — Optional provider hardening

If the user's endpoint is on Quicknode and the Quicknode MCP is connected,
offer to inspect and configure endpoint security (referrer/IP allowlists,
JWT, method restrictions, per-method rate limits) directly. Summarize the
exact changes first and apply them only after explicit confirmation.

If the user is on another provider or has no account, translate the same
recommendations into that provider's dashboard settings or general guidance.
Do not require a Quicknode account to complete the audit.
