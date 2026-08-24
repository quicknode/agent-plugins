# Quicknode Streams Reference

Streams provide real-time & historical blockchain data pipelines that filter, transform, and deliver data to various destinations.

## Stream Architecture

```
Blockchain → Quicknode → Filter Function → Transform → Destination
              Node                                      (Webhook/S3/DB)
```

## Stream Types

When creating a stream via the API, specify the `dataset` parameter. The API
validates this against a closed enum and rejects anything else with HTTP 400, so
the value must match exactly. The authoritative list is the `dataset` enum in
<https://api.quicknode.com/streams/rest/openapi.json>.

| Stream Type | `dataset` Value |
|-------------|----------------|
| Block | `block` |
| Block with Receipts | `block_with_receipts` |
| Transactions | `transactions` |
| Logs | `logs` |
| Receipts | `receipts` |
| Traces (`trace_block`) | `trace_blocks` |
| Traces (`debug_trace`) | `debug_traces` |
| Block + Receipts + `debug_trace` | `block_with_receipts_debug_trace` |
| Block + Receipts + `trace_block` | `block_with_receipts_trace_block` |
| Block with Beacon | `block_with_beacon` |
| Solana Programs + Logs | `programs_with_logs` |
| XRPL Ledger | `ledger` |
| HyperCore Events | `events` |
| HyperCore Orders | `orders` |
| HyperCore Events + Orders | `events_with_orders` |
| HyperCore Trades | `trades` |
| HyperCore Book Updates | `book_updates` |
| HyperCore TWAP | `twap` |
| HyperCore Writer Actions | `writer_actions` |

