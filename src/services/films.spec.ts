import _film from '@/fixtures/film.json'
import { Film } from '@/types/film'
import { faker } from '@faker-js/faker'
import { Mock } from 'vitest'
import { getFilm } from './films'
import { api } from './api'
const film = _film as unknown as Film

vi.mock('./api')

describe(getFilm, () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns a film', async () => {
    ;(<Mock>api.get).mockResolvedValue({ data: film })
    const id = faker.number.int()
    const result = await getFilm(id)

    expect(result).toEqual(film)
    expect(api.get).toHaveBeenCalledWith(`/films/${id}`)
  })

  it('throws an error if the API call fails', async () => {
    const error = new Error('API error')
    ;(<Mock>api.get).mockRejectedValue(error)
    const id = faker.number.int()

    await expect(getFilm(id)).rejects.toThrow(error)
    expect(api.get).toHaveBeenCalledWith(`/films/${id}`)
  })
})
