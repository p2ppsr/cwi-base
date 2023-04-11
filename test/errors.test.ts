import { ERR_INTERNAL } from '../src/errors'

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
})