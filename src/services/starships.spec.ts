import _starship from '@/fixtures/starship.json'
import { faker } from '@faker-js/faker'
import { api } from './api'
import { Starship } from '@/types/starship'
import { getStarship } from './starships'
const starship = _starship as unknown as Starship

vi.mock('./api')

describe(getStarship, () => {
  afterEach(vi.clearAllMocks)

  it('should fetch and return the proper starship', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: starship })
    const id = faker.number.int()
    const result = await getStarship(id)

    expect(result).toEqual(starship)
    expect(api.get).toHaveBeenCalledWith(`/starships/${id}`)
  })

  it('should throw an error if the API call fails', async () => {
    const error = new Error('API error')
    vi.mocked(api.get).mockRejectedValue(error)
    const id = faker.number.int()

    await expect(getStarship(id)).rejects.toThrow(error)
    expect(api.get).toHaveBeenCalledWith(`/starships/${id}`)
  })
})
