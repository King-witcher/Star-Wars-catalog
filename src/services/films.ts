import { Film } from '@/types/film'
import { api } from './api'

export async function getFilm(id: number): Promise<Film> {
  const { data } = await api.get<Film>(`/films/${id}`)
  return data
}
