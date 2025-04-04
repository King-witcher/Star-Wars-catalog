import { Person } from '@/types/person'
import { Planet } from '@/types/planet'
import { block } from '@/utils/block'
import { stripPageNumber } from '@/utils/swapi'
import axios from 'axios'

export namespace SWAPI {
  const BASE_URL = 'https://swapi.dev/api'
  const api = axios.create({ baseURL: BASE_URL })

  export type PaginatedResponse<T> = {
    count: number
    next: number | null
    results: T[]
  }

  type SWAPIPaginatedResponse<T> = {
    count: number
    next: string | null
    results: T[]
  }

  export async function getPlanets(
    page: number
  ): Promise<PaginatedResponse<Planet>> {
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

  export async function getPeople(
    page = 1
  ): Promise<PaginatedResponse<Person>> {
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
}
