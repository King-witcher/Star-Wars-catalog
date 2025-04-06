import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { ReactNode, memo } from 'react'

interface Props {
  name: string
  value: ReactNode
}

export const AttributeRow = memo(function AttributeRow({ name, value }: Props) {
  return (
    <TableRow
      data-unknown={value === 'unknown'}
      className="data-[unknown=true]:opacity-50 relative"
    >
      <TableCell>{name}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
})
