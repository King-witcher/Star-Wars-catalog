import _species from '@/fixtures/film.json'
import { Species } from '@/types/species'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { Mock } from 'vitest'
import { getSpecies } from './species'
const species = _species as unknown as Species

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }
})

describe(getSpecies, () => {
  it('should return a species', async () => {
    ;(<Mock>axios.get).mockResolvedValue({ data: species })
    const id = faker.number.int()
    const result = await getSpecies(id)

    expect(result).toEqual(species)
    expect(axios.get).toHaveBeenCalledWith(`/species/${id}`)
  })
})
