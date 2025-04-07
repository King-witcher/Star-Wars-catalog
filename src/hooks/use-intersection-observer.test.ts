import { useIntersectionObserver } from './use-intersection-observer'
import { renderHook } from '@testing-library/react'

const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

let mockIntersectionCallback: (
  entries: Partial<IntersectionObserverEntry>[]
) => void

function noop() {}

class MockIntersectionObserver {
  constructor(
    callback: (entries: Partial<IntersectionObserverEntry>[]) => void
  ) {
    mockIntersectionCallback = callback
  }
  observe = mockObserve
  disconnect = mockDisconnect
}

global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver

describe(useIntersectionObserver, () => {
  afterEach(vi.resetAllMocks)

  it('should observe the node when enabled is true', () => {
    const { result } = renderHook(() => useIntersectionObserver(noop, true))

    const mockNode = {} as Element
    result.current(mockNode)

    expect(mockObserve).toHaveBeenCalledWith(mockNode)
  })

  it('should not observe node when enabled is false', () => {
    const { result } = renderHook(() => useIntersectionObserver(noop, false))

    const mockNode = {} as Element
    result.current(mockNode)

    expect(mockObserve).not.toHaveBeenCalled()
  })

  it('should disconnect existing observer before creating a new one', () => {
    const { result } = renderHook(() => useIntersectionObserver(noop, true))

    result.current({} as Element)
    result.current({} as Element)

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
  })

  it('should call loadFn when element is intersecting', () => {
    const loadFn = vi.fn()
    const { result } = renderHook(() => useIntersectionObserver(loadFn, true))

    result.current({} as Element)
    mockIntersectionCallback([{ isIntersecting: true }])

    expect(loadFn).toHaveBeenCalled()
  })

  it('should not call loadFn when element is not intersecting', () => {
    const loadFn = vi.fn()
    const { result } = renderHook(() => useIntersectionObserver(loadFn, true))

    result.current({} as Element)
    mockIntersectionCallback([{ isIntersecting: false }])

    expect(loadFn).not.toHaveBeenCalled()
  })

  it('should not create observer when node is null', () => {
    const { result } = renderHook(() => useIntersectionObserver(noop, true))

    result.current(null)

    expect(mockObserve).not.toHaveBeenCalled()
  })
})
