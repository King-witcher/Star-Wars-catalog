'use client'

import { AttributesTable } from '@/components/attributes-table/attributes-table'
import { Table } from '@/components/table/table'
import { useFavorites } from '@/contexts/favorites'
import { Film } from '@/types/film'
import { Person } from '@/types/person'
import { Vehicle } from '@/types/vehicle'
import { formatMass, formatPersonHeight } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { filmColumns } from './film-columns'
import { vehicleColumns } from './vehicle-columns'

interface Props {
  person: Person
  vehicles: Promise<Vehicle[]>
  films: Promise<Film[]>
}

export function ClientComponent({ person, vehicles, films }: Props) {
  const { isFavoriteById, setFavorite, unfavorite } = useFavorites()
  const id = stripId(person.url)
  const isFavorite = isFavoriteById('people', id)

  function handleClickFavorite() {
    if (isFavorite) unfavorite('people', id)
    else setFavorite('people', id, person.name)
  }

  const vehiclesQuery = useQuery({
    queryKey: ['vehicles-by-person', id],
    queryFn: async () => vehicles,
  })

  const filmsQuery = useQuery({
    queryKey: ['films-by-person', id],
    queryFn: async () => films,
  })

  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <IconButton onClick={handleClickFavorite}>
          {isFavorite ? (
            <FavoriteIcon fontSize="large" color="error" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </IconButton>
        <Typography variant="h2" color="primary">
          {person.name}
        </Typography>
      </div>
      <div className="flex gap-[20px]">
        <div className="flex flex-col flex-1 gap-[20px]">
          <Typography className="!mt-[20px]" variant="h5">
            Attributes
          </Typography>
          <AttributesTable
            attributes={{
              Gender: person.gender,
              Mass: formatMass(person.mass),
              'Birth Year': person.birth_year,
              'Eye Color': person.eye_color,
              'Hair Color': person.hair_color,
              'Skin Color': person.skin_color,
              Height: formatPersonHeight(person.height),
              // Homeworld?
              // Starships?
              // Species?
            }}
          />
        </div>
        <div className="flex flex-col flex-1 gap-[20px]">
          <Typography className="!mt-[20px]" variant="h5">
            Vehicles
          </Typography>
          {vehiclesQuery.isLoading && (
            <div className=" flex items-center justify-center">
              <CircularProgress size="80px" />
            </div>
          )}

          {vehiclesQuery.data?.length === 0 && (
            <Typography color="textSecondary">
              No vehicles found for this character.
            </Typography>
          )}
          {Boolean(vehiclesQuery.data?.length) && (
            <Table
              columns={vehicleColumns}
              data={vehiclesQuery.data || []}
              getKey={(data) => data.url}
            />
          )}
          <Typography className="!mt-[20px]" variant="h5">
            Films
          </Typography>
          {filmsQuery.isLoading && (
            <div className=" flex items-center justify-center">
              <CircularProgress size="80px" />
            </div>
          )}

          {filmsQuery.data?.length === 0 && (
            <Typography color="textSecondary">
              No films found for this character.
            </Typography>
          )}
          {Boolean(filmsQuery.data?.length) && (
            <Table
              columns={filmColumns}
              data={filmsQuery.data || []}
              getKey={(data) => data.url}
            />
          )}
        </div>
      </div>
    </div>
  )
}
