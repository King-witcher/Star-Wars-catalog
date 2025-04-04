'use client'

import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PersonRow } from './row'
import { getPeople } from '@/services/swapi/people'

export default function Page() {
  const query = useInfiniteQuery({
    queryKey: ['personagens'],
    async queryFn({ pageParam }) {
      return getPeople(pageParam)
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

  return (
    <div className="flex flex-col">
      <Typography variant="h1" color="primary">
        Characters
      </Typography>
      <Paper className="flex flex-col items-center mt-[20px]">
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
