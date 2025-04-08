import * as favoritesContext from '@/contexts/favorites'
import { fireEvent, render } from '@testing-library/react'
import { FavoritesTable } from './favorites-table'
import '@testing-library/jest-dom'
import { Collection } from '@/contexts/favorites'
import { faker } from '@faker-js/faker'

const baseFavoritesContextMock = {
  getFavorites: vi.fn(),
  unfavorite: vi.fn(),
  isFavoriteById: vi.fn(),
  setFavorite: vi.fn(),
}

const collections = ['people', 'planets'] as Collection[]

vi.mock('@/contexts/favorites', () => ({
  useFavorites: vi.fn(),
}))

describe(FavoritesTable, () => {
  it.each(collections)(
    'should display a message when there are no favorites',
    (collection) => {
      vi.mocked(favoritesContext.useFavorites).mockReturnValue({
        ...baseFavoritesContextMock,
        getFavorites: vi.fn().mockReturnValue([]),
      })

      const { getByText } = render(<FavoritesTable collection={collection} />)

      expect(
        getByText(`You don't have favorite ${collection} yet.`)
      ).toBeInTheDocument()
    }
  )

  it.each(collections)(
    'should render a link to explore the collection when there are no favorites',
    (collection) => {
      vi.mocked(favoritesContext.useFavorites).mockReturnValue({
        ...baseFavoritesContextMock,
        getFavorites: vi.fn().mockReturnValue([]),
      })

      const { getByRole } = render(<FavoritesTable collection={collection} />)

      const exploreLink = getByRole('link', { name: `Explore ${collection}!` })
      expect(exploreLink).toBeInTheDocument()
      expect(exploreLink).toHaveAttribute('href', `/${collection}`)
    }
  )

  it.each(collections)(
    'should render a table with favorites when there are favorites',
    (collection) => {
      const favorites = [
        { id: '1', name: 'Luke Skywalker' },
        { id: '2', name: 'Darth Vader' },
      ]

      vi.mocked(favoritesContext.useFavorites).mockReturnValue({
        ...baseFavoritesContextMock,
        getFavorites: vi.fn().mockReturnValue(favorites),
      })

      const { getByText } = render(<FavoritesTable collection={collection} />)

      expect(getByText('Luke Skywalker')).toBeInTheDocument()
      expect(getByText('Darth Vader')).toBeInTheDocument()
    }
  )

  it.each(collections)(
    'calls unfavorite function when remove button is clicked',
    (collection) => {
      const id = faker.number.int()
      const favorites = [{ id, name: 'Luke Skywalker' }]
      const unfavoriteMock = vi.fn()

      vi.mocked(favoritesContext.useFavorites).mockReturnValue({
        ...baseFavoritesContextMock,
        getFavorites: () => favorites,
        unfavorite: unfavoriteMock,
      })

      const { getByRole } = render(<FavoritesTable collection={collection} />)

      const removeButton = getByRole('button', {
        name: 'Remove Luke Skywalker from favorites',
      })

      fireEvent.click(removeButton)

      expect(unfavoriteMock).toHaveBeenCalledWith(collection, id)
    }
  )

  it.each(collections)(
    'renders links to detail pages for each favorite',
    (collection) => {
      const favorites = [
        { id: '1', name: 'Luke Skywalker' },
        { id: '2', name: 'Darth Vader' },
      ]

      vi.mocked(favoritesContext.useFavorites).mockReturnValue({
        ...baseFavoritesContextMock,
        getFavorites: vi.fn().mockReturnValue(favorites),
      })

      const { getAllByRole } = render(
        <FavoritesTable collection={collection} />
      )

      const links = getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveAttribute('href', `/${collection}/1`)
      expect(links[1]).toHaveAttribute('href', `/${collection}/2`)
    }
  )
})
