# Key-Value Store Reference (Beta)

Quicknode KV Store is a serverless storage service for lists and key-value sets. It is primarily used from inside Streams filter functions via the `qnLib` helper library but is also accessible via REST API and the `qn kv` CLI commands.

**Docs:** https://www.quicknode.com/docs/key-value-store

## Access Methods

| Method | When to Use |
|--------|-------------|
| `qnLib` (inside Streams) | Read/write KV from a Streams filter function |
| REST API | Read/write KV from any external application |
| CLI (`qn kv`) | Inspect and manage KV from the terminal |

## qnLib — Stream Integration

`qnLib` is available inside Streams filter functions without any import. All calls are asynchronous and should be awaited from an `async function main(...)` filter.

Write helpers return the string `"OK"`. They return `"OK"` whether or not they changed anything, so the return value is not a success signal — read the value back to confirm. Option keys are snake_case (`add_items`, `remove_items`, `add_sets`, `delete_sets`); a camelCase key is ignored and the call still returns `"OK"`.

### List Operations

Manage lists of string items (e.g., a watchlist of wallet addresses). Items are returned sorted lexicographically, not in insertion order.

```javascript
// Create a list, or merge items into an existing one
await qnLib.qnUpsertList('my-watchlist', {
  add_items: ['0xAddr1', '0xAddr2'],
  remove_items: [],
});

// Add a single item
await qnLib.qnAddListItem('my-watchlist', '0xAddr3');

// Remove a single item
await qnLib.qnRemoveListItem('my-watchlist', '0xAddr1');

// Read the list — returns a plain array of strings
const items = await qnLib.qnGetList('my-watchlist');
// items → ['0xAddr2', '0xAddr3']

// All list keys on the account
const listKeys = await qnLib.qnGetAllLists();

// Check membership
const one = await qnLib.qnContainsListItem('my-watchlist', '0xAddr2');
// one → true
const many = await qnLib.qnContainsListItems('my-watchlist', ['0xAddr2', '0xAddr3']);
// many → [true, true]

// Delete the entire list — a subsequent qnGetList returns []
await qnLib.qnDeleteList('my-watchlist');
```

`qnUpsertList` merges into an existing list; it does not replace it. Delete the list first to replace its contents.

### Set Operations

Manage key-value pairs (string keys, string values).

```javascript
// Create a key-value set entry
await qnLib.qnAddSet('threshold', '500000');

// Read a value by key
const threshold = await qnLib.qnGetSet('threshold');
// threshold → "500000"

// Bulk create or update multiple pairs
await qnLib.qnBulkSets({
  add_sets: {
    threshold: '500000',
    alertEmail: 'ops@example.com',
  },
  delete_sets: [],
});

// List all set keys — array of key strings
const setKeys = await qnLib.qnListAllSets();

// Delete a single set entry
await qnLib.qnDeleteSet('threshold');
```

`qnGetSet` returns `null` for a key that does not exist. `qnAddValue`, `qnGetValue`, `qnDeleteValue`, `qnBulkValues`, and `qnListAllKeys` are aliases for the `…Set`/`…Sets` helpers and behave identically.

`qnLib` also exposes `getAccountId()`, and `signPayload`/`validatePayload` for webhook signatures.

## REST API

All REST requests use `https://api.quicknode.com/kv/rest/v1/` and authenticate via the `x-api-key` header.

Every response is wrapped in an envelope: `{ "code": 200, "msg": "…", "data": … }`, plus `cursor` on paginated reads. The payload is always under `data`. The envelope `code` is independent of the HTTP status — a successful write returns HTTP `201` with `code: 200`.

Request bodies use camelCase (`addItems`, `removeItems`). A snake_case key is ignored and the request still returns `200`.

### Read a value

```typescript
const response = await fetch(
  'https://api.quicknode.com/kv/rest/v1/sets/threshold',
  { headers: { 'x-api-key': process.env.QUICKNODE_API_KEY! } }
);
const { data } = await response.json();
// data → { key: 'threshold', value: '750000' }
```

**Test:** `GET /sets/{key}` — `data` is `{ key, value }`. There is no top-level `value`, so destructuring `{ value }` yields `undefined`

### Write a value

```typescript
const response = await fetch('https://api.quicknode.com/kv/rest/v1/sets', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.QUICKNODE_API_KEY!,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'threshold',
    value: '750000',
  }),
});
```

**Test:** `POST /sets` — HTTP `201` with body `{ code: 200, msg: 'Key value stored', data: null }`

### List all set keys

