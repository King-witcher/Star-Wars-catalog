import _starship from '@/fixtures/starship.json'
import { Starship } from '@/types/starship'
const starship = _starship as unknown as Starship

export async function getStarship(): Promise<Starship> {
  return starship
}
