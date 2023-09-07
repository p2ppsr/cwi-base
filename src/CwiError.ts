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
export class CwiError extends Error {
  constructor (code: string, description: string, stack?: string, public details?: Record<string, string>) {
    super(description)
    this.name = code
    if (stack) this.stack = stack
  }

  // toString (): string { return `${this.code}: ${this.description}` }

  static fromUnknown (err: unknown): CwiError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let code = 'ERR_UNKNOWN'
    let description = ''
    let stack: string | undefined
    const details: Record<string, string> = {}
    if (err !== null && typeof err === 'object') {
      if ('name' in err && typeof err.name === 'string') { code = err.name } else if ('code' in err && typeof err.code === 'string') { code = err.code } else if ('status' in err && typeof err.status === 'string') { code = err.status }
      if ('description' in err && typeof err.description === 'string') { description = err.description } else if ('message' in err && typeof err.message === 'string') { description = err.message }
      if ('stack' in err && typeof err.stack === 'string') { stack = err.stack }
      if ('sql' in err && typeof err.sql === 'string') { details.sql = err.sql }
      if ('sqlMessage' in err && typeof err.sqlMessage === 'string') { details.sqlMessage = err.sqlMessage }
    }
    return new CwiError(code, description, stack, Object.keys(details).length > 0 ? details : undefined)
  }

  /**
     * Error class compatible accessor for  `code`.
     */
  get code (): string { return this.name }
  set code (v: string) { this.name = v }

  /**
     * Error class compatible accessor for `description`.
     */
  get description (): string { return this.message }
  set description (v: string) { this.message = v }

  /**
     * @returns standard HTTP error status object with status property set to 'error'.
     */
  asStatus (): { status: string, code: string, description: string } {
    return {
      status: 'error',
      code: this.code,
      description: this.description
    }
  }
}
