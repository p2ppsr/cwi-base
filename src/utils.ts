import crypto from 'crypto'
import * as bsv from '@ts-bitcoin/core';

/**
 * @returns count cryptographically secure random bytes as Buffer
 */
export function randomBytes(count: number) : Buffer {
    return crypto.randomBytes(count)
}

/**
 * @returns count cryptographically secure random bytes as hex encoded string
 */
export function randomBytesHex(count: number) : string {
    return randomBytes(count).toString('hex')
}

/**
 * @returns count cryptographically secure random bytes as base64 encoded string
 */
export function randomBytesBase64(count: number) : string {
    return randomBytes(count).toString('base64')
}

/**
 * Coerce a value to Buffer if currently encoded as a string
 * @param val 
 * @param encoding defaults to 'hex'
 * @returns input val if it is a Buffer or new Buffer from string val
 */
export function asBuffer(val: Buffer | string, encoding?: BufferEncoding) : Buffer {
    return Buffer.isBuffer(val) ? val : Buffer.from(val, encoding || 'hex')
}

/**
 * Coerce a value to string if currently a Buffer
 * @param val 
 * @param encoding defaults to 'hex'
 * @returns input val if it is a string or Buffer encoded as string
 */
export function asString(val: Buffer | string, encoding?: BufferEncoding) : string {
    return Buffer.isBuffer(val) ? val.toString(encoding || 'hex') : val
}

/**
 * 
 * @param buffer
 * @returns sha256 hash of buffer contents.
 */
export const sha256Hash = (buffer: Buffer) : Buffer => crypto.createHash('sha256').update(buffer).digest()

/**
 * 
 * @param buffer 
 * @returns double sha256 hash of buffer contents, byte 0 of hash first.
 */
export function doubleSha256HashLE(data: string | Buffer, encoding?: BufferEncoding): Buffer {
    return sha256Hash(sha256Hash(asBuffer(data, encoding)))
}

/**
 * @param data string or Buffer
 * @returns reversed (big-endian) double sha256 hash of data, byte 31 of hash first.
 */
export function doubleSha256BE(data: string | Buffer, encoding?: BufferEncoding): Buffer {
    return doubleSha256HashLE(data, encoding).reverse()
}

/**
 * 
 * @param buffer
 * @returns new buffer with byte order reversed.
 */
export function swapByteOrder(buffer: Buffer): Buffer {
    return Buffer.from(buffer).reverse()
}

/**
 * @param num a number value in the Uint32 value range
 * @param littleEndian true for little-endian byte order in Buffer
 * @returns four byte buffer with Uint32 number encoded
 */
export function convertUint32ToBuffer(num: number, littleEndian = true) : Buffer {
    const arr = new ArrayBuffer(4)
    const view = new DataView(arr)
    view.setUint32(0, num, littleEndian) // byteOffset = 0
    return Buffer.from(arr)
}

/**
 * @param buffer four byte buffer with Uint32 number encoded
 * @param littleEndian true for little-endian byte order in Buffer
 * @returns a number value in the Uint32 value range
 */
export function convertBufferToUint32(buffer: Buffer, littleEndian = true) : number {
    const arr = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
    const view = new DataView(arr)
    return view.getUint32(0, littleEndian)
}

export function readVarUint32LE(buffer: Buffer, offset: number): { val: number; offset: number; } {
    const b0 = buffer[offset++];
    switch (b0) {
        case 0xff:
            throw new Error("Larger than Uint32 value is not supported at this time.");
        case 0xfe:
            return { val: buffer.readUint32LE(offset), offset: offset + 4 };
        case 0xfd:
            return { val: buffer.readUint16LE(offset), offset: offset + 2 };
        default:
            return { val: b0, offset: offset };
    }
}

export function writeVarUint32LE(val: number, buffer: Buffer, offset: number): number {
    if (val < 0)
        throw new Error(`val ${val} must be a non-negative integer.`);
    if (val < 0xfd) {
        buffer[offset] = val
        return offset + 1
    }
    if (val <= 0xffff) {
        buffer[offset] = 0xfd
        buffer.writeUint16LE(val, offset + 1)
        return offset + 3
    }
    if (val <= 0xffffffff) {
        buffer[offset] = 0xfe
        buffer.writeUint32LE(val, offset + 1)
        return offset + 5
    }
    throw new Error("Larger than Uint32 value is not supported at this time.");
}

/**
 * Computes merkle root from transaction hash and TSC proof data.
 * 
 * Note that it is essential to confirm that the txid is the double sha256 hash of
 * the transaction.
 * 
 * To prove that txid is the last transaction in its block, at every level,
 * if computed is left side, then provided must equal computed.
 * 
 * Specification Reference: https://tsc.bitcoinassociation.net/standards/merkle-proof-standardised-format/
 * 
 * @param index index of transaction being proven in block
 * @param txid hash of transaction being proven
 * @param nodes tip to root, proof provided intermediate hash values
 * @returns computed merkle tree root for comparison to known root.
 */
export function computeRootFromMerkleProofNodes(index: number, txid: string | Buffer, nodes: string[] | Buffer): Buffer {
    let c = asBuffer(txid)
    const nodesIsBuffer = Buffer.isBuffer(nodes);
    let level = 0;
    let offset = 0;
    for (; ; level++) {
        let p: Buffer;
        if (nodesIsBuffer) {
            if (offset >= nodes.length)
                break;
            const type = nodes[offset++];
            if (type !== 0 && type !== 1)
                throw new Error(`Unsuported node type ${type}`);
            p = type === 1 ? c : nodes.subarray(offset, offset + 32);
            if (type === 0)
                offset += 32;
        } else {
            if (level >= nodes.length)
                break;
            p = nodes[level] === "*" ? c : Buffer.from(nodes[level], 'hex');
        }
        const cIsLeft = index % 2 === 0;

        if (!cIsLeft && c.equals(p))
            // Proof is invalid if computed value equals provided value and computed is right side.
            return Buffer.alloc(32)

        c = cIsLeft
            ? computeMerkleTreeParent(c, p)
            : computeMerkleTreeParent(p, c);

        index = Math.floor(index / 2);
    }
    return c;
}

export function computeMerkleTreeParent(leftNode: string | Buffer, rightNode: string | Buffer): Buffer {
    // if inputs are strings, swap endianness before concatenating
    const leftConc = Buffer.from(asBuffer(leftNode)).reverse();
    const rightConc = Buffer.from(asBuffer(rightNode)).reverse();

    // concatenate leaves
    const concat = Buffer.concat([leftConc, rightConc]);

    // hash the concatenation
    const hash = doubleSha256BE(concat);

    return hash;
}

/**
 * Parse a bsv transaction encoded as a hex string, serialized Buffer to bsv.Tx
 * If tx is already a bsvTx, just return it.
 * @param tx 
 * @returns bsv.Tx
 */
export function asBsvTx(tx: string | Buffer | bsv.Tx): bsv.Tx {
    if (Buffer.isBuffer(tx))
        tx = new bsv.Tx().fromBuffer(tx);
    else if (typeof tx === 'string')
        tx = new bsv.Tx().fromString(tx);
    return tx
}

/**
 * For a bitcoin transaction in hex string, Buffer or parsed bsv.Tx form:
 * Returns deduplicated array of the input's outpoint transaction hashes (txids).
 */
export function getInputTxIds(tx: string | Buffer | bsv.Tx): string[] {
    tx = asBsvTx(tx)
    const txids = {};
    for (const input of tx.txIns) {
        txids[input.txid()] = true;
    }
    return Object.keys(txids);
}
