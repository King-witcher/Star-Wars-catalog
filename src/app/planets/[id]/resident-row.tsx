import { Person } from '@/types/person'
import { stripId } from '@/utils/swapi'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useRouter } from 'next/navigation'

interface Props {
  resident: Person
}

export function ResidentRow({ resident }: Props) {
  const router = useRouter()
  const id = stripId(resident.url)

  function handleClick() {
    router.push(`/people/${id}`)
  }

  return (
    <TableRow hover className="cursor-pointer" onClick={handleClick}>
      <TableCell>{resident.name}</TableCell>
      <TableCell>{resident.gender}</TableCell>
      <TableCell align="right">
        <OpenInNewIcon />
      </TableCell>
    </TableRow>
  )
}
