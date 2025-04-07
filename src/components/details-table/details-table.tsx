import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { Table, TableProps } from '../table/table'

interface Props<TData> extends Omit<TableProps<TData>, 'data'> {
  data: Promise<TData[]>
  getKey: (row: TData) => string | number
  queryKey: (string | number)[]
  title: string
  emptyFallback: string
}

/**
 * This component extends the Table component and provides a standard way to display data in a table format.
 * @param data - Promise that resolves to the array to be displayed in the table.
 * @param queryKey - React-Query key for the query.
 * @param title - Title of the table.
 * @param emptyFallback - Fallback text to be displayed when there is no data.
 */
export function DetailsTable<TData>({
  data,
  queryKey,
  title,
  emptyFallback,
  ...tableProps
}: Props<TData>) {
  const query = useQuery({
    queryKey,
    queryFn: async () => data,
  })

  return (
    <div className="flex flex-col gap-[20px] mt-[20px]">
      <Typography variant="h5">{title}</Typography>

      {query.isLoading && (
        <div
          data-testid="pending-state"
          className="flex items-center justify-center"
        >
          <CircularProgress size="80px" />
        </div>
      )}

      {Boolean(query.data?.length) && (
        <Table data={query.data!} {...tableProps} />
      )}

      {query.data?.length === 0 && (
        <Typography color="textSecondary">{emptyFallback}</Typography>
      )}
    </div>
  )
}
