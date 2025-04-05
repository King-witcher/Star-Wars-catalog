'use client'

import { useFavorites } from '@/contexts/favorites'
import { Planet } from '@/types/planet'
import { formatLength, formatPopulation } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import type { TableRowProps } from '@mui/material/TableRow'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { memo } from 'react'

interface Props extends TableRowProps {
  planet: Planet
}

export const PlanetRow = memo(function PlanetRow({ planet, ...rest }: Props) {
  const { setFavorite, unfavorite, isFavoriteById } = useFavorites()

  const id = stripId(planet.url)
  const isFavorite = isFavoriteById('planets', id)

  function handleClickFavorite() {
    if (isFavorite) unfavorite('planets', id)
    else setFavorite('planets', id, planet.name)
  }

  return (
    <TableRow hover className="cursor-pointer relative" {...rest}>
      <TableCell>
        <Link href={`/planets/${id}`} className="absolute inset-0" />
        <div className="flex items-center truncate">
          <IconButton onClick={handleClickFavorite}>
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography
            variant="body2"
            color={planet.name === 'unknown' ? 'textDisabled' : 'textPrimary'}
          >
            {planet.name}
          </Typography>
        </div>
      </TableCell>
      <TableCell className="truncate">
        <Typography
          variant="body2"
          color={planet.terrain === 'unknown' ? 'textDisabled' : 'textPrimary'}
        >
          {planet.terrain}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color={
            planet.population === 'unknown' ? 'textDisabled' : 'textPrimary'
          }
        >
          {formatPopulation(planet.population)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color={planet.diameter === 'unknown' ? 'textDisabled' : 'textPrimary'}
        >
          {formatLength(planet.diameter)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          color={
            planet.orbital_period === 'unknown' ? 'textDisabled' : 'textPrimary'
          }
        >
          {planet.orbital_period === 'unknown'
            ? 'unknown'
            : `${planet.orbital_period} days`}
        </Typography>
      </TableCell>
    </TableRow>
  )
})