Availability varies by chain and plan — see
[Data Sources](https://www.quicknode.com/docs/streams/data-sources).

## Payload Shape: `stream.data` Nesting

`stream.data` is **always an array**, and its nesting depth depends on the
dataset. Treating it as a single object silently yields `undefined` — or throws
partway through the filter — so index to the depth the dataset actually uses.

The **outer dimension is the batch**: `stream.data.length` equals the number of
blocks delivered, which is `dataset_batch_size` (default `1`). Indexing
`stream.data[0]` only ever reads the first block, so it silently drops the rest
on any stream with a batch size above 1 — iterate instead.

| `dataset` | Structure | Iterate |
|-----------|-----------|---------|
| `block` | `data[block]` | `for (const block of stream.data)` |
| `block_with_receipts` | `data[block]` → `{ block, receipts }` | `for (const entry of stream.data)` |
| `transactions` | `data[block][tx]` | nest 2 loops |
| `receipts` | `data[block][receipt]` | nest 2 loops |
| `programs_with_logs` | `data[slot][tx]` | nest 2 loops |
| `logs` | `data[block][tx][log]` | nest 3 loops |

Note the middle dimension for `logs`: logs are grouped **per transaction**, not
flat per block. On Ethereum block 21000000 the block's entry holds 181 groups —
one per transaction — and every log in a group shares one `transactionHash`.

> **Verify before deploying.** Run every filter through
> `POST /streams/test_filter` (or `qn stream test-filter`) against a known block
> and assert the item count. A filter that returns `null` because it crashed is
> indistinguishable from one that correctly matched nothing.

### Block Streams

**Test:** `ethereum-mainnet` · block `21000000` — 1 entry, `transactionCount: 181`

Receive full block data including all transactions.

```javascript
function main(stream) {
  return stream.data.map(block => ({
    blockNumber: block.number,
    timestamp: block.timestamp,
    transactionCount: block.transactions.length,
    gasUsed: block.gasUsed,
    baseFeePerGas: block.baseFeePerGas
  }));
}
```

### Transaction Streams

**Test:** `ethereum-mainnet` · block `21000000` — 1 transaction over 10 ETH

Receive every transaction in the block. `stream.data` is `data[block][tx]`, so
each entry of `stream.data` is that block's array of transactions — one
invocation covers many transactions, and possibly many blocks.

```javascript
function main(stream) {
  const threshold = BigInt('10000000000000000000'); // 10 ETH
  const large = [];

  for (const txs of stream.data) {
    for (const tx of txs) {
      if (BigInt(tx.value || '0') > threshold) large.push(tx);
    }
  }

  if (large.length === 0) return null; // Filter out

  return large.map((tx) => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
    gasPrice: tx.gasPrice
  }));
}
```

### Logs Streams

**Test:** `ethereum-mainnet` · block `21000000` — 187 Transfer logs

Receive contract event logs.

```javascript
function main(stream) {
  const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

  const transfers = [];

  // data[block][tx][log]
  for (const blockLogs of stream.data) {
    for (const txLogs of blockLogs) {
      for (const log of txLogs) {
        if (log.topics[0] !== TRANSFER_TOPIC) continue;

        transfers.push({
          contract: log.address,
          from: '0x' + log.topics[1].slice(26),
          to: '0x' + log.topics[2].slice(26),
          value: log.data,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash
        });
      }
    }
  }

  if (transfers.length === 0) return null;

  return transfers;
}
```

### Receipt Streams

**Test:** `ethereum-mainnet` · block `21000000` — 181 receipts

Receive every receipt in the block. `stream.data` is `data[block][receipt]`, so
each entry of `stream.data` is that block's array of receipts.

```javascript
function main(stream) {
  const out = [];

  for (const receipts of stream.data) {
    for (const receipt of receipts) {
      out.push({
        transactionHash: receipt.transactionHash,
        status: receipt.status === '0x1' ? 'success' : 'failed',
        gasUsed: receipt.gasUsed,
        effectiveGasPrice: receipt.effectiveGasPrice,
        logsCount: receipt.logs.length
      });
    }
  }

  return out;
}
```

## Filter Functions

### Function Signature

**Test:** `ethereum-mainnet` · block `21000000` — `blocksInBatch: 1`

`main(stream)` receives one object with exactly two keys: `data` and `metadata`.

```javascript
function main(stream) {
  // stream.data — ALWAYS an array of the batch's items, never a bare object.
  //   Nesting depends on the dataset (see Payload Shape above):
  //   The outer dimension is the batch — one entry per block delivered.
  //     block, block_with_receipts  ->  each entry is the object
  //     transactions, receipts      ->  each entry is an array of items
  //     logs                        ->  each entry is an array of per-tx log arrays
  const data = stream.data;

  // stream.metadata — every key is snake_case:
  //   network, dataset, stream_id, stream_name, stream_region,
  //   start_range, end_range, batch_start_range, batch_end_range,
  //   keep_distance_from_tip, data_size_bytes, reorgs, blocks_reorged
  const { network, batch_start_range: block } = stream.metadata;

  // Return the payload to deliver, or null to deliver nothing for this batch.
  return { network, block, blocksInBatch: data.length };
}
```

### Available Utilities

**Test:** `ethereum-mainnet` · block `21000000` — `decimal: 253432`

```javascript
function main(stream) {
  const tx = stream.data[0][0]; // first tx of the first block in the batch

  // BigInt for large numbers
  const value = BigInt(tx.value);

  // Hex conversions
  const decimal = parseInt(tx.gas, 16);

  // String operations
  const address = tx.to.toLowerCase();

  return { value: value.toString(), decimal, address };
}
```

### Complex Filter Example

**Test:** `ethereum-mainnet` · block `21000000` — 22 swaps

> **Filter swaps by topic, not by router address.** A `Swap` event's
> `log.address` is the **pool/pair** contract that emitted it, never the router
> the user called. Matching on router addresses yields zero results — on
> Ethereum block 21000000 there are 22 `Swap` events and none are emitted by a
> router. Identify the DEX by event signature, then map the pool address if you
> need to.

```javascript
function main(stream) {
  const SWAP_TOPICS = {
    '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822': 'uniswap-v2', // and V2 forks (SushiSwap, …)
    '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67': 'uniswap-v3',
  };

  const swaps = [];
  for (const blockLogs of stream.data) {
    for (const txLogs of blockLogs) {
      for (const log of txLogs) {
        if (SWAP_TOPICS[log.topics[0]]) swaps.push(log);
      }
    }
  }

  if (swaps.length === 0) return null;

  return swaps.map(log => ({
    amm: SWAP_TOPICS[log.topics[0]],
    pool: log.address,          // the pair/pool, not the router
    txHash: log.transactionHash,
    blockNumber: log.blockNumber,
    data: log.data
  }));
}
```

## Destinations

### Webhook

Send data to HTTP endpoints.

**Configuration:**
```json
{
  "type": "webhook",
  "url": "https://your-server.com/webhook",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "Content-Type": "application/json"
  },
  "retryPolicy": {
    "maxRetries": 3,
    "backoffMs": 1000
  }
}
```

**Payload Format:**
```json
{
  "streamId": "stream_abc123",
  "network": "ethereum-mainnet",
  "dataset": "block",
  "data": { /* your filtered/transformed data */ },
  "metadata": {
    "blockNumber": 18000000,
    "timestamp": 1693526400
  }
}
```

### Amazon S3

Store data in S3 buckets.

**Configuration:**
```json
{
  "type": "s3",
  "bucket": "your-bucket-name",
  "region": "us-east-1",
  "prefix": "blockchain-data/",
  "format": "json",
  "compression": "gzip",
  "credentials": {
    "accessKeyId": "YOUR_ACCESS_KEY",
    "secretAccessKey": "YOUR_SECRET_KEY"
  }
}
```

### PostgreSQL

Insert data directly into PostgreSQL.

**Configuration:**
```json
{
  "type": "postgresql",
  "connectionString": "postgresql://user:pass@host:5432/db",
  "table": "blockchain_events",
  "schema": {
    "tx_hash": "TEXT",
    "block_number": "BIGINT",
    "from_address": "TEXT",
    "to_address": "TEXT",
    "value": "NUMERIC",
    "timestamp": "TIMESTAMP"
  }
}
```

### Snowflake

Stream to Snowflake data warehouse.

**Configuration:**
```json
{
  "type": "snowflake",
  "account": "your-account",
  "warehouse": "COMPUTE_WH",
  "database": "BLOCKCHAIN_DATA",
  "schema": "PUBLIC",
  "table": "EVENTS",
  "credentials": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
  }
}
```

### Key-Value Store Integration

Streams filter functions can use the `qnLib` helper to persist state across invocations via the Key-Value Store. This enables use cases like tracking seen addresses, maintaining watchlists, or accumulating counters.

> **Important:** All `qnLib` methods are asynchronous and return Promises. Declare your filter function as `async function main(stream)` and use `await` on all `qnLib` calls.

```javascript
async function main(stream) {
  const txs = stream.data.flatMap(block => block);
  const senders = [...new Set(txs.map((t) => t.from))];

  const watched = new Set(await qnLib.qnContainsListItems('watchlist', senders));

  const hits = [];
  for (const tx of txs) {
    if (!watched.has(tx.from)) continue;
    // Store the transaction hash in a set for later retrieval
    await qnLib.qnAddSet('watched_txs', tx.hash, JSON.stringify({
      from: tx.from,
      to: tx.to,
      value: tx.value,
      block: tx.blockNumber
    }));

    hits.push({
      type: 'watchlist_hit',
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value
    });
  }

  return hits.length ? hits : null;
}
```

See the [Key-Value Store docs](https://www.quicknode.com/docs/key-value-store) for full `qnLib` method reference.

## EVM Stream Examples

### Monitor Specific Contract

**Test:** `ethereum-mainnet` · block `21000000` — 24 USDT events

```javascript
function main(stream) {
  const TARGET_CONTRACT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT

  const logs = [];
  for (const blockLogs of stream.data) {
    for (const txLogs of blockLogs) {
      for (const log of txLogs) {
        if (log.address.toLowerCase() === TARGET_CONTRACT.toLowerCase()) logs.push(log);
      }
    }
  }

  return logs.length > 0 ? { events: logs } : null;
}
```

### Track Whale Transactions

**Test:** `ethereum-mainnet` · block `21000280` — 1 whale (2143 ETH). Returns `null` on most blocks — 1000+ ETH transfers are rare

```javascript
function main(stream) {
  const WHALE_THRESHOLD = BigInt('1000000000000000000000'); // 1000 ETH

  const whales = [];
  for (const txs of stream.data) {
    for (const tx of txs) {
      if (BigInt(tx.value || '0') >= WHALE_THRESHOLD) whales.push(tx);
    }
  }

  if (whales.length === 0) return null;

  return whales.map((tx) => ({
    type: 'whale_transaction',
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    valueEth: (Number(BigInt(tx.value)) / 1e18).toFixed(2)
  }));
}
```

### NFT Transfer Tracking

**Test:** `ethereum-mainnet` · block `21000000` — 2 ERC-721 transfers

```javascript
function main(stream) {
  // ERC-721 Transfer event
  const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

  const nftTransfers = [];
  for (const blockLogs of stream.data) {
    for (const txLogs of blockLogs) {
      for (const log of txLogs) {
        if (log.topics[0] === TRANSFER_TOPIC && log.topics.length === 4) {
          nftTransfers.push(log); // ERC-721 has tokenId in topics[3]
        }
      }
    }
  }

  return nftTransfers.map(log => ({
    contract: log.address,
    from: '0x' + log.topics[1].slice(26),
    to: '0x' + log.topics[2].slice(26),
    tokenId: BigInt(log.topics[3]).toString(),
    txHash: log.transactionHash
  }));
}
```

## Solana Stream Examples

### Monitor Program Logs

**Test:** `solana-mainnet` · block `300000000` — 123 SPL Token transactions

```javascript
function main(stream) {
  const PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'; // SPL Token

  // data[slot][tx]; each tx has programInvocations[], logs[], signature, success
  const matches = [];
  for (const slotTxs of stream.data) {
    for (const tx of slotTxs) {
      if ((tx.programInvocations || []).some(inv => inv.programId === PROGRAM_ID)) {
        matches.push(tx);
      }
    }
  }

  if (matches.length === 0) return null;

  return matches.map(tx => ({
    signature: tx.signature,
    slot: tx.slot,
    success: tx.success,
    logs: tx.logs
  }));
}
```

### Track SOL Transfers

**Test:** `solana-mainnet` · block `300000000` — 389 balance deltas

```javascript
function main(stream) {
  const THRESHOLD = 1000000000000; // 1000 SOL in lamports

  // Balances are per-account on each instruction, as pre/postBalance pairs.
  const transfers = [];

  for (const slotTxs of stream.data) {
    for (const tx of slotTxs) {
      for (const inv of tx.programInvocations || []) {
        for (const acct of inv.instruction?.accounts || []) {
          const change = acct.postBalance - acct.preBalance;
          if (Math.abs(change) >= THRESHOLD) {
            transfers.push({ signature: tx.signature, account: acct.pubkey, change });
          }
        }
      }
    }
  }

  return transfers.length > 0 ? { transfers } : null;
}
```

## Stream Management API

### Create Stream

```bash
# filter_function must be base64-encoded source.
FILTER=$(printf 'function main(stream) { return stream.data; }' | base64)

curl -X POST https://api.quicknode.com/streams/rest/v1/streams \
  -H "x-api-key: $QUICKNODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Stream",
    "network": "ethereum-mainnet",
    "dataset": "receipts",
    "filter_function": "'"$FILTER"'",
    "filter_language": "javascript",
    "region": "usa_east",
    "start_range": 21000000,
    "end_range": -1,
    "dataset_batch_size": 1,
    "elastic_batch_enabled": false,
    "fix_block_reorgs": 0,
    "status": "active",
    "destination": "webhook",
    "destination_attributes": {
      "url": "https://your-server.com/webhook",
      "compression": "none",
      "max_retry": 3,
      "retry_interval_sec": 1,
      "post_timeout_sec": 10
    }
  }'
```

> All request fields are **snake_case**. `destination` is one of `webhook`,
> `s3`, `azure`, `postgres`, `kafka`; its settings go in a separate
> `destination_attributes` object. `region` is one of `usa_east`,
> `europe_central`, `asia_east`. Required on create: `name`, `network`,
> `dataset`, `filter_function`, `region`, `dataset_batch_size`,
> `elastic_batch_enabled`, `destination`, `destination_attributes`, `status`.
> `fix_block_reorgs` defaults to `0` (disabled) — set it explicitly if you need
> reorg handling.

### Test a Filter

Runs a filter against a real historical block without creating a stream. It is
read-only, costs nothing, and is the only way to confirm a filter works before
deploying it. `block` must be a **string**.

```bash
FILTER=$(printf 'function main(stream) { return { blocks: stream.data.length }; }' | base64)

curl -X POST https://api.quicknode.com/streams/rest/v1/streams/test_filter \
  -H "x-api-key: $QUICKNODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "network": "ethereum-mainnet",
    "dataset": "logs",
    "block": "21000000",
    "filter_function": "'"$FILTER"'"
  }'
```

A successful response is `{"logs": [...], "result": <your return value>}`, where
`logs` holds anything the filter wrote to `console.log`. **If the filter throws,
the call still returns HTTP 201** with the error nested inside `result`:

```json
{ "logs": [], "result": { "error": "Cannot read properties of undefined (reading '0')" } }
```

So always inspect `result.error` — a non-2xx status is not what signals a broken
filter. The CLI equivalent is:

```bash
qn stream test-filter --network ethereum-mainnet --dataset logs \
  --block 21000000 --filter-file ./filter.js --filter-language javascript
```

### List Streams

```bash
curl https://api.quicknode.com/streams/rest/v1/streams \
  -H "x-api-key: $QUICKNODE_API_KEY"
```

### Update Stream

```bash
curl -X PATCH https://api.quicknode.com/streams/rest/v1/streams/{streamId} \
  -H "x-api-key: $QUICKNODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "paused"
  }'
```

### Delete Stream

```bash
curl -X DELETE https://api.quicknode.com/streams/rest/v1/streams/{streamId} \
  -H "x-api-key: $QUICKNODE_API_KEY"
```

## Best Practices

1. **Start narrow** - Begin with specific filters, expand as needed
2. **Test locally** - Validate filter functions before deployment
3. **Handle errors** - Implement proper error handling in destinations
4. **Monitor health** - Check stream status regularly in dashboard
5. **Use batching** - Batch webhook deliveries for high-volume streams
6. **Idempotency** - Design consumers to handle duplicate deliveries

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| No data received | Filter too restrictive | Broaden filter conditions |
| Webhook failures | Endpoint unavailable | Check server health, increase timeout |
| Data lag | Processing backlog | Optimize filter function |
| Missing events | Incorrect topics | Verify event signatures |

## Documentation

- **Streams Overview**: https://www.quicknode.com/docs/streams
- **Streams Overview (llms.txt)**: https://www.quicknode.com/docs/streams/llms.txt
- **Filter Functions**: https://www.quicknode.com/docs/streams/filters
- **Destinations**: https://www.quicknode.com/docs/streams/destinations
- **API Reference**: https://www.quicknode.com/docs/streams/rest-api/getting-started
- **Guides**: https://www.quicknode.com/guides/tags/streams
