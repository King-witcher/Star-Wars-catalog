import _species from '@/fixtures/species.json'
import { faker } from '@faker-js/faker'
import { api } from './api'
import { Species } from '@/types/species'
import { getSpecies } from './species'
const species = _species as unknown as Species

vi.mock('./api')

describe(getSpecies, () => {
  afterEach(vi.clearAllMocks)

  it('returns a film', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: species })
    const id = faker.number.int()
    const result = await getSpecies(id)

    expect(result).toEqual(species)
    expect(api.get).toHaveBeenCalledWith(`/species/${id}`)
  })

  it('throws an error if the API call fails', async () => {
    const error = new Error('API error')
    vi.mocked(api.get).mockRejectedValue(error)
    const id = faker.number.int()

    await expect(getSpecies(id)).rejects.toThrow(error)
    expect(api.get).toHaveBeenCalledWith(`/species/${id}`)
  })
})
