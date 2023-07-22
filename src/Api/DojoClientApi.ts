import { Chain } from "./CwiBaseApi"
import { EnvelopeApi, EnvelopeEvidenceApi } from "./EnvelopeApi"
import { MapiResponseApi } from "./MerchantApi"

/**
 * Public Dojo Api
 * No Authrite authentication required.
 * Not specific to any userId
 */
export interface DojoPublicApi {

    //
    // Public services, No Authrite
    //
   
    /**
     * Return the chain served by this Dojo
     *
     * Also serves to verifies that all dependent services are on same chain.
     */
    getChain() : Promise<Chain>
    
    //
    // Statistics
    //

    /**
     * @returns general storage statistics
     */
    stats() : Promise<DojoStatsApi>
}

/**
 * User specific public Dojo API accessible from all Dojo implementations
 * including `DojoExpressClient` HTTP client
 */
export interface DojoClientApi extends DojoPublicApi {

    /**
     * Returns authenticated user.
     * Throws an error if isAuthenticated is false.
     */
    getUser() : DojoClientUserApi

    /**
     * Returns the name and photo URL of the user
     * @returns {Promise<Avatar>} The avatar of the user
     */
    getAvatar(): Promise<DojoAvatarApi>

    /**
     * Update the avatar for the authenticated user.
     */
    setAvatar(avatar: DojoAvatarApi): Promise<void>

    /**
     * Return array of paymail style identifiers for currently authenticated user in `alias`@`domain` format.
     * 
     * Where `alias` and `domain` come from the aliases table.
     * 
     * and `reservationCompleted` is true
     */
    getCurrentPaymails() : Promise<string[]>

    /**
     * Save a new certificate with optional fields.
     * 
     * certificate must belong to aunthenticated user.
     * 
     * certificate.subject must match authenticated user's idenitityKey or throws ERR_DOJO_CERT_SUBJECT
     * 
     * certificate.signature must be valid or throws ERR_DOJO_CERT_INVALID
     * 
     * If { type, subject, validationKey, serialNumber, userId } already exist, throw ERR_DOJO_CERT_DUPE
     * 
     * @returns the certificateId of the new certificate.
     */
    saveCertificate(certificate: DojoCertificateApi) : Promise<number>

    /**
     * Returns all of the authenticated user's certificates,
     * where the certifier and type values match one of the optionaly 
     * @param certifiers optional array of certifier identifiers, if provided results match at least one value.
     * @param types optional array of certificate types, if provided results match at least one value and only requested fields are returned.
     */
    findCertificates(certifiers?: string[], types?: Record<string, string[]>) : Promise<DojoCertificateApi[]>

    /**
     * Returns the total of spendable output amounts.
     * 
     * Returns undefined if basket is not undefined and doesn't match an existing basket name.
     * 
     * If basket is not undefined, total is restricted to outputs in that basket.
     * 
     * If basket is undefined, total is over all spendable outputs.
     * 
     * @param basket name of existing outputs basket or undefined
     * @returns total of unspent outputs in named basket
     */
    getTotalOfUnspentOutputs(basket?: string) : Promise<number | undefined>


    /**
     * Update `spendable` of an output that must exist,
     * belonging to the authenticated user,
     * in transaction with txid,
     * at index vout.
     * 
     * @param txid 
     * @param vout 
     * @param spendable 
     */
    updateOutpointStatus(txid: string, vout: number, spendable: boolean) : Promise<void>

    /**
     * Returns the sum of transaction amounts belonging to authenticated user,
     * matching the given direction,
     * and optionally matching conditions in `options`.
     */
    getTotalOfAmounts(direction: 'incoming' | 'outgoing', options?: DojoGetTotalOfAmountsOptions ) : Promise<number>

    /**
     * Returns the net sum of transaction amounts belonging to authenticated user,
     * incoming plus outgoing, as outgoing amounts are negative and incoming amounts are positive.
     * and optionally matching conditions in `options`.
     */
    getNetOfAmounts(options?: DojoGetTotalOfAmountsOptions ) : Promise<number>
    
