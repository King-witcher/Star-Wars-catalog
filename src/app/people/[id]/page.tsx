import { getPerson } from '@/services/swapi/people'
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

  const person = await getPerson(id).catch((e: AxiosError) => {
    if (e.status === 404) notFound()
    else throw e
  })

  return <ClientComponent person={person} />
}
