import { Person } from '@/types/person'
import { Planet } from '@/types/planet'

export namespace SWAPI {
  export type PaginatedResponse<T> = {
    count: number
    next: number | null
    results: T[]
  }

  export async function getPlanets(
    page: number
  ): Promise<PaginatedResponse<Planet>> {
    return {
      count: 1,
      next: null,
      results: [
        {
          climate: 'Arid',
          diameter: '10465',
          gravity: '1 standard',
          name: 'Tatooine',
          orbital_period: '304',
          population: '200000',
          residents: [
            'https://swapi.dev/api/people/1/',
            'https://swapi.dev/api/people/2/',
          ],
          rotation_period: '23',
          surface_water: '1',
          terrain: 'Dessert',
          url: 'https://swapi.dev/api/planets/1/',
        },
      ],
    }
  }

  export async function getPeople(
    page = 0
  ): Promise<PaginatedResponse<Person>> {
    return {
      count: 0,
      next: null,
      results: [],
    }
  }
}
