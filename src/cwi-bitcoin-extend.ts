import { Point } from 'cwi-bitcoin'

/**
 * A "compressed" format point is the X part of the (X, Y) point plus an extra
 * bit (which takes an entire byte) to indicate whether the Y value is odd or
 * not. Storing points this way takes a bit less space, but requires a bit more
 * computation to rederive the full point.
 *
 * @param {Point} point An instance of Point.
 * @returns {Buffer} A compressed point in the form of a buffer.
 */
export function pointToCompressed (point: Point): Buffer {
  return point.toBuffer()
}

export function pointToBuffer (point: Point): Buffer { return pointToCompressed(point) }