    /**
     * Update transaction status and associated ouputs (both inputs and outputs) spendable and spentBy properties.
     * 
     * Updated transaction userId must match authenticated user and referenceNumber must match reference.
     * 
     * @param reference 
     * @param status New transaction status.
     */
    updateTransactionStatus(reference: string, status: DojoTransactionStatusApi) : Promise<void>

    /**
     * Returns transactions matching options and total matching count available.
     *
     * @param options limit defaults to 25, offset defaults to 0, addLabels defaults to true, order defaults to 'descending'
     */
    getTransactions(options?: DojoGetTransactionsOptions) : Promise<{ txs: DojoTransactionApi[], total: number }>

    /**
     * Returns transaction outputs matching options and total matching count available.
     *
     * @param options limit defaults to 25, offset defaults to 0, includeEnvelpe defaults to true
     */
    getTransactionOutputs(options?: DojoGetTransactionOutputsOptions) : Promise<{ outputs: DojoOutputApi[], total: number }>

    /**
     * Returns an Everett Style envelope for the given txid.
     *
     * A transaction envelope is a tree of inputs where all the leaves are proven transactions.
     * The trivial case is a single leaf: the envelope for a proven transaction is the rawTx and its proof.
     * 
     * Each branching level of the tree corresponds to an unmined transaction without a proof,
     * in which case the envelope is:
     * - rawTx
     * - mapiResponses from transaction processors (optional)
     * - inputs object where keys are this transaction's input txids and values are recursive envelope for those txids.    
     * 
     * @param txid 
     */
    getEnvelopeForTransaction(txid: string) : Promise<EnvelopeApi | undefined>

    /**
     * Returns transactions with status of 'waitingForSenderToSend' or 'unprocessed' for authenticated user
     * 
     * Original Dojo returned only these properties:
     *   'transactionId',
     *   'amount',
     *   'created_at',
     *   'referenceNumber',
     *   'senderPaymail',
     *   'truncatedExternalInputs',
     *   'status',
     *   'isOutgoing',
     *   'rawTransaction'
     * 
     * @param referenceNumber optional referenceNumber to also match
     */
    getPendingTransactions(referenceNumber?: string) : Promise<DojoPendingTxApi[]>

    /**
     * Constructs a new transaction spending known outputs (inputs) and creating new outputs.
     * 
     * If the inputs to the transaction go beyond what is needed to fund these outputs (plus the transaction fee),
     * additional Dojo-managed UTXOs will be generated to collect the remainder
     * (see the "outputGeneration" parameter for more on this).
     * 
     * @param inputs An object whose keys are TXIDs and whose values are payment envelopes
     * for external inputs to use when funding this transaction.
     * 
     * If more funding is needed beyond what is given here to pay for the specified outputs
     * (plus the transaction fee), Dojo will select them from your baskets of unspent outputs
     * (see the "inputSelection" parameter for more on this).
     *
     * inputs[TXID]: Must be a payment envelope containing the transaction with output(s)
     * that will be spent and used as input.
     *
     * inputs[TXID].outputsToRedeem: An additional field, an array of outputs
     * from that transaction to be spent.
     * 
     * @param inputSelection Algorithmic control over source of additional inputs that may be needed.
     * @param outputs Possibly empty, explicit outputs, typically external, to create as part of this transaction.
     * @param outputGeneration Algorithmic control over additional outputs that may be needed.
     * @param fee An object representing the fee the transaction will pay.
     * @param labels Each at most 150 characters. Labels can be used to tag transactions into categories
     * @param note A human-readable note detailing this transaction (Optional)
     * @param recipient The Paymail handle of the recipient of this transaction (Optional)
     */
    createTransaction(
        inputs: Record<string, DojoTxInputsApi>,
        inputSelection: DojoTxInputSelectionApi | undefined,
        outputs: DojoCreateTxOutputApi[],
        outputGeneration: DojoOutputGenerationApi | undefined,
        feeModel: DojoFeeModelApi,
        labels?: string[],
        note?: string,
        recipient?: string
    ): Promise<DojoCreateTransactionResultApi>

