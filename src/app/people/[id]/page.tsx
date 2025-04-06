import { getFilm } from '@/services/films'
import { getPerson } from '@/services/people'
import { getStarship } from '@/services/starships'
import { getVehicle } from '@/services/vehicles'
import { stripId } from '@/utils/swapi'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'
import { ClientComponent } from './client-component'
import { getSpecies } from '@/services/species'
import { getPlanet } from '@/services/planets'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const id = Number((await params).id)
  if (Number.isNaN(id)) notFound()

  const person = await getPerson(id).catch((e: AxiosError) => {
    if (e.status === 404) notFound()
    else throw e
  })

  const vehicles = Promise.all(
    person.vehicles.map((vehicle) => {
      const id = stripId(vehicle)
      return getVehicle(id)
    })
  )

  const films = Promise.all(
    person.films.map((film) => {
      const id = stripId(film)
      return getFilm(id)
    })
  )

  const starships = Promise.all(
    person.starships.map((starship) => {
      const id = stripId(starship)
      return getStarship(id)
    })
  )

  const species = Promise.all(
    person.species.map((species) => {
      const id = stripId(species)
      return getSpecies(id)
    })
  )

  const homeWorld = getPlanet(stripId(person.homeworld))

  return (
    <ClientComponent
      person={person}
      vehicles={vehicles}
      films={films}
      starships={starships}
      species={species}
      homeWorld={homeWorld}
    />
  )
}
