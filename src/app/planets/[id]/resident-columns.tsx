import { ColumnDefinition } from '@/components/table/table'
import { Person } from '@/types/person'
import { stripId } from '@/utils/swapi'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Link from 'next/link'

export const residentColumns: ColumnDefinition<Person>[] = [
  {
    header: 'Resident',
    key: 'name',
    content: 'name',
  },
  {
    header: 'Gender',
    key: 'gender',
    content: 'gender',
  },
  {
    header: null,
    key: 'actions',
    cellProps: {
      align: 'right',
    },
    content(props) {
      const id = stripId(props.data.url)

      return (
        <>
          <Link href={`/people/${id}`} className="absolute inset-0" />
          <OpenInNewIcon />
        </>
      )
    },
  },
]
