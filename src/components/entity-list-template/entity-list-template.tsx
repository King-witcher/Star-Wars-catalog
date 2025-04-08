'use client'

import { ColumnDefinition, Table } from '@/components/table/table'
import { Collection } from '@/contexts/favorites'
import { useDebounce } from '@/hooks/use-debounce'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { PaginatedData } from '@/types/paginated-data'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChangeEvent, Key, useState } from 'react'

export interface Props<T> {
  collection: Collection
  columns: ColumnDefinition<T>[]
  fetchFn: (page: number, search: string) => Promise<PaginatedData<T>>
  getKey: (data: T) => Key
}

export function EntityListTemplate<T>(props: Props<T>) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const query = useInfiniteQuery({
    queryKey: [props.collection, debouncedSearch],
    async queryFn({ pageParam }) {
      return props.fetchFn(pageParam, debouncedSearch)
    },
    initialPageParam: 1,
    getNextPageParam(lastPage) {
      return lastPage.next
    },
  })

  const data = query.data?.pages.flatMap((page) => page.results) ?? []

  const lastElementRef = useIntersectionObserver(
    query.fetchNextPage,
    !query.isFetching && query.hasNextPage
  )

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between">
        <Typography variant="h1" color="primary" className="capitalize">
          {props.collection}
        </Typography>

        <TextField
          variant="outlined"
          label="Search"
          className="w-[400px] bg-white self-end"
          size="small"
          value={search}
          onChange={handleChangeSearch}
        />
      </div>

      <div className="flex-1 relative">
        <Table
          columns={props.columns}
          className="flex absolute inset-0 flex-col items-center mt-[10px] max-h-screen overflow-hidden"
          data={data}
          getKey={props.getKey}
          rowProps={{ hover: true, className: 'relative cursor-pointer' }}
          lastRowRef={lastElementRef}
        >
          {query.isFetching && (
            <div className="p-[20px] flex justify-center w-full">
              <CircularProgress />
            </div>
          )}

          {query.isError && (
            <Typography color="error">
              Failed to load {props.collection} :(
            </Typography>
          )}
        </Table>
      </div>
    </div>
  )
}
