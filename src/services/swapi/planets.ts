import { PaginatedData } from '@/types/paginated-data'
import { Planet } from '@/types/planet'
import { block } from '@/utils/block'
import { stripPageNumber } from '@/utils/swapi'
import { api } from './api'

export async function getPlanets(page: number): Promise<PaginatedData<Planet>> {
  const { data } = await block(() => {
    const searchParams = new URLSearchParams([['page', page.toString()]])
    return api.get<SWAPIPaginatedResponse<Planet>>(`/planets?${searchParams}`)
  })

  return {
    count: data.count,
    next: stripPageNumber(data.next),
    results: data.results,
  }
}
