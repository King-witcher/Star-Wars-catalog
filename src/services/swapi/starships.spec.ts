import _starship from '@/fixtures/starship.json'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { Mock } from 'vitest'
import { Starship } from '@/types/starship'
import { getStarship } from './starships'
const starship = _starship as unknown as Starship

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

describe(getStarship, () => {
  it('returns a starship', async () => {
    ;(<Mock>axios.get).mockResolvedValue({ data: starship })
    const id = faker.number.int()
    const result = await getStarship(id)

    expect(result).toBe(starship)
    expect(axios.get).toHaveBeenCalledWith(`/starships/${id}`)
  })
})
