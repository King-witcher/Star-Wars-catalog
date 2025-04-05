'use client'

import { Person } from '@/types/person'
import { formatMass, formatPersonHeight } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import { IconButton, TableCell } from '@mui/material'
import type { TableRowProps } from '@mui/material/TableRow'
import TableRow from '@mui/material/TableRow'
import { memo } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useFavorites } from '@/contexts/favorites'
import Link from 'next/link'

interface Props extends TableRowProps {
  person: Person
}

export const PersonRow = memo(function PersonRow({ person, ...rest }: Props) {
  const { setFavorite, unfavorite, isFavoriteById } = useFavorites()

  const id = stripId(person.url)
  const isFavorite = isFavoriteById('people', id)

  function handleClickFavorite() {
    if (isFavorite) unfavorite('people', id)
    else setFavorite('people', id, person.name)
  }

  return (
    <TableRow hover className="cursor-pointer relative" {...rest}>
      <TableCell>
        <Link href={`/people/${id}`} className="absolute inset-0" />
        <IconButton onClick={handleClickFavorite}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        {person.name}
      </TableCell>
      <TableCell>{person.gender}</TableCell>
      <TableCell>{person.hair_color}</TableCell>
      <TableCell>{person.eye_color}</TableCell>
      <TableCell data-testid="height">
        {formatPersonHeight(person.height)}
      </TableCell>
      <TableCell>{formatMass(person.mass)}</TableCell>
    </TableRow>
  )
})
