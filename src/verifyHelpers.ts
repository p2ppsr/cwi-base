import { ERR_BAD_REQUEST, ERR_INTERNAL } from './ERR_errors'

// Verify functions return a value of a desired type, potentially validating and coercing the
// input along the way.
//
// In contrast, Validate functions only confirm the validity of a value.
// If valid, the value is not altered in any way.

/**
 * Helper function.
 *
 * Verifies the value of b is a Buffer and optionally also its length.
 */
export function verifyBuffer (b: Buffer | undefined | null, length?: number): Buffer {
  if ((b == null) || !Buffer.isBuffer(b)) throw new ERR_INTERNAL('Buffer required.')
  if (length !== undefined && b.length !== length) throw new ERR_INTERNAL(`Buffer of ${length} bytes required.`)
  return b
}

/**
 * Helper function.
 *
 * Verifies that a possibly optional value has a value.
 */
export function verifyTruthy<T> (v: T | null | undefined, description?: string): T {
  if (!v) throw new ERR_INTERNAL(description || 'A truthy value is required.')
  return v
}

/**
 * Helper function.
 *
 * Verifies that an optional number has a value.
 */
export function verifyNumber (v: number | null | undefined): number {
  if (typeof v !== 'number') throw new ERR_INTERNAL('A number is required.')
  return v
}

/**
 * Helper function.
 *
 * throws ERR_BAD_REQUEST if results has length greater than one.
 *
 * @returns results[0] or undefined if length is zero.
 */
export function verifyOneOrNone<T> (results: T[]): (T | undefined) {
  if (results.length > 1) throw new ERR_BAD_REQUEST('Result must be unique.')
  return results[0]
}

/**
 * Helper function.
 *
 * throws ERR_BAD_REQUEST if results has length other than one.
 *
 * @returns results[0].
 */
export function verifyOne<T> (results: T[], errorDescrition?: string): T {
  if (results.length !== 1) throw new ERR_BAD_REQUEST(errorDescrition || 'Result must exist and be unique.')
  return results[0]
}

/**
 * Helper function.
 *
 * throws ERR_BAD_REQUEST if results has length greater than one.
 *
 * @returns results[0] or undefined if length is zero.
 */
export function verifyNone<T> (results: T[]): void {
  if (results.length > 0) throw new ERR_BAD_REQUEST('Duplicate is not allowed.')
}
