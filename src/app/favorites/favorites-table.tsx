import { Collection, useFavorites } from '@/contexts/favorites'
import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer, {
  TableContainerProps,
} from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'

interface Props extends TableContainerProps {
  collection: Collection
}

export function FavoritesTable({ collection, ...props }: Props) {
  const { getFavorites, unfavorite } = useFavorites()
  const favorites = getFavorites(collection)

  if (favorites.length === 0)
    return (
      <>
        <Typography className="!mt-[20px]" color="textSecondary">
          You don't have favorite {collection} yet.
        </Typography>
        <Link href={`/${collection}`}>
          <Typography className="!mt-[20px]" color="primary">
            Explore {collection}!
          </Typography>
        </Link>
      </>
    )

  return (
    <Paper className="mt-[20px]">
      <TableContainer {...props}>
        <Table>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.id} hover className="relative">
                <TableCell>
                  <Link
                    href={`/${collection}/${favorite.id}`}
                    className="absolute inset-0"
                  />
                  <Typography fontWeight={500}>{favorite.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Remove">
                    <IconButton
                      onClick={() => unfavorite(collection, favorite.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
