import film from '@/fixtures/film.json'
import { Film } from '@/types/film'

export async function getFilm(): Promise<Film> {
  return film as unknown as Film
}
