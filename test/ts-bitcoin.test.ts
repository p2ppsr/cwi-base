/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Address, Bn, KeyPair, PrivKey, PubKey, Tx, TxBuilder, TxIn, TxOut, deps } from '@ts-bitcoin/core'

describe("ts-bitcoin", () => {

    test("compress public key", () => {
        const pk = PubKey.fromHex('045384871bedffb233fdb0b4899285d73d0f0a2b9ad18062a062c01c8bdb2f720a1535c6ae0978962d24d95b8e2ec9a4a36f23ab6d31d9e7960714ed92996a77fe')
        expect(pk.compressed).toBe(false)
        const h = pk.toHex()
        expect(h.length).toBeGreaterThan(66)
        pk.compressed = true
        expect(pk.compressed).toBe(true)
        const h2 = pk.toHex()
        expect(h2.length).toBe(66)
    })

    test("build tx 1", () => {
        const tx = new Tx()
        const satoshis42 = new Bn(42)
        const privKey1 = PrivKey.fromRandom()
        const keyPair1 = KeyPair.fromPrivKey(privKey1)
        const addr1 = Address.fromPubKey(keyPair1.pubKey)
        const script1 = addr1.toTxOutScript()
        const bsvd = script1.toBitcoindString() // "DUP HASH160 0x148cd78ce17192910d2b0c2f3d5aac033d414a7f0e EQUALVERIFY CHECKSIG"
        const asm = script1.toAsmString() // "OP_DUP OP_HASH160 8cd78ce17192910d2b0c2f3d5aac033d414a7f0e OP_EQUALVERIFY OP_CHECKSIG"
        const txOut = TxOut.fromProperties(satoshis42, script1)
        tx.addTxOut(txOut)
        const txHashBuf = deps.Buffer.alloc(32).fill(0)
        //constructor(txHashBuf?: Buffer, txOutNum?: number, scriptVi?: VarInt, script?: Script, nSequence?: number);
        //const txIn = TxIn.fromProperties(txHashBuf, 0, 
        tx.nLockTime = 0
        tx.versionBytesNum = 0
    })
    test("build tx 2", () => {
        // make change address
        const privKey1 = PrivKey.fromRandom()
        const keyPair1 = KeyPair.fromPrivKey(privKey1)
        const addr1 = Address.fromPubKey(keyPair1.pubKey)

        // make address to send from
        const privKey2 = PrivKey.fromBn(new Bn(1))
        const keyPair2 = KeyPair.fromPrivKey(privKey2)
        const addr2 = Address.fromPubKey(keyPair2.pubKey)

        const txOut = TxOut.fromProperties(new Bn(2e8), addr2.toTxOutScript())
        const txHashBuf = deps.Buffer.alloc(32).fill(0)

        // make address to send to
        const privKey3 = PrivKey.fromBn(new Bn(2))
        const keyPair3 = KeyPair.fromPrivKey(privKey3)
        const addr3 = Address.fromPubKey(keyPair3.pubKey)

        const tx = new TxBuilder()
            .setFeePerKbNum(0.0001e8)
            .setChangeAddress(addr1)
            .inputFromPubKeyHash(txHashBuf, 0, txOut, keyPair2.pubKey)
            .outputToAddress(new Bn(1e8), addr3)
            .build()

        const raw = tx.toHex()
        expect(raw.length).toBeGreaterThan(0)
    })

})