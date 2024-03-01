import { Transaction } from "@bsv/sdk"
import { asBsvSdkTx, asBuffer, identityKeyFromPrivateKey, transformResultsWithTrust } from "../src"
import { CertifierDetails, Result } from "../src/Api/TrustTransformerApi"

describe('utils tests', () => {
  jest.setTimeout(9000000)

  test('0_asBsvSdkTx', () => {
    const rawTx = '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff1a0330b40c2f7461616c2e636f6d2f6968c4881dfbec4a40e80000ffffffff01c45c4225000000001976a914522cf9e7626d9bd8729e5a1398ece40dad1b6a2f88ac00000000'
    {
      const tx = asBsvSdkTx(rawTx)
      expect(tx instanceof Transaction).toBe(true)
      expect(tx.toHex()).toBe(rawTx)
    }
    {
      const tx = asBsvSdkTx(asBuffer(rawTx))
      expect(tx instanceof Transaction).toBe(true)
      expect(tx.toHex()).toBe(rawTx)
    }
    {
      const tx = asBsvSdkTx(asBuffer(rawTx))
      expect(tx instanceof Transaction).toBe(true)
      expect(tx.toHex()).toBe(rawTx)
    }
  })

  test('1_identityKeyFromPrivateKey', () => {
    const privKey = '8888888888888888888888888888888899999999999999999999999999999999'
    const identityKey = '02724aaaeaaddece5cbafdc21d253acbe7832126ab5804f319c9bcc7221c5c2ad7'
    const ik = identityKeyFromPrivateKey(privKey)
    expect(ik).toBe(identityKey)
  })
})

describe('evaluateTrust', () => {
  const mockCertifiers: CertifierDetails[] = [
    { publicKey: '027d95facc6da22cfd147ff9148d3f54bc39d76d23c07fabf3f49a1754d9130548', name: 'Certifier1', trust: 5, icon: '', note: 'test1' },
    { publicKey: '03717096714eda7ae206e0752897797d243cf26e66870e6a52dcc3661902a52743', name: 'Certifier2', trust: 3, icon: '', note: 'test2' }
  ]

  const mockResults: Result[] = [
    { subject: 'subject1', certifier: '027d95facc6da22cfd147ff9148d3f54bc39d76d23c07fabf3f49a1754d9130548' },
    { subject: 'subject1', certifier: '03717096714eda7ae206e0752897797d243cf26e66870e6a52dcc3661902a52743' },
    { subject: 'subject2', certifier: '027d95facc6da22cfd147ff9148d3f54bc39d76d23c07fabf3f49a1754d9130548' },
    { subject: 'subject3', certifier: null! }
  ]

  // TODO: Parameter validation as needed
  // test('it should return an empty array when settings / results / certifiers are missing', () => {
  //   expect(transformResultsWithTrust({ results: mockResults, certifiers: mockCertifiers })).toEqual([])
  //   expect(transformResultsWithTrust({ settings: { trustThreshold: 1 }, certifiers: mockCertifiers })).toEqual([])
  //   expect(transformResultsWithTrust({ settings: { trustThreshold: 1 }, results: mockResults })).toEqual([])
  // })

  test('it should return an empty array when the confidence score is below the threshold', () => {
    const settings = { trustThreshold: 10 }
    expect(transformResultsWithTrust({ settings, results: mockResults, certifiers: mockCertifiers })).toEqual([])
  })

  test('it should return sorted array by trust', () => {
    const settings = { trustThreshold: 3 }
    const sortedResult = transformResultsWithTrust({ settings, results: mockResults, certifiers: mockCertifiers })
    expect(sortedResult[0].certifier.trust).toBeGreaterThanOrEqual(sortedResult[1].certifier.trust)
  })

  test('it should match certifier with the result', () => {
    const settings = { trustThreshold: 3 }
    const result = transformResultsWithTrust({
      settings, results:
        [{ subject: 'subject4', certifier: '03717096714eda7ae206e0752897797d243cf26e66870e6a52dcc3661902a52743' }],
      certifiers: mockCertifiers
    })
    result.forEach(res => {
      expect(res.certifier.publicKey).toBe('03717096714eda7ae206e0752897797d243cf26e66870e6a52dcc3661902a52743')
    })
  })
})