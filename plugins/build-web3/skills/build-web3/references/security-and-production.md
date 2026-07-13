# Security And Production

Use this reference before wiring a real endpoint into an app, and always before moving from testnet to mainnet. The concepts are provider-neutral; the last section maps them to Quicknode.

## Where does the endpoint URL live?

The single highest-impact decision. An RPC URL with an embedded key is a credential.

- **Server-side only (preferred):** keep the URL in a server env var. Browser code calls your own backend or framework API route, which proxies the few RPC calls the UI needs. Nothing secret ships to the client.
- **Client-visible:** wallet-driven dApps often call the chain directly from the browser, which means the endpoint URL ships in the JS bundle and anyone can extract and reuse it. This is workable only when the endpoint is hardened (below). Never reuse a client-visible endpoint for backend jobs.

Anything bundled, deployed, or committed is public. Treat a leaked endpoint URL like a leaked API key: rotate it.

## Hardening a client-visible endpoint

Most managed providers support some combination of these controls. Layer them; none is sufficient alone.

- **Referrer/origin allowlist** — only requests claiming to come from your domains are served. Cheap to enable and stops casual copy-paste abuse, but headers can be spoofed by non-browser clients; treat it as a deterrent, not authentication.
- **Domain masking** — serve the endpoint from your own domain so the provider URL and key never appear in client code.
- **JWT authentication** — requests must carry a token your backend signs. Strong protection when you have a backend that can issue short-lived tokens.
- **IP allowlist** — for server-side consumers with stable egress IPs. Not applicable to browser traffic.
- **Method restrictions** — disable methods the app never calls, especially expensive ones (large log scans, trace/debug methods, batch state reads).
- **Per-method rate limits** — cap the expensive methods you do need, so a leaked URL has a bounded blast radius.

Default recipe for a public dApp endpoint: referrer allowlist + method restrictions + per-method rate limits, and JWT when a backend exists.

## Environment and key hygiene

- Use separate endpoints (and keys) for development, staging, and production. A leaked dev URL then costs nothing.
- Keep secrets in `.env` files that are gitignored; ship `.env.example` with placeholders only.
- Rotate endpoint URLs/keys on any suspected leak and on team departures.
- Give automation the least privilege available — read-only or viewer-scoped credentials unless the task provisions resources.

## Production readiness

- Handle rate-limit responses (HTTP 429 / provider error codes) with retries and exponential backoff plus jitter; never tight-loop on failures.
- Set request timeouts and fail fast; a hung RPC call should not hang the app.
- Watch usage and set alerts before launch, so abuse or a runaway loop shows up as a graph, not an invoice.
- For transaction-submitting apps, simulate or dry-run first, and surface failures to the user instead of silently retrying writes.

## With Quicknode

Quicknode exposes all of the above per endpoint: additional auth tokens, JWT, referrer allowlists, domain masking, IP allowlists, method restrictions, and per-method plus endpoint-level rate limits. They can be configured in the dashboard (endpoint Security tab), via the Admin API, or by this plugin's bundled MCP server (security rules, security options, and rate-limit tools).

When the user has the Quicknode MCP connected, offer to apply the hardening recipe for them — but only change security or rate-limit configuration after explicit confirmation, and summarize exactly what will change first. Prefer viewer-scoped access for inspection; admin scope only when the user asks for changes.

For current feature details and setup walkthroughs, use the official docs (https://www.quicknode.com/docs/) and the local Quicknode product references rather than restating perishable implementation details here.
