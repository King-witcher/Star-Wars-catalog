'use client'

import { ReactNode, createContext, use, useEffect, useState } from 'react'

/** Maps each collection's name to its type. Every  */
export type Collection = 'people' | 'planets'

interface FavoritesData {
  /** Sets an entity as favorite. */
  setFavorite(collection: Collection, id: number, name: string): void

  /** Sets an entity as favorite. */
  unfavorite(collection: Collection, id: number): void

  isFavoriteById(collection: Collection, id: number): boolean

  /** Gets all favorite items from a collection */
  getFavorites(collection: Collection): { id: number; name: string }[]
}

const FavoritesContext = createContext<FavoritesData>({} as FavoritesData)

export function FavoritesProvider(props: {
  children: ReactNode
}) {
  /** Represents the collections object in localStorage. */
  type FavoritesObject = {
    [K in Collection]: Record<number, string>
  }

  const [favorites, setFavorites] = useState<FavoritesObject>({
    people: {},
    planets: {},
  })

  function setFavorite(collection: Collection, id: number, name: string) {
    // If the entity is already in the collection, avoid an unnecessary rerender.
    if (favorites[collection][id] !== undefined) return

    const newFavorites: FavoritesObject = {
      ...favorites,
      [collection]: {
        ...favorites[collection],
        [id]: name,
      },
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  function unfavorite(collection: Collection, id: number) {
    // If the entity is not in the collection, avoid an unnecessary rerender.
    if (!favorites[collection][id] === undefined) return

    const newCollection = {
      ...favorites[collection],
    }
    delete newCollection[id]
    const newFavorites: FavoritesObject = {
      ...favorites,
      [collection]: newCollection,
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  function isFavoriteById(collection: Collection, id: number): boolean {
    return Boolean(favorites[collection][id])
  }

  function getFavorites(
    collection: Collection
  ): { id: number; name: string }[] {
    return Object.entries(favorites[collection]).map(([id, name]) => ({
      id: Number(id),
      name,
    }))
  }

  useEffect(function syncStateWithLocalStorageAfterHydration() {
    const fromLocalStorage = localStorage.getItem('favorites')
    if (fromLocalStorage)
      setFavorites(JSON.parse(fromLocalStorage) as FavoritesObject)
  }, [])

  return (
    <FavoritesContext
      value={{
        setFavorite,
        unfavorite,
        isFavoriteById,
        getFavorites,
      }}
    >
      {props.children}
    </FavoritesContext>
  )
}

export const useFavorites = () => use(FavoritesContext)
