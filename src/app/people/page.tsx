'use client'

import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { SWAPI } from '@/services/swapi'
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

export default function Page() {
  const query = useInfiniteQuery({
    queryKey: ['personagens'],
    async queryFn({ pageParam }) {
      return SWAPI.getPeople(pageParam)
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
                  const height = (Number(person.height) / 100)
                    .toFixed(2)
                    .replace('.', ',')

                  const mass = person.mass.replace('.', ',')

                  const isLast =
                    pageIndex === query.data.pages.length - 1 &&
                    personIndex === page.results.length - 1

                  return (
                    <TableRow
                      hover
                      className="cursor-pointer"
                      key={person.name}
                      ref={isLast ? lastElementRef : null}
                    >
                      <TableCell>{person.name}</TableCell>
                      <TableCell>{person.gender}</TableCell>
                      <TableCell>{person.hair_color}</TableCell>
                      <TableCell>{person.eye_color}</TableCell>
                      <TableCell>
                        {person.height === 'unknown'
                          ? 'unknown'
                          : `${height} m`}
                      </TableCell>
                      <TableCell>
                        {person.mass === 'unknown' ? 'unknown' : `${mass} kg`}
                      </TableCell>
                    </TableRow>
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
