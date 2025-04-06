import axios from 'axios'
import { Mock } from 'vitest'
import _film from '@/fixtures/film.json'
import { Film } from '@/types/film'
import { getFilm } from './films'
import { faker } from '@faker-js/faker'
const film = _film as unknown as Film

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

describe(getFilm, () => {
  it('returns a person', async () => {
    ;(<Mock>axios.get).mockResolvedValue({ data: film })
    const id = faker.number.int()
    const result = await getFilm(id)

    expect(result).toBe(film)
    expect(axios.get).toHaveBeenCalledWith(`/films/${id}`)
  })
})
