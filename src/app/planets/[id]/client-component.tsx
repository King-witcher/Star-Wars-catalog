'use client'

import { AttributesTable } from '@/components/attributes-table/attributes-table'
import { DetailsTable } from '@/components/details-table/details-table'
import { useFavorites } from '@/contexts/favorites'
import { Film } from '@/types/film'
import { Person } from '@/types/person'
import { Planet } from '@/types/planet'
import {
  formatLength,
  formatOrbitalPeriod,
  formatPopulation,
  formatRotationPeriod,
} from '@/utils/format'
import { stripId } from '@/utils/swapi'``
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { filmColumns } from './film-columns'
import { residentColumns } from './resident-columns'

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
        <Typography variant="h3" color="primary">
          {planet.name} (planet)
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

          <DetailsTable
            title="Films"
            data={films}
            columns={filmColumns}
            getKey={(data) => data.url}
            queryKey={['films-by-planet', id]}
            emptyFallback="No films found for this planet."
          />
        </div>

        <div className="flex flex-col flex-1 gap-[20px]">
          <DetailsTable
            title="Residents"
            data={residents}
            columns={residentColumns}
            getKey={(data) => data.url}
            queryKey={['residents-by-planet', id]}
            emptyFallback="This planet has no known residents."
            rowProps={{
              className: 'relative',
              hover: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