    /**
     * After creating a transaction with createTransaction and signing it, submit the serialized raw transaction
     * to transaction processors for processing.
     * 
     * The reference number uniquely identifies the transaction in the database.
     * 
     * Differences from v1:
     * 1. mapi_responses records are created when callbackIDs are generated, they exist before callbackID is given to external transaction processing service.
     *
     * @param rawTx The signed transaction serialized as a hex string or Buffer, not yet stored in database.
     * @param reference The reference number that you received from createTransaction uniquely identifying the database record.
     * @param outputMap An object whose keys are change output derivation suffixes
     *  and whose values are the corresponding output (vout) numbers within the transaction.
     *
     * @throws ERR_DOJO_INVALID_REFERENCE if reference is unknown
     * @throws ERR_DOJO_TRANSACTION_REJECTED if processors reject the transaction
     * @throws ERR_EXTSVS_DOUBLE_SPEND if transaction double spends an input
     *
     * @returns `DojoProcessTransactionResultApi` with txid and status of 'completed' or 'unknown'
     */
    processTransaction(rawTx: string | Buffer, reference: string, outputMap: Record<string, number>)
    : Promise<DojoProcessTransactionResultApi>
    
    /**
     * This endpoint allows a recipient to submit a transactions that was directly given to them by a sender.
     *
     * Saves the inputs and key derivation information, allowing the UTXOs to be redeemed in the future.
     *
     * Sets the transaction to completed and marks the outputs as spendable.
     */
    submitDirectTransaction(
        /**
         * Specify the transaction submission payment protocol to use.
         * 
         * Currently, the only supported protocol is that with BRFC ID "3241645161d8"
         */
        protocol: string,
        /**
         * The transaction envelope to submit, including key derivation information.
         */
        transaction: DojoSubmitDirectTransactionApi,
        /**
         * Provide the identity key for the person who sent the transaction
         */
        senderIdentityKey: string,
        /**
         * Human-readable description for the transaction.
         */
        note: string,
        /**
         * An array of transaction label strings, each at most 150 characters.
         * 
         * Labels can be used to tag transactions into categories.
         */
        labels: string[],
        derivationPrefix?: string
    ) : Promise<DojoSubmitDirectTransactionResultApi>

}

export type DojoTransactionStatusApi = 'completed' | 'failed' | 'unprocessed' | 'waitingForSenderToSend'

export interface DojoGetTransactionsOptions {
    /**
     * Columns to return for each transaction. If undefined or empty, all columns are returned.
     */
    columns?: string[]
    /**
     * Optional. Match transactions with this referenceNumber.
     */
    referenceNumber?: string
    /**
     * Optional. Match transactions with this status.
     */
    status?: DojoTransactionStatusApi
    /**
     * Optional. Match transactions with this label.
     */
    label?: string
    /**
     * Optional. Match transactions created on or after this time. Seconds since the epoch.
     */
    startTime?: number
    /**
     * Optional. Match transactions created on or before this time. Seconds since the epoch.
     */
    endTime?: number
    /**
     * Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.
     */
    involving?: string
    /**
     * Optional. If true, array of mapped `labels` is added to each transaction.
     */
    addLabels?: boolean
    /**
     * Optional. How many transactions to return.
     */
    limit?: number
    /**
     * Optional. How many transactions to skip.
     */
    offset?: number
    /**
     * Optional. Set sort order of results. Transactions are ordered by transactionId ascending by default.
     */
    order?: 'ascending' | 'descending'
}

export interface DojoGetTransactionOutputsOptions {
    /**
     *  If provided, indicates which basket the outputs should be selected from.
     */
    basket?: string
    /**
     *  If provided, only outputs with the corresponding tracked value will be returned (true/false).
     */
    tracked?: boolean
    /**
     * If provided, returns a structure with the SPV envelopes for the UTXOS that have not been spent.
     */
    includeEnvelope?: boolean
    /**
     * If given as true or false, only outputs that have or have not (respectively) been spent will be returned. If not given, both spent and unspent outputs will be returned.
     */
    spendable?: boolean
    /**
     * If provided, only outputs of the specified type will be returned. If not provided, outputs of all types will be returned.
     */
    type?: string
    /**
     * Provide a limit on the number of outputs that will be returned.
     */
    limit?: number
    /**
     * Provide an offset into the list of outputs.
     */
    offset?: number
}
     
