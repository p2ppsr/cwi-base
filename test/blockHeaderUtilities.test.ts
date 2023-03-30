import { toBlockHeader } from "../src/Api/BlockHeaderApi"
import { genesisBuffer, genesisHeaderHex, serializeBlockHeader } from "../src/blockHeaderUtils"

describe('testing serializeBlockHeader', () => {
    test('serialize genesis header', async () => {
        const gbuf = genesisBuffer("main")
        const ghex = genesisHeaderHex("main")
        const ghead = toBlockHeader(ghex)
        const testbuf = Buffer.alloc(100)
        const b1 = serializeBlockHeader(ghead)
        const b2 = serializeBlockHeader(ghead, testbuf, 10)
        expect(b1.equals(b2)).toBe(true)
        expect(b1.equals(testbuf.subarray(10, 90))).toBe(true)
        expect(b1.equals(gbuf)).toBe(true)
        expect(b2.equals(gbuf)).toBe(true)
    })
})
