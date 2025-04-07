import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FavoritesProvider, useFavorites } from './favorites'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

// Replace global localStorage with mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Wrapper for testing hooks
const Wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
)

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should set an item as favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
    })

    expect(result.current.isFavoriteById('people', 1)).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('should not set duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
    })

    const callCount = vi.mocked(localStorageMock.setItem).mock.calls.length

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
    })

    expect(vi.mocked(localStorageMock.setItem).mock.calls.length).toBe(
      callCount
    )
  })

  it('should unfavorite an item', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
      result.current.unfavorite('people', 1)
    })

    expect(result.current.isFavoriteById('people', 1)).toBe(false)
  })

  it('should correctly check if an item is a favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })

    expect(result.current.isFavoriteById('people', 999)).toBe(false)

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
    })

    expect(result.current.isFavoriteById('people', 1)).toBe(true)
    expect(result.current.isFavoriteById('people', 2)).toBe(false)
  })

  it('should get all favorites from a collection', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
      result.current.setFavorite('people', 2, 'Darth Vader')
      result.current.setFavorite('planets', 3, 'Tatooine')
    })

    const peopleFavorites = result.current.getFavorites('people')
    expect(peopleFavorites).toHaveLength(2)
    expect(peopleFavorites).toContainEqual({ id: 1, name: 'Luke Skywalker' })
    expect(peopleFavorites).toContainEqual({ id: 2, name: 'Darth Vader' })

    const planetsFavorites = result.current.getFavorites('planets')
    expect(planetsFavorites).toHaveLength(1)
    expect(planetsFavorites).toContainEqual({ id: 3, name: 'Tatooine' })
  })

  it('should load favorites from localStorage on initialization', () => {
    // Setup localStorage with initial data
    const initialFavorites = {
      people: { 5: 'Leia Organa' },
      planets: { 10: 'Endor' },
    }
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify(initialFavorites)
    )

    const { result } = renderHook(() => useFavorites(), { wrapper: Wrapper })

    expect(result.current.isFavoriteById('people', 5)).toBe(true)
    expect(result.current.isFavoriteById('planets', 10)).toBe(true)
    expect(result.current.getFavorites('people')).toContainEqual({
      id: 5,
      name: 'Leia Organa',
    })
  })
})
