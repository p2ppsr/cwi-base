import { asBsvTx, asBuffer, bsv } from "../src"

describe('utils tests', () => {
    jest.setTimeout(9000000)

    test('0_asBsvTx', () => {
        const rawTx = '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff1a0330b40c2f7461616c2e636f6d2f6968c4881dfbec4a40e80000ffffffff01c45c4225000000001976a914522cf9e7626d9bd8729e5a1398ece40dad1b6a2f88ac00000000'
        {
            const tx = asBsvTx(rawTx)
            expect(tx instanceof bsv.Tx).toBe(true)
            expect(tx.toHex()).toBe(rawTx)
        }
        {
            const tx = asBsvTx(asBuffer(rawTx))
            expect(tx instanceof bsv.Tx).toBe(true)
            expect(tx.toHex()).toBe(rawTx)
        }
        {
            const tx = asBsvTx(asBuffer(rawTx))
            expect(tx instanceof bsv.Tx).toBe(true)
            expect(tx.toHex()).toBe(rawTx)
        }
    })
})