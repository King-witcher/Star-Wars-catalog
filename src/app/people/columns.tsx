import { ColumnDefinition } from '@/components/table/table'
import { useFavorites } from '@/contexts/favorites'
import { Person } from '@/types/person'
import { formatMass, formatPersonHeight } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'

export const columnDefs: ColumnDefinition<Person>[] = [
  {
    key: 'name',
    header: 'Character',
    content({ data: person }) {
      const { setFavorite, unfavorite, isFavoriteById } = useFavorites()

      const id = stripId(person.url)
      const isFavorite = isFavoriteById('people', id)

      function handleClickFavorite() {
        if (isFavorite) unfavorite('people', id)
        else setFavorite('people', id, person.name)
      }

      return (
        <>
          <Link href={`/people/${id}`} className="absolute inset-0" />
          <IconButton onClick={handleClickFavorite}>
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          {person.name}
        </>
      )
    },
  },
  {
    key: 'gender',
    header: 'Gender',
    content: 'gender',
  },
  {
    key: 'hair_color',
    header: 'Hair Color',
    content: 'hair_color',
  },
  {
    key: 'eye_color',
    header: 'Eye Color',
    content: 'eye_color',
  },
  {
    key: 'height',
    header: 'Height',
    content({ data: person }) {
      return formatPersonHeight(person.height)
    },
  },
  {
    key: 'mass',
    header: 'Mass',
    content({ data: person }) {
      return formatMass(person.mass)
    },
  },
]
