import { Point } from '@ts-bitcoin/core'

/**
 * A "compressed" format point is the X part of the (X, Y) point plus an extra
 * bit (which takes an entire byte) to indicate whether the Y value is odd or
 * not. Storing points this way takes a bit less space, but requires a bit more
 * computation to rederive the full point.
 *
 * @param {Point} point An instance of Point.
 * @returns {Buffer} A compressed point in the form of a buffer.
 */
export function pointToCompressed(point: Point) : Buffer {
  const xbuf = point.getX().toBuffer({ size: 32 })
  const ybuf = point.getY().toBuffer({ size: 32 })

  let prefix: Buffer
  const odd = ybuf[ybuf.length - 1] % 2
  if (odd) {
    prefix = Buffer.from([0x03])
  } else {
    prefix = Buffer.from([0x02])
  }
  return Buffer.concat([prefix, xbuf])
}

export function pointToBuffer(point: Point) : Buffer { return pointToCompressed(point) }