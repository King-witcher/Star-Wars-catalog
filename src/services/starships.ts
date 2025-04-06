import { Starship } from '@/types/starship'
import { api } from './api'

export async function getStarship(id: number): Promise<Starship> {
  const { data } = await api.get<Starship>(`/starships/${id}`)
  return data
}