export interface DojoGetTotalOfAmountsOptions {
    /**
     * Optional. Match transactions with this label.
     */
    label?: string
    /**
     * Optional. Match transactions created on or after this time. Seconds since the epoch.
     */
    startTime?: number
    /**
     * Optional. Match transactions created on or before this time. Seconds since the epoch.
     */
    endTime?: number
    /**
     * Optional. Match transactions with either senderPaymail or recipientPaymail matching this value.
     */
    involving?: string
    /**
     * Direction of value flow.
     */
    direction?: 'incoming' | 'outgoing'
}

export interface DojoStatsApi {
    users: number
    transactions: number
    txLabels: number
    chain: Chain
}

export interface DojoAliasApi {
    aliasId?: number
    created_at?: Date | null
    updated_at?: Date | null
    /**
     * max length of 30
     */
    alias: string
    /**
     * max length of 30
     */
    domain: string
    /**
     * max length of 30
     */
    avatarName?: string
    /**
     * max length of 100
     */
    avatarPhotoURL?: string
    reservationCompleted: boolean
    userId: number
    destinationBasketId: number
}

export interface DojoAvatarApi {
    /**
     * The name of the user
     */
    name: string
    /**
     * An HTTPS or UHRP URL to a photo of the user
     */
    photoURL: string
}

export interface DojoCertificateFieldApi {
    userId: number
    certificateId: number
    /**
     * max length of 100
     */
    fieldName: string
    /**
     * max length of 255
     */
    fieldValue: string
}

export interface DojoCertificateApi {
    certificateId?: number
    created_at?: Date | null
    updated_at?: Date | null
    userId: number
    /**
     * max length of 255
     */
    type: string
    /**
     * max length of 255
     */
    subject: string
    /**
     * max length of 255
     */
    validationKey: string
    /**
     * max length of 255
     */
    serialNumber: string
    /**
     * max length of 255
     */
    certifier: string
    /**
     * max length of 255
     */
    revocationOutpoint: string
    /**
     * max length of 255
     */
    signature: string
    /**
     * Certificate fields object constructed from fieldName and fieldValue properties of DojoCertificateFieldApi instances associated with this certificate.
     */
    fields?: Record<string, string>
}

export interface DojoMapiResponseApi {
    responseId?: number
    created_at?: Date | null
    updated_at?: Date | null
    transactionId: number
    userId: number
    callbackID?: string
    payload?: string
    /**
     * max length of 255
     */
    publicKey?: string
    /**
     * max length of 255
     */
    signature?: string
    /**
     * max length of 16
     */
    doubleSpendResponse?: string | null
}

export interface DojoOutputApi {
    outputId?: number
    created_at?: Date | null
    updated_at?: Date | null
    spendable: boolean
    change: boolean
    /**
     * length 64 hex encoded
     */
    txid: string | null
    /**
     * max 10 digits
     */
    vout: number | null
    /**
     * max 15 digits
     */
    amount: number | null
    outputScript: Buffer | null
    /**
     * max length of 50
     * e.g. P2PKH, custom
     */
    type: string
    transactionId: number
    userId: number
    basketId: number | null
    /**
     * transactionId of spending transaction or null if unspent
     * max 10 digits
     */
    spentBy: number
    /**
     * max length of 32
     * base64 encoded
     */
    derivationPrefix: string | null
    /**
     * max length of 32
     * base64 encoded
     */
    derivationSuffix: string | null
    /**
     * max length of 64
     */
    paymailHandle: string | null
    /**
     * max length of 130
     * hex encoded
     */
    senderIdentityKey: string | null
    /**
     * max length of 2500
     */
    customInstructions: string | null
    /**
     * true if output was put in a basket for tracking
     */
    tracked: boolean | null
    /**
     * max length of 130
     * e.g. you, dojo
     */
    providedBy: string | null
    /**
     * max length of 20
     * e.g. change
     */
    purpose: string | null
    /**
     * max length of 255
     */
    description: string | null
    /**
     * max length of 255
     */
    spendingDescription: string | null
}

