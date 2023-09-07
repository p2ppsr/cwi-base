# cwi-base

Base classes, types, utilities for implementation support of CWI components.

## API

<!-- INSERT GENERATED DOCS START -->

### `Chain` (type)

### `CwiError` (class)

Errors which extend CwiError implement `name` as an alternate getter for `code`,
and `message` as an alternate getter for `description`.

This supports catch handlers that might catch both
`Error` derived or `CwiErrorBase` derived errors.

Derived class constructors should use the derived class name as the value for `code`,
and an internationalizable constant string for `description`.

Optionaly, the derived class `description` can include template parameters passed in
to the constructor. See ERR_MISSING_PARAMETER for an example.

To avoid derived class name colisions, packages should include a package specific
identifier after the 'ERR*' prefix. e.g. 'ERR_DOJO*' as the prefix for Dojo specific error
classes.

### `ERR_NOT_IMPLEMENTED` (class)

Not implemented.

### `ERR_INTERNAL` (class)

An internal server error has occurred.

### `ERR_UNAUTHORIZED` (class)

Access is denied due to an authorization error.

### `ERR_INVALID_PARAMETER` (class)

The \${name} parameter is invalid.

### `ERR_MISSING_PARAMETER` (class)

The ${name} parameter is missing, but it must be ${mustBe}.

### `ERR_BAD_REQUEST` (class)

The request is invalid.

### `ERR_CHAIN` (class)

Configured chain is invalid or does not match across services.

### `ERR_CHAIN_INVALID` (class)

The current chain tip is not in sync with external sources.

### `ERR_TXID_INVALID` (class)

TXIDs must be 32 bytes encoded as 64 hex digits.

### `ERR_TXID_UNKNOWN` (class)

TXID failed to correspond to a known transaction.

### `wait` (function)

Returns an await'able Promise that resolves in the given number of msecs.

**Parameters:**

- msecs (`number`)

**returns:** Promise<void>

### `randomBytes` (function)

**Parameters:**

- count (`number`)

**returns:** Buffer

### `randomBytesHex` (function)

**Parameters:**

- count (`number`)

**returns:** string

### `randomBytesBase64` (function)

**Parameters:**

- count (`number`)

**returns:** string

### `randomMinMax` (function)

**Parameters:**

- min (`number`) - minimum value to return
- max (`number`) - greater than maximum value returned

**returns:** number

### `shuffleArray` (function)

This is not a cryptographically strong shuffle.
Run time is O(n)
Thanks to https://stackoverflow.com/a/2450976 for this

**Parameters:**

- array (`T[]`)

**returns:** T[]

### `asBuffer` (function)

Coerce a value to Buffer if currently encoded as a string

**Parameters:**

- val (`string | Buffer`)
- encoding (`BufferEncoding`) - defaults to 'hex'

**returns:** Buffer

### `asString` (function)

Coerce a value to string if currently a Buffer

**Parameters:**

- val (`string | Buffer`)
- encoding (`BufferEncoding`) - defaults to 'hex'

**returns:** string

### `sha256Hash` (function)

**Parameters:**

- buffer (`Buffer`)

### `doubleSha256HashLE` (function)

**Parameters:**

- buffer
- data (`string | Buffer`)
- encoding (`BufferEncoding`)

**returns:** Buffer

### `doubleSha256BE` (function)

**Parameters:**

- data (`string | Buffer`) - string or Buffer
- encoding (`BufferEncoding`)

**returns:** Buffer

### `swapByteOrder` (function)

**Parameters:**

- buffer (`Buffer`)

**returns:** Buffer

### `convertUint32ToBuffer` (function)

**Parameters:**

- num (`number`) - a number value in the Uint32 value range
- littleEndian (`boolean`) - true for little-endian byte order in Buffer

**returns:** Buffer

### `convertBufferToUint32` (function)

**Parameters:**

- buffer (`Buffer`) - four byte buffer with Uint32 number encoded
- littleEndian (`boolean`) - true for little-endian byte order in Buffer

**returns:** number

### `varUintSize` (function)

**Parameters:**

- val (`number`)

**returns:** number

### `readVarUint32LE` (function)

**Parameters:**

- buffer (`Buffer`)
- offset (`number`)

**returns:** { val: number; offset: number; }

### `writeVarUint32LE` (function)

**Parameters:**

- val (`number`)
- buffer (`Buffer`)
- offset (`number`)

**returns:** number

### `computeRootFromMerkleProofNodes` (function)

Computes merkle root from transaction hash and TSC proof data.

Note that it is essential to confirm that the txid is the double sha256 hash of
the transaction.

To prove that txid is the last transaction in its block, at every level,
if computed is left side, then provided must equal computed.

Specification Reference: https://tsc.bitcoinassociation.net/standards/merkle-proof-standardised-format/

**Parameters:**

- index (`number`) - index of transaction being proven in block
- txid (`string | Buffer`) - hash of transaction being proven
- nodes (`Buffer | string[]`) - tip to root, proof provided intermediate hash values

**returns:** Buffer

### `computeMerkleTreeParent` (function)

**Parameters:**

- leftNode (`string | Buffer`)
- rightNode (`string | Buffer`)

**returns:** Buffer

### `asBsvTx` (function)

Parse a bsv transaction encoded as a hex string, serialized Buffer to bsv.Tx
If tx is already a bsvTx, just return it.

**Parameters:**

- tx (`string | Buffer | Tx`)

**returns:** Tx

### `getInputTxIds` (function)

For a bitcoin transaction in hex string, Buffer or parsed bsv.Tx form:
Returns deduplicated array of the input's outpoint transaction hashes (txids).

**Parameters:**

- tx (`string | Buffer | Tx`)

**returns:** string[]

### `identityKeyFromPrivateKey` (function)

**Parameters:**

- privKey (`string`)

**returns:** string

### `maxDate` (function)

returns most recent of two dates or undefined if both are null or undefined.

**Parameters:**

- d1 (`Date`)
- d2 (`Date`)

**returns:** Date

### `minDate` (function)

returns least recent of two dates or undefined if either date is null or undefined.

**Parameters:**

- d1 (`Date`)
- d2 (`Date`)

**returns:** Date

### `BaseBlockHeader` (interface)

These are fields of 80 byte serialized header in order whose double sha256 hash is a block's hash value
and the next block's previousHash value.

All block hash values and merkleRoot values are 32 byte Buffer values with the byte order reversed from the serialized byte order.

**Members:**

- /\*\*

* 4 bytes
* @public
  \*/
  version (`number`) - 4 bytes

- // 32 bytes
  previousHash (`Buffer`)
- // 32 bytes
  merkleRoot (`Buffer`)
- // 4 bytes
  time (`number`)
- // 4 bytes
  bits (`number`)
- // 4 bytes
  nonce (`number`)

### `BaseBlockHeaderHex` (interface)

Like BlockHeader but 32 byte fields are hex encoded strings.

**Members:**

- version (`number`)
- previousHash (`string`)
- merkleRoot (`string`)
- time (`number`)
- bits (`number`)
- nonce (`number`)

### `BlockHeader` (interface)

A `BaseBlockHeader` extended with its computed hash and height in its chain.

**Members:**

- /\*\*
  - Height of the header, starting from zero.
    \*/
    height (`number`) - Height of the header, starting from zero.
- /\*\*
  - The double sha256 hash of the serialized `BaseBlockHeader` fields.
    \*/
    hash (`Buffer`) - The double sha256 hash of the serialized `BaseBlockHeader` fields.

### `BlockHeaderHex` (interface)

Like BlockHeader but 32 byte fields are hex encoded strings.

**Members:**

- height (`number`)
- hash (`string`)

### `LiveBlockHeader` (interface)

The "live" portion of the block chain is recent history that can conceivably be subject to reorganizations.
The additional fields support tracking orphan blocks, chain forks, and chain reorgs.

**Members:**

- /\*\*
  - The cummulative chainwork achieved by the addition of this block to the chain.
  - Chainwork only matters in selecting the active chain.
    \*/
    chainWork (`Buffer`) - The cummulative chainwork achieved by the addition of this block to the chain.
    Chainwork only matters in selecting the active chain.
- /\*\*
  - True only if this header is currently a chain tip. e.g. There is no header that follows it by previousHash or previousHeaderId.
    \*/
    isChainTip (`boolean`) - True only if this header is currently a chain tip. e.g. There is no header that follows it by previousHash or previousHeaderId.
- /\*\*
  - True only if this header is currently on the active chain.
    \*/
    isActive (`boolean`) - True only if this header is currently on the active chain.
- /\*\*
  - As there may be more than one header with identical height values due to orphan tracking,
  - headers are assigned a unique headerId while part of the "live" portion of the block chain.
    \*/
    headerId (`number`) - As there may be more than one header with identical height values due to orphan tracking,
    headers are assigned a unique headerId while part of the "live" portion of the block chain.
- /\*\*
  - Every header in the "live" portion of the block chain is linked to an ancestor header through
  - both its previousHash and previousHeaderId properties.
  -
  - Due to forks, there may be multiple headers with identical `previousHash` and `previousHeaderId` values.
  - Of these, only one (the header on the active chain) will have `isActive` === true.
    \*/
    previousHeaderId (`number`) - Every header in the "live" portion of the block chain is linked to an ancestor header through
    both its previousHash and previousHeaderId properties.

Due to forks, there may be multiple headers with identical `previousHash` and `previousHeaderId` values.
Of these, only one (the header on the active chain) will have `isActive` === true.

### `LiveBlockHeaderHex` (interface)

Like LiveBlockHeader but 32 byte fields are hex encoded strings.

**Members:**

- chainWork (`string`)
- isChainTip (`boolean`)
- isActive (`boolean`)
- headerId (`number`)
- previousHeaderId (`number`)

### `isLive` (function)

**Parameters:**

- header (`BlockHeader | LiveBlockHeader`)

**returns:** boolean

### `isBaseBlockHeader` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** boolean

### `isBlockHeader` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** boolean

### `isLiveBlockHeader` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** boolean

### `isBaseBlockHeaderHex` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** boolean

### `isBlockHeaderHex` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** boolean

### `isLiveBlockHeaderHex` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** boolean

### `toBaseBlockHeaderHex` (function)

**Parameters:**

- header (`BlockHeader | BaseBlockHeader | LiveBlockHeader`)

**returns:** BaseBlockHeaderHex

### `toBlockHeaderHex` (function)

**Parameters:**

- header (`BlockHeader | LiveBlockHeader`)

**returns:** BlockHeaderHex

### `toLiveBlockHeaderHex` (function)

**Parameters:**

- header (`LiveBlockHeader`)

**returns:** LiveBlockHeaderHex

### `toBaseBlockHeader` (function)

**Parameters:**

