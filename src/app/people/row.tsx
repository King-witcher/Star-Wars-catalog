'use client'

import { Person } from '@/types/person'
import { formatMass, formatPersonHeight } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import { TableCell } from '@mui/material'
import type { TableRowProps } from '@mui/material/TableRow'
import TableRow from '@mui/material/TableRow'
import { useRouter } from 'next/navigation'
import { memo } from 'react'

interface Props extends TableRowProps {
  person: Person
}

export const PersonRow = memo(function PersonRow({ person, ...rest }: Props) {
  const router = useRouter()
  const id = stripId(person.url)

  function handleClick() {
    router.push(`/people/${id}`)
  }
  return (
    <TableRow
      hover
      className="cursor-pointer relative"
      onClick={handleClick}
      {...rest}
    >
      <TableCell>{person.name}</TableCell>
      <TableCell>{person.gender}</TableCell>
      <TableCell>{person.hair_color}</TableCell>
      <TableCell>{person.eye_color}</TableCell>
      <TableCell data-testid="height">
        {formatPersonHeight(person.height)}
      </TableCell>
      <TableCell data-testid="mass">{formatMass(person.mass)}</TableCell>
    </TableRow>
  )
})
