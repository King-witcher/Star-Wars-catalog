import { PaginatedData } from '@/types/paginated-data'
import { Planet } from '@/types/planet'
import { stripPageNumber } from '@/utils/swapi'
import { api } from './api'

export async function getPlanets(
  page: number,
  search: string
): Promise<PaginatedData<Planet>> {
  const { data } = await api.get<SWAPIPaginatedResponse<Planet>>('/planets', {
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

export async function getPlanet(id: number): Promise<Planet> {
  const { data } = await api.get<Planet>(`/planets/${id}`)
  return data
}
