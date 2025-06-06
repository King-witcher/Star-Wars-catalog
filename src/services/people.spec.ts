import person_ from '@/fixtures/person.json'
import { Person } from '@/types/person'
import { faker } from '@faker-js/faker'
import { api } from './api'
import { getPeople, getPerson } from './people'

import people_ from '@/fixtures/people.json'

const person = person_ as unknown as Person
const people = people_ as unknown as Person[]

vi.mock('./api')

describe('people', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(getPeople, () => {
    it('should query people with the correct params and return the response', async () => {
      const next = faker.number.int()
      const search = faker.lorem.word()
      const page = faker.number.int()

      const mockValue = {
        data: {
          next: `https://swapi.dev/api/people/?page=${next}`,
          results: people,
        },
      }
      vi.mocked(api.get).mockResolvedValue(mockValue)

      const result = await getPeople(page, search)

      expect(api.get).toHaveBeenCalledWith('/people', {
        params: {
          search,
          page,
        },
      })
      expect(result.next).toEqual(next)
    })
  })

  describe(getPerson, () => {
    it('should get and return the person from SWAPI', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: person })
      const id = faker.number.int()
      const result = await getPerson(id)

      expect(result).toEqual(person)
      expect(api.get).toHaveBeenCalledWith(`/people/${id}`)
    })
  })
})
