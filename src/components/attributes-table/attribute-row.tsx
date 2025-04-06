import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { memo } from 'react'

interface Props {
  name: string
  value: string
}

export const AttributeRow = memo(function AttributeRow({ name, value }: Props) {
  return (
    <TableRow
      data-unknown={value === 'unknown'}
      className="data-[unknown=true]:opacity-50"
    >
      <TableCell>{name}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
})
