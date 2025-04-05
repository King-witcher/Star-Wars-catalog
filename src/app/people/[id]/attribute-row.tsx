import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

interface Props {
  name: string
  value: string
}

export function AttributeRow({ name, value }: Props) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
}
