import { BaseBlockHeader, BaseBlockHeaderHex, BlockHeader, BlockHeaderHex } from './BlockHeaderApi'
import { Chain } from './CwiBaseApi'

/**
 * @public
 */
export type HeaderListener = (header: BlockHeader) => void

/**
 * @public
 */
export type ReorgListener = (depth: number, oldTip: BlockHeader, newTip: BlockHeader) => void

/**
 * @public
 */
export interface ChaintracksPackageInfoApi {
  name: string
  version: string
}

/**
 * @public
 */
export interface ChaintracksInfoApi {
  chain: Chain
  heightBulk: number
  heightLive: number
  storageEngine: string
  bulkStorage: string | undefined
  bulkIndex: string | undefined
  bulkIngestors: string[]
  liveIngestors: string[]
  packages: ChaintracksPackageInfoApi[]
}

/**
 * Chaintracks client API excluding events and callbacks
 * @public
 */
export interface ChaintracksClientApi {
  /**
     * Confirms the chain
     */
  getChain() : Promise<Chain>

  /**
     * @returns Summary of configuration and state.
     */
  getInfo() : Promise<ChaintracksInfoApi>

  /**
     * Return the latest chain height from configured bulk ingestors.
     */
  getPresentHeight() : Promise<number>

  /**
     * Adds headers in 80 byte serialized format to a buffer.
     * Only adds active headers.
     * Buffer length divided by 80 is the actual number returned.
     *
     * @param height of first header
     * @param count of headers, maximum
     */
  getHeaders(height: number, count: number) : Promise<Buffer>

  /**
     * Adds headers in 80 byte serialized format to a buffer.
     * Only adds active headers.
     * Buffer length divided by 80 is the actual number returned.
     *
     * @param height of first header
     * @param count of headers, maximum
     */
  getHeadersHex(height: number, count: number) : Promise<string>

  /**
     * Returns the active chain tip header
     */
  findChainTipHeader() : Promise<BlockHeader>

  /**
     * Returns the active chain tip header
     */
  findChainTipHeaderHex() : Promise<BlockHeaderHex>

  /**
     * Returns the block hash of the active chain tip.
     */
  findChainTipHash() : Promise<Buffer>

  /**
     * Returns the block hash of the active chain tip.
     */
  findChainTipHashHex() : Promise<string>

  /**
     * Only returns a value for headers in live storage.
     * Returns undefined if `hash` is unknown or in bulk storage.
     * @param hash
     * @returns chainwork of block header with given hash
     */
  findChainWorkForBlockHash(hash: Buffer | string) : Promise<Buffer | undefined>

  /**
     * Only returns a value for headers in live storage.
     * Returns undefined if `hash` is unknown or in bulk storage.
     * @param hash
     * @returns chainwork of block header with given hash
     */
  findChainWorkHexForBlockHash(hash: Buffer | string) : Promise<string | undefined>

  /**
     * Returns block header for a given block hash
     * @param hash block hash
     */
  findHeaderForBlockHash(hash: Buffer | string) : Promise<BlockHeader | undefined>

  /**
     * Returns block header for a given block hash
     * @param hash block hash
     */
  findHeaderHexForBlockHash(hash: Buffer | string) : Promise<BlockHeaderHex | undefined>

  /**
     * Returns block header for a given block height on active chain.
     */
  findHeaderForHeight(height: number) : Promise<BlockHeader | undefined>

  /**
     * Returns block header for a given block height on active chain.
     */
  findHeaderHexForHeight(height: number) : Promise<BlockHeaderHex | undefined>

  /**
     * Returns block header for a given possible height and specific merkleRoot
     * The height, available for all mined blocks, allows fast and compact indexing of
     * bulk headers.
     * Confirms that the found header has the request merkleRoot or returns undefined.
     * @param merkleRoot
     * @param height optional, may be required for bulk header lookup.
     */
  findHeaderForMerkleRoot(merkleRoot: Buffer | string, height?: number) : Promise<BlockHeader | undefined>

  /**
     * Returns block header for a given possible height and specific merkleRoot
     * The height, available for all mined blocks, allows fast and compact indexing of
     * bulk headers.
     * Confirms that the found header has the request merkleRoot or returns undefined.
     * @param root
     * @param height optional, may be required for bulk header lookup.
     */
  findHeaderHexForMerkleRoot(root: Buffer | string, height?: number) : Promise<BlockHeaderHex | undefined>

  /**
     * Submit a possibly new header for adding
     *
     * If the header is invalid or a duplicate it will not be added.
     *
     * This header will be ignored if the previous header has not already been inserted when this header
     * is considered for insertion.
     *
     * @param header
     * @returns immediately
     */
  addHeader(header: BaseBlockHeader | BaseBlockHeaderHex) : Promise<void>

  /**
     * Start or resume listening for new headers.
     *
     * Calls `synchronize` to catch up on headers that were found while not listening.
     *
     * Begins listening to any number of configured new header notification services.
     *
     * Begins sending notifications to subscribed listeners only after processing any
     * previously found headers.
     *
     * May be called if already listening or synchronizing to listen.
     *
     * The `listening` API function which returns a Promise can be awaited.
     */
  startListening() : Promise<void>

  /**
     * Returns a Promise that will resolve when the previous call to startListening
     * enters the listening-for-new-headers state.
     */
  listening() : Promise<void>

  /**
     * Returns true if actively listening for new headers and client api is enabled.
     */
  isListening() : Promise<boolean>

  /**
     * Returns true if `synchronize` has completed at least once.
     */
  isSynchronized() : Promise<boolean>

  /**
     * Subscribe to "header" events.
     * @param listener
     * @returns identifier for this subscription
     * @throws ERR_NOT_IMPLEMENTED if callback events are not supported
     */
  subscribeHeaders(listener: HeaderListener) : Promise<string>

  /**
     * Subscribe to "reorganization" events.
     * @param listener
     * @returns identifier for this subscription
     * @throws ERR_NOT_IMPLEMENTED if callback events are not supported
     */
  subscribeReorgs(listener: ReorgListener) : Promise<string>

  /**
     * Cancels all subscriptions with the given `subscriptionId` which was previously returned
     * by a `subscribe` method.
     * @param subscriptionId value previously returned by subscribeToHeaders or subscribeToReorgs
     * @returns true if a subscription was canceled
     * @throws ERR_NOT_IMPLEMENTED if callback events are not supported
     */
  unsubscribe(subscriptionId: string) : Promise<boolean>

}

/**
 * Full Chaintracks API including startListening with callbacks
 */
export interface ChaintracksApi extends ChaintracksClientApi {

  /**
     * Start or resume listening for new headers.
     *
     * Calls `synchronize` to catch up on headers that were found while not listening.
     *
     * Begins listening to any number of configured new header notification services.
     *
     * Begins sending notifications to subscribed listeners only after processing any
     * previously found headers.
     *
     * May be called if already listening or synchronizing to listen.
     *
     * `listening` callback will be called after listening for new live headers has begun.
     * Alternatively, the `listening` API function which returns a Promise can be awaited.
     *
     * @param listening callback indicates when listening for new headers has started.
     */
  startListening(listening?: () => void) : Promise<void>
}
