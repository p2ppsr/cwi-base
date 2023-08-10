import { bsv, varUintSize, pointToBuffer, sha256Hash } from "."

/**
 * @param scriptSize byte length of input script
 * @returns serialized byte length a transaction input
 */
export function transactionInputSize(scriptSize: number) : number {
    return 32 // txid
        + 4 // vout
        + varUintSize(scriptSize) // script length, this is already in bytes
        + scriptSize // script
        + 4 // sequence number
}

/**
 * @param scriptSize byte length of output script
 * @returns serialized byte length a transaction output
 */
export function transactionOutputSize(scriptSize: number) : number {
    return varUintSize(scriptSize) // output script length, from script encoded as hex string
        + scriptSize // output script
        + 8 // output amount (satoshis)
}

/**
 * Compute the serialized binary transaction size in bytes
 * given the number of inputs and outputs,
 * and the size of each script.
 * @param inputs array of input script lengths, in bytes
 * @param outputs array of output script lengths, in bytes
 * @returns total transaction size in bytes
 */
export function transactionSize(inputs: number[], outputs: number[]): number {
    return 4 // Version
        + varUintSize(inputs.length) // Number of inputs
        + inputs.reduce((a, e) => a + transactionInputSize(e), 0) // all inputs
        + varUintSize(outputs.length) // Number of outputs
        + outputs.reduce((a, e) => a + transactionOutputSize(e), 0) // all outputs
        + 4 // lock time
}

function keyOffsetToHashedSecret(pub: bsv.PubKey, keyOffset?: string): { hashedSecret: bsv.Bn, keyOffset: string } {
    let offset: bsv.PrivKey
    if (keyOffset) {
        offset = bsv.PrivKey.fromString(keyOffset)
    } else {
        offset = bsv.PrivKey.fromRandom()
        keyOffset = offset.toString()
    }

    const sharedSecret = pointToBuffer(pub.point.mul(offset.bn))

    const hashedSecret = sha256Hash(sharedSecret)

    return { hashedSecret: bsv.Bn.fromBuffer(hashedSecret), keyOffset }
}

export function offsetPrivKey(privKey: string, keyOffset?: string): { offsetPrivKey: string, keyOffset: string } {
    const priv = bsv.PrivKey.fromString(privKey)

    const pub = bsv.PubKey.fromPrivKey(priv)

    const r = keyOffsetToHashedSecret(pub, keyOffset)

    const offsetPrivKey = new bsv.PrivKey(priv.bn.add(r.hashedSecret).mod(bsv.Point.getN()), true).toString()
    
    return { offsetPrivKey, keyOffset: r.keyOffset }
}

export function offsetPubKey(pubKey: string, keyOffset?: string): { offsetPubKey: string, keyOffset: string } {
    const pub = bsv.PubKey.fromString(pubKey)

    const r = keyOffsetToHashedSecret(pub, keyOffset)

    // The hashed secret is multiplied by the generator point.
    const point = bsv.Point.getG().mul(r.hashedSecret)

    // The resulting point is added to the recipient public key.
    const offsetPubKey = new bsv.PubKey(pub.point.add(point), true).toString()
    
    return { offsetPubKey, keyOffset: r.keyOffset }
}
 
export function lockScriptWithKeyOffsetFromPubKey(pubKey: string, keyOffset?: string): { script: string, keyOffset: string } {
    const r = offsetPubKey(pubKey, keyOffset)

    const offsetPub = bsv.PubKey.fromString(r.offsetPubKey)

    const hash = bsv.Hash.sha256Ripemd160(offsetPub.toBuffer())
    
    const script = bsv.Script.fromPubKeyHash(hash).toHex().toUpperCase()

    return { script, keyOffset: r.keyOffset }
}

export function createBabbageServiceChargeOutput() :
    {
        script: string,
        satoshis: number,
        keyOffset: string
    }
{
    // Derive a new public key to use for each commission to increase privacy
    const BABBAGE_PUBLIC_KEY_HEX = '0397742eaef6c7f08c4aa057397d45529f93ab90345b84ce5a5aac06ea9cdd132e'
    const DOJO_SERVICE_FEE = 200 // TODO: Calculate this fee rate based on average monthly users / costs?

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { script, keyOffset } = lockScriptWithKeyOffsetFromPubKey(BABBAGE_PUBLIC_KEY_HEX)

    return {
        script: script,
        satoshis: DOJO_SERVICE_FEE,
        keyOffset
    }
}