import { ColumnDefinition } from '@/components/table/table'
import { Vehicle } from '@/types/vehicle'

export const vehicleColumns: ColumnDefinition<Vehicle>[] = [
  {
    key: 'name',
    header: 'Vehicle',
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
