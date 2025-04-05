import { Vehicle } from '@/types/vehicle'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

interface Props {
  vehicle: Vehicle
}

export function VehicleRow({ vehicle }: Props) {
  return (
    <TableRow>
      <TableCell>{vehicle.name}</TableCell>
      <TableCell>{vehicle.model}</TableCell>
      <TableCell align="right">{vehicle.manufacturer}</TableCell>
    </TableRow>
  )
}
