'use client'

import { Table } from '@/components/table/table'
import { useDebounce } from '@/hooks/use-debounce'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { getPlanets } from '@/services/swapi/planets'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { columnDefs } from './columns'

export default function Page() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const query = useInfiniteQuery({
    queryKey: ['planets', debouncedSearch],
    staleTime: 1000 * 60 * 10, // 10 minutes
    async queryFn({ pageParam }) {
      return getPlanets(pageParam, debouncedSearch)
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
        <Typography variant="h1" color="primary">
          Planets
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
          columns={columnDefs}
          className="flex absolute inset-0 flex-col items-center mt-[10px] max-h-screen overflow-hidden"
          data={data}
          getKey={(data) => data.url}
          rowProps={{ hover: true, className: 'relative cursor-pointer' }}
          lastRowRef={lastElementRef}
        >
          {query.isFetching && (
            <div className="p-[20px] flex justify-center w-full">
              <CircularProgress />
            </div>
          )}

          {query.isError && (
            <Typography color="error">Failed to load planets :(</Typography>
          )}
        </Table>
      </div>
    </div>
  )
}
