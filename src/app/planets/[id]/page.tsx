import { getPerson } from '@/services/swapi/people'
import { getPlanet } from '@/services/swapi/planets'
import { stripId } from '@/utils/swapi'
import { AxiosError } from 'axios'
import { notFound } from 'next/navigation'
import { ClientComponent } from './client-component'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const id = Number((await params).id)
  if (Number.isNaN(id)) notFound()

  const planet = await getPlanet(id).catch((e: AxiosError) => {
    if (e.status === 404) notFound()
    else throw e
  })

  const residents = Promise.all(
    planet.residents.map((personUrl) => {
      const id = stripId(personUrl)
      return getPerson(id)
    })
  )

  return <ClientComponent planet={planet} residents={residents} />
}
