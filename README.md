# cwi-base

Base classes, types, utilities for implementation support of CWI components.

## API

<!--#region ts2md-api-merged-here-->
Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

### Interfaces

| | | | |
| --- | --- | --- | --- |
| [BaseBlockHeader](#interface-baseblockheader) | [DojoCreatingTxOutputApi](#interface-dojocreatingtxoutputapi) | [DojoPublicApi](#interface-dojopublicapi) | [DojoTxLabelMapApi](#interface-dojotxlabelmapapi) |
| [BaseBlockHeaderHex](#interface-baseblockheaderhex) | [DojoEntityTimeStampApi](#interface-dojoentitytimestampapi) | [DojoStatsApi](#interface-dojostatsapi) | [DojoUserApi](#interface-dojouserapi) |
| [BlockHeader](#interface-blockheader) | [DojoFeeModelApi](#interface-dojofeemodelapi) | [DojoSubmitDirectTransactionApi](#interface-dojosubmitdirecttransactionapi) | [DojoUserStateApi](#interface-dojouserstateapi) |
| [BlockHeaderHex](#interface-blockheaderhex) | [DojoGetTotalOfAmountsOptions](#interface-dojogettotalofamountsoptions) | [DojoSubmitDirectTransactionOutputApi](#interface-dojosubmitdirecttransactionoutputapi) | [EnvelopeApi](#interface-envelopeapi) |
| [ChaintracksApi](#interface-chaintracksapi) | [DojoGetTransactionOutputsOptions](#interface-dojogettransactionoutputsoptions) | [DojoSubmitDirectTransactionResultApi](#interface-dojosubmitdirecttransactionresultapi) | [EnvelopeEvidenceApi](#interface-envelopeevidenceapi) |
| [ChaintracksClientApi](#interface-chaintracksclientapi) | [DojoGetTransactionsOptions](#interface-dojogettransactionsoptions) | [DojoSyncApi](#interface-dojosyncapi) | [LiveBlockHeader](#interface-liveblockheader) |
| [ChaintracksInfoApi](#interface-chaintracksinfoapi) | [DojoIdentityApi](#interface-dojoidentityapi) | [DojoSyncErrorApi](#interface-dojosyncerrorapi) | [LiveBlockHeaderHex](#interface-liveblockheaderhex) |
| [ChaintracksPackageInfoApi](#interface-chaintrackspackageinfoapi) | [DojoMapiResponseApi](#interface-dojomapiresponseapi) | [DojoSyncIdentifyParams](#interface-dojosyncidentifyparams) | [MapiCallbackPayloadApi](#interface-mapicallbackpayloadapi) |
| [DojoAliasApi](#interface-dojoaliasapi) | [DojoOutputApi](#interface-dojooutputapi) | [DojoSyncIdentifyResultApi](#interface-dojosyncidentifyresultapi) | [MapiPostTxPayloadApi](#interface-mapiposttxpayloadapi) |
| [DojoAvatarApi](#interface-dojoavatarapi) | [DojoOutputBasketApi](#interface-dojooutputbasketapi) | [DojoSyncMapApi](#interface-dojosyncmapapi) | [MapiResponseApi](#interface-mapiresponseapi) |
| [DojoCertificateApi](#interface-dojocertificateapi) | [DojoOutputGenerationApi](#interface-dojooutputgenerationapi) | [DojoSyncMergeParams](#interface-dojosyncmergeparams) | [MapiTxStatusPayloadApi](#interface-mapitxstatuspayloadapi) |
| [DojoCertificateFieldApi](#interface-dojocertificatefieldapi) | [DojoOutputToRedeemApi](#interface-dojooutputtoredeemapi) | [DojoSyncMergeResultApi](#interface-dojosyncmergeresultapi) | [MapiTxidReturnResultApi](#interface-mapitxidreturnresultapi) |
| [DojoClientApi](#interface-dojoclientapi) | [DojoPendingTxApi](#interface-dojopendingtxapi) | [DojoSyncOptionsApi](#interface-dojosyncoptionsapi) | [SyncDojoConfigBaseApi](#interface-syncdojoconfigbaseapi) |
| [DojoClientUserApi](#interface-dojoclientuserapi) | [DojoPendingTxInputApi](#interface-dojopendingtxinputapi) | [DojoSyncUpdateParams](#interface-dojosyncupdateparams) | [SyncDojoConfigCloudUrl](#interface-syncdojoconfigcloudurl) |
| [DojoCommissionApi](#interface-dojocommissionapi) | [DojoPendingTxInputInstructionsApi](#interface-dojopendingtxinputinstructionsapi) | [DojoSyncUpdateResultApi](#interface-dojosyncupdateresultapi) | [SyncDojoConfigMySqlConnection](#interface-syncdojoconfigmysqlconnection) |
| [DojoCreateTransactionResultApi](#interface-dojocreatetransactionresultapi) | [DojoPendingTxOutputApi](#interface-dojopendingtxoutputapi) | [DojoTransactionApi](#interface-dojotransactionapi) | [SyncDojoConfigSqliteFile](#interface-syncdojoconfigsqlitefile) |
| [DojoCreateTxOutputApi](#interface-dojocreatetxoutputapi) | [DojoProcessTransactionResultApi](#interface-dojoprocesstransactionresultapi) | [DojoTxInputSelectionApi](#interface-dojotxinputselectionapi) | [TscMerkleProofApi](#interface-tscmerkleproofapi) |
| [DojoCreatingTxInputsApi](#interface-dojocreatingtxinputsapi) | [DojoProvenTxApi](#interface-dojoproventxapi) | [DojoTxInputsApi](#interface-dojotxinputsapi) |  |
| [DojoCreatingTxInstructionsApi](#interface-dojocreatingtxinstructionsapi) | [DojoProvenTxReqApi](#interface-dojoproventxreqapi) | [DojoTxLabelApi](#interface-dojotxlabelapi) |  |

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---

#### Interface: BaseBlockHeader

##### Description

These are fields of 80 byte serialized header in order whose double sha256 hash is a block's hash value
and the next block's previousHash value.

All block hash values and merkleRoot values are 32 byte Buffer values with the byte order reversed from the serialized byte order.

```ts
export interface BaseBlockHeader {
    version: number;
    previousHash: Buffer;
    merkleRoot: Buffer;
    time: number;
    bits: number;
    nonce: number;
}
```

<details>

<summary>Interface BaseBlockHeader Member Details</summary>

###### version

Block header version value. Serialized length is 4 bytes.

###### previousHash

Hash of previous block's block header. Serialized length is 32 bytes.

###### merkleRoot

Root hash of the merkle tree of all transactions in this block. Serialized length is 32 bytes.

###### time

Block header time value. Serialized length is 4 bytes.

###### bits

Block header bits value. Serialized length is 4 bytes.

###### nonce

Block header nonce value. Serialized length is 4 bytes.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: BaseBlockHeaderHex

##### Description

Like BlockHeader but 32 byte fields are hex encoded strings.

```ts
export interface BaseBlockHeaderHex {
    version: number;
    previousHash: string;
    merkleRoot: string;
    time: number;
    bits: number;
    nonce: number;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: BlockHeader

##### Description

A `BaseBlockHeader` extended with its computed hash and height in its chain.

```ts
export interface BlockHeader extends BaseBlockHeader {
    height: number;
    hash: Buffer;
}
```

<details>

<summary>Interface BlockHeader Member Details</summary>

###### height

Height of the header, starting from zero.

###### hash

The double sha256 hash of the serialized `BaseBlockHeader` fields.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: BlockHeaderHex

##### Description

Like BlockHeader but 32 byte fields are hex encoded strings.

```ts
export interface BlockHeaderHex extends BaseBlockHeaderHex {
    height: number;
    hash: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: LiveBlockHeader

##### Description

The "live" portion of the block chain is recent history that can conceivably be subject to reorganizations.
The additional fields support tracking orphan blocks, chain forks, and chain reorgs.

```ts
export interface LiveBlockHeader extends BlockHeader {
    chainWork: Buffer;
    isChainTip: boolean;
    isActive: boolean;
    headerId: number;
    previousHeaderId: number | null;
}
```

<details>

<summary>Interface LiveBlockHeader Member Details</summary>

###### chainWork

The cummulative chainwork achieved by the addition of this block to the chain.
Chainwork only matters in selecting the active chain.

###### isChainTip

True only if this header is currently a chain tip. e.g. There is no header that follows it by previousHash or previousHeaderId.

###### isActive

True only if this header is currently on the active chain.

###### headerId

As there may be more than one header with identical height values due to orphan tracking,
headers are assigned a unique headerId while part of the "live" portion of the block chain.

###### previousHeaderId

Every header in the "live" portion of the block chain is linked to an ancestor header through
both its previousHash and previousHeaderId properties.

Due to forks, there may be multiple headers with identical `previousHash` and `previousHeaderId` values.
Of these, only one (the header on the active chain) will have `isActive` === true.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: LiveBlockHeaderHex

##### Description

Like LiveBlockHeader but 32 byte fields are hex encoded strings.

```ts
export interface LiveBlockHeaderHex extends BlockHeaderHex {
    chainWork: string;
    isChainTip: boolean;
    isActive: boolean;
    headerId: number;
    previousHeaderId: number | null;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: ChaintracksPackageInfoApi

##### Description

```ts
export interface ChaintracksPackageInfoApi {
    name: string;
    version: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: ChaintracksInfoApi

##### Description

```ts
export interface ChaintracksInfoApi {
    chain: Chain;
    heightBulk: number;
    heightLive: number;
    storageEngine: string;
    bulkStorage: string | undefined;
    bulkIndex: string | undefined;
    bulkIngestors: string[];
    liveIngestors: string[];
    packages: ChaintracksPackageInfoApi[];
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: ChaintracksClientApi

##### Description

Chaintracks client API excluding events and callbacks

```ts
export interface ChaintracksClientApi {
    getChain(): Promise<Chain>;
    getInfo(): Promise<ChaintracksInfoApi>;
    getPresentHeight(): Promise<number>;
    getHeaders(height: number, count: number): Promise<Buffer>;
    getHeadersHex(height: number, count: number): Promise<string>;
    findChainTipHeader(): Promise<BlockHeader>;
    findChainTipHeaderHex(): Promise<BlockHeaderHex>;
    findChainTipHash(): Promise<Buffer>;
    findChainTipHashHex(): Promise<string>;
    findChainWorkForBlockHash(hash: Buffer | string): Promise<Buffer | undefined>;
    findChainWorkHexForBlockHash(hash: Buffer | string): Promise<string | undefined>;
    findHeaderForBlockHash(hash: Buffer | string): Promise<BlockHeader | undefined>;
    findHeaderHexForBlockHash(hash: Buffer | string): Promise<BlockHeaderHex | undefined>;
    findHeaderForHeight(height: number): Promise<BlockHeader | undefined>;
    findHeaderHexForHeight(height: number): Promise<BlockHeaderHex | undefined>;
    findHeaderForMerkleRoot(merkleRoot: Buffer | string, height?: number): Promise<BlockHeader | undefined>;
    findHeaderHexForMerkleRoot(root: Buffer | string, height?: number): Promise<BlockHeaderHex | undefined>;
    addHeader(header: BaseBlockHeader | BaseBlockHeaderHex): Promise<void>;
    startListening(): Promise<void>;
    listening(): Promise<void>;
    isListening(): Promise<boolean>;
    isSynchronized(): Promise<boolean>;
    subscribeHeaders(listener: HeaderListener): Promise<string>;
    subscribeReorgs(listener: ReorgListener): Promise<string>;
    unsubscribe(subscriptionId: string): Promise<boolean>;
}
```

<details>

<summary>Interface ChaintracksClientApi Member Details</summary>

###### getChain

Confirms the chain

###### getInfo

###### getPresentHeight

Return the latest chain height from configured bulk ingestors.

###### getHeaders

Adds headers in 80 byte serialized format to a buffer.
Only adds active headers.
Buffer length divided by 80 is the actual number returned.

###### getHeadersHex

Adds headers in 80 byte serialized format to a buffer.
Only adds active headers.
Buffer length divided by 80 is the actual number returned.

###### findChainTipHeader

Returns the active chain tip header

###### findChainTipHeaderHex

Returns the active chain tip header

###### findChainTipHash

Returns the block hash of the active chain tip.

###### findChainTipHashHex

Returns the block hash of the active chain tip.

###### findChainWorkForBlockHash

Only returns a value for headers in live storage.
Returns undefined if `hash` is unknown or in bulk storage.

###### findChainWorkHexForBlockHash

Only returns a value for headers in live storage.
Returns undefined if `hash` is unknown or in bulk storage.

###### findHeaderForBlockHash

Returns block header for a given block hash

###### findHeaderHexForBlockHash

Returns block header for a given block hash

###### findHeaderForHeight

Returns block header for a given block height on active chain.

###### findHeaderHexForHeight

Returns block header for a given block height on active chain.

###### findHeaderForMerkleRoot

Returns block header for a given possible height and specific merkleRoot
The height, available for all mined blocks, allows fast and compact indexing of
bulk headers.
Confirms that the found header has the request merkleRoot or returns undefined.

###### findHeaderHexForMerkleRoot

Returns block header for a given possible height and specific merkleRoot
The height, available for all mined blocks, allows fast and compact indexing of
bulk headers.
Confirms that the found header has the request merkleRoot or returns undefined.

###### addHeader

Submit a possibly new header for adding

If the header is invalid or a duplicate it will not be added.

This header will be ignored if the previous header has not already been inserted when this header
is considered for insertion.

###### startListening

Start or resume listening for new headers.

Calls `synchronize` to catch up on headers that were found while not listening.

Begins listening to any number of configured new header notification services.

Begins sending notifications to subscribed listeners only after processing any
previously found headers.

May be called if already listening or synchronizing to listen.

The `listening` API function which returns a Promise can be awaited.

###### listening

Returns a Promise that will resolve when the previous call to startListening
enters the listening-for-new-headers state.

###### isListening

Returns true if actively listening for new headers and client api is enabled.

###### isSynchronized

Returns true if `synchronize` has completed at least once.

###### subscribeHeaders

Subscribe to "header" events.

###### subscribeReorgs

Subscribe to "reorganization" events.

###### unsubscribe

Cancels all subscriptions with the given `subscriptionId` which was previously returned
by a `subscribe` method.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: ChaintracksApi

##### Description

Full Chaintracks API including startListening with callbacks

```ts
export interface ChaintracksApi extends ChaintracksClientApi {
    startListening(listening?: () => void): Promise<void>;
}
```

<details>

<summary>Interface ChaintracksApi Member Details</summary>

###### startListening

Start or resume listening for new headers.

Calls `synchronize` to catch up on headers that were found while not listening.

Begins listening to any number of configured new header notification services.

Begins sending notifications to subscribed listeners only after processing any
previously found headers.

May be called if already listening or synchronizing to listen.

`listening` callback will be called after listening for new live headers has begun.
Alternatively, the `listening` API function which returns a Promise can be awaited.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: MapiResponseApi

```ts
export interface MapiResponseApi {
    payload: string;
    signature: string;
    publicKey: string;
    encoding?: string;
    mimetype?: string;
}
```

<details>

<summary>Interface MapiResponseApi Member Details</summary>

###### payload

Contents of the envelope.
Validate using signature and publicKey.
encoding and mimetype may assist with decoding validated payload.

###### signature

signature producted by correpsonding private key on payload data

###### publicKey

public key to use to verify signature of payload data

###### encoding

encoding of the payload data

###### mimetype

mime type of the payload data

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: TscMerkleProofApi

##### Description

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

```ts
export interface TscMerkleProofApi {
    height?: number;
    index: number;
    txOrId: string | Buffer;
    target: string | Buffer;
    nodes: string[] | Buffer;
    targetType?: "hash" | "header" | "merkleRoot" | "height";
    proofType?: "branch" | "tree";
    composite?: boolean;
}
```

<details>

<summary>Interface TscMerkleProofApi Member Details</summary>

###### height

The most efficient way of confirming a proof should also be the most common,
when the containing block's height is known.

###### index

Index of transaction in its block. First transaction is index zero.

###### txOrId

Full transaction (length > 32 bytes) or just its double SHA256 hash (length === 32 bytes).
If string, encoding is hex.

###### target

Merkle root (length === 32) or serialized block header containing it (length === 80).
If string, encoding is hex.

###### nodes

Merkle tree sibling hash values required to compute root from txid.
Duplicates (sibling hash === computed hash) are indicated by "*" or type byte === 1.
type byte === 2...
Strings are encoded as hex.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: MapiTxStatusPayloadApi

##### Description

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

```ts
export interface MapiTxStatusPayloadApi {
    apiVersion: string;
    timestamp: string;
    txid: string;
    returnResult: string;
    blockHash: string;
    blockHeight: number;
    confirmations: number;
    minerId: string;
    txSecondMempoolExpiry: number;
    merkleProof?: TscMerkleProofApi;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: MapiCallbackPayloadApi

##### Description

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

```ts
export interface MapiCallbackPayloadApi {
    apiVersion: string;
    timestamp: string;
    blockHash: string;
    blockHeight: number;
    callbackTxId: string;
    callbackReason: string;
    callbackPayload: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: MapiTxidReturnResultApi

##### Description

Used to parse payloads when only confirmation that a miner acknowledges a specific txid matters.

```ts
export interface MapiTxidReturnResultApi {
    apiVersion?: string;
    timestamp?: string;
    txid: string;
    returnResult: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: MapiPostTxPayloadApi

##### Description

As defined in https://github.com/bitcoin-sv-specs/brfc-merchantapi/blob/master/README.md

```ts
export interface MapiPostTxPayloadApi {
    apiVersion: string;
    timestamp: string;
    txid: string;
    returnResult: string;
    resultDescription: string;
    minerId: string;
    currentHighestBlockHash?: string;
    currentHighestBlockHeight?: number;
    txSecondMempoolExpiry?: number;
    failureRetryable?: boolean;
    warnings?: unknown[];
    conflictedWith?: unknown[];
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: EnvelopeApi

##### Description

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

```ts
export interface EnvelopeApi extends EnvelopeEvidenceApi {
    headers?: string[];
    reference?: string;
}
```

<details>

<summary>Interface EnvelopeApi Member Details</summary>

###### headers

For root nodes only.
Array of 80 byte block headers encoded as 160 character hex strings
Include headers the envelope creator is aware of but which the resipient may not have.

###### reference

Arbitrary reference string associated with the envelope, typically root node only.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: EnvelopeEvidenceApi

##### Description

Either inputs or proof are required.

```ts
export interface EnvelopeEvidenceApi {
    rawTx: string;
    proof?: TscMerkleProofApi | Buffer;
    inputs?: EnvelopeInputMapApi;
    txid?: string;
    mapiResponses?: MapiResponseApi[];
    depth?: number;
}
```

<details>

<summary>Interface EnvelopeEvidenceApi Member Details</summary>

###### rawTx

A valid bitcoin transaction encoded as a hex string.

###### proof

Either proof, or inputs, must have a value.
Leaf nodes have proofs.

If value is a Buffer, content is binary encoded serialized proof
see: chaintracks-spv.utils.serializeTscMerkleProof

###### inputs

Only one of proof or inputs must be valid.
Branching nodes have inputs with a sub envelope (values) for every input transaction txid (keys)

###### txid

double SHA256 hash of serialized rawTx. Optional.

###### mapiResponses

Array of mapi transaction status update responses
Only the payload, signature, and publicKey properties are relevant.

Branching inputs nodes only.
Array of mapi transaction status update responses confirming
unproven transctions have at least been submitted for processing.

###### depth

count of maximum number of chained unproven transactions before a proven leaf node
proof nodes have depth zero.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoPublicApi

##### Description

Public Dojo Api
No Authrite authentication required.
Not specific to any userId

```ts
export interface DojoPublicApi {
    getChain(): Promise<Chain>;
    stats(): Promise<DojoStatsApi>;
}
```

<details>

<summary>Interface DojoPublicApi Member Details</summary>

###### getChain

Return the chain served by this Dojo

Also serves to verifies that all dependent services are on same chain.

###### stats

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: SyncDojoConfigBaseApi

##### Description

Each syncDojo config has the following properties:

'dojoType' one of 'Cloud URL' | 'Sqlite File' | 'MySql Connection'
'dojoIdentityKey' the identity key of the syncDojo.
'dojoName' the name of the syncDojo.

```ts
export interface SyncDojoConfigBaseApi {
    dojoType: SyncDojoConfigType;
    dojoIdentityKey: string;
    dojoName?: string;
}
```

<details>

<summary>Interface SyncDojoConfigBaseApi Member Details</summary>

###### dojoType

one of 'Cloud URL' | 'Sqlite File' | 'MySql Connection' | '<custom>'

###### dojoIdentityKey

the identity key of the syncDojo.

###### dojoName

the name of the syncDojo.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: SyncDojoConfigCloudUrl

##### Description

The derived `SyncDojoConfigCloudUrl` interface adds:

'url' the service URL of the cloud dojo with which to sync

'clientPrivateKey' should be the authenticated user's private key matching their identityKey to enable automatic use of Authrite.

'useIdentityKey' may be set to true instead of using 'clientPrivateKey' if the cloud dojo does not use Authrite for access control.

The cloud dojo must exists and must already be configured with matching dojoIdentityKey.
  
If neither 'clientPrivateKey' or 'useIdentityKey' has a value, will attempt to use the Babbage signing strategy for Authrite.

```ts
export interface SyncDojoConfigCloudUrl extends SyncDojoConfigBaseApi {
    url: string;
    clientPrivateKey?: string;
    useIdentityKey?: boolean;
}
```

<details>

<summary>Interface SyncDojoConfigCloudUrl Member Details</summary>

###### url

the service URL of the cloud dojo with which to sync

###### clientPrivateKey

should be the authenticated user's private key matching their identityKey to enable automatic use of Authrite.

###### useIdentityKey

may be set to true instead of using 'clientPrivateKey' if the cloud dojo does not use Authrite for access control.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: SyncDojoConfigMySqlConnection

```ts
export interface SyncDojoConfigMySqlConnection extends SyncDojoConfigBaseApi {
    connection: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: SyncDojoConfigSqliteFile

```ts
export interface SyncDojoConfigSqliteFile extends SyncDojoConfigBaseApi {
    filename: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoIdentityApi

```ts
export interface DojoIdentityApi {
    dojoIdentityKey: string;
    dojoName?: string;
}
```

<details>

<summary>Interface DojoIdentityApi Member Details</summary>

###### dojoIdentityKey

The identity key (public key) assigned to this dojo

###### dojoName

The human readable name assigned to this dojo.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncErrorApi

```ts
export interface DojoSyncErrorApi {
    code: string;
    description: string;
    stack?: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncMapApi

```ts
export interface DojoSyncMapApi {
    aliasIds: Record<number, number>;
    certificateIds: Record<number, number>;
    commissionIds: Record<number, number>;
    responseIds: Record<number, number>;
    basketIds: Record<number, number>;
    outputIds: Record<number, number>;
    provenTxReqIds: Record<number, number>;
    provenTxIds: Record<number, number>;
    txIds: Record<number, number>;
    txLabelIds: Record<number, number>;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncIdentifyParams

##### Description

Receipt of `DojoSyncIdentityParams` via the `syncIdentify` function starts a dojo to dojo sync.

It may also force a restart of the sync protocol.

The purpose of the `Identify` phase is to identify both dojo's to each other,
the identity of the authenticated user, and the last known sync_state.

```ts
export interface DojoSyncIdentifyParams {
    protocolVersion: DojoSyncProtocolVersion;
    userIdentityKey: string;
    dojoIdentityKey: string;
    dojoName?: string;
    refNum: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncIdentifyResultApi

```ts
export interface DojoSyncIdentifyResultApi {
    refNum: string;
    identityKey: string;
    name?: string;
    status: DojoSyncStatus;
    when?: Date;
    error?: DojoSyncErrorApi;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncUpdateParams

```ts
export interface DojoSyncUpdateParams {
    protocolVersion: DojoSyncProtocolVersion;
    refNum: string;
    since?: Date;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncUpdateResultApi

```ts
export interface DojoSyncUpdateResultApi {
    refNum: string;
    status: DojoSyncStatus;
    since?: Date;
    state?: DojoUserStateApi;
    error?: DojoSyncErrorApi;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncMergeParams

```ts
export interface DojoSyncMergeParams {
    protocolVersion: DojoSyncProtocolVersion;
    refNum: string;
    when?: Date;
    state?: DojoUserStateApi;
    total?: number;
    iSyncMap?: DojoSyncMapApi;
    error?: DojoSyncErrorApi;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncMergeResultApi

```ts
export interface DojoSyncMergeResultApi {
    refNum: string;
    status: DojoSyncStatus;
    iSyncMap?: DojoSyncMapApi;
    error?: DojoSyncErrorApi;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncApi

##### Description

Dojo Sync Protocol

The Dojo Sync Protocol keeps multiple UTXO management services (Dojos) synchronized as updates occur between them.

The protocol relies on the properties of the blockchain to handle specific conflicts.

It is intended to support use cases where there is a primary dojo which periodically synchronizes to backup "syncDojos".

There is no formal conrol within the protocol for determining the primary dojo or transitioning between roles.

Synchronization is initiated from the primary Dojo.

Step 1. Run through the configured syncDojos calling syncIdentify which shares the local dojo and syncDojo's identities.
Any syncDojo that responds is added to activeSyncDojos.

Step 2. Run through the activeSyncDojos calling syncUpdate.

```ts
export interface DojoSyncApi {
    syncIdentify(params: DojoSyncIdentifyParams): Promise<DojoSyncIdentifyResultApi>;
    syncUpdate(params: DojoSyncUpdateParams): Promise<DojoSyncUpdateResultApi>;
    syncMerge(params: DojoSyncMergeParams): Promise<DojoSyncMergeResultApi>;
    authenticate(identityKey?: string, addIfNew?: boolean): Promise<void>;
    getSyncDojoConfig(): Promise<SyncDojoConfigBaseApi>;
}
```

<details>

<summary>Interface DojoSyncApi Member Details</summary>

###### syncIdentify

Called to initiate the sync protocol.

This is the initial protocol step to exchange dojo identityKeys and
configure the records in the sync_state and sync_history tables to support the sync protocol.

###### syncUpdate

Receive a state update for the authenticated user from a remote dojo
and respond with merge result and any pre-merge local state update
for the data interval from `since` to `when`

###### syncMerge

Informs a syncDojo of the result of merging state received from them.

This is the only valid way that the syncDojo's `when` field in `sync_state` is updated which is critical to
guaranteeing that un-merged changes are presented until successfully merged.

###### authenticate

For Dojo scenarios where it is permissible for Dojo to directly act as
a specified user, authenticate that user by supplying their identityKey

For Dojo scenarios where authrite is used to authenticate the local user
to a potentially remote Dojo server:
- If identityKey has a value then it used and must match the authenticated value.
- If identityKey is undefined, the authenticated value is used.

Sets userId and identityKey

###### getSyncDojoConfig

Returns the configuration of this dojo as a syncDojo

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSyncOptionsApi

```ts
export interface DojoSyncOptionsApi {
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoClientApi

##### Description

User specific public Dojo API accessible from all Dojo implementations
including `DojoExpressClient` HTTP client

```ts
export interface DojoClientApi extends DojoPublicApi, DojoSyncApi {
    authenticate(identityKey?: string, addIfNew?: boolean): Promise<void>;
    getDojoIdentity(): Promise<DojoIdentityApi>;
    sync(logger?: DojoLoggerApi): Promise<void>;
    setSyncDojosByConfig(syncDojoConfigs: SyncDojoConfigBaseApi[], options?: DojoSyncOptionsApi): Promise<void>;
    getSyncDojosByConfig(): Promise<{
        dojos: SyncDojoConfigBaseApi[];
        options?: DojoSyncOptionsApi;
    }>;
    getUser(): DojoClientUserApi;
    getAvatar(): Promise<DojoAvatarApi>;
    setAvatar(avatar: DojoAvatarApi): Promise<void>;
    getCurrentPaymails(): Promise<string[]>;
    saveCertificate(certificate: DojoCertificateApi): Promise<number>;
    findCertificates(certifiers?: string[], types?: Record<string, string[]>): Promise<DojoCertificateApi[]>;
    getTotalOfUnspentOutputs(basket?: string): Promise<number | undefined>;
    updateOutpointStatus(txid: string, vout: number, spendable: boolean): Promise<void>;
    getTotalOfAmounts(direction: "incoming" | "outgoing", options?: DojoGetTotalOfAmountsOptions): Promise<number>;
    getNetOfAmounts(options?: DojoGetTotalOfAmountsOptions): Promise<number>;
    updateTransactionStatus(reference: string, status: DojoTransactionStatusApi): Promise<void>;
    getTransactions(options?: DojoGetTransactionsOptions): Promise<{
        txs: DojoTransactionApi[];
        total: number;
    }>;
    getTransactionOutputs(options?: DojoGetTransactionOutputsOptions): Promise<{
        outputs: DojoOutputApi[];
        total: number;
    }>;
    getEnvelopeForTransaction(txid: string): Promise<EnvelopeApi | undefined>;
    getPendingTransactions(referenceNumber?: string): Promise<DojoPendingTxApi[]>;
    createTransaction(inputs: Record<string, DojoTxInputsApi>, inputSelection: DojoTxInputSelectionApi | undefined, outputs: DojoCreateTxOutputApi[], outputGeneration?: DojoOutputGenerationApi, feeModel?: DojoFeeModelApi, labels?: string[], note?: string, recipient?: string): Promise<DojoCreateTransactionResultApi>;
    processTransaction(rawTx: string | Buffer, reference: string, outputMap: Record<string, number>): Promise<DojoProcessTransactionResultApi>;
    submitDirectTransaction(protocol: string, transaction: DojoSubmitDirectTransactionApi, senderIdentityKey: string, note: string, labels: string[], derivationPrefix?: string): Promise<DojoSubmitDirectTransactionResultApi>;
    copyState(since?: Date): Promise<DojoUserStateApi>;
}
```

<details>

<summary>Interface DojoClientApi Member Details</summary>

###### authenticate

For Dojo scenarios where it is permissible for Dojo to directly act as
a specified user, authenticate that user by supplying their identityKey

For Dojo scenarios where authrite is used to authenticate the local user
to a potentially remote Dojo server:
- If identityKey has a value then it used and must match the authenticated value.
- If identityKey is undefined, the authenticated value is used.

Sets userId and identityKey

###### sync

Sync's this dojo's state for the authenticated user with all of the configured syncDojos

This method must be called when either a local or remote state change occurs, or may have occurred.

User state changes are propagated across all configured syncDojos.

###### getUser

Returns authenticated user.
Throws an error if isAuthenticated is false.

###### getAvatar

Returns the name and photo URL of the user

###### setAvatar

Update the avatar for the authenticated user.

###### getCurrentPaymails

Return array of paymail style identifiers for currently authenticated user in `alias`@`domain` format.

Where `alias` and `domain` come from the aliases table.

and `reservationCompleted` is true

###### saveCertificate

Save a new certificate with optional fields.

certificate must belong to aunthenticated user.

certificate.subject must match authenticated user's idenitityKey or throws ERR_DOJO_CERT_SUBJECT

certificate.signature must be valid or throws ERR_DOJO_CERT_INVALID

If { type, subject, validationKey, serialNumber, userId } already exist, throw ERR_DOJO_CERT_DUPE

###### findCertificates

Returns all of the authenticated user's certificates,
where the certifier and type values match one of the optionaly

###### getTotalOfUnspentOutputs

Returns the total of spendable output amounts.

Returns undefined if basket is not undefined and doesn't match an existing basket name.

If basket is not undefined, total is restricted to outputs in that basket.

If basket is undefined, total is over all spendable outputs.

###### updateOutpointStatus

Update `spendable` of an output that must exist,
belonging to the authenticated user,
in transaction with txid,
at index vout.

###### getTotalOfAmounts

Returns the sum of transaction amounts belonging to authenticated user,
matching the given direction,
and optionally matching conditions in `options`.

###### getNetOfAmounts

Returns the net sum of transaction amounts belonging to authenticated user,
incoming plus outgoing, as outgoing amounts are negative and incoming amounts are positive.
and optionally matching conditions in `options`.

###### updateTransactionStatus

Update transaction status and associated ouputs (both inputs and outputs) spendable and spentBy properties.

Updated transaction userId must match authenticated user and referenceNumber must match reference.

###### getTransactions

Returns transactions matching options and total matching count available.

###### getTransactionOutputs

Returns transaction outputs matching options and total matching count available.

###### getEnvelopeForTransaction

Returns an Everett Style envelope for the given txid.

A transaction envelope is a tree of inputs where all the leaves are proven transactions.
The trivial case is a single leaf: the envelope for a proven transaction is the rawTx and its proof.

Each branching level of the tree corresponds to an unmined transaction without a proof,
in which case the envelope is:
- rawTx
- mapiResponses from transaction processors (optional)
- inputs object where keys are this transaction's input txids and values are recursive envelope for those txids.

###### getPendingTransactions

Returns transactions with status of 'waitingForSenderToSend' or 'unprocessed' for authenticated user

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

###### createTransaction

Constructs a new transaction spending known outputs (inputs) and creating new outputs.

If the inputs to the transaction go beyond what is needed to fund these outputs (plus the transaction fee),
additional Dojo-managed UTXOs will be generated to collect the remainder
(see the "outputGeneration" parameter for more on this).

###### processTransaction

After creating a transaction with createTransaction and signing it, submit the serialized raw transaction
to transaction processors for processing.

The reference number uniquely identifies the transaction in the database.

Differences from v1:
1. mapi_responses records are created when callbackIDs are generated, they exist before callbackID is given to external transaction processing service.

###### submitDirectTransaction

This endpoint allows a recipient to submit a transactions that was directly given to them by a sender.

Saves the inputs and key derivation information, allowing the UTXOs to be redeemed in the future.

Sets the transaction to completed and marks the outputs as spendable.

###### copyState

Return a complete copy of all records for the authenticated user.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoGetTransactionsOptions

```ts
export interface DojoGetTransactionsOptions {
    columns?: string[];
    referenceNumber?: string;
    status?: DojoTransactionStatusApi;
    label?: string;
    startTime?: Date | string | number;
    endTime?: Date | string | number;
    involving?: string;
    addLabels?: boolean;
    limit?: number;
    offset?: number;
    order?: "ascending" | "descending";
}
```

<details>

<summary>Interface DojoGetTransactionsOptions Member Details</summary>

###### columns

Columns to return for each transaction. If undefined or empty, all columns are returned.

###### referenceNumber

Optional. Match transactions with this referenceNumber.

###### status

Optional. Match transactions with this status.

###### label

Optional. Match transactions with this label.

###### startTime

Optional. Match transactions created on or after this time. Date, ISO string, or seconds since the epoch.

###### endTime

Optional. Match transactions created on or before this time. Date, ISO string, or seconds since the epoch.

###### involving

Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.

###### addLabels

Optional. If true, array of mapped `labels` is added to each transaction.

###### limit

Optional. How many transactions to return.

###### offset

Optional. How many transactions to skip.

###### order

Optional. Set sort order of results. Transactions are ordered by transactionId ascending by default.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoGetTransactionOutputsOptions

```ts
export interface DojoGetTransactionOutputsOptions {
    basket?: string;
    tracked?: boolean;
    includeEnvelope?: boolean;
    spendable?: boolean;
    type?: string;
    limit?: number;
    offset?: number;
}
```

<details>

<summary>Interface DojoGetTransactionOutputsOptions Member Details</summary>

###### basket

If provided, indicates which basket the outputs should be selected from.

###### tracked

If provided, only outputs with the corresponding tracked value will be returned (true/false).

###### includeEnvelope

If provided, returns a structure with the SPV envelopes for the UTXOS that have not been spent.

###### spendable

If given as true or false, only outputs that have or have not (respectively) been spent will be returned. If not given, both spent and unspent outputs will be returned.

###### type

If provided, only outputs of the specified type will be returned. If not provided, outputs of all types will be returned.

###### limit

Provide a limit on the number of outputs that will be returned.

###### offset

Provide an offset into the list of outputs.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoGetTotalOfAmountsOptions

```ts
export interface DojoGetTotalOfAmountsOptions {
    label?: string;
    startTime?: Date | string | number;
    endTime?: Date | string | number;
    involving?: string;
    direction?: "incoming" | "outgoing";
}
```

<details>

<summary>Interface DojoGetTotalOfAmountsOptions Member Details</summary>

###### label

Optional. Match transactions with this label.

###### startTime

Optional. Match transactions created on or after this time. Seconds since the epoch.

###### endTime

Optional. Match transactions created on or before this time. Seconds since the epoch.

###### involving

Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.

###### direction

Direction of value flow.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoStatsApi

```ts
export interface DojoStatsApi {
    users: number;
    transactions: number;
    txLabels: number;
    chain: Chain;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoUserStateApi

```ts
export interface DojoUserStateApi {
    certificates: DojoCertificateApi[];
    certificateFields: DojoCertificateFieldApi[];
    commissions: DojoCommissionApi[];
    mapiResponses: DojoMapiResponseApi[];
    outputs: DojoOutputApi[];
    baskets: DojoOutputBasketApi[];
    provenTxReqs: DojoProvenTxReqApi[];
    provenTxs: DojoProvenTxApi[];
    txs: DojoTransactionApi[];
    txLabels: DojoTxLabelApi[];
    txLabelMaps: DojoTxLabelMapApi[];
    user: DojoUserApi;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoEntityTimeStampApi

```ts
export interface DojoEntityTimeStampApi {
    created_at?: Date | null;
    updated_at?: Date | null;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoAliasApi

```ts
export interface DojoAliasApi extends DojoEntityTimeStampApi {
    aliasId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    alias: string;
    domain: string;
    avatarName?: string;
    avatarPhotoURL?: string;
    reservationCompleted: boolean;
    userId: number;
    destinationBasketId: number;
}
```

<details>

<summary>Interface DojoAliasApi Member Details</summary>

###### alias

max length of 30

###### domain

max length of 30

###### avatarName

max length of 30

###### avatarPhotoURL

max length of 100

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoAvatarApi

```ts
export interface DojoAvatarApi {
    name: string;
    photoURL: string;
}
```

<details>

<summary>Interface DojoAvatarApi Member Details</summary>

###### name

The name of the user

###### photoURL

An HTTPS or UHRP URL to a photo of the user

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCertificateFieldApi

```ts
export interface DojoCertificateFieldApi extends DojoEntityTimeStampApi {
    userId: number;
    certificateId: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    fieldName: string;
    fieldValue: string;
    masterKey: string;
}
```

<details>

<summary>Interface DojoCertificateFieldApi Member Details</summary>

###### fieldName

max length of 100

###### fieldValue

max length of 255

###### masterKey

base64 encrypted master field revelation key

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCertificateApi

```ts
export interface DojoCertificateApi extends DojoEntityTimeStampApi {
    certificateId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    userId: number;
    type: string;
    subject: string;
    validationKey: string;
    serialNumber: string;
    certifier: string;
    revocationOutpoint: string;
    signature: string;
    fields?: Record<string, string>;
    masterKeyring?: Record<string, string>;
}
```

<details>

<summary>Interface DojoCertificateApi Member Details</summary>

###### type

max length of 255

###### subject

max length of 255

###### validationKey

max length of 255

###### serialNumber

max length of 255

###### certifier

max length of 255

###### revocationOutpoint

max length of 255

###### signature

max length of 255

###### fields

Certificate fields object constructed from fieldName and fieldValue properties of DojoCertificateFieldApi instances associated with this certificate.

###### masterKeyring

Certificate masterKeyring object constructed from fieldName and masterKey properties of DojoCertificateFieldApi instances associated with this certificate.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCommissionApi

```ts
export interface DojoCommissionApi extends DojoEntityTimeStampApi {
    commissionId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    transactionId: number;
    userId: number;
    isRedeemed: boolean;
    keyOffset: string;
    outputScript: Buffer | null;
    satoshis: number;
}
```

<details>

<summary>Interface DojoCommissionApi Member Details</summary>

###### keyOffset

max length of 130

###### satoshis

15 integer digits

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoMapiResponseApi

```ts
export interface DojoMapiResponseApi extends DojoEntityTimeStampApi {
    responseId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    transactionId: number;
    userId: number;
    callbackID?: string;
    payload?: string;
    publicKey?: string;
    signature?: string;
    doubleSpendResponse?: string | null;
}
```

<details>

<summary>Interface DojoMapiResponseApi Member Details</summary>

###### publicKey

max length of 255

###### signature

max length of 255

###### doubleSpendResponse

max length of 16

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoOutputApi

```ts
export interface DojoOutputApi extends DojoEntityTimeStampApi {
    outputId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    spendable: boolean;
    change: boolean;
    txid: string | null;
    vout: number | null;
    amount: number | null;
    outputScript: Buffer | null;
    type: string;
    transactionId: number;
    userId: number;
    basketId?: number | null;
    spentBy: number | null;
    derivationPrefix: string | null;
    derivationSuffix: string | null;
    paymailHandle: string | null;
    senderIdentityKey: string | null;
    customInstructions: string | null;
    tracked: boolean | null;
    providedBy: string | null;
    purpose: string | null;
    description: string | null;
    spendingDescription: string | null;
    envelope?: EnvelopeApi;
}
```

<details>

<summary>Interface DojoOutputApi Member Details</summary>

###### txid

length 64 hex encoded

###### vout

max 10 digits

###### amount

max 15 digits

###### type

max length of 50
e.g. P2PKH, custom

###### spentBy

transactionId of spending transaction or null if unspent
max 10 digits

###### derivationPrefix

max length of 32
base64 encoded

###### derivationSuffix

max length of 32
base64 encoded

###### paymailHandle

max length of 64

###### senderIdentityKey

max length of 130
hex encoded

###### customInstructions

max length of 2500

###### tracked

true if output was put in a basket for tracking

###### providedBy

max length of 130
e.g. you, dojo

###### purpose

max length of 20
e.g. change

###### description

max length of 255

###### spendingDescription

max length of 255

###### envelope

optional envelope for transaction containing output

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoOutputBasketApi

```ts
export interface DojoOutputBasketApi extends DojoEntityTimeStampApi {
    basketId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    name: string;
    numberOfDesiredUTXOs: number;
    minimumDesiredUTXOValue: number;
    userId: number;
}
```

<details>

<summary>Interface DojoOutputBasketApi Member Details</summary>

###### name

max length of 1000

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoTransactionApi

```ts
export interface DojoTransactionApi extends DojoEntityTimeStampApi {
    transactionId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    txid: string;
    rawTransaction: Buffer | null;
    status: DojoTransactionStatusApi;
    referenceNumber: string | null;
    amount: number;
    userId: number;
    senderPaymail: string | null;
    recipientPaymail: string | null;
    note: string | null;
    isOutgoing: boolean;
    unconfirmedInputChainLength: number;
    proof: string | null;
    truncatedExternalInputs: string | null;
    provenTxId?: number | null;
    labels?: string[];
}
```

<details>

<summary>Interface DojoTransactionApi Member Details</summary>

###### txid

length 64 hex encoded

###### status

max length of 64
e.g. completed, failed, unprocessed, waitingForSenderToSend

###### referenceNumber

max length of 64, hex encoded

###### amount

max 15 digits

###### senderPaymail

max length of 100

###### recipientPaymail

max length of 100

###### note

max length of 500

###### isOutgoing

true if transaction originated in this wallet, change returns to it.
false for a transaction created externally and handed in to this wallet.

###### provenTxId

Is valid when transaction proof record exists in DojoProvenTxApi table.

###### labels

When not undefined, array of assigned tx_labels.label values.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoProvenTxReqApi

```ts
export interface DojoProvenTxReqApi extends DojoEntityTimeStampApi {
    provenTxReqId?: number;
    userId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    txid: string;
    callbackID?: string;
    rawTx?: Buffer;
    history: string;
    notify: string;
    status: DojoProvenTxReqStatusApi;
    attempts: number;
    provenTxId?: number;
}
```

<details>

<summary>Interface DojoProvenTxReqApi Member Details</summary>

###### history

JSON string of processing history.
Parses to `DojoProvenTxReqHistoryApi`.

###### notify

JSON string of data to drive notifications when this request completes.
Parses to `DojoProvenTxReqNotifyApi`.

###### status

See `DojoProvenTxReqStatusApi`

###### attempts

Count of how many times a service has been asked about this txid

###### provenTxId

Once a DojoProvenTxApi record has been validated and added to database, the provenTxId value.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoProvenTxApi

```ts
export interface DojoProvenTxApi extends DojoEntityTimeStampApi {
    provenTxId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    txid: string;
    height: number;
    index: number;
    nodes: Buffer;
    rawTx: Buffer;
    blockHash: Buffer;
    merkleRoot: Buffer;
}
```

<details>

<summary>Interface DojoProvenTxApi Member Details</summary>

###### nodes

Serialized 32 bytes per node.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoTxLabelApi

```ts
export interface DojoTxLabelApi extends DojoEntityTimeStampApi {
    txLabelId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    label: string;
    userId: number;
}
```

<details>

<summary>Interface DojoTxLabelApi Member Details</summary>

###### label

max length of 150
e.g. babbage_app_..., babbage_protocol_..., babbage_spend_..., babbage_basket_..., babbage_cert_...., babbage_certificate_, nanostore

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoTxLabelMapApi

```ts
export interface DojoTxLabelMapApi extends DojoEntityTimeStampApi {
    txLabelId: number;
    transactionId: number;
    created_at?: Date | null;
    updated_at?: Date | null;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoClientUserApi

```ts
export interface DojoClientUserApi extends DojoEntityTimeStampApi {
    userId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    identityKey: string;
}
```

<details>

<summary>Interface DojoClientUserApi Member Details</summary>

###### identityKey

max length of 130
hex encoded

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoUserApi

```ts
export interface DojoUserApi extends DojoClientUserApi, DojoEntityTimeStampApi {
    userId?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    identityKey: string;
    timeSpentProcessingRequests?: number;
    bandwidthUsed?: number;
    storageSpaceUsedByHostedData?: number;
}
```

<details>

<summary>Interface DojoUserApi Member Details</summary>

###### identityKey

max length of 130
hex encoded

###### timeSpentProcessingRequests

max 12 digits

###### bandwidthUsed

max 18 digits

###### storageSpaceUsedByHostedData

max 15 digits

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoPendingTxInputInstructionsApi

```ts
export interface DojoPendingTxInputInstructionsApi {
    type: string;
    derivationPrefix: string | null;
    derivationSuffix: string | null;
    paymailHandle: string | null;
    senderIdentityKey: string | null;
    customInstructions: string | null;
}
```

<details>

<summary>Interface DojoPendingTxInputInstructionsApi Member Details</summary>

###### type

max length of 50
e.g. P2PKH, custom

###### derivationPrefix

max length of 32
base64 encoded

###### derivationSuffix

max length of 32
base64 encoded

###### paymailHandle

max length of 64

###### senderIdentityKey

max length of 130
hex encoded

###### customInstructions

max length of 2500

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoPendingTxInputApi

```ts
export interface DojoPendingTxInputApi extends EnvelopeEvidenceApi {
    outputsToRedeem?: number[];
    instructions?: Record<number, DojoPendingTxInputInstructionsApi>;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoPendingTxOutputApi

```ts
export interface DojoPendingTxOutputApi {
    type: string;
    satoshis: number;
    script?: string;
    derivationPrefix?: string;
    derivationSuffix?: string;
    paymailHandle?: string;
    providedBy?: string;
    purpose?: string;
    senderIdentityKey?: string;
    txid?: string;
    vout?: number;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoPendingTxApi

##### Description

Return type from Ninja and Dojo getPendingTransactions methods.

```ts
export interface DojoPendingTxApi {
    amount: number;
    created_at: string;
    referenceNumber: string;
    senderPaymail?: string;
    status: string;
    isOutgoing: boolean;
    rawTransaction?: string;
    derivationPrefix?: string;
    paymailHandle?: string;
    inputs: Record<string, DojoPendingTxInputApi>;
    outputs: DojoPendingTxOutputApi[];
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoProcessTransactionResultApi

```ts
export interface DojoProcessTransactionResultApi {
    txid: string;
    status: "completed" | "unknown";
    mapiResponses: MapiResponseApi[];
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoOutputToRedeemApi

```ts
export interface DojoOutputToRedeemApi {
    index: number;
    unlockingScriptLength: number;
    spendingDescription?: string;
}
```

<details>

<summary>Interface DojoOutputToRedeemApi Member Details</summary>

###### index

Zero based output index within its transaction to spend.

###### unlockingScriptLength

byte length of unlocking script

Note: To protect client keys and utxo control, unlocking scripts are never shared with Dojo.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoTxInputsApi

```ts
export interface DojoTxInputsApi extends EnvelopeEvidenceApi {
    outputsToRedeem: DojoOutputToRedeemApi[];
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoTxInputSelectionApi

##### Description

If Dojo needs to select more inputs beyond the ones specified in order to fund the transaction,
this object describes which kinds of inputs can be selected, and from where.

```ts
export interface DojoTxInputSelectionApi {
    disable: boolean;
    baskets: string[];
    maxUnconfirmedChainLength?: number;
}
```

<details>

<summary>Interface DojoTxInputSelectionApi Member Details</summary>

###### disable

This is a boolean that, when true, will forbid Dojo from adding any additional inputs to your transaction,
beyond what you specified in the "inputs" parameter.
Thus, if you have not sufficiently funded the transaction yourself,
or if the "inputs" array is empty, you will get an error.

###### baskets

TODO (coming soon).
This is an array of UTXO basket names from which UTXOs can be selected for spending.
To only select UTXOs of a certain type, configure the source basket only to accept those types of UTXOs.
By default, UTXOs will only be selected if they are in the "default" basket.

###### maxUnconfirmedChainLength

An integer representing the maximum length for any chain of unconfirmed parents
that a selected input can have.
When undefined or -1 (the default), no maximum is specified.
Cannot be zero.
When 1, indicates that the input must itself be confirmed.
When 2, input parents must be confirmed.
When 3 denotes grandparents.
When 4 great-grandparents and so forth.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCreateTxOutputApi

##### Description

A specific output to be created as part of a new transactions.
These outputs can contain custom scripts as specified by recipients.

```ts
export interface DojoCreateTxOutputApi {
    script: string;
    satoshis: number;
    description?: string;
    basket?: string;
    customInstructions?: string;
}
```

<details>

<summary>Interface DojoCreateTxOutputApi Member Details</summary>

###### script

The output script that will be included, hex encoded

###### satoshis

The amount of the output in satoshis

###### description

Human-readable output line-item description

###### basket

Destination output basket name for the new UTXO

###### customInstructions

Custom spending instructions (metadata, string, optional)

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoOutputGenerationApi

##### Description

If Dojo needs to generate additional outputs for the transaction beyond what was specified,
this object describes what kind of outputs to generate, and where they should be kept.

```ts
export interface DojoOutputGenerationApi {
    basket: string;
    method: "auto" | "single";
}
```

<details>

<summary>Interface DojoOutputGenerationApi Member Details</summary>

###### basket

TODO (coming soon).
Specify the basket where the generated outputs will be kept.
Only output types compatible with the destination basket will be generated.

###### method

The method used to generate outputs.
"auto" (the default) selects the amount and types of generated outputs based on the selected basket's
configuration for how many of each type to keep on hand,
then uses Benford's law to distribute the satoshis across them.
"single" just uses one output, randomly selected from the available types, that contains all the satoshis.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoFeeModelApi

##### Description

An object representing the fee the transaction will pay.

```ts
export interface DojoFeeModelApi {
    model: "sat/kb";
    value?: number;
}
```

<details>

<summary>Interface DojoFeeModelApi Member Details</summary>

###### model

The fee model to use, default "sat/kb"

###### value

When "fee.model" is "sat/kb", this is an integer representing the number of satoshis per kb of block space
the transaction will pay in fees.

If undefined, the default value is used which may vary with market conditions.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCreatingTxOutputApi

```ts
export interface DojoCreatingTxOutputApi extends DojoCreateTxOutputApi {
    providedBy: DojoProvidedByApi;
    purpose?: string;
    destinationBasket?: string;
    derivationSuffix?: string;
    keyOffset?: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCreatingTxInstructionsApi

```ts
export interface DojoCreatingTxInstructionsApi {
    type: string;
    paymailHandle?: string;
    derivationPrefix?: string;
    derivationSuffix?: string;
    senderIdentityKey?: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCreatingTxInputsApi

```ts
export interface DojoCreatingTxInputsApi extends DojoTxInputsApi {
    providedBy: DojoProvidedByApi;
    instructions: Record<number, DojoCreatingTxInstructionsApi>;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoCreateTransactionResultApi

```ts
export interface DojoCreateTransactionResultApi {
    inputs: Record<string, DojoCreatingTxInputsApi>;
    outputs: DojoCreatingTxOutputApi[];
    derivationPrefix: string;
    referenceNumber: string;
    paymailHandle: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSubmitDirectTransactionOutputApi

```ts
export interface DojoSubmitDirectTransactionOutputApi {
    vout: number;
    basket: string;
    suffix?: string;
    customInstructions?: object;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSubmitDirectTransactionApi

```ts
export interface DojoSubmitDirectTransactionApi extends EnvelopeEvidenceApi {
    outputs: Record<number, DojoSubmitDirectTransactionOutputApi>;
}
```

<details>

<summary>Interface DojoSubmitDirectTransactionApi Member Details</summary>

###### outputs

sparse array of outputs of interest where indices match vout numbers.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Interface: DojoSubmitDirectTransactionResultApi

```ts
export interface DojoSubmitDirectTransactionResultApi {
    transactionId: number;
    referenceNumber: string;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
### Classes

| | | | |
| --- | --- | --- | --- |
| [CwiError](#class-cwierror) | [ERR_DOJO_INVALID_OUTPUT_DESCRIPTION](#class-err_dojo_invalid_output_description) | [ERR_DOJO_NOT_SUFFICIENT_FUNDS](#class-err_dojo_not_sufficient_funds) | [ERR_DOJO_TRANSACTION_NOT_FOUND](#class-err_dojo_transaction_not_found) |
| [ERR_BAD_REQUEST](#class-err_bad_request) | [ERR_DOJO_INVALID_PAYMAIL_DOMAIN](#class-err_dojo_invalid_paymail_domain) | [ERR_DOJO_NO_ENVELOPE](#class-err_dojo_no_envelope) | [ERR_DOJO_TRANSACTION_REJECTED](#class-err_dojo_transaction_rejected) |
| [ERR_CHAIN](#class-err_chain) | [ERR_DOJO_INVALID_PAYMAIL_HANDLE](#class-err_dojo_invalid_paymail_handle) | [ERR_DOJO_PAYMAIL_MISMATCH](#class-err_dojo_paymail_mismatch) | [ERR_DOJO_TX_BAD_AMOUNT](#class-err_dojo_tx_bad_amount) |
| [ERR_CHAIN_INVALID](#class-err_chain_invalid) | [ERR_DOJO_INVALID_REDEEM](#class-err_dojo_invalid_redeem) | [ERR_DOJO_PAYMAIL_NOT_FORMATTED_CORRECTLY](#class-err_dojo_paymail_not_formatted_correctly) | [ERR_DOJO_UNKNOWN_FEE_MODEL](#class-err_dojo_unknown_fee_model) |
| [ERR_DOJO_BROADCAST_DUPE](#class-err_dojo_broadcast_dupe) | [ERR_DOJO_INVALID_REFERENCE](#class-err_dojo_invalid_reference) | [ERR_DOJO_PAYMAIL_NOT_FOUND](#class-err_dojo_paymail_not_found) | [ERR_INTERNAL](#class-err_internal) |
| [ERR_DOJO_CERT_DUPE](#class-err_dojo_cert_dupe) | [ERR_DOJO_INVALID_SATOSHIS](#class-err_dojo_invalid_satoshis) | [ERR_DOJO_PAYMAIL_UNAVAILABLE](#class-err_dojo_paymail_unavailable) | [ERR_INVALID_PARAMETER](#class-err_invalid_parameter) |
| [ERR_DOJO_CERT_INVALID](#class-err_dojo_cert_invalid) | [ERR_DOJO_INVALID_SCRIPT](#class-err_dojo_invalid_script) | [ERR_DOJO_PROCESS_PENDING_OUTGOING](#class-err_dojo_process_pending_outgoing) | [ERR_MISSING_PARAMETER](#class-err_missing_parameter) |
| [ERR_DOJO_CERT_SUBJECT](#class-err_dojo_cert_subject) | [ERR_DOJO_INVALID_TIME](#class-err_dojo_invalid_time) | [ERR_DOJO_REQUEST_EXPIRED](#class-err_dojo_request_expired) | [ERR_NOT_IMPLEMENTED](#class-err_not_implemented) |
| [ERR_DOJO_CREATE_TX_EMPTY](#class-err_dojo_create_tx_empty) | [ERR_DOJO_INVALID_TRANSACTION_STATUS](#class-err_dojo_invalid_transaction_status) | [ERR_DOJO_SENDER_SIGNATURE_CHECK](#class-err_dojo_sender_signature_check) | [ERR_TXID_INVALID](#class-err_txid_invalid) |
| [ERR_DOJO_INVALID_BASKET_NAME](#class-err_dojo_invalid_basket_name) | [ERR_DOJO_INVALID_TXID](#class-err_dojo_invalid_txid) | [ERR_DOJO_SYNC_REFNUM](#class-err_dojo_sync_refnum) | [ERR_TXID_UNKNOWN](#class-err_txid_unknown) |
| [ERR_DOJO_INVALID_CUSTOM_INSTRUCTIONS](#class-err_dojo_invalid_custom_instructions) | [ERR_DOJO_INVALID_TX_LABEL](#class-err_dojo_invalid_tx_label) | [ERR_DOJO_SYNC_STATE](#class-err_dojo_sync_state) | [ERR_UNAUTHORIZED](#class-err_unauthorized) |
| [ERR_DOJO_INVALID_NOTE](#class-err_dojo_invalid_note) | [ERR_DOJO_INVALID_TX_RECIPIENT](#class-err_dojo_invalid_tx_recipient) | [ERR_DOJO_SYNC_STATUS](#class-err_dojo_sync_status) |  |
| [ERR_DOJO_INVALID_OUTPOINT](#class-err_dojo_invalid_outpoint) | [ERR_DOJO_LABEL_NOT_FOUND](#class-err_dojo_label_not_found) | [ERR_DOJO_SYNC_TOTAL](#class-err_dojo_sync_total) |  |

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---

#### Class: CwiError

##### Description

Errors which extend CwiError implement `name` as an alternate getter for `code`,
and `message` as an alternate getter for `description`.

This supports catch handlers that might catch both
`Error` derived or `CwiErrorBase` derived errors.

Derived class constructors should use the derived class name as the value for `code`,
and an internationalizable constant string for `description`.

Optionaly, the derived class `description` can include template parameters passed in
to the constructor. See ERR_MISSING_PARAMETER for an example.

To avoid derived class name colisions, packages should include a package specific
identifier after the 'ERR_' prefix. e.g. 'ERR_DOJO_' as the prefix for Dojo specific error
classes.

```ts
export class CwiError extends Error {
    constructor(code: string, description: string, stack?: string, public details?: Record<string, string>) 
    static fromUnknown(err: unknown): CwiError 
    get code(): string 
    set code(v: string) 
    get description(): string 
    set description(v: string) 
    asStatus(): {
        status: string;
        code: string;
        description: string;
    } 
}
```

<details>

<summary>Class CwiError Member Details</summary>

###### asStatus

###### code

Error class compatible accessor for  `code`.

###### description

Error class compatible accessor for `description`.

</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_NOT_IMPLEMENTED

##### Description

Not implemented.

```ts
export class ERR_NOT_IMPLEMENTED extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_INTERNAL

##### Description

An internal server error has occurred.

```ts
export class ERR_INTERNAL extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_UNAUTHORIZED

##### Description

Access is denied due to an authorization error.

```ts
export class ERR_UNAUTHORIZED extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_INVALID_PARAMETER

##### Description

The ${name} parameter is invalid.

```ts
export class ERR_INVALID_PARAMETER extends CwiError {
    constructor(name: string, mustBe?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_MISSING_PARAMETER

##### Description

The ${name} parameter is missing, but it must be ${mustBe}.

```ts
export class ERR_MISSING_PARAMETER extends CwiError {
    constructor(name: string, mustBe: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_BAD_REQUEST

##### Description

The request is invalid.

```ts
export class ERR_BAD_REQUEST extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_CHAIN

##### Description

Configured chain is invalid or does not match across services.

```ts
export class ERR_CHAIN extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_CHAIN_INVALID

##### Description

The current chain tip is not in sync with external sources.

```ts
export class ERR_CHAIN_INVALID extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_TXID_INVALID

##### Description

TXIDs must be 32 bytes encoded as 64 hex digits.

```ts
export class ERR_TXID_INVALID extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_TXID_UNKNOWN

##### Description

TXID failed to correspond to a known transaction.

```ts
export class ERR_TXID_UNKNOWN extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_TX_BAD_AMOUNT

##### Description

Transaction amount is not correct!

```ts
export class ERR_DOJO_TX_BAD_AMOUNT extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_NOT_SUFFICIENT_FUNDS

##### Description

Not sufficient funds in the available inputs to cover the cost of the required outputs
and the transaction fee (${moreSatoshisNeeded} more satoshis are needed,
for a total of ${totalSatoshisNeeded}), plus whatever would be required in order
to pay the fee to unlock and spend the outputs used to provide the additional satoshis.

```ts
export class ERR_DOJO_NOT_SUFFICIENT_FUNDS extends CwiError {
    constructor(public totalSatoshisNeeded: number, public moreSatoshisNeeded: number) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_UNKNOWN_FEE_MODEL

##### Description

Transaction was already broadcast.

```ts
export class ERR_DOJO_UNKNOWN_FEE_MODEL extends CwiError {
    constructor(model: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_BROADCAST_DUPE

##### Description

Transaction was already broadcast.

```ts
export class ERR_DOJO_BROADCAST_DUPE extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_CERT_DUPE

##### Description

Certificate already exists.

```ts
export class ERR_DOJO_CERT_DUPE extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_CERT_INVALID

##### Description

Certificate signature is invalid.

```ts
export class ERR_DOJO_CERT_INVALID extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_CERT_SUBJECT

##### Description

Certificate subject must match authenticated user's identityKey.

```ts
export class ERR_DOJO_CERT_SUBJECT extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_CREATE_TX_EMPTY

##### Description

Transaction must have at least one input and output.

```ts
export class ERR_DOJO_CREATE_TX_EMPTY extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_REDEEM

##### Description

outputToRedeem is invalid

```ts
export class ERR_DOJO_INVALID_REDEEM extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_CUSTOM_INSTRUCTIONS

##### Description

Output customInstruction must be a string or length not more than 2500.

```ts
export class ERR_DOJO_INVALID_CUSTOM_INSTRUCTIONS extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_OUTPOINT

##### Description

The outpoint (txid and vout combination) does not belong to a transaction known by this user of the server.

```ts
export class ERR_DOJO_INVALID_OUTPOINT extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_OUTPUT_DESCRIPTION

##### Description

Output description must be a string or length not more than 255.

```ts
export class ERR_DOJO_INVALID_OUTPUT_DESCRIPTION extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_PAYMAIL_HANDLE

##### Description

The paymail handle is invalid.

```ts
export class ERR_DOJO_INVALID_PAYMAIL_HANDLE extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_PAYMAIL_DOMAIN

##### Description

This server is not accepting registrations for new Paymail handles under the specified domain name.

```ts
export class ERR_DOJO_INVALID_PAYMAIL_DOMAIN extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_NOTE

##### Description

The transaction note is invalid.

```ts
export class ERR_DOJO_INVALID_NOTE extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_REFERENCE

##### Description

The transaction reference is invalid.

```ts
export class ERR_DOJO_INVALID_REFERENCE extends CwiError {
    constructor(reference?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_SATOSHIS

##### Description

An amount of satoshis must be a non-negative integer less than 21e14.

```ts
export class ERR_DOJO_INVALID_SATOSHIS extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_SCRIPT

##### Description

Script must be a valid Bitcoin script.

```ts
export class ERR_DOJO_INVALID_SCRIPT extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_TIME

##### Description

Time values must be integer number of seconds since the epoch.

```ts
export class ERR_DOJO_INVALID_TIME extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_TRANSACTION_STATUS

##### Description

The status of this transaction is ${stat}, which is not compatible with this operation. The transaction was not broadcasted by the recipient.

```ts
export class ERR_DOJO_INVALID_TRANSACTION_STATUS extends CwiError {
    constructor(stat: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_BASKET_NAME

##### Description

Basket names must have one visible character and not more than 1000.

```ts
export class ERR_DOJO_INVALID_BASKET_NAME extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_TX_RECIPIENT

##### Description

Transaction recipient must be not more than 100.

```ts
export class ERR_DOJO_INVALID_TX_RECIPIENT extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_TX_LABEL

##### Description

Transaction labels must have one visible character and not more than 150.

```ts
export class ERR_DOJO_INVALID_TX_LABEL extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_INVALID_TXID

##### Description

Transaction labels must have one visible character and not more than 150.

```ts
export class ERR_DOJO_INVALID_TXID extends CwiError {
    constructor(txid: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_LABEL_NOT_FOUND

##### Description

The label cannot be found linked with your user account.

```ts
export class ERR_DOJO_LABEL_NOT_FOUND extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_PAYMAIL_MISMATCH

##### Description

This paymail is not the same one used to create the request. The transaction was not broadcasted by the recipient.

```ts
export class ERR_DOJO_PAYMAIL_MISMATCH extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_PAYMAIL_NOT_FORMATTED_CORRECTLY

##### Description

The provided paymail was not in the correct format.

```ts
export class ERR_DOJO_PAYMAIL_NOT_FORMATTED_CORRECTLY extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_PAYMAIL_NOT_FOUND

##### Description

This paymail was not found on this server.

```ts
export class ERR_DOJO_PAYMAIL_NOT_FOUND extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_PAYMAIL_UNAVAILABLE

##### Description

This Paymail handle is unavailable for registration by this server.

```ts
export class ERR_DOJO_PAYMAIL_UNAVAILABLE extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_REQUEST_EXPIRED

##### Description

The reference you have provided is expired. The transaction was not broadcasted by the recipient.

```ts
export class ERR_DOJO_REQUEST_EXPIRED extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_SENDER_SIGNATURE_CHECK

##### Description

The signature you provided to authenticate this Paymail sender is not valid.

```ts
export class ERR_DOJO_SENDER_SIGNATURE_CHECK extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_TRANSACTION_NOT_FOUND

##### Description

The transaction cannot be found linked with your user account.

```ts
export class ERR_DOJO_TRANSACTION_NOT_FOUND extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_TRANSACTION_REJECTED

##### Description

This transaction was rejected and was not broadcasted by the recipient. Ensure that all specified output scripts are present with the correct amounts assigned to each.

```ts
export class ERR_DOJO_TRANSACTION_REJECTED extends CwiError {
    constructor(description?: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_NO_ENVELOPE

##### Description

No envelope for ${txid}

```ts
export class ERR_DOJO_NO_ENVELOPE extends CwiError {
    constructor(txid: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_PROCESS_PENDING_OUTGOING

##### Description

processPendingOuputs of outgoing transactions is not suported at this time.

```ts
export class ERR_DOJO_PROCESS_PENDING_OUTGOING extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_SYNC_STATUS

```ts
export class ERR_DOJO_SYNC_STATUS extends CwiError {
    constructor(step: string, expected: DojoSyncStatus, actual: DojoSyncStatus) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_SYNC_REFNUM

```ts
export class ERR_DOJO_SYNC_REFNUM extends CwiError {
    constructor(expected: string, actual: string) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_SYNC_STATE

```ts
export class ERR_DOJO_SYNC_STATE extends CwiError {
    constructor() 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Class: ERR_DOJO_SYNC_TOTAL

```ts
export class ERR_DOJO_SYNC_TOTAL extends CwiError {
    constructor(expected: number | undefined, actual: number | undefined) 
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
### Functions

| | | | |
| --- | --- | --- | --- |
| [asBsvTx](#function-asbsvtx) | [isLive](#function-islive) | [toBaseBlockHeaderHex](#function-tobaseblockheaderhex) | [validateSatoshis](#function-validatesatoshis) |
| [asBuffer](#function-asbuffer) | [isLiveBlockHeader](#function-isliveblockheader) | [toBlockHeader](#function-toblockheader) | [validateScript](#function-validatescript) |
| [asString](#function-asstring) | [isLiveBlockHeaderHex](#function-isliveblockheaderhex) | [toBlockHeaderHex](#function-toblockheaderhex) | [validateSecondsSinceEpoch](#function-validatesecondssinceepoch) |
| [blockHash](#function-blockhash) | [lockScriptWithKeyOffsetFromPubKey](#function-lockscriptwithkeyoffsetfrompubkey) | [toDojoSyncError](#function-todojosyncerror) | [validateSubmitDirectCustomTransaction](#function-validatesubmitdirectcustomtransaction) |
| [computeMerkleTreeParent](#function-computemerkletreeparent) | [maxDate](#function-maxdate) | [toLiveBlockHeader](#function-toliveblockheader) | [validateTXID](#function-validatetxid) |
| [computeRootFromMerkleProofNodes](#function-computerootfrommerkleproofnodes) | [minDate](#function-mindate) | [toLiveBlockHeaderHex](#function-toliveblockheaderhex) | [validateTxLabel](#function-validatetxlabel) |
| [convertBufferToUint32](#function-convertbuffertouint32) | [offsetPrivKey](#function-offsetprivkey) | [transactionInputSize](#function-transactioninputsize) | [validateTxLabels](#function-validatetxlabels) |
| [convertUint32ToBuffer](#function-convertuint32tobuffer) | [offsetPubKey](#function-offsetpubkey) | [transactionOutputSize](#function-transactionoutputsize) | [validateTxNote](#function-validatetxnote) |
| [createBabbageServiceChargeOutput](#function-createbabbageservicechargeoutput) | [pointToBuffer](#function-pointtobuffer) | [transactionSize](#function-transactionsize) | [validateTxRecipient](#function-validatetxrecipient) |
| [deserializeBlockHeader](#function-deserializeblockheader) | [pointToCompressed](#function-pointtocompressed) | [validateBasketName](#function-validatebasketname) | [varUintSize](#function-varuintsize) |
| [doubleSha256BE](#function-doublesha256be) | [randomBytes](#function-randombytes) | [validateCreateTxOutput](#function-validatecreatetxoutput) | [verifyBuffer](#function-verifybuffer) |
| [doubleSha256HashLE](#function-doublesha256hashle) | [randomBytesBase64](#function-randombytesbase64) | [validateCustomInstructions](#function-validatecustominstructions) | [verifyId](#function-verifyid) |
| [genesisBuffer](#function-genesisbuffer) | [randomBytesHex](#function-randombyteshex) | [validateDate](#function-validatedate) | [verifyNone](#function-verifynone) |
| [genesisHeaderHex](#function-genesisheaderhex) | [randomMinMax](#function-randomminmax) | [validateFeeModel](#function-validatefeemodel) | [verifyNumber](#function-verifynumber) |
| [getInputTxIds](#function-getinputtxids) | [readVarUint32LE](#function-readvaruint32le) | [validateIdentityKey](#function-validateidentitykey) | [verifyOne](#function-verifyone) |
| [getProtocolInvoiceNumber](#function-getprotocolinvoicenumber) | [restoreUserStateEntities](#function-restoreuserstateentities) | [validateInputSelection](#function-validateinputselection) | [verifyOneOrNone](#function-verifyoneornone) |
| [identityKeyFromPrivateKey](#function-identitykeyfromprivatekey) | [serializeBlockHeader](#function-serializeblockheader) | [validateOutputDescription](#function-validateoutputdescription) | [verifyTruthy](#function-verifytruthy) |
| [isBaseBlockHeader](#function-isbaseblockheader) | [sha256Hash](#function-sha256hash) | [validateOutputGeneration](#function-validateoutputgeneration) | [wait](#function-wait) |
| [isBaseBlockHeaderHex](#function-isbaseblockheaderhex) | [shuffleArray](#function-shufflearray) | [validateOutputToRedeem](#function-validateoutputtoredeem) | [writeVarUint32LE](#function-writevaruint32le) |
| [isBlockHeader](#function-isblockheader) | [swapByteOrder](#function-swapbyteorder) | [validatePaymail](#function-validatepaymail) |  |
| [isBlockHeaderHex](#function-isblockheaderhex) | [toBaseBlockHeader](#function-tobaseblockheader) | [validateSABPPPTransaction](#function-validatesabppptransaction) |  |

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---

#### Function: wait

##### Description

Returns an await'able Promise that resolves in the given number of msecs.

```ts
export function wait(msecs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, msecs));
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: randomBytes

##### Description

```ts
export function randomBytes(count: number): Buffer 
```

##### Returns

count cryptographically secure random bytes as Buffer

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: randomBytesHex

##### Description

```ts
export function randomBytesHex(count: number): string 
```

##### Returns

count cryptographically secure random bytes as hex encoded string

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: randomBytesBase64

##### Description

```ts
export function randomBytesBase64(count: number): string 
```

##### Returns

count cryptographically secure random bytes as base64 encoded string

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: randomMinMax

##### Description

```ts
export function randomMinMax(min: number, max: number): number {
    if (max < min)
        throw new ERR_INVALID_PARAMETER("max", `less than min (${min}). max is (${max})`);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
```

##### Returns

a weakly randomized value in the range from min to less than max.

<details>

<summary>Function randomMinMax Argument Details</summary>

###### min

minimum value to return###### max

greater than maximum value returned</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: shuffleArray

##### Description

Shuffle an array of items.

This is not a cryptographically strong shuffle.

Run time is O(n)

```ts
export function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
```

##### Returns

original `array` with contents shuffled

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: asBuffer

##### Description

Coerce a value to Buffer if currently encoded as a string

```ts
export function asBuffer(val: Buffer | string, encoding?: BufferEncoding): Buffer {
    return Buffer.isBuffer(val) ? val : Buffer.from(val, encoding ?? "hex");
}
```

##### Returns

input val if it is a Buffer or new Buffer from string val

<details>

<summary>Function asBuffer Argument Details</summary>

###### encoding

defaults to 'hex'</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: asString

##### Description

Coerce a value to string if currently a Buffer

```ts
export function asString(val: Buffer | string, encoding?: BufferEncoding): string {
    return Buffer.isBuffer(val) ? val.toString(encoding ?? "hex") : val;
}
```

##### Returns

input val if it is a string or Buffer encoded as string

<details>

<summary>Function asString Argument Details</summary>

###### encoding

defaults to 'hex'</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: sha256Hash

##### Description

Calculate the SHA256 hash of a Buffer.

```ts
export function sha256Hash(buffer: Buffer): Buffer {
    return crypto.createHash("sha256").update(buffer).digest();
}
```

##### Returns

sha256 hash of buffer contents.

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: doubleSha256HashLE

##### Description

Calculate the SHA256 hash of the SHA256 hash of a Buffer.

```ts
export function doubleSha256HashLE(data: string | Buffer, encoding?: BufferEncoding): Buffer {
    return sha256Hash(sha256Hash(asBuffer(data, encoding)));
}
```

##### Returns

double sha256 hash of buffer contents, byte 0 of hash first.

<details>

<summary>Function doubleSha256HashLE Argument Details</summary>

###### data

is Buffer or hex encoded string</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: doubleSha256BE

##### Description

Calculate the SHA256 hash of the SHA256 hash of a Buffer.

```ts
export function doubleSha256BE(data: string | Buffer, encoding?: BufferEncoding): Buffer {
    return doubleSha256HashLE(data, encoding).reverse();
}
```

##### Returns

reversed (big-endian) double sha256 hash of data, byte 31 of hash first.

<details>

<summary>Function doubleSha256BE Argument Details</summary>

###### data

is Buffer or hex encoded string</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: swapByteOrder

##### Description

Returns a copy of a Buffer with byte order reversed.

```ts
export function swapByteOrder(buffer: Buffer): Buffer {
    return Buffer.from(buffer).reverse();
}
```

##### Returns

new buffer with byte order reversed.

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: convertUint32ToBuffer

##### Description

```ts
export function convertUint32ToBuffer(num: number, littleEndian = true): Buffer {
    const arr = new ArrayBuffer(4);
    const view = new DataView(arr);
    view.setUint32(0, num, littleEndian);
    return Buffer.from(arr);
}
```

##### Returns

four byte buffer with Uint32 number encoded

<details>

<summary>Function convertUint32ToBuffer Argument Details</summary>

###### num

a number value in the Uint32 value range###### littleEndian

true for little-endian byte order in Buffer</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: convertBufferToUint32

##### Description

```ts
export function convertBufferToUint32(buffer: Buffer, littleEndian = true): number {
    const arr = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    const view = new DataView(arr);
    return view.getUint32(0, littleEndian);
}
```

##### Returns

a number value in the Uint32 value range

<details>

<summary>Function convertBufferToUint32 Argument Details</summary>

###### buffer

four byte buffer with Uint32 number encoded###### littleEndian

true for little-endian byte order in Buffer</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: varUintSize

##### Description

Returns the byte size required to encode number as Bitcoin VarUint

```ts
export function varUintSize(val: number): 1 | 3 | 5 | 9 {
    if (val < 0)
        throw new ERR_BAD_REQUEST();
    return (val <= 252 ? 1 : val <= 65535 ? 3 : val <= 4294967295 ? 5 : 9);
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: readVarUint32LE

##### Description

Reads a Bitcoin VarUInt from buffer at an offset.

Returns updated offset.

```ts
export function readVarUint32LE(buffer: Buffer, offset: number): {
    val: number;
    offset: number;
} {
    const b0 = buffer[offset++];
    switch (b0) {
        case 255:
            throw new Error("Larger than Uint32 value is not supported at this time.");
        case 254:
            return { val: buffer.readUint32LE(offset), offset: offset + 4 };
        case 253:
            return { val: buffer.readUint16LE(offset), offset: offset + 2 };
        default:
            return { val: b0, offset };
    }
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: writeVarUint32LE

##### Description

Writes a Bitcoin VarUInt to a buffer at an offset.

Returns updated offset.

```ts
export function writeVarUint32LE(val: number, buffer: Buffer, offset: number): number {
    if (val < 0) {
        throw new Error(`val ${val} must be a non-negative integer.`);
    }
    if (val <= 252) {
        buffer[offset] = val;
        return offset + 1;
    }
    if (val <= 65535) {
        buffer[offset] = 253;
        buffer.writeUint16LE(val, offset + 1);
        return offset + 3;
    }
    if (val <= 4294967295) {
        buffer[offset] = 254;
        buffer.writeUint32LE(val, offset + 1);
        return offset + 5;
    }
    throw new Error("Larger than Uint32 value is not supported at this time.");
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: computeRootFromMerkleProofNodes

##### Description

Computes merkle root from transaction hash and TSC proof data.

Note that it is essential to confirm that the txid is the double sha256 hash of
the transaction.

To prove that txid is the last transaction in its block, at every level,
if computed is left side, then provided must equal computed.

Specification Reference: https://tsc.bitcoinassociation.net/standards/merkle-proof-standardised-format/

```ts
export function computeRootFromMerkleProofNodes(index: number, txid: string | Buffer, nodes: string[] | Buffer): Buffer 
```

##### Returns

computed merkle tree root for comparison to known root.

<details>

<summary>Function computeRootFromMerkleProofNodes Argument Details</summary>

###### index

index of transaction being proven in block###### txid

hash of transaction being proven###### nodes

tip to root, proof provided intermediate hash values</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: computeMerkleTreeParent

##### Description

Returns the 32 byte hash value for a merkle tree parent node given its left and right child node hashes.

```ts
export function computeMerkleTreeParent(leftNode: string | Buffer, rightNode: string | Buffer): Buffer {
    const leftConc = Buffer.from(asBuffer(leftNode)).reverse();
    const rightConc = Buffer.from(asBuffer(rightNode)).reverse();
    const concat = Buffer.concat([leftConc, rightConc]);
    const hash = doubleSha256BE(concat);
    return hash;
}
```

<details>

<summary>Function computeMerkleTreeParent Argument Details</summary>

###### leftNode

32 byte hash as hex string or Buffer###### rightNode

32 byte hash as hex string or Buffer</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: asBsvTx

##### Description

Parse a bsv transaction encoded as a hex string, serialized Buffer to bsv.Tx
If tx is already a bsvTx, just return it.

```ts
export function asBsvTx(tx: string | Buffer | bsv.Tx): bsv.Tx {
    if (Buffer.isBuffer(tx)) {
        tx = new bsv.Tx().fromBuffer(tx);
    }
    else if (typeof tx === "string") {
        tx = new bsv.Tx().fromString(tx);
    }
    return tx;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: getInputTxIds

##### Description

For a bitcoin transaction in hex string, Buffer or parsed bsv.Tx form,

returns deduplicated array of the input's outpoint transaction hashes (txids).

```ts
export function getInputTxIds(tx: string | Buffer | bsv.Tx): string[] {
    tx = asBsvTx(tx);
    const txids = {};
    for (const input of tx.txIns) {
        txids[input.txid()] = true;
    }
    return Object.keys(txids);
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: identityKeyFromPrivateKey

##### Description

Returns the Identity Key value associated with a private key.

```ts
export function identityKeyFromPrivateKey(privKey: string): string 
```

##### Returns

hex encoded Identity Key.

<details>

<summary>Function identityKeyFromPrivateKey Argument Details</summary>

###### privKey

as hex encoded 32 byte value</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: maxDate

##### Description

returns most recent of two dates or undefined if both are null or undefined.

```ts
export function maxDate(d1: Date | null | undefined, d2: Date | null | undefined): Date | undefined {
    if (d1 == null)
        return (d2 != null) ? d2 : undefined;
    if (d2 == null)
        return (d1 != null) ? d1 : undefined;
    return d1 > d2 ? d1 : d2;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: minDate

##### Description

returns least recent of two dates or undefined if either date is null or undefined.

```ts
export function minDate(d1: Date | null | undefined, d2: Date | null | undefined): Date | undefined {
    if (d1 == null || d2 == null)
        return undefined;
    return d1 < d2 ? d1 : d2;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isLive

##### Description

Type guard function.

```ts
export function isLive(header: BlockHeader | LiveBlockHeader): header is LiveBlockHeader {
    return (header as LiveBlockHeader).headerId !== undefined;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isBaseBlockHeader

##### Description

Type guard function.

```ts
export function isBaseBlockHeader(header: BaseBlockHeader | BlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): header is BaseBlockHeader {
    return Buffer.isBuffer(header.previousHash);
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isBlockHeader

##### Description

Type guard function.

```ts
export function isBlockHeader(header: BaseBlockHeader | BlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): header is LiveBlockHeader {
    return ("height" in header) && Buffer.isBuffer(header.previousHash);
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isLiveBlockHeader

##### Description

Type guard function.

```ts
export function isLiveBlockHeader(header: BaseBlockHeader | BlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): header is LiveBlockHeader {
    return "chainwork" in header && Buffer.isBuffer(header.previousHash);
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isBaseBlockHeaderHex

##### Description

Type guard function.

```ts
export function isBaseBlockHeaderHex(header: BaseBlockHeader | BlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): header is BaseBlockHeaderHex {
    return (typeof header.previousHash === "string");
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isBlockHeaderHex

##### Description

Type guard function.

```ts
export function isBlockHeaderHex(header: BaseBlockHeader | BlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): header is BlockHeaderHex {
    return ("height" in header) && (typeof header.previousHash === "string");
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: isLiveBlockHeaderHex

##### Description

Type guard function.

```ts
export function isLiveBlockHeaderHex(header: BaseBlockHeader | BlockHeader | LiveBlockHeader | BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): header is LiveBlockHeaderHex {
    return "chainwork" in header && (typeof header.previousHash === "string");
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toBaseBlockHeaderHex

##### Description

Type conversion function.

```ts
export function toBaseBlockHeaderHex(header: BaseBlockHeader | BlockHeader | LiveBlockHeader): BaseBlockHeaderHex {
    return {
        version: header.version,
        previousHash: asString(header.previousHash),
        merkleRoot: asString(header.merkleRoot),
        time: header.time,
        bits: header.bits,
        nonce: header.nonce
    };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toBlockHeaderHex

##### Description

Type conversion function.

```ts
export function toBlockHeaderHex(header: BlockHeader | LiveBlockHeader): BlockHeaderHex {
    return {
        version: header.version,
        previousHash: asString(header.previousHash),
        merkleRoot: asString(header.merkleRoot),
        time: header.time,
        bits: header.bits,
        nonce: header.nonce,
        height: header.height,
        hash: asString(header.hash)
    };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toLiveBlockHeaderHex

##### Description

Type conversion function.

```ts
export function toLiveBlockHeaderHex(header: LiveBlockHeader): LiveBlockHeaderHex {
    return {
        ...header,
        previousHash: asString(header.previousHash),
        merkleRoot: asString(header.merkleRoot),
        hash: asString(header.hash),
        chainWork: asString(header.chainWork)
    };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toBaseBlockHeader

##### Description

Type conversion function.

```ts
export function toBaseBlockHeader(header: BaseBlockHeaderHex | BlockHeaderHex | LiveBlockHeaderHex): BaseBlockHeader {
    return {
        version: header.version,
        previousHash: asBuffer(header.previousHash),
        merkleRoot: asBuffer(header.merkleRoot),
        time: header.time,
        bits: header.bits,
        nonce: header.nonce
    };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toBlockHeader

##### Description

Type conversion function.

```ts
export function toBlockHeader(header: BlockHeaderHex | LiveBlockHeaderHex): BlockHeader {
    return {
        version: header.version,
        previousHash: asBuffer(header.previousHash),
        merkleRoot: asBuffer(header.merkleRoot),
        time: header.time,
        bits: header.bits,
        nonce: header.nonce,
        height: header.height,
        hash: asBuffer(header.hash)
    };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toLiveBlockHeader

##### Description

Type conversion function.

```ts
export function toLiveBlockHeader(header: LiveBlockHeaderHex): LiveBlockHeader {
    return {
        ...header,
        previousHash: asBuffer(header.previousHash),
        merkleRoot: asBuffer(header.merkleRoot),
        hash: asBuffer(header.hash),
        chainWork: asBuffer(header.chainWork)
    };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: toDojoSyncError

```ts
export function toDojoSyncError(e: CwiError): DojoSyncError
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: blockHash

##### Description

Computes double sha256 hash of bitcoin block header
bytes are reversed to bigendian order

If header is a Buffer, it is required to 80 bytes long
and in standard block header serialized encoding.

```ts
export function blockHash(header: BaseBlockHeader | Buffer): Buffer {
    const data = !Buffer.isBuffer(header) ? serializeBlockHeader(header) : header;
    if (data.length !== 80)
        throw new Error("Block header must be 80 bytes long.");
    return doubleSha256HashLE(data).reverse();
}
```

##### Returns

doule sha256 hash of header bytes reversed

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: serializeBlockHeader

##### Description

Serializes a block header as an 80 byte Buffer.
The exact serialized format is defined in the Bitcoin White Paper
such that computing a double sha256 hash of the buffer computes
the block hash for the header.

```ts
export function serializeBlockHeader(header: BaseBlockHeader, buffer?: Buffer, offset?: number): Buffer {
    if (buffer != null) {
        offset ||= 0;
        buffer.writeUInt32LE(header.version, offset);
        swapByteOrder(header.previousHash).copy(buffer, offset + 4, 0, 32);
        swapByteOrder(header.merkleRoot).copy(buffer, offset + 36, 0, 32);
        buffer.writeUInt32LE(header.time, offset + 68);
        buffer.writeUInt32LE(header.bits, offset + 72);
        buffer.writeUInt32LE(header.nonce, offset + 76);
        return buffer.subarray(offset, offset + 80);
    }
    else {
        const data = Buffer.concat([
            convertUint32ToBuffer(header.version),
            swapByteOrder(header.previousHash),
            swapByteOrder(header.merkleRoot),
            convertUint32ToBuffer(header.time),
            convertUint32ToBuffer(header.bits),
            convertUint32ToBuffer(header.nonce)
        ]);
        return data;
    }
}
```

##### Returns

80 byte Buffer

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: deserializeBlockHeader

##### Description

Deserialize a block header from an 80 byte buffer

```ts
export function deserializeBlockHeader(buffer: Buffer, offset = 0): BaseBlockHeader {
    const header: BaseBlockHeader = {
        version: convertBufferToUint32(buffer.subarray(0 + offset, 4 + offset)),
        previousHash: swapByteOrder(buffer.subarray(4 + offset, 36 + offset)),
        merkleRoot: swapByteOrder(buffer.subarray(36 + offset, 68 + offset)),
        time: convertBufferToUint32(buffer.subarray(68 + offset, 72 + offset)),
        bits: convertBufferToUint32(buffer.subarray(72 + offset, 76 + offset)),
        nonce: convertBufferToUint32(buffer.subarray(76 + offset, 80 + offset))
    };
    return header;
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: genesisHeaderHex

##### Description

Returns the genesis block for the specified chain.

```ts
export function genesisHeaderHex(chain: Chain): BlockHeaderHex {
    return chain === "main"
        ? {
            version: 1,
            previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
            merkleRoot: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
            time: 1231006505,
            bits: 486604799,
            nonce: 2083236893,
            height: 0,
            hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
        }
        : {
            version: 1,
            previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
            merkleRoot: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
            time: 1296688602,
            bits: 486604799,
            nonce: 414098458,
            height: 0,
            hash: "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943"
        };
}
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: genesisBuffer

##### Description

Returns the genesis block for the specified chain.

```ts
export function genesisBuffer(chain: Chain): Buffer { return serializeBlockHeader(toBlockHeader(genesisHeaderHex(chain))); }
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: transactionInputSize

##### Description

```ts
export function transactionInputSize(scriptSize: number): number 
```

##### Returns

serialized byte length a transaction input

<details>

<summary>Function transactionInputSize Argument Details</summary>

###### scriptSize

byte length of input script</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: transactionOutputSize

##### Description

```ts
export function transactionOutputSize(scriptSize: number): number 
```

##### Returns

serialized byte length a transaction output

<details>

<summary>Function transactionOutputSize Argument Details</summary>

###### scriptSize

byte length of output script</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: transactionSize

##### Description

Compute the serialized binary transaction size in bytes
given the number of inputs and outputs,
and the size of each script.

```ts
export function transactionSize(inputs: number[], outputs: number[]): number 
```

##### Returns

total transaction size in bytes

<details>

<summary>Function transactionSize Argument Details</summary>

###### inputs

array of input script lengths, in bytes###### outputs

array of output script lengths, in bytes</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: offsetPrivKey

```ts
export function offsetPrivKey(privKey: string, keyOffset?: string): {
    offsetPrivKey: string;
    keyOffset: string;
} 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: offsetPubKey

```ts
export function offsetPubKey(pubKey: string, keyOffset?: string): {
    offsetPubKey: string;
    keyOffset: string;
} 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: lockScriptWithKeyOffsetFromPubKey

```ts
export function lockScriptWithKeyOffsetFromPubKey(pubKey: string, keyOffset?: string): {
    script: string;
    keyOffset: string;
} 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: createBabbageServiceChargeOutput

```ts
export function createBabbageServiceChargeOutput(): {
    script: string;
    satoshis: number;
    keyOffset: string;
} 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: restoreUserStateEntities

##### Description

Entities sent across HTTP may not have Date and Buffer properties restored correctly.

Detect these situations and restore contained values as Dates and Buffers.

```ts
export function restoreUserStateEntities(state: DojoUserStateApi): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyBuffer

##### Description

Helper function.

Verifies the value of b is a Buffer and optionally also its length.

```ts
export function verifyBuffer(b: Buffer | undefined | null, length?: number): Buffer 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyTruthy

##### Description

Helper function.

Verifies that a possibly optional value has a value.

```ts
export function verifyTruthy<T>(v: T | null | undefined, description?: string): T 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyNumber

##### Description

Helper function.

Verifies that an optional or null number has a numeric value.

```ts
export function verifyNumber(v: number | null | undefined): number 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyId

##### Description

Helper function.

Verifies that an optional numeric Id has a value.

```ts
export function verifyId(id: number | undefined): number 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyOneOrNone

##### Description

Helper function.

throws ERR_BAD_REQUEST if results has length greater than one.

```ts
export function verifyOneOrNone<T>(results: T[]): (T | undefined) 
```

##### Returns

results[0] or undefined if length is zero.

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyOne

##### Description

Helper function.

throws ERR_BAD_REQUEST if results has length other than one.

```ts
export function verifyOne<T>(results: T[], errorDescrition?: string): T 
```

##### Returns

results[0].

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: verifyNone

##### Description

Helper function.

throws ERR_BAD_REQUEST if results has length greater than one.

```ts
export function verifyNone<T>(results: T[]): void 
```

##### Returns

results[0] or undefined if length is zero.

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateIdentityKey

```ts
export function validateIdentityKey(identityKey?: string | null): string 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateTXID

```ts
export function validateTXID(txid: string): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateBasketName

```ts
export function validateBasketName(name: string): string 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateTxRecipient

```ts
export function validateTxRecipient(recipient?: string): string | undefined 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateTxNote

```ts
export function validateTxNote(note?: string): string | undefined 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateCustomInstructions

```ts
export function validateCustomInstructions(s: string): string 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateOutputDescription

```ts
export function validateOutputDescription(s: string): string 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateCreateTxOutput

```ts
export function validateCreateTxOutput(o: DojoCreateTxOutputApi): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateSecondsSinceEpoch

```ts
export function validateSecondsSinceEpoch(time: number): Date 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateDate

```ts
export function validateDate(date: Date | string | number | null | undefined): Date | undefined 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateSatoshis

```ts
export function validateSatoshis(satoshis: number): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateScript

```ts
export function validateScript(script: string): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateInputSelection

```ts
export function validateInputSelection(v: DojoTxInputSelectionApi | undefined): DojoTxInputSelectionApi 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateOutputGeneration

```ts
export function validateOutputGeneration(v: DojoOutputGenerationApi | undefined): DojoOutputGenerationApi 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateTxLabel

```ts
export function validateTxLabel(label: string): string 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateTxLabels

```ts
export function validateTxLabels(v?: string[]): string[] 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateFeeModel

```ts
export function validateFeeModel(v?: DojoFeeModelApi): DojoFeeModelApi 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateOutputToRedeem

```ts
export function validateOutputToRedeem(output: DojoOutputToRedeemApi): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validatePaymail

```ts
export function validatePaymail(paymailHandle: string | null): void 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateSABPPPTransaction

```ts
export function validateSABPPPTransaction(transaction: DojoSubmitDirectTransactionApi): DojoSubmitDirectTransactionApi 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: validateSubmitDirectCustomTransaction

```ts
export function validateSubmitDirectCustomTransaction(transaction: DojoSubmitDirectTransactionApi): DojoSubmitDirectTransactionApi 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: getProtocolInvoiceNumber

```ts
export function getProtocolInvoiceNumber(params: {
    protocolID: string | [
        number,
        string
    ];
    keyID: string;
}): string 
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: pointToCompressed

##### Description

A "compressed" format point is the X part of the (X, Y) point plus an extra
bit (which takes an entire byte) to indicate whether the Y value is odd or
not. Storing points this way takes a bit less space, but requires a bit more
computation to rederive the full point.

```ts
export function pointToCompressed(point: Point): Buffer 
```

##### Returns

A compressed point in the form of a buffer.

<details>

<summary>Function pointToCompressed Argument Details</summary>

###### point

An instance of Point.</details>

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Function: pointToBuffer

```ts
export function pointToBuffer(point: Point): Buf
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
### Types

| |
| --- |
| [Chain](#type-chain) |
| [DojoLoggerApi](#type-dojologgerapi) |
| [DojoProvenTxReqStatusApi](#type-dojoproventxreqstatusapi) |
| [DojoProvidedByApi](#type-dojoprovidedbyapi) |
| [DojoSyncProtocolVersion](#type-dojosyncprotocolversion) |
| [DojoSyncStatus](#type-dojosyncstatus) |
| [DojoTransactionStatusApi](#type-dojotransactionstatusapi) |
| [EnvelopeInputMapApi](#type-envelopeinputmapapi) |
| [HeaderListener](#type-headerlistener) |
| [ReorgListener](#type-reorglistener) |
| [SyncDojoConfigType](#type-syncdojoconfigtype) |

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---

#### Type: Chain

```ts
export type Chain = "main" | "test"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: HeaderListener

##### Description

```ts
export type HeaderListener = (header: BlockHeader) => void
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: ReorgListener

##### Description

```ts
export type ReorgListener = (depth: number, oldTip: BlockHeader, newTip: BlockHeader) => void
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: EnvelopeInputMapApi

##### Description

keys are txids

```ts
export type EnvelopeInputMapApi = Record<string, EnvelopeEvidenceApi>
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: DojoLoggerApi

```ts
export type DojoLoggerApi = (...data: any) => void
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: SyncDojoConfigType

```ts
export type SyncDojoConfigType = "<custom>" | "Cloud URL" | "Sqlite File" | "MySql Connection"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: DojoSyncStatus

##### Description

success: Last sync of this user from this dojo was successful.

error: Last sync protocol operation for this user to this dojo threw and error.

identified: Configured sync dojo has been identified but not sync'ed.

unknown: Sync protocol state is unknown.

```ts
export type DojoSyncStatus = "success" | "error" | "identified" | "updated" | "unknown"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: DojoSyncProtocolVersion

```ts
export type DojoSyncProtocolVersion = "0.1.0"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: DojoTransactionStatusApi

```ts
export type DojoTransactionStatusApi = "completed" | "failed" | "unprocessed" | "waitingForSenderToSend"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: DojoProvenTxReqStatusApi

##### Description

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

```ts
export type DojoProvenTxReqStatusApi = "sending" | "unsent" | "unknown" | "nonfinal" | "unmined" | "callback" | "unconfirmed" | "notifying" | "completed" | "invalid" | "doubleSpend"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---
#### Type: DojoProvidedByApi

```ts
export type DojoProvidedByApi = "you" | "dojo" | "you-and-dojo"
```

Links: [API](#api), [Interfaces](#interfaces), [Classes](#classes), [Functions](#functions), [Types](#types)

---

<!--#endregion ts2md-api-merged-here-->

## License

The license for the code in this repository is the Open BSV License.
