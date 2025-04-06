import { Starship } from '@/types/starship'
import _starship from '@/fixtures/starship.json'
const starship = _starship as unknown as Starship

export async function getStarship(): Promise<Starship> {
  return starship
}
