import { ColumnDefinition } from '@/components/table/table'
import { Species } from '@/types/species'
import { formatLifespan, formatPersonHeight } from '@/utils/format'

export const speciesColumns: ColumnDefinition<Species>[] = [
  {
    key: 'name',
    header: 'Species',
    content: 'name',
  },
  {
    key: 'designation',
    header: 'Designation',
    content: 'designation',
  },
  {
    key: 'classification',
    header: 'Classification',
    content: 'classification',
  },
  {
    key: 'average_height',
    header: 'Average Height',
    content: ({ data }) => formatPersonHeight(data.average_height),
  },
  {
    key: 'average_lifespan',
    header: 'Average Lifespan',
    content: ({ data }) => formatLifespan(data.average_lifespan),
    cellProps: {
      align: 'right',
    },
  },
]
