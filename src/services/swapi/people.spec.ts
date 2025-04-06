import person_ from '@/fixtures/person.json'
import { Person } from '@/types/person'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { Mock } from 'vitest'
import { getPeople, getPerson } from './people'

const person = person_ as unknown as Person

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

describe('people', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(getPeople, () => {
    it('properly returns the next page', async () => {
      const next = faker.number.int()

      const mockValue = {
        data: {
          next: `https://swapi.dev/api/people/?page=${next}`,
          results: [],
        },
      }
      ;(axios.get as Mock).mockResolvedValue(mockValue)

      const result = await getPeople(faker.number.int(), '')

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

      const page = faker.number.int()
      const result = await getPeople(page, '')

      expect(result.next).toBeNull()
    })
  })

  describe(getPerson, () => {
    it('returns a person', async () => {
      ;(<Mock>axios.get).mockResolvedValue({ data: person })
      const result = await getPerson(666)

      expect(result).toBe(person)
      expect(axios.get).toHaveBeenCalledWith('/people/666')
    })
  })
})
