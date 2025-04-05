'use client'

import { Person } from '@/types/person'
import { Planet } from '@/types/planet'
import { stripId } from '@/utils/swapi'
import { ReactNode, createContext, use, useEffect, useState } from 'react'

/** Maps each collection's name to its type. Every  */
export type FavoriteMap = {
  people: Person
  planets: Planet
}

interface FavoritesData {
  /** Sets an entity as favorite. */
  setFavorite<T extends keyof FavoriteMap>(
    collection: T,
    entity: FavoriteMap[T]
  ): void

  isFavorite<T extends keyof FavoriteMap>(collection: T, id: number): boolean

  /** Gets all favorite items from a collection */
  getFavorites<T extends keyof FavoriteMap>(collection: T): FavoriteMap[T][]
}

interface Props {
  children: ReactNode
}

const FavoritesContext = createContext<FavoritesData>({} as FavoritesData)

export function FavoritesProvider({ children }: Props) {
  /** Represents the collections object in localStorage. */
  type FavoritesObject = {
    [K in keyof FavoriteMap]: Record<number, FavoriteMap[K]>
  }

  const [favorites, setFavorites] = useState<FavoritesObject>({
    people: {},
    planets: {},
  })

  function setFavorite<T extends keyof FavoriteMap>(
    collection: T,
    entity: FavoriteMap[T]
  ) {
    const entityId = stripId(entity.url)

    // If the entity is already in the collection, avoid an unnecessary rerender.
    if (favorites[collection][entityId]) return

    const newFavorites: FavoritesObject = {
      ...favorites,
      [collection]: {
        ...favorites[collection],
        [entityId]: entity,
      },
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  function isFavorite<T extends keyof FavoriteMap>(
    collection: T,
    id: number
  ): boolean {
    return Boolean(favorites[collection][id])
  }

  function getFavorites<T extends keyof FavoriteMap>(
    collection: T
  ): FavoriteMap[T][] {
    return Object.values(favorites[collection])
  }

  useEffect(function syncStateWithLocalStorageAfterHydration() {
    const fromLocalStorage = localStorage.getItem('favorites')
    if (fromLocalStorage)
      setFavorites(JSON.parse(fromLocalStorage) as FavoritesObject)
  }, [])

  return (
    <FavoritesContext value={{ setFavorite, isFavorite, getFavorites }}>
      {children}
    </FavoritesContext>
  )
}

export const useFavorites = () => use(FavoritesContext)
