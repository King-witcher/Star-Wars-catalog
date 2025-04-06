import { Film } from '@/types/film'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

interface Props {
  film: Film
}

export function FilmRow({ film }: Props) {
  return (
    <TableRow>
      <TableCell>{film.title}</TableCell>
      <TableCell>{film.director}</TableCell>
      <TableCell align="right">{film.producer}</TableCell>
    </TableRow>
  )
}
