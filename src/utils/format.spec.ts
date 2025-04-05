import {
  formatLength,
  formatMass,
  formatOrbitalPeriod,
  formatPersonHeight,
  formatPopulation,
} from './format'

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
    const result = formatPersonHeight(height)
    expect(result).toBe('1.90 m')
  })

  test('format height should return unknown when the height is unknown', () => {
    const height = 'unknown'
    const result = formatPersonHeight(height)
    expect(result).toBe('unknown')
  })
})

describe(formatPopulation, () => {
  it('should return unknown when the population is unknown', () => {
    const result = formatPopulation('unknown')
    expect(result).toBe('unknown')
  })

  it('should return string separated with commas until 6 digits', () => {
    const result = formatPopulation('123456')
    expect(result).toBe('123,456')
  })

  it('should show mi with up to two decimal case after 7 digits', () => {
    const result1 = formatPopulation('1234999')
    const result2 = formatPopulation('1235001')
    const result3 = formatPopulation('1000000')

    expect(result1).toBe('1.23 mi')
    expect(result2).toBe('1.24 mi')
    expect(result3).toBe('1 mi')
  })

  it('should show bi with up to two decimal case after 10 digits', () => {
    const result1 = formatPopulation('1234999999')
    const result2 = formatPopulation('1235000001')
    const result3 = formatPopulation('1000000000')

    expect(result1).toBe('1.23 bi')
    expect(result2).toBe('1.24 bi')
    expect(result3).toBe('1 bi')
  })

  it('should show tri with up to two decimal case after 13 digits', () => {
    const result1 = formatPopulation('1234999999999')
    const result2 = formatPopulation('1235000000001')
    const result3 = formatPopulation('1000000000000')

    expect(result1).toBe('1.23 tri')
    expect(result2).toBe('1.24 tri')
    expect(result3).toBe('1 tri')
  })
})

describe(formatLength, () => {
  it('should return unknown when the diameter is unknown', () => {
    const result = formatLength('unknown')
    expect(result).toBe('unknown')
  })

  it('should return string separated with commas', () => {
    const result = formatLength('123456')
    expect(result).toBe('123,456 km')
  })
})

describe(formatOrbitalPeriod, () => {
  it('should return unknown when the period is unknown', () => {
    const result = formatOrbitalPeriod('unknown')
    expect(result).toBe('unknown')
  })

  it('should return string separated with commas', () => {
    const result = formatOrbitalPeriod('123456')
    expect(result).toBe('123,456 days')
  })
})
