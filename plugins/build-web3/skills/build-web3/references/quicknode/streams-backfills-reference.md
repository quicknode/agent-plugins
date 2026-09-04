# Streams Backfills Reference

Streams Backfills use Quicknode Streams to retrieve historical blockchain data over a selected block or slot range. They are part of the Streams workflow: choose a chain, dataset, range, optional filter, batching/compression settings, and a destination.

**Product:** https://www.quicknode.com/streams/backfills
**Docs:** https://www.quicknode.com/docs/streams/backfilling

## When to Use Backfills

- Populate a database or index with historical chain data.
- Recover data after a destination outage or missed ingestion window.
- Reprocess historical blocks after changing a filter function.
- Run analytics, compliance, or audit jobs over a bounded historical range.

## How It Works

1. Select the chain and network supported by Streams.
2. Pick the dataset, such as EVM blocks, logs, receipts, traces, Solana blocks, Bitcoin blocks, or XRPL ledgers.
3. Define the start block/slot and end block/slot. Set the end to `-1` to run the range and then continue into live delivery.
4. Add a filter function when only a subset of the data should be delivered.
5. Configure batching and compression for high-volume historical delivery.
6. Choose a destination: `webhook`, `s3`, `azure`, `postgres`, or `kafka`.
7. Test the destination and filter, then start the Stream.

## What an Agent Should Ask For

| Field | Required | Notes |
|-------|----------|-------|
| Chain/network | Yes | `<chain>-<network>`, e.g. `ethereum-mainnet`, `base-mainnet`, `solana-mainnet`, `bch-mainnet`, `xrp-mainnet`. An invalid key is rejected with the full list of valid keys |
| Dataset | Yes | Kebab-case slug, e.g. `block`, `transactions`, `logs`, `receipts`, `trace-blocks` |
| Start block/slot | Yes | Historical lower bound |
| End block/slot | Yes | Historical upper bound. `-1` runs the backfill then continues into live delivery |
| Destination | Yes | One of `webhook`, `s3`, `azure`, `postgres`, `kafka` |
| Filter function | Optional | Use for server-side filtering/transformation |
| Batching/compression | Recommended | Important for high-volume backfills |

## Dataset Notes

### EVM Chains

Dataset slugs are kebab-case on the CLI and SDK and snake_case on the REST API: `trace-blocks` goes on the wire as `trace_blocks`. The EVM values are `block`, `block-with-receipts`, `transactions`, `logs`, `receipts`, `debug-traces`, `trace-blocks`, `block-with-receipts-debug-trace`, and `block-with-receipts-trace-block`. Availability can vary by chain and plan.

**Test:** `ethereum-mainnet` · block `21000000` — all nine slugs above pass `qn stream test-filter`; `debug_trace` and `trace_block` are rejected by the CLI's own enum

The CLI and SDK also offer `blob-sidecars`, which the API rejects. `block_with_beacon` is accepted by the API but is missing from both client enums, so it is reachable only over REST.

`decodeEVMReceipts(receipts, abis)` is available as a global inside a Streams filter. `abis` is an array of ABI arrays, one per contract; a single ABI array passed directly throws `TypeError`. It returns the receipts with a `decodedLogs` array added to each one, and leaves `logs` untouched. Each entry in `decodedLogs` carries `name`, `address`, `blockNumber`, `transactionHash`, `logIndex`, and the decoded event parameters flattened alongside them. Receipts with no matching log get no entries.

### Solana

Streams supports Solana historical slot ranges on paid plans. The dataset slugs are `block` and `programs-with-logs`. Very large Solana backfills should usually be scoped to a specific time window, account, program, or filter.

### Bitcoin

Bitcoin and Bitcoin Cash backfills use the `block` dataset with UTXO-oriented payloads, including Blockbook-backed block data. The network keys are `bitcoin-mainnet` and `bch-mainnet`.

**Test:** `bitcoin-mainnet` and `bch-mainnet` · block `800000`, and `xrp-mainnet` · ledger `80000000` — all three pass `qn stream test-filter`; `bitcoin-cash-mainnet` and `xrpl-mainnet` are rejected with the full list of valid keys

## Cost and Performance

- Backfills consume API credits based on blocks processed and dataset multipliers.
- Filtering reduces delivered payloads, but credits are still based on processed blocks.
- Credits are charged as network x dataset multiplier x blocks processed. The API Credits Calculator is on https://www.quicknode.com/docs/streams/billing.
- Increase `datasetBatchSize` (CLI `--batch-size`) for historical ingestion when the destination can handle larger payloads.
- Set `compression` to `gzip` for large payloads. Compression is a destination attribute, not a Stream-level setting, and Kafka names the field `compressionType`.
- Set `elasticBatchEnabled` (CLI `--elastic-batch-enabled true`) if the Stream should transition from historical catch-up into low-latency live delivery.

## Automation Guidance

Use the Quicknode Streams REST API, SDK, or CLI to create and manage Streams programmatically. Backfills are a Streams configuration, not a separate REST resource: there is no `/backfills` endpoint. Create a Stream with the desired historical range instead.

CLI example, webhook destination:

```bash
qn stream create \
  --name ethereum-usdc-backfill \
  --network ethereum-mainnet \
  --dataset logs \
  --start 17811625 \
  --end 17821625 \
  --region usa-east \
  --webhook https://example.com/streams
```

`qn stream create` builds a webhook destination only. For `s3`, `azure`, `postgres`, or `kafka`, pass `--stream-config-file <path>` holding a full `CreateStreamParams` JSON object; every other flag is ignored when it is supplied. In that object `startRange`, `endRange`, `datasetBatchSize`, and `elasticBatchEnabled` are required, and `compression` sits inside `destinationAttributes`.

## Documentation

- **Streams Backfills**: https://www.quicknode.com/docs/streams/backfilling
- **Backfill Templates**: https://www.quicknode.com/streams/backfills
- **Streams Overview**: https://www.quicknode.com/docs/streams
- **Streams Data Sources**: https://www.quicknode.com/docs/streams/data-sources
- **Streams Destinations**: https://www.quicknode.com/docs/streams/destinations
- **Streams Filters**: https://www.quicknode.com/docs/streams/filters
- **Streams Billing**: https://www.quicknode.com/docs/streams/billing
