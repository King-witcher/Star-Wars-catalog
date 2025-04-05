import { formatHeight, formatMass } from './helpers'

describe('formatMass', () => {
  test('format mass should return a string with kg', () => {
    const mass = '123'
    const result = formatMass(mass)
    expect(result).toBe('123 kg')
  })

  test('format mass should return unknown when the mass is unknown', () => {
    const mass = 'unknown'
    const result = formatMass(mass)
    expect(result).toBe('unknown')
  })
})

describe('formatHeight', () => {
  test('format height should return a string with m', () => {
    const height = '190'
    const result = formatHeight(height)
    expect(result).toBe('1.90 m')
  })

  test('format height should return unknown when the height is unknown', () => {
    const height = 'unknown'
    const result = formatHeight(height)
    expect(result).toBe('unknown')
  })
})