- header (`BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** BaseBlockHeader

### `toBlockHeader` (function)

**Parameters:**

- header (`BlockHeaderHex | LiveBlockHeaderHex`)

**returns:** BlockHeader

### `toLiveBlockHeader` (function)

**Parameters:**

- header (`LiveBlockHeaderHex`)

**returns:** LiveBlockHeader

### `blockHash` (function)

Computes double sha256 hash of bitcoin block header
bytes are reversed to bigendian order

If header is a Buffer, it is required to 80 bytes long
and in standard block header serialized encoding.

**Parameters:**

- header (`Buffer | BaseBlockHeader`)

**returns:** Buffer

### `serializeBlockHeader` (function)

Serializes a block header as an 80 byte Buffer.
The exact serialized format is defined in the Bitcoin White Paper
such that computing a double sha256 hash of the buffer computes
the block hash for the header.

**Parameters:**

- header (`BaseBlockHeader`)
- buffer (`Buffer`)
- offset (`number`)

**returns:** Buffer

### `deserializeBlockHeader` (function)

Deserialize a block header from an 80 byte buffer

**Parameters:**

- buffer (`Buffer`)
- offset (`number`)

**returns:** BaseBlockHeader

### `genesisHeaderHex` (function)

**Parameters:**

- chain (`Chain`)

**returns:** BlockHeaderHex

### `genesisBuffer` (function)

**Parameters:**

- chain (`Chain`)

**returns:** Buffer

### `normalizeProtocol` (function)

Protocol IDs are two element arrays: [level, name]

level is an integer value of 0, 1, or 2 specifying the protocol's counterparty permissions policy.

name is a string which must uniquely identify the protocol.

Level 0: Open. Any app can use it to talk to anyone without permission.
Level 1: App-bound. Only apps with permission can use the protocol. They can use it in conjunction with any counterparty.
Level 2: Countarparty-bound: Only apps with permission can use the protocol. When permission is granted, it only applies to the specific counterparty being authorized. Other counterparties, even under the same protocol ID, will trigger new permission requests.

For historical and convenience purposes, a protocol ID may be specified as just a name string
in which case it is promoted to the array [2, name].

Protocol names are normalized by the following rules.
All strings that normalize to the same value identify the same protocol.

Protocol name normalization rules:

- only letters, numbers and spaces
- no multiple space " "
- all lower case when used
- maximum 280 characters
- must be at least 5 characters
- must not end with " protocol"
- leading and trailing spaces are removed

**Parameters:**

- input (`any`) - The protocol to normalize

**returns:** [number, string]

### `getProtocolInvoiceNumber` (function)

**Parameters:**

- params (`{ protocolID: string | [number, string]; keyID: string; }`)

**returns:** string

### `pointToCompressed` (function)

A "compressed" format point is the X part of the (X, Y) point plus an extra
bit (which takes an entire byte) to indicate whether the Y value is odd or
not. Storing points this way takes a bit less space, but requires a bit more
computation to rederive the full point.

**Parameters:**

- point (`Point`) - An instance of Point.

**returns:** Buffer

### `pointToBuffer` (function)

**Parameters:**

- point (`Point`)

**returns:** Buffer

### `HeaderListener` (type)

### `ReorgListener` (type)

### `ChaintracksPackageInfoApi` (interface)

**Members:**

- name (`string`)
- version (`string`)

### `ChaintracksInfoApi` (interface)

**Members:**

- chain (`Chain`)
- heightBulk (`number`)
- heightLive (`number`)
- storageEngine (`string`)
- bulkStorage (`string`)
- bulkIndex (`string`)
- bulkIngestors (`string[]`)
- liveIngestors (`string[]`)
- packages (`ChaintracksPackageInfoApi[]`)

### `ChaintracksClientApi` (interface)

Chaintracks client API excluding events and callbacks

**Members:**

- /\*\*
  - Confirms the chain
    \*/
    getChain (`() => Promise<Chain>`) - Confirms the chain
- /\*\*
  - @returns Summary of configuration and state.
    \*/
    getInfo (`() => Promise<ChaintracksInfoApi>`)
- /\*\*
  - Return the latest chain height from configured bulk ingestors.
    \*/
    getPresentHeight (`() => Promise<number>`) - Return the latest chain height from configured bulk ingestors.
- /\*\*
  - Adds headers in 80 byte serialized format to a buffer.
  - Only adds active headers.
  - Buffer length divided by 80 is the actual number returned.
  -
  - @param height of first header
  - @param count of headers, maximum
    \*/
    getHeaders (`(height: number, count: number) => Promise<Buffer>`) - Adds headers in 80 byte serialized format to a buffer.
    Only adds active headers.
    Buffer length divided by 80 is the actual number returned.
- /\*\*
  - Adds headers in 80 byte serialized format to a buffer.
  - Only adds active headers.
  - Buffer length divided by 80 is the actual number returned.
  -
  - @param height of first header
  - @param count of headers, maximum
    \*/
    getHeadersHex (`(height: number, count: number) => Promise<string>`) - Adds headers in 80 byte serialized format to a buffer.
    Only adds active headers.
    Buffer length divided by 80 is the actual number returned.
- /\*\*
  - Returns the active chain tip header
    \*/
    findChainTipHeader (`() => Promise<BlockHeader>`) - Returns the active chain tip header
- /\*\*
  - Returns the active chain tip header
    \*/
    findChainTipHeaderHex (`() => Promise<BlockHeaderHex>`) - Returns the active chain tip header
- /\*\*
  - Returns the block hash of the active chain tip.
    \*/
    findChainTipHash (`() => Promise<Buffer>`) - Returns the block hash of the active chain tip.
- /\*\*
  - Returns the block hash of the active chain tip.
    \*/
    findChainTipHashHex (`() => Promise<string>`) - Returns the block hash of the active chain tip.
- /\*\*
  - Only returns a value for headers in live storage.
  - Returns undefined if `hash` is unknown or in bulk storage.
  - @param hash
  - @returns chainwork of block header with given hash
    \*/
    findChainWorkForBlockHash (`(hash: string | Buffer) => Promise<Buffer>`) - Only returns a value for headers in live storage.
    Returns undefined if `hash` is unknown or in bulk storage.
- /\*\*
  - Only returns a value for headers in live storage.
  - Returns undefined if `hash` is unknown or in bulk storage.
  - @param hash
  - @returns chainwork of block header with given hash
    \*/
    findChainWorkHexForBlockHash (`(hash: string | Buffer) => Promise<string>`) - Only returns a value for headers in live storage.
    Returns undefined if `hash` is unknown or in bulk storage.
- /\*\*
  - Returns block header for a given block hash
  - @param hash block hash
    \*/
    findHeaderForBlockHash (`(hash: string | Buffer) => Promise<BlockHeader>`) - Returns block header for a given block hash
- /\*\*
  - Returns block header for a given block hash
  - @param hash block hash
    \*/
    findHeaderHexForBlockHash (`(hash: string | Buffer) => Promise<BlockHeaderHex>`) - Returns block header for a given block hash
- /\*\*
  - Returns block header for a given block height on active chain.
    \*/
    findHeaderForHeight (`(height: number) => Promise<BlockHeader>`) - Returns block header for a given block height on active chain.
- /\*\*
  - Returns block header for a given block height on active chain.
    \*/
    findHeaderHexForHeight (`(height: number) => Promise<BlockHeaderHex>`) - Returns block header for a given block height on active chain.
- /\*\*
  - Returns block header for a given possible height and specific merkleRoot
  - The height, available for all mined blocks, allows fast and compact indexing of
  - bulk headers.
  - Confirms that the found header has the request merkleRoot or returns undefined.
  - @param merkleRoot
  - @param height optional, may be required for bulk header lookup.
    \*/
    findHeaderForMerkleRoot (`(merkleRoot: string | Buffer, height?: number) => Promise<BlockHeader>`) - Returns block header for a given possible height and specific merkleRoot
    The height, available for all mined blocks, allows fast and compact indexing of
    bulk headers.
    Confirms that the found header has the request merkleRoot or returns undefined.
- /\*\*
  - Returns block header for a given possible height and specific merkleRoot
  - The height, available for all mined blocks, allows fast and compact indexing of
  - bulk headers.
  - Confirms that the found header has the request merkleRoot or returns undefined.
  - @param root
  - @param height optional, may be required for bulk header lookup.
    \*/
    findHeaderHexForMerkleRoot (`(root: string | Buffer, height?: number) => Promise<BlockHeaderHex>`) - Returns block header for a given possible height and specific merkleRoot
    The height, available for all mined blocks, allows fast and compact indexing of
    bulk headers.
    Confirms that the found header has the request merkleRoot or returns undefined.
- /\*\*
  - Submit a possibly new header for adding
  -
  - If the header is invalid or a duplicate it will not be added.
  -
  - This header will be ignored if the previous header has not already been inserted when this header
  - is considered for insertion.
  -
  - @param header
  - @returns immediately
    \*/
    addHeader (`(header: BaseBlockHeader | BaseBlockHeaderHex) => Promise<void>`) - Submit a possibly new header for adding

If the header is invalid or a duplicate it will not be added.

This header will be ignored if the previous header has not already been inserted when this header
is considered for insertion.

- /\*\*
  - Start or resume listening for new headers.
  -
  - Calls `synchronize` to catch up on headers that were found while not listening.
  -
  - Begins listening to any number of configured new header notification services.
  -
  - Begins sending notifications to subscribed listeners only after processing any
  - previously found headers.
  -
  - May be called if already listening or synchronizing to listen.
  -
  - The `listening` API function which returns a Promise can be awaited.
    \*/
    startListening (`() => Promise<void>`) - Start or resume listening for new headers.

Calls `synchronize` to catch up on headers that were found while not listening.

Begins listening to any number of configured new header notification services.

Begins sending notifications to subscribed listeners only after processing any
previously found headers.

May be called if already listening or synchronizing to listen.

The `listening` API function which returns a Promise can be awaited.

- /\*\*
  - Returns a Promise that will resolve when the previous call to startListening
  - enters the listening-for-new-headers state.
    \*/
    listening (`() => Promise<void>`) - Returns a Promise that will resolve when the previous call to startListening
    enters the listening-for-new-headers state.
- /\*\*
  - Returns true if actively listening for new headers and client api is enabled.
    \*/
    isListening (`() => Promise<boolean>`) - Returns true if actively listening for new headers and client api is enabled.
- /\*\*
  - Returns true if `synchronize` has completed at least once.
    \*/
    isSynchronized (`() => Promise<boolean>`) - Returns true if `synchronize` has completed at least once.

### `ChaintracksApi` (interface)

Full Chaintracks client API including events and callbacks

**Members:**

- /\*\*
  - Subscribe to "header" events.
  - @param listener
  - @returns identifier for this subscription
    \*/
    subscribeHeaders (`(listener: HeaderListener) => Promise<string>`) - Subscribe to "header" events.
- /\*\*
  - Subscribe to "reorganization" events.
  - @param listener
  - @returns identifier for this subscription
    \*/
    subscribeReorgs (`(listener: ReorgListener) => Promise<string>`) - Subscribe to "reorganization" events.
- /\*\*
  - Cancels all subscriptions with the given `subscriptionId` which was previously returned
  - by a `subscribe` method.
  - @param subscriptionId value previously returned by subscribeToHeaders or subscribeToReorgs
  - @returns true if a subscription was canceled
    \*/
    unsubscribe (`(subscriptionId: string) => Promise<boolean>`) - Cancels all subscriptions with the given `subscriptionId` which was previously returned
    by a `subscribe` method.
- /\*\*
  - Start or resume listening for new headers.
  -
  - Calls `synchronize` to catch up on headers that were found while not listening.
  -
  - Begins listening to any number of configured new header notification services.
  -
  - Begins sending notifications to subscribed listeners only after processing any
  - previously found headers.
  -
  - May be called if already listening or synchronizing to listen.
  -
  - `listening` callback will be called after listening for new live headers has begun.
  - Alternatively, the `listening` API function which returns a Promise can be awaited.
  -
  - @param listening callback indicates when listening for new headers has started.
    \*/
    startListening (`(listening?: () => void) => Promise<void>`) - Start or resume listening for new headers.

Calls `synchronize` to catch up on headers that were found while not listening.

Begins listening to any number of configured new header notification services.

Begins sending notifications to subscribed listeners only after processing any
previously found headers.

May be called if already listening or synchronizing to listen.

`listening` callback will be called after listening for new live headers has begun.
Alternatively, the `listening` API function which returns a Promise can be awaited.

### `MapiResponseApi` (interface)

**Members:**

- /\*\*
  - Contents of the envelope.
  - Validate using signature and publicKey.
  - encoding and mimetype may assist with decoding validated payload.
    \*/
    payload (`string`) - Contents of the envelope.
    Validate using signature and publicKey.
    encoding and mimetype may assist with decoding validated payload.
- /\*\*
  - signature producted by correpsonding private key on payload data
    \*/
    signature (`string`) - signature producted by correpsonding private key on payload data
- /\*\*
  - public key to use to verify signature of payload data
    \*/
    publicKey (`string`) - public key to use to verify signature of payload data
- /\*\*
  - encoding of the payload data
    \*/
    encoding (`string`) - encoding of the payload data
- /\*\*
  - mime type of the payload data
    \*/
    mimetype (`string`) - mime type of the payload data

### `TscMerkleProofApi` (interface)

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

**Members:**

- /\*\*
  - The most efficient way of confirming a proof should also be the most common,
  - when the containing block's height is known.
    \*/
    height (`number`) - The most efficient way of confirming a proof should also be the most common,
    when the containing block's height is known.
- /\*\*
  - Index of transaction in its block. First transaction is index zero.
    \*/
    index (`number`) - Index of transaction in its block. First transaction is index zero.
- /\*\*
  - Full transaction (length > 32 bytes) or just its double SHA256 hash (length === 32 bytes).
  - If string, encoding is hex.
    \*/
    txOrId (`string | Buffer`) - Full transaction (length > 32 bytes) or just its double SHA256 hash (length === 32 bytes).
    If string, encoding is hex.
- /\*\*
  - Merkle root (length === 32) or serialized block header containing it (length === 80).
  - If string, encoding is hex.
    \*/
    target (`string | Buffer`) - Merkle root (length === 32) or serialized block header containing it (length === 80).
    If string, encoding is hex.
- /\*\*
  - Merkle tree sibling hash values required to compute root from txid.
  - Duplicates (sibling hash === computed hash) are indicated by "\*" or type byte === 1.
  - type byte === 2...
  - Strings are encoded as hex.
    _/
    nodes (`Buffer | string[]`) - Merkle tree sibling hash values required to compute root from txid.
    Duplicates (sibling hash === computed hash) are indicated by "_" or type byte === 1.
    type byte === 2...
    Strings are encoded as hex.
- targetType (`"hash" | "header" | "merkleRoot" | "height"`)
- proofType (`"branch" | "tree"`)
- composite (`boolean`)

### `MapiTxStatusPayloadApi` (interface)

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

**Members:**

- apiVersion (`string`)
- timestamp (`string`)
- txid (`string`)
- returnResult (`string`)
- blockHash (`string`)
- blockHeight (`number`)
- confirmations (`number`)
- minerId (`string`)
- txSecondMempoolExpiry (`number`)
- merkleProof (`TscMerkleProofApi`)

### `MapiCallbackPayloadApi` (interface)

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

**Members:**

- apiVersion (`string`)
- timestamp (`string`)
- blockHash (`string`)
- blockHeight (`number`)
- callbackTxId (`string`)
- callbackReason (`string`)
- callbackPayload (`string`)

### `MapiTxidReturnResultApi` (interface)

Used to parse payloads when only confirmation that a miner acknowledges a specific txid matters.

**Members:**

- apiVersion (`string`)
- timestamp (`string`)
- txid (`string`)
- returnResult (`string`)

### `MapiPostTxPayloadApi` (interface)

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

**Members:**

- apiVersion (`string`)
- timestamp (`string`)
- txid (`string`)
- returnResult (`string`)
- resultDescription (`string`)
- minerId (`string`)
- currentHighestBlockHash (`string`)
- currentHighestBlockHeight (`number`)
- txSecondMempoolExpiry (`number`)
- failureRetryable (`boolean`)
- warnings (`unknown[]`)
- conflictedWith (`unknown[]`)

### `EnvelopeApi` (interface)

Simplest case of an envelope is a `rawTx` and merkle `proof` that ties the transaction to a known block header.
This will be the case for any sufficiently old transaction.

If the transaction has been mined but for some reason the block headers may not be known, an array of `headers` linking
known headers to the one needed by the `proof` may be provided. They must be in height order and need to overlap
a known header.

If the transaction has not been minded yet but it has been submitted to one or more miners then the mapi responses
received, proving that specific miners have received the transaction for processing, are included in the
mapiResponses array.
Note that the miner reputations must be checked to give weight to these responses.

Additionally, when the transaction hasn't been mined or a `proof` is unavailable and mapi responses proving miner
acceptance are unavailable, then all the transactions providing inputs can be submitted in an inputs object.

The keys of the inputs object are the transaction hashes (txids) of each of the input transactions.
The value of each inputs object property is another envelope object.

References:
Section 2 of https://projectbabbage.com/assets/simplified-payments.pdf
https://gist.github.com/ty-everett/44b6a0e7f3d6c48439f9ff26068f8d8b

**Members:**

- /\*\*
  - For root nodes only.
  - Array of 80 byte block headers encoded as 160 character hex strings
  - Include headers the envelope creator is aware of but which the resipient may not have.
    \*/
    headers (`string[]`) - For root nodes only.
    Array of 80 byte block headers encoded as 160 character hex strings
    Include headers the envelope creator is aware of but which the resipient may not have.
- /\*\*
  - Arbitrary reference string associated with the envelope, typically root node only.
    \*/
    reference (`string`) - Arbitrary reference string associated with the envelope, typically root node only.

### `EnvelopeEvidenceApi` (interface)

Either inputs or proof are required.

**Members:**

- /\*\*
  - A valid bitcoin transaction encoded as a hex string.
    \*/
    rawTx (`string`) - A valid bitcoin transaction encoded as a hex string.
- /\*\*
  - Either proof, or inputs, must have a value.
  - Leaf nodes have proofs.
  -
  - If value is a Buffer, content is binary encoded serialized proof
  - see: chaintracks-spv.utils.serializeTscMerkleProof
    \*/
    proof (`Buffer | TscMerkleProofApi`) - Either proof, or inputs, must have a value.
    Leaf nodes have proofs.

If value is a Buffer, content is binary encoded serialized proof
see: chaintracks-spv.utils.serializeTscMerkleProof

- /\*\*
  - Only one of proof or inputs must be valid.
  - Branching nodes have inputs with a sub envelope (values) for every input transaction txid (keys)
    \*/
    inputs (`EnvelopeInputMapApi`) - Only one of proof or inputs must be valid.
    Branching nodes have inputs with a sub envelope (values) for every input transaction txid (keys)
- /\*\*
  - double SHA256 hash of serialized rawTx. Optional.
    \*/
    txid (`string`) - double SHA256 hash of serialized rawTx. Optional.
- /\*\*
  - Array of mapi transaction status update responses
  - Only the payload, signature, and publicKey properties are relevant.
  -
  - Branching inputs nodes only.
  - Array of mapi transaction status update responses confirming
  - unproven transctions have at least been submitted for processing.
    \*/
    mapiResponses (`MapiResponseApi[]`) - Array of mapi transaction status update responses
    Only the payload, signature, and publicKey properties are relevant.

Branching inputs nodes only.
Array of mapi transaction status update responses confirming
unproven transctions have at least been submitted for processing.

- /\*\*
  - count of maximum number of chained unproven transactions before a proven leaf node
  - proof nodes have depth zero.
    \*/
    depth (`number`) - count of maximum number of chained unproven transactions before a proven leaf node
    proof nodes have depth zero.

### `EnvelopeInputMapApi` (type)

keys are txids

### `DojoPublicApi` (interface)

Public Dojo Api
No Authrite authentication required.
Not specific to any userId

**Members:**

- //
  // Public services, No Authrite
  //
  /\*\*
  - Return the chain served by this Dojo
  -
  - Also serves to verifies that all dependent services are on same chain.
    \*/
    getChain (`() => Promise<Chain>`) - Return the chain served by this Dojo

Also serves to verifies that all dependent services are on same chain.

- //
  // Statistics
  //
  /\*\*
  - @returns general storage statistics
    \*/
    stats (`() => Promise<DojoStatsApi>`)

### `DojoLoggerApi` (type)

### `DojoSyncStatus` (type)

success: Last sync of this user from this dojo was successful.

error: Last sync protocol operation for this user to this dojo threw and error.

identified: Configured sync dojo has been identified but not sync'ed.

unknown: Sync protocol state is unknown.

### `DojoSyncProtocolVersion` (type)

### `DojoSyncErrorApi` (interface)

**Members:**

- code (`string`)
- description (`string`)

### `DojoSyncIdentifyParams` (interface)

Receipt of `DojoSyncIdentiyParams` via the `syncIdentify` function starts a dojo to dojo sync.

It may also force a restart of the sync protocol.

The purpose of the `Identify` phase is to identify both dojo's to each other,
the identity of the authenticated user, and the last known sync_state.

**Members:**

- protocolVersion (`"0.1.0"`)
- userIdentityKey (`string`)
- dojoIdentityKey (`string`)
- dojoName (`string`)
- refNum (`string`)

### `DojoSyncIdentifyResultApi` (interface)

**Members:**

- refNum (`string`)
- identityKey (`string`)
- name (`string`)
- status (`DojoSyncStatus`)
- when (`Date`)
- error (`DojoSyncErrorApi`)

### `DojoSyncUpdateParams` (interface)

**Members:**

- protocolVersion (`"0.1.0"`)
- refNum (`string`)
- since (`Date`)

### `DojoSyncUpdateResultApi` (interface)

**Members:**

- refNum (`string`)
- status (`DojoSyncStatus`)
- since (`Date`)
- state (`DojoUserStateApi`)
- error (`DojoSyncErrorApi`)

### `DojoSyncMergeParams` (interface)

**Members:**

- protocolVersion (`"0.1.0"`)
- refNum (`string`)
- when (`Date`)
- state (`DojoUserStateApi`)
- total (`number`)

### `DojoSyncMergeResultApi` (interface)

**Members:**

- refNum (`string`)
- status (`DojoSyncStatus`)
- error (`DojoSyncErrorApi`)

### `DojoSyncApi` (interface)

Dojo Sync Protocol

The Dojo Sync Protocol keeps multiple UTXO management services (Dojos) synchronized as updates occur between them.

The protocol relies on the properties of the blockchain to handle specific conflicts.

It is intended to support use cases where there is a primary dojo which periodically synchronizes to backup "syncDojos".

There is no formal conrol within the protocol for determining the primary dojo or transitioning between roles.

Synchronization is initiated from the primary Dojo.

Step 1. Run through the configured syncDojos calling syncIdentify which shares the local dojo and syncDojo's identities.
Any syncDojo that responds is added to activeSyncDojos.

Step 2. Run through the activeSyncDojos calling syncUpdate.

**Members:**

- /\*\*
  - Called to initiate the sync protocol.
  -
  - This is the initial protocol step to exchange dojo identityKeys and
  - configure the records in the sync_state and sync_history tables to support the sync protocol.
  -
  - @param params Parameters identifying the primary initiating dojo, user, sarting status and protocol version.
  - @returns Equivalent parameters for this syncDojo.
    \*/
    syncIdentify (`(params: DojoSyncIdentifyParams) => Promise<DojoSyncIdentifyResultApi>`) - Called to initiate the sync protocol.

This is the initial protocol step to exchange dojo identityKeys and
configure the records in the sync_state and sync_history tables to support the sync protocol.

- /\*\*
  - Receive a state update for the authenticated user from a remote dojo
  - and respond with merge result and any pre-merge local state update
  - for the data interval from `since` to `when`
    \*/
    syncUpdate (`(params: DojoSyncUpdateParams) => Promise<DojoSyncUpdateResultApi>`) - Receive a state update for the authenticated user from a remote dojo
    and respond with merge result and any pre-merge local state update
    for the data interval from `since` to `when`
- /\*\*
  - Informs a syncDojo of the result of merging state received from them.
  -
  - This is the only valid way that the syncDojo's `when` field in `sync_state` is updated which is critical to
  - guaranteeing that un-merged changes are presented until successfully merged.
    \*/
    syncMerge (`(params: DojoSyncMergeParams) => Promise<DojoSyncMergeResultApi>`) - Informs a syncDojo of the result of merging state received from them.

This is the only valid way that the syncDojo's `when` field in `sync_state` is updated which is critical to
guaranteeing that un-merged changes are presented until successfully merged.

- /\*\*
  - For Dojo scenarios where it is permissible for Dojo to directly act as
  - a specified user, authenticate that user by supplying their identityKey
  -
  - For Dojo scenarios where authrite is used to authenticate the local user
  - to a potentially remote Dojo server:
  - - If identityKey has a value then it used and must match the authenticated value.
  - - If identityKey is undefined, the authenticated value is used.
  -
  - Sets userId and identityKey
  -
  - @param identityKey optional, 33 hex encoded bytes, the user to authenticate's identity key
  - @param addIfNew optional, if true, unknown identityKey is added as new user.
  -
  - @throws ERR_UNAUTHORIZED if identityKey is required and invalid
    \*/
    authenticate (`(identityKey?: string, addIfNew?: boolean) => Promise<void>`) - For Dojo scenarios where it is permissible for Dojo to directly act as
    a specified user, authenticate that user by supplying their identityKey

For Dojo scenarios where authrite is used to authenticate the local user
to a potentially remote Dojo server:

- If identityKey has a value then it used and must match the authenticated value.
- If identityKey is undefined, the authenticated value is used.

Sets userId and identityKey

### `DojoSyncOptionsApi` (interface)

**Members:**

- syncOnAuthenticate (`boolean`)

### `DojoClientApi` (interface)

User specific public Dojo API accessible from all Dojo implementations
including `DojoExpressClient` HTTP client

**Members:**

- /\*\*
  - For Dojo scenarios where it is permissible for Dojo to directly act as
  - a specified user, authenticate that user by supplying their identityKey
  -
  - For Dojo scenarios where authrite is used to authenticate the local user
  - to a potentially remote Dojo server:
  - - If identityKey has a value then it used and must match the authenticated value.
  - - If identityKey is undefined, the authenticated value is used.
  -
  - Sets userId and identityKey
  -
  - @param identityKey optional, 33 hex encoded bytes, the user to authenticate's identity key
  - @param addIfNew optional, if true, unknown identityKey is added as new user.
  -
  - @throws ERR_UNAUTHORIZED if identityKey is required and invalid
    \*/
    authenticate (`(identityKey?: string, addIfNew?: boolean) => Promise<void>`) - For Dojo scenarios where it is permissible for Dojo to directly act as
    a specified user, authenticate that user by supplying their identityKey

For Dojo scenarios where authrite is used to authenticate the local user
to a potentially remote Dojo server:

- If identityKey has a value then it used and must match the authenticated value.
- If identityKey is undefined, the authenticated value is used.

Sets userId and identityKey

- setSyncDojos (`(dojos: DojoSyncApi[], options?: DojoSyncOptionsApi) => void`)
- getSyncDojos (`() => { dojos: DojoSyncApi[]; options: DojoSyncOptionsApi; }`)
- /\*\*
  - Sync's this dojo's state for the authenticated user with all of the configured syncDojos
  -
  - This method must be called when either a local or remote state change occurs, or may have occurred.
  -
  - User state changes are propagated across all configured syncDojos.
  -
  - @param logger optional sync progress update logger
    \*/
    sync (`(logger?: DojoLoggerApi) => Promise<void>`) - Sync's this dojo's state for the authenticated user with all of the configured syncDojos

This method must be called when either a local or remote state change occurs, or may have occurred.

User state changes are propagated across all configured syncDojos.

- /\*\*
  - Returns authenticated user.
  - Throws an error if isAuthenticated is false.
    \*/
    getUser (`() => DojoClientUserApi`) - Returns authenticated user.
    Throws an error if isAuthenticated is false.
- /\*\*
  - Returns the name and photo URL of the user
  - @returns {Promise<Avatar>} The avatar of the user
    \*/
    getAvatar (`() => Promise<DojoAvatarApi>`) - Returns the name and photo URL of the user
- /\*\*
  - Update the avatar for the authenticated user.
    \*/
    setAvatar (`(avatar: DojoAvatarApi) => Promise<void>`) - Update the avatar for the authenticated user.
- /\*\*
  - Return array of paymail style identifiers for currently authenticated user in `alias`@`domain` format.
  -
  - Where `alias` and `domain` come from the aliases table.
  -
  - and `reservationCompleted` is true
    \*/
    getCurrentPaymails (`() => Promise<string[]>`) - Return array of paymail style identifiers for currently authenticated user in `alias`@`domain` format.

Where `alias` and `domain` come from the aliases table.

and `reservationCompleted` is true

- /\*\*
  - Save a new certificate with optional fields.
  -
  - certificate must belong to aunthenticated user.
  -
  - certificate.subject must match authenticated user's idenitityKey or throws ERR_DOJO_CERT_SUBJECT
  -
  - certificate.signature must be valid or throws ERR_DOJO_CERT_INVALID
  -
  - If { type, subject, validationKey, serialNumber, userId } already exist, throw ERR_DOJO_CERT_DUPE
  -
  - @returns the certificateId of the new certificate.
    \*/
    saveCertificate (`(certificate: DojoCertificateApi) => Promise<number>`) - Save a new certificate with optional fields.

certificate must belong to aunthenticated user.

certificate.subject must match authenticated user's idenitityKey or throws ERR_DOJO_CERT_SUBJECT

certificate.signature must be valid or throws ERR_DOJO_CERT_INVALID

If { type, subject, validationKey, serialNumber, userId } already exist, throw ERR_DOJO_CERT_DUPE

- /\*\*
  - Returns all of the authenticated user's certificates,
  - where the certifier and type values match one of the optionaly
  - @param certifiers optional array of certifier identifiers, if provided results match at least one value.
  - @param types optional array of certificate types, if provided results match at least one value and only requested fields are returned.
    \*/
    findCertificates (`(certifiers?: string[], types?: Record<string, string[]>) => Promise<DojoCertificateApi[]>`) - Returns all of the authenticated user's certificates,
    where the certifier and type values match one of the optionaly
- /\*\*
  - Returns the total of spendable output amounts.
  -
  - Returns undefined if basket is not undefined and doesn't match an existing basket name.
  -
  - If basket is not undefined, total is restricted to outputs in that basket.
  -
  - If basket is undefined, total is over all spendable outputs.
  -
  - @param basket name of existing outputs basket or undefined
  - @returns total of unspent outputs in named basket
    \*/
    getTotalOfUnspentOutputs (`(basket?: string) => Promise<number>`) - Returns the total of spendable output amounts.

Returns undefined if basket is not undefined and doesn't match an existing basket name.

If basket is not undefined, total is restricted to outputs in that basket.

If basket is undefined, total is over all spendable outputs.

- /\*\*
  - Update `spendable` of an output that must exist,
  - belonging to the authenticated user,
  - in transaction with txid,
  - at index vout.
  -
  - @param txid
  - @param vout
  - @param spendable
    \*/
    updateOutpointStatus (`(txid: string, vout: number, spendable: boolean) => Promise<void>`) - Update `spendable` of an output that must exist,
    belonging to the authenticated user,
    in transaction with txid,
    at index vout.
- /\*\*
  - Returns the sum of transaction amounts belonging to authenticated user,
  - matching the given direction,
  - and optionally matching conditions in `options`.
    \*/
    getTotalOfAmounts (`(direction: "incoming" | "outgoing", options?: DojoGetTotalOfAmountsOptions) => Promise<number>`) - Returns the sum of transaction amounts belonging to authenticated user,
    matching the given direction,
    and optionally matching conditions in `options`.
- /\*\*
  - Returns the net sum of transaction amounts belonging to authenticated user,
  - incoming plus outgoing, as outgoing amounts are negative and incoming amounts are positive.
  - and optionally matching conditions in `options`.
    \*/
    getNetOfAmounts (`(options?: DojoGetTotalOfAmountsOptions) => Promise<number>`) - Returns the net sum of transaction amounts belonging to authenticated user,
    incoming plus outgoing, as outgoing amounts are negative and incoming amounts are positive.
    and optionally matching conditions in `options`.
- /\*\*
  - Update transaction status and associated ouputs (both inputs and outputs) spendable and spentBy properties.
  -
  - Updated transaction userId must match authenticated user and referenceNumber must match reference.
  -
  - @param reference
  - @param status New transaction status.
    \*/
    updateTransactionStatus (`(reference: string, status: DojoTransactionStatusApi) => Promise<void>`) - Update transaction status and associated ouputs (both inputs and outputs) spendable and spentBy properties.

Updated transaction userId must match authenticated user and referenceNumber must match reference.

- /\*\*
  - Returns transactions matching options and total matching count available.
  -
  - @param options limit defaults to 25, offset defaults to 0, addLabels defaults to true, order defaults to 'descending'
    \*/
    getTransactions (`(options?: DojoGetTransactionsOptions) => Promise<{ txs: DojoTransactionApi[]; total: number; }>`) - Returns transactions matching options and total matching count available.
- /\*\*
  - Returns transaction outputs matching options and total matching count available.
  -
  - @param options limit defaults to 25, offset defaults to 0, includeEnvelpe defaults to true
    \*/
    getTransactionOutputs (`(options?: DojoGetTransactionOutputsOptions) => Promise<{ outputs: DojoOutputApi[]; total: number; }>`) - Returns transaction outputs matching options and total matching count available.
- /\*\*
  - Returns an Everett Style envelope for the given txid.
  -
  - A transaction envelope is a tree of inputs where all the leaves are proven transactions.
  - The trivial case is a single leaf: the envelope for a proven transaction is the rawTx and its proof.
  -
  - Each branching level of the tree corresponds to an unmined transaction without a proof,
  - in which case the envelope is:
  - - rawTx
  - - mapiResponses from transaction processors (optional)
  - - inputs object where keys are this transaction's input txids and values are recursive envelope for those txids.
  -
  - @param txid
    \*/
    getEnvelopeForTransaction (`(txid: string) => Promise<EnvelopeApi>`) - Returns an Everett Style envelope for the given txid.

A transaction envelope is a tree of inputs where all the leaves are proven transactions.
The trivial case is a single leaf: the envelope for a proven transaction is the rawTx and its proof.

Each branching level of the tree corresponds to an unmined transaction without a proof,
in which case the envelope is:

- rawTx
- mapiResponses from transaction processors (optional)
- inputs object where keys are this transaction's input txids and values are recursive envelope for those txids.
- /\*\*
  - Returns transactions with status of 'waitingForSenderToSend' or 'unprocessed' for authenticated user
  -
  - Original Dojo returned only these properties:
  - 'transactionId',
  - 'amount',
  - 'created_at',
  - 'referenceNumber',
  - 'senderPaymail',
  - 'truncatedExternalInputs',
  - 'status',
  - 'isOutgoing',
  - 'rawTransaction'
  -
  - @param referenceNumber optional referenceNumber to also match
    \*/
    getPendingTransactions (`(referenceNumber?: string) => Promise<DojoPendingTxApi[]>`) - Returns transactions with status of 'waitingForSenderToSend' or 'unprocessed' for authenticated user

Original Dojo returned only these properties:
'transactionId',
'amount',
'created_at',
'referenceNumber',
'senderPaymail',
'truncatedExternalInputs',
'status',
'isOutgoing',
'rawTransaction'

- /\*\*
  - Constructs a new transaction spending known outputs (inputs) and creating new outputs.
  -
  - If the inputs to the transaction go beyond what is needed to fund these outputs (plus the transaction fee),
  - additional Dojo-managed UTXOs will be generated to collect the remainder
  - (see the "outputGeneration" parameter for more on this).
  -
  - @param inputs An object whose keys are TXIDs and whose values are payment envelopes
  - for external inputs to use when funding this transaction.
  -
  - If more funding is needed beyond what is given here to pay for the specified outputs
  - (plus the transaction fee), Dojo will select them from your baskets of unspent outputs
  - (see the "inputSelection" parameter for more on this).
  -
  - inputs[TXID]: Must be a payment envelope containing the transaction with output(s)
  - that will be spent and used as input.
  -
  - inputs[TXID].outputsToRedeem: An additional field, an array of outputs
  - from that transaction to be spent.
  -
  - @param inputSelection Optional. Algorithmic control over source of additional inputs that may be needed.
  - @param outputs Possibly empty, explicit outputs, typically external, to create as part of this transaction.
  - @param outputGeneration Optional. Algorithmic control over additional outputs that may be needed.
  - @param feeModel Optional. An object representing the fee the transaction will pay.
  - @param labels Optional. Each at most 150 characters. Labels can be used to tag transactions into categories
  - @param note Optional. A human-readable note detailing this transaction (Optional)
  - @param recipient Optional. The Paymail handle of the recipient of this transaction (Optional)
    \*/
    createTransaction (`(inputs: Record<string, DojoTxInputsApi>, inputSelection: DojoTxInputSelectionApi, outputs: DojoCreateTxOutputApi[], outputGeneration?: DojoOutputGenerationApi, feeModel?: DojoFeeModelApi, labels?: string[], note?: string, recipient?: string) => Promise<...>`) - Constructs a new transaction spending known outputs (inputs) and creating new outputs.

If the inputs to the transaction go beyond what is needed to fund these outputs (plus the transaction fee),
additional Dojo-managed UTXOs will be generated to collect the remainder
(see the "outputGeneration" parameter for more on this).

- /\*\*
  - After creating a transaction with createTransaction and signing it, submit the serialized raw transaction
  - to transaction processors for processing.
  -
  - The reference number uniquely identifies the transaction in the database.
  -
  - Differences from v1:
  - 1.  mapi_responses records are created when callbackIDs are generated, they exist before callbackID is given to external transaction processing service.
  -
  - @param rawTx The signed transaction serialized as a hex string or Buffer, not yet stored in database.
  - @param reference The reference number that you received from createTransaction uniquely identifying the database record.
  - @param outputMap An object whose keys are change output derivation suffixes
  - and whose values are the corresponding output (vout) numbers within the transaction.
  -
  - @throws ERR_DOJO_INVALID_REFERENCE if reference is unknown
  - @throws ERR_DOJO_TRANSACTION_REJECTED if processors reject the transaction
  - @throws ERR_EXTSVS_DOUBLE_SPEND if transaction double spends an input
  -
  - @returns `DojoProcessTransactionResultApi` with txid and status of 'completed' or 'unknown'
    \*/
    processTransaction (`(rawTx: string | Buffer, reference: string, outputMap: Record<string, number>) => Promise<DojoProcessTransactionResultApi>`) - After creating a transaction with createTransaction and signing it, submit the serialized raw transaction
    to transaction processors for processing.

The reference number uniquely identifies the transaction in the database.

Differences from v1:

1. mapi_responses records are created when callbackIDs are generated, they exist before callbackID is given to external transaction processing service.

- /\*\*
  - This endpoint allows a recipient to submit a transactions that was directly given to them by a sender.
  -
  - Saves the inputs and key derivation information, allowing the UTXOs to be redeemed in the future.
  -
  - Sets the transaction to completed and marks the outputs as spendable.
    \*/
    submitDirectTransaction (`(protocol: string, transaction: DojoSubmitDirectTransactionApi, senderIdentityKey: string, note: string, labels: string[], derivationPrefix?: string) => Promise<...>`) - This endpoint allows a recipient to submit a transactions that was directly given to them by a sender.

Saves the inputs and key derivation information, allowing the UTXOs to be redeemed in the future.

Sets the transaction to completed and marks the outputs as spendable.

- /\*\*
  - Return a complete copy of all records for the authenticated user.
  - @param since optional, start of data interval if specified.
    \*/
    copyState (`(since?: Date) => Promise<DojoUserStateApi>`) - Return a complete copy of all records for the authenticated user.

### `DojoTransactionStatusApi` (type)

### `DojoGetTransactionsOptions` (interface)

**Members:**

- /\*\*
  - Columns to return for each transaction. If undefined or empty, all columns are returned.
    \*/
    columns (`string[]`) - Columns to return for each transaction. If undefined or empty, all columns are returned.
- /\*\*
  - Optional. Match transactions with this referenceNumber.
    \*/
    referenceNumber (`string`) - Optional. Match transactions with this referenceNumber.
- /\*\*
  - Optional. Match transactions with this status.
    \*/
    status (`DojoTransactionStatusApi`) - Optional. Match transactions with this status.
- /\*\*
  - Optional. Match transactions with this label.
    \*/
    label (`string`) - Optional. Match transactions with this label.
- /\*\*
  - Optional. Match transactions created on or after this time. Date, ISO string, or seconds since the epoch.
    \*/
    startTime (`string | number | Date`) - Optional. Match transactions created on or after this time. Date, ISO string, or seconds since the epoch.
- /\*\*
  - Optional. Match transactions created on or before this time. Date, ISO string, or seconds since the epoch.
    \*/
    endTime (`string | number | Date`) - Optional. Match transactions created on or before this time. Date, ISO string, or seconds since the epoch.
- /\*\*
  - Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.
    \*/
    involving (`string`) - Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.
- /\*\*
  - Optional. If true, array of mapped `labels` is added to each transaction.
    \*/
    addLabels (`boolean`) - Optional. If true, array of mapped `labels` is added to each transaction.
- /\*\*
  - Optional. How many transactions to return.
    \*/
    limit (`number`) - Optional. How many transactions to return.
- /\*\*
  - Optional. How many transactions to skip.
    \*/
    offset (`number`) - Optional. How many transactions to skip.
- /\*\*
  - Optional. Set sort order of results. Transactions are ordered by transactionId ascending by default.
    \*/
    order (`"ascending" | "descending"`) - Optional. Set sort order of results. Transactions are ordered by transactionId ascending by default.

### `DojoGetTransactionOutputsOptions` (interface)

**Members:**

- /\*\*
  - If provided, indicates which basket the outputs should be selected from.
    \*/
    basket (`string`) - If provided, indicates which basket the outputs should be selected from.
- /\*\*
  - If provided, only outputs with the corresponding tracked value will be returned (true/false).
    \*/
    tracked (`boolean`) - If provided, only outputs with the corresponding tracked value will be returned (true/false).
- /\*\*
  - If provided, returns a structure with the SPV envelopes for the UTXOS that have not been spent.
    \*/
    includeEnvelope (`boolean`) - If provided, returns a structure with the SPV envelopes for the UTXOS that have not been spent.
- /\*\*
  - If given as true or false, only outputs that have or have not (respectively) been spent will be returned. If not given, both spent and unspent outputs will be returned.
    \*/
    spendable (`boolean`) - If given as true or false, only outputs that have or have not (respectively) been spent will be returned. If not given, both spent and unspent outputs will be returned.
- /\*\*
  - If provided, only outputs of the specified type will be returned. If not provided, outputs of all types will be returned.
    \*/
    type (`string`) - If provided, only outputs of the specified type will be returned. If not provided, outputs of all types will be returned.
- /\*\*
  - Provide a limit on the number of outputs that will be returned.
    \*/
    limit (`number`) - Provide a limit on the number of outputs that will be returned.
- /\*\*
  - Provide an offset into the list of outputs.
    \*/
    offset (`number`) - Provide an offset into the list of outputs.

### `DojoGetTotalOfAmountsOptions` (interface)

**Members:**

- /\*\*
  - Optional. Match transactions with this label.
    \*/
    label (`string`) - Optional. Match transactions with this label.
- /\*\*
  - Optional. Match transactions created on or after this time. Seconds since the epoch.
    \*/
    startTime (`string | number | Date`) - Optional. Match transactions created on or after this time. Seconds since the epoch.
- /\*\*
  - Optional. Match transactions created on or before this time. Seconds since the epoch.
    \*/
    endTime (`string | number | Date`) - Optional. Match transactions created on or before this time. Seconds since the epoch.
- /\*\*
  - Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.
    \*/
    involving (`string`) - Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.
- /\*\*
  - Direction of value flow.
    \*/
    direction (`"incoming" | "outgoing"`) - Direction of value flow.

### `DojoStatsApi` (interface)

**Members:**

- users (`number`)
- transactions (`number`)
- txLabels (`number`)
- chain (`Chain`)

### `DojoUserStateApi` (interface)

**Members:**

- certificates (`DojoCertificateApi[]`)
- certificateFields (`DojoCertificateFieldApi[]`)
- commissions (`DojoCommissionApi[]`)
- mapiResponses (`DojoMapiResponseApi[]`)
- outputs (`DojoOutputApi[]`)
- baskets (`DojoOutputBasketApi[]`)
- provenTxReqs (`DojoProvenTxReqApi[]`)
- provenTxs (`DojoProvenTxApi[]`)
- txs (`DojoTransactionApi[]`)
- txLabels (`DojoTxLabelApi[]`)
- txLabelMaps (`DojoTxLabelMapApi[]`)
- user (`DojoUserApi`)

### `DojoAliasApi` (interface)

**Members:**

- aliasId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - max length of 30
    \*/
    alias (`string`) - max length of 30
- /\*\*
  - max length of 30
    \*/
    domain (`string`) - max length of 30
- /\*\*
  - max length of 30
    \*/
    avatarName (`string`) - max length of 30
- /\*\*
  - max length of 100
    \*/
    avatarPhotoURL (`string`) - max length of 100
- reservationCompleted (`boolean`)
- userId (`number`)
- destinationBasketId (`number`)

### `DojoAvatarApi` (interface)

**Members:**

- /\*\*
  - The name of the user
    \*/
    name (`string`) - The name of the user
- /\*\*
  - An HTTPS or UHRP URL to a photo of the user
    \*/
    photoURL (`string`) - An HTTPS or UHRP URL to a photo of the user

### `DojoCertificateFieldApi` (interface)

**Members:**

- userId (`number`)
- certificateId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - max length of 100
    \*/
    fieldName (`string`) - max length of 100
- /\*\*
  - max length of 255
    \*/
    fieldValue (`string`) - max length of 255
- /\*\*
  - base64 encrypted master field revelation key
    \*/
    masterKey (`string`) - base64 encrypted master field revelation key

### `DojoCertificateApi` (interface)

**Members:**

- certificateId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- userId (`number`)
- /\*\*
  - max length of 255
    \*/
    type (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    subject (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    validationKey (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    serialNumber (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    certifier (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    revocationOutpoint (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    signature (`string`) - max length of 255
- /\*\*
  - Certificate fields object constructed from fieldName and fieldValue properties of DojoCertificateFieldApi instances associated with this certificate.
    \*/
    fields (`Record<string, string>`) - Certificate fields object constructed from fieldName and fieldValue properties of DojoCertificateFieldApi instances associated with this certificate.
- /\*\*
  - Certificate masterKeyring object constructed from fieldName and masterKey properties of DojoCertificateFieldApi instances associated with this certificate.
    \*/
    masterKeyring (`Record<string, string>`) - Certificate masterKeyring object constructed from fieldName and masterKey properties of DojoCertificateFieldApi instances associated with this certificate.

### `DojoCommissionApi` (interface)

**Members:**

- commissionId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- transactionId (`number`)
- userId (`number`)
- isRedeemed (`boolean`)
- /\*\*
  - max length of 130
    \*/
    keyOffset (`string`) - max length of 130
- outputScript (`Buffer`)
- /\*\*
  - 15 integer digits
    \*/
    satoshis (`number`) - 15 integer digits

### `DojoMapiResponseApi` (interface)

**Members:**

- responseId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- transactionId (`number`)
- userId (`number`)
- callbackID (`string`)
- payload (`string`)
- /\*\*
  - max length of 255
    \*/
    publicKey (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    signature (`string`) - max length of 255
- /\*\*
  - max length of 16
    \*/
    doubleSpendResponse (`string`) - max length of 16

### `DojoOutputApi` (interface)

**Members:**

- outputId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- spendable (`boolean`)
- change (`boolean`)
- /\*\*
  - length 64 hex encoded
    \*/
    txid (`string`) - length 64 hex encoded
- /\*\*
  - max 10 digits
    \*/
    vout (`number`) - max 10 digits
- /\*\*
  - max 15 digits
    \*/
    amount (`number`) - max 15 digits
- outputScript (`Buffer`)
- /\*\*
  - max length of 50
  - e.g. P2PKH, custom
    \*/
    type (`string`) - max length of 50
    e.g. P2PKH, custom
- transactionId (`number`)
- userId (`number`)
- basketId (`number`)
- /\*\*
  - transactionId of spending transaction or null if unspent
  - max 10 digits
    \*/
    spentBy (`number`) - transactionId of spending transaction or null if unspent
    max 10 digits
- /\*\*
  - max length of 32
  - base64 encoded
    \*/
    derivationPrefix (`string`) - max length of 32
    base64 encoded
- /\*\*
  - max length of 32
  - base64 encoded
    \*/
    derivationSuffix (`string`) - max length of 32
    base64 encoded
- /\*\*
  - max length of 64
    \*/
    paymailHandle (`string`) - max length of 64
- /\*\*
  - max length of 130
  - hex encoded
    \*/
    senderIdentityKey (`string`) - max length of 130
    hex encoded
- /\*\*
  - max length of 2500
    \*/
    customInstructions (`string`) - max length of 2500
- /\*\*
  - true if output was put in a basket for tracking
    \*/
    tracked (`boolean`) - true if output was put in a basket for tracking
- /\*\*
  - max length of 130
  - e.g. you, dojo
    \*/
    providedBy (`string`) - max length of 130
    e.g. you, dojo
- /\*\*
  - max length of 20
  - e.g. change
    \*/
    purpose (`string`) - max length of 20
    e.g. change
- /\*\*
  - max length of 255
    \*/
    description (`string`) - max length of 255
- /\*\*
  - max length of 255
    \*/
    spendingDescription (`string`) - max length of 255
- /\*\*
  - optional envelope for transaction containing output
    \*/
    envelope (`EnvelopeApi`) - optional envelope for transaction containing output

### `DojoOutputBasketApi` (interface)

**Members:**

- basketId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - max length of 1000
    \*/
    name (`string`) - max length of 1000
- numberOfDesiredUTXOs (`number`)
- minimumDesiredUTXOValue (`number`)
- userId (`number`)

### `DojoTransactionApi` (interface)

**Members:**

- transactionId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - length 64 hex encoded
    \*/
    txid (`string`) - length 64 hex encoded
- rawTransaction (`Buffer`)
- /\*\*
  - max length of 64
  - e.g. completed, failed, unprocessed, waitingForSenderToSend
    \*/
    status (`DojoTransactionStatusApi`) - max length of 64
    e.g. completed, failed, unprocessed, waitingForSenderToSend
- /\*\*
  - max length of 64, hex encoded
    \*/
    referenceNumber (`string`) - max length of 64, hex encoded
- /\*\*
  - max 15 digits
    \*/
    amount (`number`) - max 15 digits
- userId (`number`)
- /\*\*
  - max length of 100
    \*/
    senderPaymail (`string`) - max length of 100
- /\*\*
  - max length of 100
    \*/
    recipientPaymail (`string`) - max length of 100
- /\*\*
  - max length of 500
    \*/
    note (`string`) - max length of 500
- /\*\*
  - true if transaction originated in this wallet, change returns to it.
  - false for a transaction created externally and handed in to this wallet.
    \*/
    isOutgoing (`boolean`) - true if transaction originated in this wallet, change returns to it.
    false for a transaction created externally and handed in to this wallet.
- unconfirmedInputChainLength (`number`)
- proof (`string`)
- truncatedExternalInputs (`string`)
- /\*\*
  - Is valid when transaction proof record exists in DojoProvenTxApi table.
    \*/
    provenTxId (`number`) - Is valid when transaction proof record exists in DojoProvenTxApi table.
- /\*\*
  - When not undefined, array of assigned tx_labels.label values.
    \*/
    labels (`string[]`) - When not undefined, array of assigned tx_labels.label values.

### `DojoProvenTxReqStatusApi` (type)

Initial status (attempts === 0):

sending: rawTx is about to be sent to transaction processors.

unsent: rawTx has not yet been sent to the network for processing. Next attempt should send it.

unknown: rawTx status is unknown but is believed to have been previously sent to the network.

Attempts > 0 status, processing:

unknown: Last status update received did not recognize txid or wasn't understood.

nonfinal: rawTx has an un-expired nLockTime and is eligible for continuous updating by new transactions with additional outputs and incrementing sequence numbers.

unmined: Last attempt has txid waiting to be mined, possibly just sent without callback

callback: Waiting for proof confirmation callback from transaction processor.

unconfirmed: Potential proof has not been confirmed by chaintracks

notifying: proven_txs record added, while notifications are being processed.

Terminal status:

doubleSpend: Transaction spends same input as another transaction.

invalid: rawTx is structuraly invalid or was rejected by the network. Will never be re-attempted or completed.

completed: proven_txs record added, and notifications are complete.

### `DojoProvenTxReqApi` (interface)

**Members:**

- provenTxReqId (`number`)
- userId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- txid (`string`)
- callbackID (`string`)
- rawTx (`Buffer`)
- /\*\*
  - JSON string of processing history.
  - Parses to `DojoProvenTxReqHistoryApi`.
    \*/
    history (`string`) - JSON string of processing history.
    Parses to `DojoProvenTxReqHistoryApi`.
- /\*\*
  - JSON string of data to drive notifications when this request completes.
  - Parses to `DojoProvenTxReqNotifyApi`.
    \*/
    notify (`string`) - JSON string of data to drive notifications when this request completes.
    Parses to `DojoProvenTxReqNotifyApi`.
- /\*\*
  - See `DojoProvenTxReqStatusApi`
    \*/
    status (`DojoProvenTxReqStatusApi`) - See `DojoProvenTxReqStatusApi`
- /\*\*
  - Count of how many times a service has been asked about this txid
    \*/
    attempts (`number`) - Count of how many times a service has been asked about this txid
- /\*\*
  - Once a DojoProvenTxApi record has been validated and added to database, the provenTxId value.
    \*/
    provenTxId (`number`) - Once a DojoProvenTxApi record has been validated and added to database, the provenTxId value.

### `DojoProvenTxApi` (interface)

**Members:**

- provenTxId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- txid (`string`)
- height (`number`)
- index (`number`)
- /\*\*
  - Serialized 32 bytes per node.
    \*/
    nodes (`Buffer`) - Serialized 32 bytes per node.
- rawTx (`Buffer`)
- blockHash (`Buffer`)
- merkleRoot (`Buffer`)

### `DojoTxLabelApi` (interface)

**Members:**

- txLabelId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - max length of 150
  - e.g. babbage*app*..., babbage*protocol*..., babbage*spend*..., babbage*basket*..., babbage*cert*...., babbage*certificate*, nanostore
    \*/
    label (`string`) - max length of 150
    e.g. babbage*app*..., babbage*protocol*..., babbage*spend*..., babbage*basket*..., babbage*cert*...., babbage*certificate*, nanostore
- userId (`number`)

### `DojoTxLabelMapApi` (interface)

**Members:**

- txLabelId (`number`)
- transactionId (`number`)
- created_at (`Date`)
- updated_at (`Date`)

### `DojoClientUserApi` (interface)

**Members:**

- userId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - max length of 130
  - hex encoded
    \*/
    identityKey (`string`) - max length of 130
    hex encoded

### `DojoUserApi` (interface)

**Members:**

- userId (`number`)
- created_at (`Date`)
- updated_at (`Date`)
- /\*\*
  - max length of 130
  - hex encoded
    \*/
    identityKey (`string`) - max length of 130
    hex encoded
- /\*\*
  - max 12 digits
    \*/
    timeSpentProcessingRequests (`number`) - max 12 digits
- /\*\*
  - max 18 digits
    \*/
    bandwidthUsed (`number`) - max 18 digits
- /\*\*
  - max 15 digits
    \*/
    storageSpaceUsedByHostedData (`number`) - max 15 digits

### `DojoPendingTxInputInstructionsApi` (interface)

**Members:**

- /\*\*
  - max length of 50
  - e.g. P2PKH, custom
    \*/
    type (`string`) - max length of 50
    e.g. P2PKH, custom
- /\*\*
  - max length of 32
  - base64 encoded
    \*/
    derivationPrefix (`string`) - max length of 32
    base64 encoded
- /\*\*
  - max length of 32
  - base64 encoded
    \*/
    derivationSuffix (`string`) - max length of 32
    base64 encoded
- /\*\*
  - max length of 64
    \*/
    paymailHandle (`string`) - max length of 64
- /\*\*
  - max length of 130
  - hex encoded
    \*/
    senderIdentityKey (`string`) - max length of 130
    hex encoded
- /\*\*
  - max length of 2500
    \*/
    customInstructions (`string`) - max length of 2500

### `DojoPendingTxInputApi` (interface)

**Members:**

- outputsToRedeem (`number[]`)
- instructions (`Record<number, DojoPendingTxInputInstructionsApi>`)

### `DojoProvidedByApi` (type)

### `DojoPendingTxOutputApi` (interface)

**Members:**

- type (`string`)
- satoshis (`number`)
- script (`string`)
- derivationPrefix (`string`)
- derivationSuffix (`string`)
- paymailHandle (`string`)
- providedBy (`string`)
- purpose (`string`)
- senderIdentityKey (`string`)
- txid (`string`)
- vout (`number`)

### `DojoPendingTxApi` (interface)

Return type from Ninja and Dojo getPendingTransactions methods.

**Members:**

- amount (`number`)
- created_at (`string`)
- referenceNumber (`string`)
- senderPaymail (`string`)
- status (`string`)
- isOutgoing (`boolean`)
- rawTransaction (`string`)
- derivationPrefix (`string`)
- paymailHandle (`string`)
- inputs (`Record<string, DojoPendingTxInputApi>`)
- outputs (`DojoPendingTxOutputApi[]`)

### `DojoProcessTransactionResultApi` (interface)

**Members:**

- txid (`string`)
- status (`"unknown" | "completed"`)
- mapiResponses (`MapiResponseApi[]`)

### `DojoOutputToRedeemApi` (interface)

**Members:**

- /\*\*
  - Zero based output index within its transaction to spend.
    \*/
    index (`number`) - Zero based output index within its transaction to spend.
- /\*\*
  - byte length of unlocking script
  -
  - Note: To protect client keys and utxo control, unlocking scripts are never shared with Dojo.
    \*/
    unlockingScriptLength (`number`) - byte length of unlocking script

Note: To protect client keys and utxo control, unlocking scripts are never shared with Dojo.

- spendingDescription (`string`)

### `DojoTxInputsApi` (interface)

**Members:**

- outputsToRedeem (`DojoOutputToRedeemApi[]`)

### `DojoTxInputSelectionApi` (interface)

If Dojo needs to select more inputs beyond the ones specified in order to fund the transaction,
this object describes which kinds of inputs can be selected, and from where.

**Members:**

- /\*\*
  - This is a boolean that, when true, will forbid Dojo from adding any additional inputs to your transaction,
  - beyond what you specified in the "inputs" parameter.
  - Thus, if you have not sufficiently funded the transaction yourself,
  - or if the "inputs" array is empty, you will get an error.
    \*/
    disable (`boolean`) - This is a boolean that, when true, will forbid Dojo from adding any additional inputs to your transaction,
    beyond what you specified in the "inputs" parameter.
    Thus, if you have not sufficiently funded the transaction yourself,
    or if the "inputs" array is empty, you will get an error.
- /\*\*
  - TODO (coming soon).
  - This is an array of UTXO basket names from which UTXOs can be selected for spending.
  - To only select UTXOs of a certain type, configure the source basket only to accept those types of UTXOs.
  - By default, UTXOs will only be selected if they are in the "default" basket.
    \*/
    baskets (`string[]`) - TODO (coming soon).
    This is an array of UTXO basket names from which UTXOs can be selected for spending.
    To only select UTXOs of a certain type, configure the source basket only to accept those types of UTXOs.
    By default, UTXOs will only be selected if they are in the "default" basket.
- /\*\*
  - An integer representing the maximum length for any chain of unconfirmed parents
  - that a selected input can have.
  - When undefined or -1 (the default), no maximum is specified.
  - Cannot be zero.
  - When 1, indicates that the input must itself be confirmed.
  - When 2, input parents must be confirmed.
  - When 3 denotes grandparents.
  - When 4 great-grandparents and so forth.
    \*/
    maxUnconfirmedChainLength (`number`) - An integer representing the maximum length for any chain of unconfirmed parents
    that a selected input can have.
    When undefined or -1 (the default), no maximum is specified.
    Cannot be zero.
    When 1, indicates that the input must itself be confirmed.
    When 2, input parents must be confirmed.
    When 3 denotes grandparents.
    When 4 great-grandparents and so forth.

### `DojoCreateTxOutputApi` (interface)

A specific output to be created as part of a new transactions.
These outputs can contain custom scripts as specified by recipients.

**Members:**

- /\*\*
  - The output script that will be included, hex encoded
    \*/
    script (`string`) - The output script that will be included, hex encoded
- /\*\*
  - The amount of the output in satoshis
    \*/
    satoshis (`number`) - The amount of the output in satoshis
- /\*\*
  - Human-readable output line-item description
    \*/
    description (`string`) - Human-readable output line-item description
- /\*\*
  - Destination output basket name for the new UTXO
    \*/
    basket (`string`) - Destination output basket name for the new UTXO
- /\*\*
  - Custom spending instructions (metadata, string, optional)
    \*/
    customInstructions (`string`) - Custom spending instructions (metadata, string, optional)

### `DojoOutputGenerationApi` (interface)

If Dojo needs to generate additional outputs for the transaction beyond what was specified,
this object describes what kind of outputs to generate, and where they should be kept.

**Members:**

- /\*\*
  - TODO (coming soon).
  - Specify the basket where the generated outputs will be kept.
  - Only output types compatible with the destination basket will be generated.
    \*/
    basket (`string`) - TODO (coming soon).
    Specify the basket where the generated outputs will be kept.
    Only output types compatible with the destination basket will be generated.
- /\*\*
  - The method used to generate outputs.
  - "auto" (the default) selects the amount and types of generated outputs based on the selected basket's
  - configuration for how many of each type to keep on hand,
  - then uses Benford's law to distribute the satoshis across them.
  - "single" just uses one output, randomly selected from the available types, that contains all the satoshis.
    \*/
    method (`"auto" | "single"`) - The method used to generate outputs.
    "auto" (the default) selects the amount and types of generated outputs based on the selected basket's
    configuration for how many of each type to keep on hand,
    then uses Benford's law to distribute the satoshis across them.
    "single" just uses one output, randomly selected from the available types, that contains all the satoshis.

### `DojoFeeModelApi` (interface)

An object representing the fee the transaction will pay.

**Members:**

- /\*\*
  - The fee model to use, default "sat/kb"
    \*/
    model (`"sat/kb"`) - The fee model to use, default "sat/kb"
- /\*\*

  - When "fee.model" is "sat/kb", this is an integer representing the number of satoshis per kb of block space
  - the transaction will pay in fees.

  - If undefined, the default value is used which may vary with market conditions.
    \*/
    value (`number`) - When "fee.model" is "sat/kb", this is an integer representing the number of satoshis per kb of block space
    the transaction will pay in fees.

If undefined, the default value is used which may vary with market conditions.

### `DojoCreatingTxOutputApi` (interface)

**Members:**

- providedBy (`DojoProvidedByApi`)
- purpose (`string`)
- destinationBasket (`string`)
- derivationSuffix (`string`)
- keyOffset (`string`)

### `DojoCreatingTxInstructionsApi` (interface)

**Members:**

- type (`string`)
- paymailHandle (`string`)
- derivationPrefix (`string`)
- derivationSuffix (`string`)
- senderIdentityKey (`string`)

### `DojoCreatingTxInputsApi` (interface)

**Members:**

- providedBy (`DojoProvidedByApi`)
- instructions (`Record<number, DojoCreatingTxInstructionsApi>`)

### `DojoCreateTransactionResultApi` (interface)

**Members:**

- inputs (`Record<string, DojoCreatingTxInputsApi>`)
- outputs (`DojoCreatingTxOutputApi[]`)
- derivationPrefix (`string`)
- referenceNumber (`string`)
- paymailHandle (`string`)

### `DojoSubmitDirectTransactionOutputApi` (interface)

**Members:**

- vout (`number`)
- basket (`string`)
- suffix (`string`)
- customInstructions (`object`)

### `DojoSubmitDirectTransactionApi` (interface)

**Members:**

- /\*\*
  - sparse array of outputs of interest where indices match vout numbers.
    \*/
    outputs (`Record<number, DojoSubmitDirectTransactionOutputApi>`) - sparse array of outputs of interest where indices match vout numbers.

### `DojoSubmitDirectTransactionResultApi` (interface)

**Members:**

- transactionId (`number`)
- referenceNumber (`string`)

### `verifyBuffer` (function)

Helper function.

Verifies the value of b is a Buffer and optionally also its length.

**Parameters:**

- b (`Buffer`)
- length (`number`)

**returns:** Buffer

### `verifyTruthy` (function)

Helper function.

Verifies that a possibly optional value has a value.

**Parameters:**

- v (`T`)
- description (`string`)

**returns:** T

### `verifyNumber` (function)

Helper function.

Verifies that an optional number has a value.

**Parameters:**

- v (`number`)

**returns:** number

### `verifyOneOrNone` (function)

Helper function.

throws ERR_BAD_REQUEST if results has length greater than one.

**Parameters:**

- results (`T[]`)

**returns:** T

### `verifyOne` (function)

Helper function.

throws ERR_BAD_REQUEST if results has length other than one.

**Parameters:**

- results (`T[]`)
- errorDescrition (`string`)

**returns:** T

### `verifyNone` (function)

Helper function.

throws ERR_BAD_REQUEST if results has length greater than one.

**Parameters:**

- results (`T[]`)

**returns:** void

### `ERR_DOJO_TX_BAD_AMOUNT` (class)

Transaction amount is not correct!

### `ERR_DOJO_NOT_SUFFICIENT_FUNDS` (class)

Not sufficient funds in the available inputs to cover the cost of the required outputs
and the transaction fee (${moreSatoshisNeeded} more satoshis are needed,
for a total of ${totalSatoshisNeeded}), plus whatever would be required in order
to pay the fee to unlock and spend the outputs used to provide the additional satoshis.

### `ERR_DOJO_UNKNOWN_FEE_MODEL` (class)

Transaction was already broadcast.

### `ERR_DOJO_BROADCAST_DUPE` (class)

Transaction was already broadcast.

### `ERR_DOJO_CERT_DUPE` (class)

Certificate already exists.

### `ERR_DOJO_CERT_INVALID` (class)

Certificate signature is invalid.

### `ERR_DOJO_CERT_SUBJECT` (class)

Certificate subject must match authenticated user's identityKey.

### `ERR_DOJO_CREATE_TX_EMPTY` (class)

Transaction must have at least one input and output.

### `ERR_DOJO_INVALID_REDEEM` (class)

outputToRedeem is invalid

### `ERR_DOJO_INVALID_CUSTOM_INSTRUCTIONS` (class)

Output customInstruction must be a string or length not more than 2500.

### `ERR_DOJO_INVALID_OUTPOINT` (class)

The outpoint (txid and vout combination) does not belong to a transaction known by this user of the server.

### `ERR_DOJO_INVALID_OUTPUT_DESCRIPTION` (class)

Output description must be a string or length not more than 255.

### `ERR_DOJO_INVALID_PAYMAIL_HANDLE` (class)

The paymail handle is invalid.

### `ERR_DOJO_INVALID_PAYMAIL_DOMAIN` (class)

This server is not accepting registrations for new Paymail handles under the specified domain name.

### `ERR_DOJO_INVALID_NOTE` (class)

The transaction note is invalid.

### `ERR_DOJO_INVALID_REFERENCE` (class)

The transaction reference is invalid.

### `ERR_DOJO_INVALID_SATOSHIS` (class)

An amount of satoshis must be a non-negative integer less than 21e14.

### `ERR_DOJO_INVALID_SCRIPT` (class)

Script must be a valid Bitcoin script.

### `ERR_DOJO_INVALID_TIME` (class)

Time values must be integer number of seconds since the epoch.

### `ERR_DOJO_INVALID_TRANSACTION_STATUS` (class)

The status of this transaction is \${stat}, which is not compatible with this operation. The transaction was not broadcasted by the recipient.

### `ERR_DOJO_INVALID_BASKET_NAME` (class)

Basket names must have one visible character and not more than 1000.

### `ERR_DOJO_INVALID_TX_RECIPIENT` (class)

Transaction recipient must be not more than 100.

### `ERR_DOJO_INVALID_TX_LABEL` (class)

Transaction labels must have one visible character and not more than 150.

### `ERR_DOJO_INVALID_TXID` (class)

Transaction labels must have one visible character and not more than 150.

### `ERR_DOJO_LABEL_NOT_FOUND` (class)

The label cannot be found linked with your user account.

### `ERR_DOJO_PAYMAIL_MISMATCH` (class)

This paymail is not the same one used to create the request. The transaction was not broadcasted by the recipient.

### `ERR_DOJO_PAYMAIL_NOT_FORMATTED_CORRECTLY` (class)

The provided paymail was not in the correct format.

### `ERR_DOJO_PAYMAIL_NOT_FOUND` (class)

This paymail was not found on this server.

### `ERR_DOJO_PAYMAIL_UNAVAILABLE` (class)

This Paymail handle is unavailable for registration by this server.

### `ERR_DOJO_REQUEST_EXPIRED` (class)

The reference you have provided is expired. The transaction was not broadcasted by the recipient.

### `ERR_DOJO_SENDER_SIGNATURE_CHECK` (class)

The signature you provided to authenticate this Paymail sender is not valid.

### `ERR_DOJO_TRANSACTION_NOT_FOUND` (class)

The transaction cannot be found linked with your user account.

### `ERR_DOJO_TRANSACTION_REJECTED` (class)

This transaction was rejected and was not broadcasted by the recipient. Ensure that all specified output scripts are present with the correct amounts assigned to each.

### `ERR_DOJO_NO_ENVELOPE` (class)

No envelope for \${txid}

### `ERR_DOJO_PROCESS_PENDING_OUTGOING` (class)

processPendingOuputs of outgoing transactions is not suported at this time.

### `ERR_DOJO_SYNC_STATUS` (class)

### `ERR_DOJO_SYNC_REFNUM` (class)

### `ERR_DOJO_SYNC_STATE` (class)

### `ERR_DOJO_SYNC_TOTAL` (class)

### `validateIdentityKey` (function)

**Parameters:**

- identityKey (`string`)

**returns:** string

### `validateTXID` (function)

**Parameters:**

- txid (`string`)

**returns:** void

### `validateBasketName` (function)

**Parameters:**

- name (`string`)

**returns:** string

### `validateTxRecipient` (function)

**Parameters:**

- recipient (`string`)

**returns:** string

### `validateTxNote` (function)

**Parameters:**

- note (`string`)

**returns:** string

### `validateCustomInstructions` (function)

**Parameters:**

- s (`string`)

**returns:** string

### `validateOutputDescription` (function)

**Parameters:**

- s (`string`)

**returns:** string

### `validateCreateTxOutput` (function)

**Parameters:**

- o (`DojoCreateTxOutputApi`)

**returns:** void

### `validateSecondsSinceEpoch` (function)

**Parameters:**

- time (`number`)

**returns:** Date

### `validateSatoshis` (function)

**Parameters:**

- satoshis (`number`)

**returns:** void

### `validateScript` (function)

**Parameters:**

- script (`string`)

**returns:** void

### `validateInputSelection` (function)

**Parameters:**

- v (`DojoTxInputSelectionApi`)

**returns:** DojoTxInputSelectionApi

### `validateOutputGeneration` (function)

**Parameters:**

- v (`DojoOutputGenerationApi`)

**returns:** DojoOutputGenerationApi

### `validateTxLabel` (function)

**Parameters:**

- label (`string`)

**returns:** string

### `validateTxLabels` (function)

**Parameters:**

- v (`string[]`)

**returns:** string[]

### `validateFeeModel` (function)

**Parameters:**

- v (`DojoFeeModelApi`)

**returns:** DojoFeeModelApi

### `validateOutputToRedeem` (function)

**Parameters:**

- output (`DojoOutputToRedeemApi`)

**returns:** void

### `validatePaymail` (function)

**Parameters:**

- paymailHandle (`string`)

**returns:** void

### `validateSABPPPTransaction` (function)

**Parameters:**

- transaction (`DojoSubmitDirectTransactionApi`)

**returns:** DojoSubmitDirectTransactionApi

### `validateSubmitDirectCustomTransaction` (function)

**Parameters:**

- transaction (`DojoSubmitDirectTransactionApi`)

**returns:** DojoSubmitDirectTransactionApi

### `transactionInputSize` (function)

**Parameters:**

- scriptSize (`number`) - byte length of input script

**returns:** number

### `transactionOutputSize` (function)

**Parameters:**

- scriptSize (`number`) - byte length of output script

**returns:** number

### `transactionSize` (function)

Compute the serialized binary transaction size in bytes
given the number of inputs and outputs,
and the size of each script.

**Parameters:**

- inputs (`number[]`) - array of input script lengths, in bytes
- outputs (`number[]`) - array of output script lengths, in bytes

**returns:** number

### `offsetPrivKey` (function)

**Parameters:**

- privKey (`string`)
- keyOffset (`string`)

**returns:** { offsetPrivKey: string; keyOffset: string; }

### `offsetPubKey` (function)

**Parameters:**

- pubKey (`string`)
- keyOffset (`string`)

**returns:** { offsetPubKey: string; keyOffset: string; }

### `lockScriptWithKeyOffsetFromPubKey` (function)

**Parameters:**

- pubKey (`string`)
- keyOffset (`string`)

**returns:** { script: string; keyOffset: string; }

### `createBabbageServiceChargeOutput` (function)

**returns:** { script: string; satoshis: number; keyOffset: string; }

### `restoreUserStateBuffers` (function)

Entities sent across HTTP may not have Buffer properties restored as Buffers.

Detect these situations and restore contained values as Buffers.

**Parameters:**

- state (`DojoUserStateApi`)

**returns:** void

<!-- INSERT GENERATED DOCS END -->

## License

The license for the code in this repository is the Open BSV License.
