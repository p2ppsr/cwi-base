import { CwiError } from "./CwiError"

export class ERR_INTERNAL extends CwiError { constructor(description?: string) { super('ERR_INTERNAL', description || 'An internal server error has occurred.') } }
export class ERR_UNAUTHORIZED extends CwiError { constructor(description?: string) { super('ERR_UNAUTHORIZED', description || 'Access is denied due to an authorization error.') } }
export class ERR_MISSING_PARAMETER extends CwiError { constructor(name: string, mustBe: string) { super('ERR_MISSING_PARAMETER', `The ${name} parameter is missing, but it must be ${mustBe}.`) } }

export class ERR_BAD_REQUEST extends CwiError { constructor(description?: string) { super('ERR_BAD_REQUEST', description || 'The request is invalid.') } }

export class ERR_CHAIN_INVALID extends CwiError { constructor() { super('ERR_CHAIN_INVALID', 'The current chain tip is not in sync with external sources.') } }

export class ERR_TXID_INVALID extends CwiError { constructor() { super('ERR_TXID_INVALID', 'TXIDs must be 32 bytes encoded as 64 hex digits.') } }

