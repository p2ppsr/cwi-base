/* eslint-disable @typescript-eslint/no-unused-vars */
import { BigNumber, Curve, PrivateKey, PublicKey } from '@bsv/sdk'
import { bsv, lockScriptWithKeyOffsetFromPubKey, offsetPrivKey, offsetPubKey } from '../src'

describe("dojoHelpers", () => {

    test("0_offset keys", async () => {
        const priv = bsv.PrivKey.fromBn(new bsv.Bn('FFF0000000000000000000000000000000000000000000000000000000000100', 'hex'))
        const privKey = priv.toString()
        const pub = bsv.PubKey.fromPrivKey(priv)
        
        const r1 = offsetPrivKey(privKey)
        
        const r2 = offsetPubKey(pub.toString(), r1.keyOffset)
        
        const pubKey = bsv.PubKey.fromPrivKey(bsv.PrivKey.fromString(r1.offsetPrivKey)).toString()

        expect(r1.keyOffset).toBe(r2.keyOffset)
        expect(pubKey).toBe(r2.offsetPubKey) 
    })

    test("1_offsetPrivKey", async () => {
        const bn2 = BigNumber.fromHex('FFF0000000000000000000000000000000000000000000000000000000000100', 'big')

        const priv2 = new PrivateKey(bn2)

        const privKey2 = priv2.toWif()
        
        const keyOffset = "KyaVZ1AnxYN4oB8JnxYVyZ8xYC9ySpq2Umzx6jwzQGVo71k1EgSt"
        const oPrivKey = "KyMYVLNeyF4qQsgHW3N1eJv9WcRd2aZC8hw7iLgCojQsyizqKsV4"

        const r12 = offsetPrivKey(privKey2, keyOffset)

        expect(r12.keyOffset).toBe(keyOffset)

        expect(r12.offsetPrivKey).toBe(oPrivKey)
    })

    test("2_offsetPubKey", async () => {
        const bn2 = BigNumber.fromHex('FFF0000000000000000000000000000000000000000000000000000000000100', 'big')

        const priv2 = new PrivateKey(bn2)

        const pub2 = priv2.toPublicKey()
        
        const keyOffset = "KyaVZ1AnxYN4oB8JnxYVyZ8xYC9ySpq2Umzx6jwzQGVo71k1EgSt"
        const oPrivKey = "KyMYVLNeyF4qQsgHW3N1eJv9WcRd2aZC8hw7iLgCojQsyizqKsV4"
        const oPubKey = "024b4362ce98e0afd22bf3319831cfaf691ad2f08471a3386bcda98d65435a0f24"

        const r22 = offsetPubKey(pub2.toString(), keyOffset)

        expect(r22.keyOffset).toBe(keyOffset)

        expect(r22.offsetPubKey).toBe(oPubKey)

        const pubKey2 = PrivateKey.fromWif(oPrivKey).toPublicKey().toString()

        expect(pubKey2).toBe(oPubKey) 
    })

    test("3_lockScriptWithKeyOffsetFromPubKey", async () => {
        const pubKey = '0397742eaef6c7f08c4aa057397d45529f93ab90345b84ce5a5aac06ea9cdd132e'
        
        const ko = 'Kx9MjojdkjL3bEo5tQwHpwT1voKN1z56NjpATsa2Sx6QTrVjgMQJ'
        const script = "76a9149d09d0ee09b212c548f6b1a7835641f33654246788ac"

        const r1 = lockScriptWithKeyOffsetFromPubKey(pubKey, ko)
        
        expect(r1.script).toBe(script)
        expect(r1.keyOffset).toBe(ko);
        
        // And with a random keyOffset...
        const r2 = lockScriptWithKeyOffsetFromPubKey(pubKey)
        
        expect(r2.script).not.toBe(script)
        expect(r2.keyOffset).not.toBe(ko);
    })
})