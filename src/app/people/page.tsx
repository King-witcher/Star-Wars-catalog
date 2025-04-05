'use client'

import { useDebounce } from '@/hooks/use-debounce'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { getPeople } from '@/services/swapi/people'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { PersonRow } from './row'

export default function Page() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const query = useInfiniteQuery({
    queryKey: ['people', debouncedSearch],
    async queryFn({ pageParam }) {
      return getPeople(pageParam, debouncedSearch)
    },
    initialPageParam: 1,
    getNextPageParam(lastPage) {
      return lastPage.next
    },
  })

  const lastElementRef = useIntersectionObserver(
    query.fetchNextPage,
    !query.isFetching && query.hasNextPage
  )

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between">
        <Typography variant="h1" color="primary">
          People
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

      <Paper className="flex flex-col items-center mt-[10px]">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Character</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Hair Color</TableCell>
                <TableCell>Eye Color</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Mass</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {query.data?.pages.map((page, pageIndex) =>
                page.results.map((person, personIndex) => {
                  const isLast =
                    pageIndex === query.data.pages.length - 1 &&
                    personIndex === page.results.length - 1

                  return (
                    <PersonRow
                      person={person}
                      key={person.url}
                      ref={isLast ? lastElementRef : null}
                    />
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {query.isFetching && (
          <div className="p-[20px]">
            <CircularProgress />
          </div>
        )}
      </Paper>
    </div>
  )
}
