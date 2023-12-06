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
      for (const [key, value] of Object.entries(err)) {
        switch (key) {
          case 'status': code = value as string; break
          case 'name': code = value as string; break
          case 'code': code = value as string; break
          case 'message': description = value as string; break
          case 'description': description = value as string; break
          case 'stack': stack = value as string; break
          case 'sql': details.sql = value as string; break
          case 'sqlMessage': details.sqlMessage = value as string; break
          default: break
        }
      }
    }
    const e = new CwiError(
      code,
      description,
      stack,
      Object.keys(details).length > 0 ? details : undefined
    )
    if (err !== null && typeof err === 'object') {
      for (const [key, value] of Object.entries(err)) {
        if (typeof value !== 'string' && typeof value !== 'number')
          continue
        switch (key) {
          case 'status': break
          case 'name': break
          case 'code': break
          case 'message': break
          case 'description': break
          case 'stack': break
          case 'sql': break
          case 'sqlMessage': break
          default:
            e[key] = value;
            break
        }
      }
    }
    return e
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

  toJSON_old() : object {
    const json = {
      code: this.code,
      description: this.description,
    }
    if (this.stack) json["stack"] = this.stack
    if (this.details) json["details"] = this.details
    return json
  }
}