```typescript
const response = await fetch(
  'https://api.quicknode.com/kv/rest/v1/sets',
  { headers: { 'x-api-key': process.env.QUICKNODE_API_KEY! } }
);
const { data, cursor } = await response.json();
// data → [{ key: 'threshold', value: '750000' }, …]
```

**Test:** `GET /sets` — top-level keys are `code`, `msg`, `data`, `cursor`, and `data` is an array. There is no `keys` field

### List operations

```typescript
// Create a list
await fetch('https://api.quicknode.com/kv/rest/v1/lists', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.QUICKNODE_API_KEY!,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'allowlist',
    items: ['0xabc', '0xdef'],
  }),
});

// Read a list
const listResponse = await fetch(
  'https://api.quicknode.com/kv/rest/v1/lists/allowlist',
  { headers: { 'x-api-key': process.env.QUICKNODE_API_KEY! } }
);
const { data } = await listResponse.json();
// data → { items: ['0xabc', '0xdef'] }

// Add or remove items on an existing list
await fetch('https://api.quicknode.com/kv/rest/v1/lists/allowlist', {
  method: 'PATCH',
  headers: {
    'x-api-key': process.env.QUICKNODE_API_KEY!,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ addItems: ['0x123'], removeItems: ['0xabc'] }),
});

// Check one item from outside a Stream filter
const response = await fetch(
  'https://api.quicknode.com/kv/rest/v1/lists/allowlist/contains/0xabc',
  { headers: { 'x-api-key': process.env.QUICKNODE_API_KEY! } }
);
const { data: { exists } } = await response.json();
```

**Test:** `GET /lists/{key}/contains/{item}` — `data` is `{ exists: true }` for a member and `{ exists: false }` for a non-member. There is no `contains` field

`GET /lists` returns `{ data: { keys: [...] }, cursor }` — note `data` is an object here, while `GET /sets` returns `data` as an array.

## CLI — `qn kv`

```bash
# Get a value
qn kv set get threshold

# Set a value
qn kv set put threshold 750000

# List all set keys
qn kv set ls

# Delete a key
qn kv set delete threshold

# Add and/or delete several keys in one call
qn kv set bulk --add threshold=750000 --delete old_threshold

# Manage lists
qn kv list ls
qn kv list create allowlist 0xabc 0xdef
qn kv list append allowlist 0x123
qn kv list contains allowlist 0xabc
qn kv list get allowlist
qn kv list remove-item allowlist 0xabc
qn kv list update allowlist --add 0x456 --remove 0xdef
qn kv list delete allowlist
```

Every delete command needs `--yes` when no terminal is attached. Without it the
command exits non-zero with `operation requires confirmation; pass --yes to
proceed without an interactive prompt`, and nothing is deleted.

With `-o json`, the CLI does not use one envelope. Two of these five reads put
the payload at the top level, with no `data` wrapper:

| Command | Shape |
|---------|-------|
| `qn kv set list` | `{ data: [{ key, value }], cursor }` |
| `qn kv set get` | `{ value }` |
| `qn kv list ls` | `{ data: { keys: [...] }, cursor }` |
| `qn kv list get` | `{ data: { items: [...] }, cursor }` |
| `qn kv list contains` | `{ exists }` |

Read the field this table names for the command you ran. The REST envelope in
the section above does not apply to CLI output.

`qn kv set get` on a key that does not exist prints `Error: not found.` and
exits non-zero. It does not return an empty value.

**Test:** `qn kv set list` — 31 sets, each `{key, value}`; `qn kv list ls` — 14 lists under `data.keys`; `qn kv list contains <list> <absent>` — `{"exists": false}` at the top level

## Limits

| Limit | Value |
|-------|-------|
| Max key length | 255 characters |
| Max value length | 800,000 characters |
| Max items per list write | 1,500 (`addItems` + `removeItems` combined) |

**Test:** boundary-probed — a 255-character key returns `201` and 256 returns `400`; an 800,000-character value returns `201` and 800,001 returns `400`; a 1,500-item write returns `200` and 1,501 returns `400` with `total of addItems and removeItems is 1501, max allowed is 1500`

Exceeding a limit returns HTTP `400` with the limit named in `message`. Lists longer than 1,500 items are built with repeated writes; no total list length is enforced.

Limits are subject to change — check https://www.quicknode.com/docs/key-value-store for current values.

## Documentation

- **Key-Value Store Docs**: https://www.quicknode.com/docs/key-value-store
- **Quicknode CLI**: https://www.quicknode.com/docs/cli
- **Streams Integration**: https://www.quicknode.com/docs/streams
