import { CwiError, ERR_DOJO_NOT_SUFFICIENT_FUNDS } from '../src'
import { ERR_INTERNAL } from '../src/ERR_errors'

describe("errors", () => {
    test("super", () => {
        const err = new ERR_INTERNAL()
        // While it is tempting to use `constructor.name` as the return value for `code` and `name`,
        // this will return a different, useless value if the code is minified.
        expect(err.code).toBe(err.constructor.name)
        expect(err.code).toBe('ERR_INTERNAL')
        expect(err.name).toBe('ERR_INTERNAL')
        expect(err.description).toBe(err.message)
    })

    test("serialize", () => {
        const e = new ERR_DOJO_NOT_SUFFICIENT_FUNDS(101, 52)

        const error = JSON.stringify(e, Object.getOwnPropertyNames(e))

        const er = CwiError.fromUnknown(JSON.parse(error))

        expect(er.code).toBe('ERR_DOJO_NOT_SUFFICIENT_FUNDS')

        const ed = er as ERR_DOJO_NOT_SUFFICIENT_FUNDS

        expect(ed.totalSatoshisNeeded).toBe(101)
        expect(ed.moreSatoshisNeeded).toBe(52)
    })
})