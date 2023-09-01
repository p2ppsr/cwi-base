/* eslint-env jest */
import { normalizeProtocol } from '../src'

describe('normalizeProtocol', () => {
  it('Throws a Error if a protocol name contains multiple spaces', () => {
    expect(() =>
      normalizeProtocol('multiple  spaces')
    ).toThrow(new Error(
      'Protocol names cannot contain multiple consecutive spaces ("  ")'
    ))
  })
  it('Throws a Error if no protocol ID is given', () => {
    expect(() =>
      normalizeProtocol(undefined)
    ).toThrow(new Error(
      'A protocol ID is required'
    ))
  })
  it('Throws a Error if a protocol ID is not a string or two element array', () => {
    const ex = new Error('Protocol IDs must be strings or two element arrays')
    expect(() => normalizeProtocol(() => {})).toThrow(ex)
    expect(() => normalizeProtocol([])).toThrow(ex)
    expect(() => normalizeProtocol([1, 2, 3])).toThrow(ex)
  })
  it('Throws a Error if a protocol level is not 0, 1, or 2', () => {
    const ex = new Error('Protocol level must be 0, 1, or 2')
    expect(() => normalizeProtocol([() => {}, 'foo'])).toThrow(ex)
    expect(() => normalizeProtocol([1.414, 'foo'])).toThrow(ex)
    expect(() => normalizeProtocol([-1, 'foo'])).toThrow(ex)
    expect(() => normalizeProtocol([3, 'foo'])).toThrow(ex)
  })
  it('Throws a Error if a protocol name contains bad characters', () => {
    expect(() =>
      normalizeProtocol('This is a protocol about 3 little pig$')
    ).toThrow(new Error(
      'Protocol names can only contain letters, numbers and spaces'
    ))
  })
  it('Throws a Error if a protocol name ends with " protocol"', () => {
    expect(() =>
      normalizeProtocol('This is a video about bricks Protocol')
    ).toThrow(new Error(
      'No need to end your protocol name with " protocol"'
    ))
  })
  it('Throws a Error if a protocol name is longer than 280 characters', () => {
    expect(() =>
      normalizeProtocol(
        'Once upon a time there was an unfortunate soul who made his protocol ID longer than a double sized tweet in its number of characters and made him repeat himself over again Once upon a time there was an unfortunate soul who made his protocol ID longer than a double sized tweet in its number of characters and made him repeat himself over again Once upon a time there was an unfortunate soul who made his protocol ID longer than a double sized tweet in its number of characters and made him repeat himself over again'
      )
    ).toThrow(new Error(
      'Protocol names must be 280 characters or less'
    ))
  })
  it('Throws a Error if a protocol name is shorter than 5 characters', () => {
    expect(() =>
      normalizeProtocol('beep')
    ).toThrow(new Error(
      'Protocol names must be 5 characters or more'
    ))
  })
  it('Trims the protocol name during normalization', () => {
    expect(normalizeProtocol('   User Management')).toEqual([2, 'user management'])
    expect(normalizeProtocol(' DNS Protocol Access Control  '))
      .toEqual([2, 'dns protocol access control'])
  })
  it('Returns the correct normalized protocol ID', () => {
    expect(normalizeProtocol('User Management')).toEqual([2, 'user management'])
    expect(normalizeProtocol('DNS Protocol Access Control')).toEqual([2, 'dns protocol access control'])
    expect(normalizeProtocol([0, 'User Management'])).toEqual([0, 'user management'])
    expect(normalizeProtocol([1, 'DNS Protocol Access Control'])).toEqual([1, 'dns protocol access control'])
    expect(normalizeProtocol([2, 'DNS Protocol Access Control'])).toEqual([2, 'dns protocol access control'])
  })
})
