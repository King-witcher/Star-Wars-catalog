import { getPerson } from '@/services/swapi/people'
import { getVehicle } from '@/services/swapi/vehicles'
import { stripId } from '@/utils/swapi'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'
import { ClientComponent } from './client-component'

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

  return <ClientComponent person={person} vehicles={vehicles} />
}