export interface DojoTransactionApi {
    transactionId?: number
    created_at?: Date | null
    updated_at?: Date | null
    /**
     * length 64 hex encoded
     */
    txid: string
    rawTransaction: Buffer | null
    /**
     * max length of 64
     * e.g. completed, failed, unprocessed, waitingForSenderToSend
     */
    status: DojoTransactionStatusApi
    /**
     * max length of 64, hex encoded
     */
    referenceNumber: string | null
    /**
     * max 15 digits
     */
    amount: number
    userId: number
    /**
     * max length of 100
     */
    senderPaymail: string | null
    /**
     * max length of 100
     */
    recipientPaymail: string | null
    /**
     * max length of 500
     */
    note: string | null
    /**
     * true if transaction originated in this wallet, change returns to it.
     * false for a transaction created externally and handed in to this wallet.
     */
    isOutgoing: boolean
    unconfirmedInputChainLength: number
    proof: string | null
    truncatedExternalInputs: string | null
    /**
     * Is valid when transaction proof record exists in DojoProvenTxApi table.
     */
    provenTxId?: number | null
    
    /**
     * When not undefined, array of assigned tx_labels.label values.
     */
    labels?: string[]
}

export interface DojoClientUserApi {
    userId?: number
    created_at?: Date | null
    updated_at?: Date | null
    /**
     * max length of 130
     * hex encoded
     */
    identityKey: string
}

export interface DojoPendingTxInputInstructionsApi {
    /**
     * max length of 50
     * e.g. P2PKH, custom
     */
    type: string
    /**
     * max length of 32
     * base64 encoded
     */
    derivationPrefix: string | null
    /**
     * max length of 32
     * base64 encoded
     */
    derivationSuffix: string | null
    /**
     * max length of 64
     */
    paymailHandle: string | null
    /**
     * max length of 130
     * hex encoded
     */
    senderIdentityKey: string | null
    /**
     * max length of 2500
     */
    customInstructions: string | null
}

export interface DojoPendingTxInputApi extends EnvelopeEvidenceApi {
    outputsToRedeem?: number[]
    instructions?: Record<number, DojoPendingTxInputInstructionsApi>
}

export type DojoProvidedByApi = 'you' | 'dojo' | 'you-and-dojo'

export interface DojoPendingTxOutputApi {
    type: string
    satoshis: number
    script?: string
    derivationPrefix?: string
    derivationSuffix?: string
    paymailHandle?: string
    providedBy?: string
    purpose?: string
    senderIdentityKey?: string
    txid?: string
    vout?: number
}

/**
 * Return type from Ninja and Dojo getPendingTransactions methods.
 */
export interface DojoPendingTxApi {
    amount: number
    created_at: string
    referenceNumber: string
    senderPaymail?: string
    status: string
    isOutgoing: boolean
    rawTransaction?: string
    derivationPrefix?: string
    paymailHandle?: string

    inputs: Record<string, DojoPendingTxInputApi>

    outputs: DojoPendingTxOutputApi[]
}

export interface DojoProcessTransactionResultApi {
    txid: string,
    status: 'completed' | 'unknown',
    mapiResponses: MapiResponseApi[]
}

export interface DojoOutputToRedeemApi {
    /**
     * Zero based output index within its transaction to spend.
     */
    index: number,
    /**
     * byte length of unlocking script
     *
     * Note: To protect client keys and utxo control, unlocking scripts are never shared with Dojo.
     */
    unlockingScriptLength: number,
    spendingDescription?: string
}

export interface DojoTxInputsApi extends EnvelopeEvidenceApi {
    outputsToRedeem: DojoOutputToRedeemApi[]
}

/**
 * If Dojo needs to select more inputs beyond the ones specified in order to fund the transaction,
 * this object describes which kinds of inputs can be selected, and from where.
 */
