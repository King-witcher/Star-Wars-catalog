'use client'

import { AttributesTable } from '@/components/attributes-table/attributes-table'
import { Table } from '@/components/table/table'
import { useFavorites } from '@/contexts/favorites'
import { Person } from '@/types/person'
import { Planet } from '@/types/planet'
import {
  formatLength,
  formatOrbitalPeriod,
  formatPopulation,
  formatRotationPeriod,
} from '@/utils/format'
import { stripId } from '@/utils/swapi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { residentColumns } from './resident-columns'
import { Film } from '@/types/film'
import { filmColumns } from './film-columns'

interface Props {
  planet: Planet
  residents: Promise<Person[]>
  films: Promise<Film[]>
}

export function ClientComponent({ planet, residents, films }: Props) {
  const { isFavoriteById, setFavorite, unfavorite } = useFavorites()
  const id = stripId(planet.url)
  const isFavorite = isFavoriteById('planets', id)

  function handleClickFavorite() {
    if (isFavorite) unfavorite('planets', id)
    else setFavorite('planets', id, planet.name)
  }

  const residentsQuery = useQuery({
    queryKey: ['residents-by-planet', id],
    queryFn: async () => residents,
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
          {planet.name}
        </Typography>
      </div>
      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="flex flex-col flex-1 gap-[20px]">
          <Typography className="!mt-[20px]" variant="h5">
            Attributes
          </Typography>

          <AttributesTable
            attributes={{
              'Rotation Period': formatRotationPeriod(planet.rotation_period),
              'Orbital Period': formatOrbitalPeriod(planet.orbital_period),
              Diameter: formatLength(planet.diameter),
              Gravity: planet.gravity,
              Terrain: planet.terrain,
              'Surface Water':
                planet.surface_water === 'unknown'
                  ? 'unknown'
                  : `${planet.surface_water}%`,
              Population: formatPopulation(planet.population),
              Climate: planet.climate,
            }}
          />
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
        <div className="flex flex-col flex-1 gap-[20px]">
          <Typography className="!mt-[20px]" variant="h5">
            Residents
          </Typography>
          {residentsQuery.isLoading && (
            <div className=" flex items-center justify-center">
              <CircularProgress size="80px" />
            </div>
          )}

          {residentsQuery.data?.length === 0 && (
            <Typography color="textSecondary">
              This planet has no known residents.
            </Typography>
          )}
          {Boolean(residentsQuery.data?.length) && (
            <Table
              columns={residentColumns}
              rowProps={{
                hover: true,
                className: 'cursor-pointer relative',
              }}
              data={residentsQuery.data || []}
              getKey={(data) => data.url}
            />
          )}
        </div>
      </div>
    </div>
  )
}
