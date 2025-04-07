import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FavoritesProvider, useFavorites } from './favorites'

const localStorageMock = (() => {
  const store = new Map<string, string>()
  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key, value) => store.set(key, value)),
    clear: vi.fn(() => store.clear()),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe(FavoritesProvider, () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should set an item as favorite', () => {
    const { result } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    })

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
    })

    expect(localStorageMock.setItem).toHaveBeenCalled()
    expect(result.current.isFavoriteById('people', 1)).toBe(true)
  })

  it('should unfavorite an item', () => {
    const { result } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    })

    act(() => {
      result.current.setFavorite('people', 1, 'Luke Skywalker')
      result.current.unfavorite('people', 1)
    })

    expect(result.current.isFavoriteById('people', 1)).toBe(false)
  })

  it('should correctly check if an item is a favorite', () => {
    const { result } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    })

    const id = faker.number.int()

    act(() => {
      result.current.setFavorite('people', id, 'Luke Skywalker')
    })

    expect(result.current.isFavoriteById('people', id)).toBe(true)
    expect(result.current.isFavoriteById('people', id + 1)).toBe(false)
  })

  it('should get all favorites from a collection', () => {
    const { result } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    })

    act(() => result.current.setFavorite('people', 1, 'Person 1'))
    act(() => result.current.setFavorite('people', 2, 'Person 2'))
    act(() => result.current.setFavorite('planets', 3, 'Planet 3'))

    const peopleFavorites = result.current.getFavorites('people')
    expect(peopleFavorites).toHaveLength(2)
    expect(peopleFavorites).toContainEqual({ id: 1, name: 'Person 1' })
    expect(peopleFavorites).toContainEqual({ id: 2, name: 'Person 2' })

    const planetsFavorites = result.current.getFavorites('planets')
    expect(planetsFavorites).toHaveLength(1)
    expect(planetsFavorites).toContainEqual({ id: 3, name: 'Planet 3' })
  })

  it('should load favorites from localStorage on initialization', () => {
    const initialFavorites = {
      people: { 5: 'Leia Organa' },
      planets: { 10: 'Endor' },
    }
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify(initialFavorites)
    )

    const { result } = renderHook(useFavorites, {
      wrapper: FavoritesProvider,
    })

    expect(result.current.isFavoriteById('people', 5)).toBe(true)
    expect(result.current.isFavoriteById('planets', 10)).toBe(true)
    expect(result.current.getFavorites('people')).toContainEqual({
      id: 5,
      name: 'Leia Organa',
    })
  })
})