export interface DojoTxInputSelectionApi {
    /**
     * This is a boolean that, when true, will forbid Dojo from adding any additional inputs to your transaction,
     * beyond what you specified in the "inputs" parameter.
     * Thus, if you have not sufficiently funded the transaction yourself,
     * or if the "inputs" array is empty, you will get an error.
     */
    disable: boolean
    /**
     * TODO (coming soon).
     * This is an array of UTXO basket names from which UTXOs can be selected for spending.
     * To only select UTXOs of a certain type, configure the source basket only to accept those types of UTXOs.
     * By default, UTXOs will only be selected if they are in the "default" basket.
     */
    baskets: string[]
    /**
     * An integer representing the maximum length for any chain of unconfirmed parents
     * that a selected input can have.
     * When undefined or -1 (the default), no maximum is specified.
     * Cannot be zero.
     * When 1, indicates that the input must itself be confirmed.
     * When 2, input parents must be confirmed.
     * When 3 denotes grandparents.
     * When 4 great-grandparents and so forth.
     */
    maxUnconfirmedChainLength?: number
}

/**
 * A specific output to be created as part of a new transactions.
 * These outputs can contain custom scripts as specified by recipients.
 */
export interface DojoCreateTxOutputApi {
    /**
     * The output script that will be included, hex encoded
     */
    script: string
    /**
     * The amount of the output in satoshis
     */
    satoshis: number
    /**
     * Human-readable output line-item description
     */
    description?: string
    /**
     * Destination output basket name for the new UTXO
     */
    basket?: string
    /**
     * Custom spending instructions (metadata, string, optional)
     */
    customInstructions?: string
}

/**
 * If Dojo needs to generate additional outputs for the transaction beyond what was specified,
 * this object describes what kind of outputs to generate, and where they should be kept.
 */
export interface DojoOutputGenerationApi {
    /**
     * TODO (coming soon).
     * Specify the basket where the generated outputs will be kept.
     * Only output types compatible with the destination basket will be generated.
     */
    basket: string
    /**
     * The method used to generate outputs.
     * "auto" (the default) selects the amount and types of generated outputs based on the selected basket's
     * configuration for how many of each type to keep on hand,
     * then uses Benford's law to distribute the satoshis across them.
     * "single" just uses one output, randomly selected from the available types, that contains all the satoshis.
     */
    method: 'auto' | 'single'
}

/**
 * An object representing the fee the transaction will pay.
 */
export interface DojoFeeModelApi {
    /**
     * The fee model to use, default "sat/kb"
     */
    model: 'sat/kb'
    /**
     * When "fee.model" is "sat/kb", this is an integer representing the number of satoshis per kb of block space
     * the transaction will pay in fees.

     * If undefined, the default value is used which may vary with market conditions.
     */
    value?: number
}

export interface DojoCreatingTxOutputApi extends DojoCreateTxOutputApi {
    providedBy: DojoProvidedByApi
    purpose?: string
    destinationBasket?: string
    derivationSuffix?: string
    keyOffset?: string
}

export interface DojoCreatingTxInstructionsApi {
    type: string
    paymailHandle?: string
    derivationPrefix?: string
    derivationSuffix?: string
    senderIdentityKey?: string
}

export interface DojoCreatingTxInputsApi extends DojoTxInputsApi {
    providedBy: DojoProvidedByApi
    instructions: Record<number, DojoCreatingTxInstructionsApi>
}

export interface DojoCreateTransactionResultApi {
    inputs: Record<string, DojoCreatingTxInputsApi>,
    outputs: DojoCreatingTxOutputApi[],
    derivationPrefix: string
    referenceNumber: string
    paymailHandle: string
}

export interface DojoSubmitDirectTransactionOutputApi {
    vout: number,
    basket: string
    suffix?: string,
    customInstructions?: object
}

export interface DojoSubmitDirectTransactionApi extends EnvelopeEvidenceApi {
    /**
     * sparse array of outputs of interest where indices match vout numbers.
     */
    outputs: Record<number, DojoSubmitDirectTransactionOutputApi>
}

export interface DojoSubmitDirectTransactionResultApi {
    transactionId: number
    referenceNumber: string
}
