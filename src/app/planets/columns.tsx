import { ColumnDefinition } from '@/components/table/table'
import { useFavorites } from '@/contexts/favorites'
import { Planet } from '@/types/planet'
import { formatLength, formatPopulation } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export const columnDefs: ColumnDefinition<Planet>[] = [
  {
    key: 'name',
    header: 'Planet',
    content({ data }) {
      const { setFavorite, unfavorite, isFavoriteById } = useFavorites()

      const id = stripId(data.url)
      const isFavorite = isFavoriteById('planets', id)

      function handleClickFavorite() {
        if (isFavorite) unfavorite('planets', id)
        else setFavorite('planets', id, data.name)
      }

      return (
        <>
          <Link href={`/planets/${id}`} className="absolute inset-0" />
          <IconButton onClick={handleClickFavorite}>
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          {data.name}
        </>
      )
    },
  },
  {
    key: 'terrain',
    header: 'Terrain',
    content({ data: planet }) {
      return (
        <Typography
          variant="body2"
          color={planet.terrain === 'unknown' ? 'textDisabled' : 'textPrimary'}
        >
          {planet.terrain}
        </Typography>
      )
    },
  },
  {
    key: 'population',
    header: 'Population',
    content(props) {
      return (
        <Typography
          variant="body2"
          color={
            props.data.population === 'unknown' ? 'textDisabled' : 'textPrimary'
          }
        >
          {formatPopulation(props.data.population)}
        </Typography>
      )
    },
  },
  {
    key: 'diameter',
    header: 'Diameter',
    content(props) {
      return (
        <Typography
          variant="body2"
          color={
            props.data.diameter === 'unknown' ? 'textDisabled' : 'textPrimary'
          }
        >
          {formatLength(props.data.diameter)}
        </Typography>
      )
    },
  },
  {
    key: 'orbit',
    header: 'Orbit',
    content(props) {
      return (
        <Typography
          variant="body2"
          color={
            props.data.orbital_period === 'unknown'
              ? 'textDisabled'
              : 'textPrimary'
          }
        >
          {props.data.orbital_period === 'unknown'
            ? 'unknown'
            : `${props.data.orbital_period} days`}
        </Typography>
      )
    },
  },
]
