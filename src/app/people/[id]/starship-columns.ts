import { ColumnDefinition } from '@/components/table/table'
import { Starship } from '@/types/starship'

export const starshipColumns: ColumnDefinition<Starship>[] = [
  {
    key: 'name',
    header: 'Starship',
    content: 'name',
  },
  {
    key: 'model',
    header: 'Model',
    content: 'model',
  },
  {
    key: 'manufacturer',
    header: 'Manufacturer',
    content: 'manufacturer',
    cellProps: {
      align: 'right',
    },
  },
]
