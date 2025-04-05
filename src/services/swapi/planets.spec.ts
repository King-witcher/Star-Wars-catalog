import _planet from '@/fixtures/planet.json'
import { Planet } from '@/types/planet'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { Mock } from 'vitest'
import { getPlanet, getPlanets } from './planets'
const planet = _planet as unknown as Planet

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

describe('planets', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(getPlanets, () => {
    it('properly returns the next page', async () => {
      const next = faker.number.int()

      const mockValue = {
        data: {
          next: `https://swapi.dev/api/planets/?page=${next}`,
          results: [],
        },
      }
      ;(axios.get as Mock).mockResolvedValue(mockValue)

      const result = await getPlanets(faker.number.int(), '')

      expect(result.next).toBe(next)
    })

    it('returns null on next page when this is the last page', async () => {
      const mockValue = {
        data: {
          next: null,
          results: [],
        },
      }
      ;(axios.get as Mock).mockResolvedValue(mockValue)

      const result = await getPlanets(faker.number.int(), '')

      expect(result.next).toBeNull()
    })
  })

  describe(getPlanet, () => {
    it('returns a person', async () => {
      const id = faker.number.int()
      ;(<Mock>axios.get).mockResolvedValue({ data: planet })
      const result = await getPlanet(id)

      expect(axios.get).toHaveBeenCalledWith(`/planets/${id}`)
      expect(result).toBe(planet)
    })
  })
})
