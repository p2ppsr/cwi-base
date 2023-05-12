import { CwiErrorApi } from "./Api/CwiBaseApi"

/**
 * Errors which extend CwiError implement `name` as an alternate getter for `code`,
 * and `message` as an alternate getter for `description`.
 * 
 * This supports catch handlers that might catch both
 * `Error` derived or `CwiErrorBase` derived errors.
 * 
 * Derived class constructors should use the derived class name as the value for `code`,
 * and an internationalizable constant string for `description`.
 * 
 * Optionaly, the derived class `description` can include template parameters passed in
 * to the constructor. See ERR_MISSING_PARAMETER for an example.
 * 
 * To avoid derived class name colisions, packages should include a package specific
 * identifier after the 'ERR_' prefix. e.g. 'ERR_DOJO_' as the prefix for Dojo specific error
 * classes.
 */
export class CwiError implements CwiErrorApi {

    constructor (readonly code: string, readonly description: string) {
    }

    toString() { return `${this.code}: ${this.description}`}

    static fromUnknown(err: unknown) {
        // eslint-disable-next-line no-debugger
        // debugger
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const e = err as any
        const code = e.code || e.status || 'ERR_UNKNOWN'
        let description = e.description || e.message || ''
        if (!description && e.toString && typeof e.toString === 'function')
            description = e.toString()
        return new CwiError(code, description)
    }

    /**
     * Error class compatible accessor for  `code`.
     */
    get name(): string { return this.code }

    /**
     * Error class compatible accessor for `description`.
     */
    get message(): string { return this.description }

    /**
     * @returns standard HTTP error status object with status property set to 'error'.
     */
    asStatus() : { status: string, code: string, description: string } {
        return {
            status: 'error',
            code: this.code,
            description: this.description
        }
    }
}

