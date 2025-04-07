import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './use-debounce'

describe(useDebounce, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllTimers()
  })

  it('should return the initial value immediately', () => {
    const initial = faker.word.words()
    const { result } = renderHook(() => useDebounce(initial, 500))
    expect(result.current).toBe(initial)
  })

  it('should delay the value change', () => {
    const delay = faker.number.int({ min: 500, max: 2000 })
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, delay),
      { initialProps: { value: 'old-value' } }
    )

    // value shouldn't change before the delay
    rerender({ value: 'new-value' })
    expect(result.current).toBe('old-value')

    // value should only be updated after the delay
    act(() => {
      vi.advanceTimersByTime(delay + 10)
    })
    expect(result.current).toBe('new-value')
  })
})
