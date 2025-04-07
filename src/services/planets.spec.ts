import planet_ from '@/fixtures/planet.json'
import { Planet } from '@/types/planet'
import { faker } from '@faker-js/faker'
import { api } from './api'
import { getPlanet, getPlanets } from './planets'

const planet = planet_ as unknown as Planet
const planets = [planet, planet, planet]

vi.mock('./api')

describe('people', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(getPlanets, () => {
    it('should query people with the correct params and return the response', async () => {
      const next = faker.number.int()
      const search = faker.lorem.word()
      const page = faker.number.int()

      const mockValue = {
        data: {
          next: `https://swapi.dev/api/people/?page=${next}`,
          results: planets,
        },
      }
      vi.mocked(api.get).mockResolvedValue(mockValue)

      const result = await getPlanets(page, search)

      expect(api.get).toHaveBeenCalledWith('/planets', {
        params: {
          search,
          page,
        },
      })
      expect(result.next).toEqual(next)
    })
  })

  describe(getPlanet, () => {
    it('should get and return the person from SWAPI', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: planet })
      const id = faker.number.int()
      const result = await getPlanet(id)

      expect(result).toEqual(planet)
      expect(api.get).toHaveBeenCalledWith(`/planets/${id}`)
    })
  })
})
