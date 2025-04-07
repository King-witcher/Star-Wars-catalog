'use client'

import { AttributesTable } from '@/components/attributes-table/attributes-table'
import { DetailsTable } from '@/components/details-table/details-table'
import { useFavorites } from '@/contexts/favorites'
import { Film } from '@/types/film'
import { Person } from '@/types/person'
import { Planet } from '@/types/planet'
import { Species } from '@/types/species'
import { Starship } from '@/types/starship'
import { Vehicle } from '@/types/vehicle'
import { formatMass, formatPersonHeight } from '@/utils/format'
import { stripId } from '@/utils/swapi'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { CircularProgress } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { filmColumns } from './film-columns'
import { speciesColumns } from './species-columns'
import { starshipColumns } from './starship-columns'
import { vehicleColumns } from './vehicle-columns'

interface Props {
  person: Person
  vehicles: Promise<Vehicle[]>
  films: Promise<Film[]>
  starships: Promise<Starship[]>
  species: Promise<Species[]>
  homeWorld: Promise<Planet>
}

export function ClientComponent({
  person,
  vehicles,
  films,
  starships,
  species,
  homeWorld,
}: Props) {
  const { isFavoriteById, setFavorite, unfavorite } = useFavorites()
  const id = stripId(person.url)
  const isFavorite = isFavoriteById('people', id)

  function handleClickFavorite() {
    if (isFavorite) unfavorite('people', id)
    else setFavorite('people', id, person.name)
  }

  const homeWorldQuery = useQuery({
    queryKey: ['planet', stripId(person.homeworld)],
    queryFn: () => homeWorld,
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
        <Typography variant="h3" color="primary">
          {person.name} (character)
        </Typography>
      </div>
      <div className="flex flex-col sm:flex-row gap-[20px]">
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
              'Home World': homeWorldQuery.isLoading ? (
                <CircularProgress size="1em" />
              ) : (
                <div className="flex items-center justify-end gap-[10px]">
                  <Link
                    href={
                      homeWorldQuery.data
                        ? `/planets/${stripId(homeWorldQuery.data.url)}`
                        : ''
                    }
                    className="absolute inset-0"
                  />
                  {homeWorldQuery.data?.name || 'unknown'}
                  <OpenInNewIcon fontSize="small" />
                </div>
              ),
            }}
          />
          <DetailsTable
            title="Starships"
            data={starships}
            columns={starshipColumns}
            getKey={(data) => data.url}
            queryKey={['starships-by-person', id]}
            emptyFallback="No starships found for this character."
          />
        </div>
        <div className="flex flex-col flex-1 gap-[20px]">
          <DetailsTable
            title="Vehicles"
            data={vehicles}
            columns={vehicleColumns}
            getKey={(data) => data.url}
            queryKey={['vehicles-by-person', id]}
            emptyFallback="No vehicles found for this character."
          />
          <DetailsTable
            title="Films"
            data={films}
            columns={filmColumns}
            getKey={(data) => data.url}
            queryKey={['films-by-person', id]}
            emptyFallback="No films found for this character."
          />
          <DetailsTable
            title="Species"
            data={species}
            columns={speciesColumns}
            getKey={(data) => data.url}
            queryKey={['species-by-person', id]}
            emptyFallback="No species found for this character."
          />
        </div>
      </div>
    </div>
  )
}
