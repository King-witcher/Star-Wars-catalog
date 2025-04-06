import { ColumnDefinition } from '@/components/table/table'
import { Film } from '@/types/film'

export const filmColumns: ColumnDefinition<Film>[] = [
  {
    key: 'title',
    header: 'Title',
    content: 'title',
  },
  {
    key: 'producer',
    header: 'Producer',
    content: 'producer',
  },
  {
    key: 'director',
    header: 'Director',
    content: 'director',
    cellProps: {
      align: 'right',
    },
  },
]
