'use client'

import { Planet } from '@/types/planet'
import { stripId } from '@/utils/swapi'
import TableCell from '@mui/material/TableCell'
import type { TableRowProps } from '@mui/material/TableRow'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { memo } from 'react'
import { formatDiameter, formatPopulation } from './helpers'

interface Props extends TableRowProps {
  planet: Planet
}

export const PlanetRow = memo(function PlanetRow({ planet, ...rest }: Props) {
  const router = useRouter()
  const id = stripId(planet.url)

  function handleClick() {
    router.push(`/planets/${id}`)
  }

  return (
    <TableRow
      hover
      className="cursor-pointer relative"
      onClick={handleClick}
      {...rest}
    >
      <TableCell>
        <Typography
          variant="body2"
          color={planet.name === 'unknown' ? 'textDisabled' : 'textPrimary'}
        >
          {planet.name}
        </Typography>
      </TableCell>
      <TableCell>
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
          {formatDiameter(planet.diameter)}
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
