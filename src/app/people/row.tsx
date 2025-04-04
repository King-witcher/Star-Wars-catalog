import { Person } from '@/types/person'
import { TableCell } from '@mui/material'
import type { TableRowProps } from '@mui/material/TableRow'
import TableRow from '@mui/material/TableRow'

interface Props extends TableRowProps {
  person: Person
}

export function PersonRow({ person, ...rest }: Props) {
  const height = (Number(person.height) / 100).toFixed(2)

  return (
    <TableRow hover className="cursor-pointer" {...rest}>
      <TableCell>{person.name}</TableCell>
      <TableCell>{person.gender}</TableCell>
      <TableCell>{person.hair_color}</TableCell>
      <TableCell>{person.eye_color}</TableCell>
      <TableCell data-testid="height">
        {person.height === 'unknown' ? 'unknown' : `${height} m`}
      </TableCell>
      <TableCell data-testid="mass">
        {person.mass === 'unknown' ? 'unknown' : `${person.mass} kg`}
      </TableCell>
    </TableRow>
  )
}
