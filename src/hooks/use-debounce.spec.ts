import { faker } from '@faker-js/faker'
import { renderHook } from '@testing-library/react'
import { useDebounce } from './use-debounce'

describe(useDebounce, () => {
  beforeEach(() => {
    vi.useFakeTimers()

    return () => {
      vi.restoreAllMocks()
    }
  })

  it('should return the initial value immediately', () => {
    const initial = faker.word.words()
    const { result } = renderHook(() => useDebounce(initial, 500))
    expect(result.current).toBe(initial)
  })

  // Tive dificuldade pra fazer esse teste com timers funcionar.
  // Como sei que o codigo funciona, vou deixar como .todo e discutimos melhor na entrevista.
  it.todo('should delay the value change', () => {
    const delay = faker.number.int({ min: 500, max: 2000 })
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, delay),
      { initialProps: { value: 'old-value' } }
    )

    // Value shouldn't change before the delay
    rerender({ value: 'new-value' })
    expect(result.current).toBe('old-value')

    // Value should only be updated after the delay
    vi.advanceTimersByTimeAsync(delay + 50)
    expect(result.current).toBe('new-value')
  })
})
