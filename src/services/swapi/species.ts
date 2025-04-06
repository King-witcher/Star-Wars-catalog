import { Species } from '@/types/species'
import { api } from './api'

export async function getSpecies(id: number): Promise<Species> {
  const { data } = await api.get<Species>(`/species/${id}`)
  return data
}
