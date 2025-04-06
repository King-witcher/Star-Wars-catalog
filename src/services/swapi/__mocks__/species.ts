import species from '@/fixtures/species.json'
import { Species } from '@/types/species'

export async function getSpecies(): Promise<Species> {
  return species as unknown as Species
}
