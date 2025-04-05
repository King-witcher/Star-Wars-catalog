import { PaginatedData } from '@/types/paginated-data'
import { Person } from '@/types/person'
import { stripPageNumber } from '@/utils/swapi'
import { api } from './api'

export async function getPeople(
  page: number,
  search: string
): Promise<PaginatedData<Person>> {
  const { data } = await api.get<SWAPIPaginatedResponse<Person>>('/people', {
    params: {
      page,
      search,
    },
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
