import { PaginatedData } from '@/types/paginated-data'
import { Person } from '@/types/person'
import { block } from '@/utils/block'
import { stripPageNumber } from '@/utils/swapi'
import { api } from './api'

export async function getPeople(page = 1): Promise<PaginatedData<Person>> {
  const { data } = await block(() => {
    const searchParams = new URLSearchParams([['page', page.toString()]])
    return api.get<SWAPIPaginatedResponse<Person>>(`/people?${searchParams}`)
  })

  return {
    count: data.count,
    next: stripPageNumber(data.next),
    results: data.results,
  }
}

export async function getPerson(id: number): Promise<Person> {
  const { data } = await api.get<Person>(`/people/${id}`)
  return data
}
