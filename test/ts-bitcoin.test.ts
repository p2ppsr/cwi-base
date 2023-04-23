// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Address, Bn, KeyPair, PrivKey, PubKey, TxBuilder, TxOut, deps } from '@ts-bitcoin/core'

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
})